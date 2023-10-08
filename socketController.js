const { events, colors } = require("./event");
const { chooseWord } = require("./words");

let sockets = [];
let hintOrder = [];
let inProgress = false;
let word = null;
let liar = null;
let hintCount = 0;

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
      superBroadcast(events.duplicatedVote);
      sockets.forEach((s) => {
        s.voted = null;
        s.voteCount = 0;
      });
      setTimeout(() => {
        superBroadcast(events.voteStarted);
        superBroadcast(events.revoteNotification);
        sendPlayerVoteUpdate();
      }, 5000);
    } else {
      if (max.id === liar.id) {
        superBroadcast(events.voteEnded, {
          nickname: liar.nickname,
          color: liar.color,
          liarId: liar.id,
        });
      } else {
        superBroadcast(events.voteFailed, {
          nickname: liar.nickname,
          color: liar.color,
        });
        endGame();
      }
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

      console.log(liar.nickname, word.word);

      superBroadcast(events.gameStarted, { liar, word });
      hintOrder = sockets.map((s) => ({
        id: s.id,
        nickname: s.nickname,
        color: s.color,
      }));
      hintOrder.sort(() => Math.random() - 0.5);

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
    hintCount = 0;
    sockets.forEach((s) => {
      s.voteCount = 0;
      s.voted = null;
      s.ready = false;
    });
    clearTimeout(timeout);
    sendPlayerUpdate();
    superBroadcast(events.gameEnded);
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

    if (hintCount === sockets.length) {
      superBroadcast(events.voteStarted);
      superBroadcast(events.voteNotification);
    } else {
      superBroadcast(events.hintTurn, {
        id: hintOrder[hintCount].id,
        nickname: hintOrder[hintCount].nickname,
        color: hintOrder[hintCount].color,
      });
    }
  });

  socket.on(events.sendVote, ({ target }) => {
    socket.voted = target;
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
      handleVoteEnded();
    }
  });

  socket.on(events.cancelVote, ({ target }) => {
    socket.voted = null;
    voteCount -= 1;
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

  socket.on(events.sendAnswer, ({ answer }) => {
    if (answer === word.word) {
      superBroadcast(events.liarWin, { answer: word.word });
    } else {
      superBroadcast(events.liarLose, { answer: word.word });
    }

    endGame();
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
};

module.exports = { socketController };
