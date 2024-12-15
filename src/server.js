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
    socket["nickname"] = "Anon"; // 닉네임 save 없을 시에 socket을 익명으로 저장

    console.log("Connected to Browser ✅");
    socket.on("close", () => console.log("DisConnected from the Browser ❌"));

    socket.on("message", (msg) => {
        const message = JSON.parse(msg);

        switch (message.type) {
            case("new_message") :
                sockets.forEach(aSocket => 
                    aSocket.send(`${socket.nickname} :  ${message.payload}`));
            case("nickname") :
            socket["nickname"] = message.payload;
        }
    });
});

server.listen(3000, handleListen); // 두 개의 프로토콜이 같은 포트를 사용함
