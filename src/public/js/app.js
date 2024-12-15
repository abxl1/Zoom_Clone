const msgList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const msgForm = document.querySelector("#msg");
const socket = new WebSocket(`ws://${window.location.host}`); // 사용자의 localhost를 환경변수로 처리

function makeMsg(type, payload) {
    const msg = { type, payload };
    return JSON.stringify(msg); 
    // stringify() : Object -> string 변환
    // parse() : string -> Object 변환
    // BE에서는 js의 object를 알지 못함 -> 문자열로 변환 후 전달 필요
    // 웹소켓이 브라우저에 있는 API이기 때문에 API에 결정을 맡기면 안 됨
    // BE에서 string을 전달받고 FE에서 다시 object를 string으로 변환하여 UI 출력 
}

socket.addEventListener("open", () => {
    console.log("Connected to Server ✅");
})

socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    msgList.append(li);
    input.value = "";
})

socket.addEventListener("close", () => {
    console.log("DisConnected to Server ❌");
})

function handleSubmit(event) {
    event.preventDefault();
    const input = msgForm.querySelector("input");
    socket.send(makeMsg("new_message", input.value));
    const li = document.createElement("li");
    li.innerText = `You : ${input.value}`;
    msgList.append(li);
    input.value = "";
}

function handleNickSubmit(event) {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMsg("nickname", input.value));
    input.value = "";
}

msgForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit)
