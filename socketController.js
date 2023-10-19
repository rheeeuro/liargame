const { events, colors } = require("./event");
const { chooseWord } = require("./words");

let sockets = [];
let hintOrder = [];
let inProgress = false;
let word = null;
let liar = null;
let hintCount = 0;
let voted = null;
let finalVote = null;

let timeout = null;

const chooseLiar = () => sockets[Math.floor(Math.random() * sockets.length)];

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (event, data) => io.emit(event, data);

  const updateColor = () => {
    sockets.forEach((s, i) => {
      s.color = colors[i];
      if (s.id === socket.id) socket.color = s.color;
    });
  };

  const sendPlayerUpdate = () => {
    updateColor();
    superBroadcast(events.playerUpdate, { sockets });
  };

  socket.on(events.requestUpdateColor, updateColor);

  const sendPlayerVoteUpdate = () =>
    superBroadcast(events.playerVoteUpdate, { sockets });

  const handleVoteEnded = () => {
    let max = null;
    sockets.forEach((s, i) => {
      if (i === 0) {
        max = s;
      } else if (max.voteCount < s.voteCount) {
        max = s;
      }
    });

    if (sockets.filter((s) => s.voteCount === max.voteCount).length > 1) {
      superBroadcast(events.invalidVote, { duplicated: true });
      sockets.forEach((s) => {
        s.voted = null;
        s.voteCount = 0;
      });
      timeout = setTimeout(() => {
        sendPlayerVoteUpdate();
        superBroadcast(events.voteStarted);
        superBroadcast(events.revoteNotification);
        timeout = setTimeout(handleVoteEnded, 31000);
      }, 5000);
    } else {
      voted = max;
      finalVote = { yes: [], no: [] };
      superBroadcast(events.finalAnounce, { voted });
    }
  };

  const handleFinalVoteEnded = () => {
    if (finalVote.yes.length > finalVote.no.length) {
      if (voted.id === liar.id) {
        superBroadcast(events.voteEnded, {
          nickname: liar.nickname,
          color: liar.color,
          liarId: liar.id,
        });
      } else {
        liar.point += 1;
        superBroadcast(events.voteFailed, {
          liarId: liar.id,
          nickname: liar.nickname,
          color: liar.color,
          answer: word.word,
        });
        timeout = setTimeout(() => {
          endGame();
        }, 11000);
      }
    } else {
      voted = null;
      finalVote = null;
      superBroadcast(events.invalidVote, { duplicated: false });
      sockets.forEach((s) => {
        s.voted = null;
        s.voteCount = 0;
      });
      timeout = setTimeout(() => {
        sendPlayerVoteUpdate();
        superBroadcast(events.voteStarted);
        superBroadcast(events.revoteNotification);
        timeout = setTimeout(handleVoteEnded, 31000);
      }, 5000);
    }
  };

  const startGame = () => {
    sendPlayerUpdate();
    if (inProgress === false) {
      hintCount = 0;
      voteCount = 0;
      hintTurnIdx = 0;
      inProgress = true;
      liar = chooseLiar();
      word = chooseWord();

      console.log(`라이어: ${liar.nickname}, 제시어: ${word.word}`);

      superBroadcast(events.gameStarted, { liar, word });
      hintOrder = sockets.map((s) => ({
        id: s.id,
        nickname: s.nickname,
        color: s.color,
      }));
      hintOrder.sort(() => Math.random() - 0.5);
      if (sockets.length < 10) {
        hintOrder = [...hintOrder, ...hintOrder];
      }

      timeout = setTimeout(() => {
        sendPlayerUpdate();
        superBroadcast(events.hintTurn, {
          id: hintOrder[hintCount].id,
          nickname: hintOrder[hintCount].nickname,
          color: hintOrder[hintCount].color,
        });
      }, 11000);
    }
  };

  const endGame = () => {
    inProgress = false;
    liar = null;
    word = null;
    voted = null;
    hintCount = 0;
    finalVote = null;
    sockets.forEach((s) => {
      s.voteCount = 0;
      s.voted = null;
      s.ready = false;
    });
    clearTimeout(timeout);
    superBroadcast(events.gameEnded);
    sendPlayerUpdate();
  };

  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
    sockets.push({
      id: socket.id,
      nickname: nickname,
      voteCount: 0,
      color: "#000000",
      voted: null,
      ready: false,
      point: 0,
    });
    endGame();
    broadcast(events.newUser, { nickname });
  });

  socket.on(events.disconnect, () => {
    sockets = sockets.filter((s) => s.id !== socket.id);
    broadcast(events.disconnected, { nickname: socket.nickname });
    endGame();
  });

  socket.on(events.sendMessage, ({ message }) => {
    superBroadcast(events.newMessage, {
      message,
      nickname: socket.nickname,
      color: socket.color,
    });
  });

  socket.on(events.sendHint, ({ hint }) => {
    hintCount += 1;
    superBroadcast(events.newHint, {
      hint,
      nickname: socket.nickname,
      color: socket.color,
    });

    if (hintCount === hintOrder.length) {
      superBroadcast(events.voteStarted);
      sendPlayerVoteUpdate();
      superBroadcast(events.voteNotification);
      timeout = setTimeout(handleVoteEnded, 31000);
    } else if (hintCount === sockets.length) {
      superBroadcast(events.secondHintNotif);
      timeout = setTimeout(() => {
        superBroadcast(events.hintTurn, {
          id: hintOrder[hintCount].id,
          nickname: hintOrder[hintCount].nickname,
          color: hintOrder[hintCount].color,
        });
      }, 61000);
    } else {
      superBroadcast(events.hintTurn, {
        id: hintOrder[hintCount].id,
        nickname: hintOrder[hintCount].nickname,
        color: hintOrder[hintCount].color,
      });
    }
  });

  socket.on(events.sendVote, ({ target }) => {
    let voteCount = 0;
    let targetNickname = "";
    let targetColor = "#000000";
    sockets.forEach((s) => {
      if (s.id === socket.id) {
        s.voted = target;
      }
      if (s.id === target) {
        s.voteCount += 1;
        targetNickname = s.nickname;
        targetColor = s.color;
      }
      if (s.voted != null) {
        voteCount += 1;
      }
      return s;
    });
    sendPlayerVoteUpdate();
    superBroadcast(events.newVote, {
      targetNickname,
      targetColor,
      nickname: socket.nickname,
      color: socket.color,
    });

    if (voteCount === sockets.length) {
      clearTimeout(timeout);
      handleVoteEnded();
    }
  });

  socket.on(events.cancelVote, ({ target }) => {
    sockets.forEach((s) => {
      if (s.id === socket.id) {
        s.voted = null;
      }
      if (s.id === target) {
        s.voteCount -= 1;
        targetNickname = s.nickname;
        targetColor = s.color;
      }
      return s;
    });
    sendPlayerVoteUpdate();
    superBroadcast(events.newCancelVote, {
      targetNickname,
      targetColor,
      nickname: socket.nickname,
      color: socket.color,
    });
  });

  socket.on(events.sendAnswer, ({ input }) => {
    if (input.trim() === word.word.trim()) {
      liar.point += 1;
      superBroadcast(events.liarWin, { answer: word.word });
    } else {
      sockets.forEach((s) => {
        if (s.id !== liar.id) s.point += 1;
      });
      superBroadcast(events.liarLose, {
        liarId: liar.id,
        input,
        answer: word.word,
      });
    }

    timeout = setTimeout(endGame, 11000);
  });

  socket.on(events.readyGame, () => {
    let readyCount = 0;
    sockets.forEach((s) => {
      if (s.id === socket.id) s.ready = true;
      if (s.ready) readyCount += 1;
    });

    if (readyCount === sockets.length) {
      startGame();
    } else {
      sendPlayerUpdate();
    }
  });

  socket.on(events.cancelReadyGame, () => {
    sockets.forEach((s) => {
      if (s.id === socket.id) s.ready = false;
    });
    sendPlayerUpdate();
  });

  socket.on(events.finalYes, () => {
    finalVote.yes.push(socket.id);

    if (finalVote.yes.length + finalVote.no.length === sockets.length) {
      handleFinalVoteEnded();
    } else {
      superBroadcast(events.finalNotif, {
        yes: finalVote.yes.length,
        no: finalVote.no.length,
        total: sockets.length,
        voted,
      });
    }
  });

  socket.on(events.finalNo, () => {
    finalVote.no.push(socket.id);

    if (finalVote.yes.length + finalVote.no.length === sockets.length) {
      handleFinalVoteEnded();
    } else {
      superBroadcast(events.finalNotif, {
        yes: finalVote.yes.length,
        no: finalVote.no.length,
        total: sockets.length,
        voted,
      });
    }
  });
};

module.exports = { socketController };
