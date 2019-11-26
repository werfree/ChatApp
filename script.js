const socket = io("http://192.168.31.118:3000");

const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");

const name = prompt("What is your Name?");

socket.emit("new-user", name);

socket.on("chat-message", data => {
  appendMessage(`${data.name}: ${data.message}`);
});
socket.on("user-connected", name => {
  appendMessage(`${name} connected`);
});
socket.on("user-disconnected", name => {
  appendMessage(`${name} left`);
});

messageForm.addEventListener("submit", e => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit("send-chat-message", message);
  messageInput.value = "";
  appendMessage(`You: ${message}`);
});

appendMessage = message => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
};

appendMessage("You Joined");
