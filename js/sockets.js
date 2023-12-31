import {
  handleNewCancelVote,
  handleNewHint,
  handleNewMessage,
  handleNewVote,
  handleVoteEnded,
  handleVoteStarted,
} from "./chat.js";
import { handleDisconnected, handleNewUser } from "./notifications.js";
import {
  handleFinalAnounce,
  handleFinalNotif,
  handleGameEnded,
  handleGameStarted,
  handleHintTurn,
  handleInvalidVote,
  handleLiarLose,
  handleLiarWin,
  handlePlayerUpdate,
  handlePlayerVoteUpdate,
  handleRevoteNotification,
  handleSecondHintNotif,
  handleVoteFailed,
  handleVoteNotification,
} from "./players.js";

let socket = null;

export const getSocket = () => socket;

export const initSockets = (newSocket) => {
  const { events } = window;
  socket = newSocket;
  socket.on(events.newUser, handleNewUser);
  socket.on(events.disconnected, handleDisconnected);
  socket.on(events.newMessage, handleNewMessage);
  socket.on(events.hintTurn, handleHintTurn);
  socket.on(events.secondHintNotif, handleSecondHintNotif);
  socket.on(events.newHint, handleNewHint);
  socket.on(events.voteStarted, handleVoteStarted);
  socket.on(events.voteEnded, handleVoteEnded);
  socket.on(events.voteNotification, handleVoteNotification);
  socket.on(events.revoteNotification, handleRevoteNotification);
  socket.on(events.finalAnounce, handleFinalAnounce);
  socket.on(events.finalNotif, handleFinalNotif);
  socket.on(events.newVote, handleNewVote);
  socket.on(events.newCancelVote, handleNewCancelVote);
  socket.on(events.invalidVote, handleInvalidVote);
  socket.on(events.voteFailed, handleVoteFailed);
  socket.on(events.playerUpdate, handlePlayerUpdate);
  socket.on(events.playerVoteUpdate, handlePlayerVoteUpdate);
  socket.on(events.liarWin, handleLiarWin);
  socket.on(events.liarLose, handleLiarLose);
  socket.on(events.gameStarted, handleGameStarted);
  socket.on(events.gameEnded, handleGameEnded);
};
