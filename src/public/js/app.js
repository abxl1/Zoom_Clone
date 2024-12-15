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

setTimeout(() => {
    socket.send("hello from the browser!");
}, 10000) // 10초 후 메시지 출력
