import { handleNewUser } from "./notifications.js";

let socket = null;

export const getSocket = () => window.socket;

export const updateSocket = (newSocket) => (socket = newSocket);

export const initSockets = (newSocket) => {
  const { events } = window;
  updateSocket(newSocket);
  socket.on(events.newUser, handleNewUser);
};
