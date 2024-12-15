const msgList = document.querySelector("ul");
const msgForm = document.querySelector("form");

const socket = new WebSocket(`ws://${window.location.host}`); // 사용자의 localhost를 환경변수로 처리

socket.addEventListener("open", () => {
    console.log("Connected to Server ✅");
})

socket.addEventListener("message", (message) => {
    console.log("New message :", message.data);
})

socket.addEventListener("close", () => {
    console.log("DisConnected to Server ❌");
})

function handleSummit(event) {
    event.preventDefault();
    const input = msgForm.querySelector("input");
    socket.send(input.value);
    input.value = "";
}

msgForm.addEventListener("submit", handleSummit);
