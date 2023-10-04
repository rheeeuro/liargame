const { events, colors } = require("./event");
const { chooseWord } = require("./words");

let sockets = [];
let inProgress = false;
let word = null;
let liar = null;
let hintCount = 0;
let voteCount = 0;

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

  const sendPlayerUpdate = () =>
    superBroadcast(events.playerUpdate, { sockets });

  const sendPlayerVoteUpdate = () => {
    superBroadcast(events.playerVoteUpdate, { sockets });
  };

  const handleVoteEnded = () => {
    let max = null;
    sockets.forEach((s, i) => {
      if (i === 0) {
        max = s;
      } else if (max.voteCount < s.voteCount) {
        max = s;
      }
    });

    if (max.id === liar.id) {
      superBroadcast(events.voteEnded, {
        nickname: liar.nickname,
        color: liar.color,
      });
      superBroadcast(events.requestAnswer, { id: liar.id });
    } else {
      superBroadcast(events.voteFailed, {
        nickname: liar.nickname,
        color: liar.color,
      });
      endGame();
    }
  };

  const startGame = () => {
    if (inProgress === false) {
      hintCount = 0;
      voteCount = 0;
      inProgress = true;
      liar = chooseLiar();
      word = chooseWord();
      console.log(liar);
      console.log(word);

      superBroadcast(events.gameStarted, { liar, word });
    }
  };

  const endGame = () => {
    inProgress = false;
    liar = null;
    word = null;
    hintCount = 0;
    voteCount = 0;
    sockets.forEach((s) => {
      s.voteCount = 0;
      s.voted = null;
    });
    setTimeout(() => {
      superBroadcast(events.gameEnded);
      superBroadcast(events.playerUpdate, { sockets });
    }, 5000);
  };

  socket.on(events.setNickname, ({ nickname }) => {
    if (inProgress) return;
    socket.nickname = nickname;
    sockets.push({
      id: socket.id,
      nickname: nickname,
      voteCount: 0,
      color: "#000000",
      voted: null,
    });
    broadcast(events.newUser, { nickname });
    updateColor();
    sendPlayerUpdate();
  });

  socket.on(events.disconnect, () => {
    sockets = sockets.filter((s) => s.id !== socket.id);
    if (sockets.length < 3 || socket.id === liar.id) {
      endGame();
    }
    broadcast(events.disconnected, { nickname: socket.nickname });
    updateColor();
    sendPlayerUpdate();
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
    }
  });

  socket.on(events.sendVote, ({ target }) => {
    socket.voted = target;
    voteCount += 1;
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

  socket.on(events.startGame, () => {
    startGame();
  });
};

module.exports = { socketController };
