import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.render("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({server}); // http 서버 위에 ws 서버 사용

function handleConnection(socket) {
    console.log(socket);
}

wss.on("connection", handleConnection);
server.listen(3000, handleListen); // 두 개의 프로토콜이 같은 포트를 사용함
