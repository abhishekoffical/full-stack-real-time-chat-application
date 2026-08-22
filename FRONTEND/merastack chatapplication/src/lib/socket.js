import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.MODE === "development" ? "http://localhost:4000" : "/";

let socket = null;

export const connectSocket = (userId) => {
  if (!userId) return null;
  socket = io(SOCKET_URL, {
    query: { userId },
  });
  return socket;
};

export const getSocket = () => {
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
