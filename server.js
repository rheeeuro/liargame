const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const { socketController } = require("./socketController");
const { events } = require("./event");

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = 4000;

app.use("/img", express.static("./img"));
app.use("/css", express.static("./css"));
app.use("/js", express.static("./js"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

function handleListening() {
  console.log(`🔥 서버 실행중: http://localhost:${PORT}`);
}

function handleHome(req, res) {
  res.render("index.html", { events: JSON.stringify(events) });
}

app.get("/", handleHome);

io.on("connection", (socket) => socketController(socket, io));

server.listen(4000, handleListening);
