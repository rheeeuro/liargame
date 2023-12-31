const events = {
  setNickname: "setNickname",
  newUser: "newUser",
  disconnect: "disconnect",
  disconnected: "disconnected",
  sendMessage: "sendMessage",
  newMessage: "newMessage",
  hintTurn: "hintTurn",
  secondHintNotif: "secondHintNotif",
  sendHint: "sendHint",
  newHint: "newHint",
  voteStarted: "voteStarted",
  voteEnded: "voteEnded",
  voteNotification: "voteNotification",
  revoteNotification: "revoteNotification",
  finalAnounce: "finalAnounce",
  finalYes: "finalYes",
  finalNo: "finalNo",
  finalNotif: "finalNotif",
  sendVote: "sendVote",
  cancelVote: "cancelVote",
  newVote: "newVote",
  newCancelVote: "newCancelVote",
  invalidVote: "invalidVote",
  voteFailed: "voteFailed",
  sendAnswer: "sendAnswer",
  playerUpdate: "playerUpdate",
  requestUpdateColor: "requestUpdateColor",
  playerVoteUpdate: "playerVoteUpdate",
  liarWin: "liarWin",
  liarLose: "liarLose",
  readyGame: "readyGame",
  cancelReadyGame: "cancelReadyGame",
  gameStarted: "gameStarted",
  gameEnded: "gameEnded",
};

const colors = [
  "#FF0000",
  "#FF7F00",
  "#FFD400",
  "#FFFF00",
  "#BFFF00",
  "#6AFF00",
  "#00EAFF",
  "#0095FF",
  "#0040FF",
  "#AA00FF",
  "#FF00AA",
  "#EDB9B9",
  "#E7E9B9",
  "#B9EDE0",
  "#B9D7ED",
  "#DCB9ED",
  "#8F2323",
  "#8F6A23",
  "#4F8F23",
  "#23628F",
  "#6B238F",
  "#000000",
  "#737373",
  "#CCCCCC",
];

module.exports = { events, colors };
