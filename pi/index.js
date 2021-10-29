// let Gpio = require("pigpio");

// if (Gpio.initialize) {
//   Gpio = Gpio.Gpio;
//   console.log("Pigpio initialized");
// }

// const led = new Gpio(17, { mode: Gpio.OUTPUT });

// let dutyCycle = 0;

// setInterval(() => {
//   led.pwmWrite(dutyCycle);

//   dutyCycle += 5;
//   if (dutyCycle > 255) {
//     dutyCycle = 0;
//   }
// }, 20);

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

socket.on("accelerometer", (data) => {
  console.log(data);
});
