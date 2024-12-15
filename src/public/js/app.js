const msgList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const msgForm = document.querySelector("#msg");
const socket = new WebSocket(`ws://${window.location.host}`); // 사용자의 localhost를 환경변수로 처리

function makeMsg(type, payload) {
    const msg = { type, payload };
    return JSON.stringify(msg); // Object -> string 변환
}

socket.addEventListener("open", () => {
    console.log("Connected to Server ✅");
})

socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    msgList.append(li);
})

socket.addEventListener("close", () => {
    console.log("DisConnected to Server ❌");
})

function handleSubmit(event) {
    event.preventDefault();
    const input = msgForm.querySelector("input");
    socket.send(makeMsg("new_message", input.value));
    input.value = "";
}

function handleNickSubmit(event) {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMsg("nickname", input.value));
}

msgForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit)
