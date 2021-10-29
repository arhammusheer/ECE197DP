const io = require("socket.io")();
const socketapi = {
  io: io,
};
io.path("/ece197dp");


// Add your socket.io logic here!
io.on("connection", function (socket) {
  console.log("A user connected");

  socket.on("accelerometer", (data) => {
    console.log(data);
    io.emit("accelerometer", data);
  });
});
// end of socket.io logic

module.exports = socketapi;
