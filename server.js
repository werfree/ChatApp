const IP = "192.168.31.118";
const PORT = 3000;
const io = require("socket.io").listen(3000);

const users = {};

io.on("connection", socket => {
  console.log("Connected");
  socket.on("send-chat-message", message => {
    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id]
    });
  });
  socket.on("new-user", name => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});
