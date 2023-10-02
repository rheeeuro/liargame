import { handleNewMessage } from "./chat.js";
import { handleDisconnected, handleNewUser } from "./notifications.js";

let socket = null;

export const getSocket = () => socket;

export const updateSocket = (newSocket) => (socket = newSocket);

export const initSockets = (newSocket) => {
  const { events } = window;
  updateSocket(newSocket);
  newSocket.on(events.newUser, handleNewUser);
  newSocket.on(events.disconnected, handleDisconnected);
  newSocket.on(events.newMessage, handleNewMessage);
};
