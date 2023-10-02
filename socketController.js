const { events } = require("./event");

const socketController = (socket) => {
  socket.on(events.setNickname, ({ nickname }) => {
    socket.nickname = nickname;
  });
};

module.exports = { socketController };
