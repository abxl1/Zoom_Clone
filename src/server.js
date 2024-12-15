import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.render("home"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({server}); // http 서버 위에 ws 서버 사용

const sockets = []; // fake database

wss.on("connection", (socket) => {
    sockets.push(socket); // 모든 소켓을 소켓 객체에 넣기
    console.log("Connected to Browser ✅");
    socket.on("close", () => console.log("DisConnected from the Browser ❌"));
    socket.on("message", (message) => {

        // 각 브라우저를 aSocket으로 취급, 모든 브라우저에 메시지 전송
        sockets.forEach(aSocket => aSocket.send(message.toString()));
        socket.send(message.toString());
    });
});

server.listen(3000, handleListen); // 두 개의 프로토콜이 같은 포트를 사용함
