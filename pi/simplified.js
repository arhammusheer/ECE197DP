const io = require("socket.io-client");

const socket = io("https://ece197dp.croissant.one", {
  path: "/ece197dp",
});

socket.on("connect", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("disconnect", () => {
  console.log(socket.id); // undefined
});

socket.on("simplified", (data) => {
  console.log(data);
});

