const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = 4000;

app.use("/img", express.static("./img"));
app.use("/css", express.static("./css"));
app.use("/js", express.static("./js"));

function handleListening() {
  console.log(`🔥 서버 실행중: http://localhost:${PORT}`);
}

function handleHome(req, res) {
  res.sendFile(__dirname + "/index.html");
}

app.get("/", handleHome);

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(4000, handleListening);
