const io = require("socket.io-client");
require("dotenv").config();
const Gpio = require("pigpio").Gpio;

const leftMotor1 = new Gpio(17, { mode: Gpio.OUTPUT });
const leftMotor2 = new Gpio(27, { mode: Gpio.OUTPUT });
const rightMotor1 = new Gpio(23, { mode: Gpio.OUTPUT });
const rightMotor2 = new Gpio(24, { mode: Gpio.OUTPUT });

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

  if (data.left >= 0) {
    if (process.env.NODE_ENV === "production") {
      leftMotor1.pwmWrite(parseInt((data.left * 254) / 100));
      leftMotor2.pwmWrite(0);
    }
  } else {
    if (process.env.NODE_ENV === "production") {
      leftMotor1.pwmWrite(0);
      leftMotor2.pwmWrite(parseInt((-1 * data.left * 254) / 100));
    }
  }

  if (data.right >= 0) {
    if (process.env.NODE_ENV === "production") {
      rightMotor1.pwmWrite(parseInt((data.right * 254) / 100));
      rightMotor2.pwmWrite(0);
    }
  } else {
    if (process.env.NODE_ENV === "production") {
      rightMotor1.pwmWrite(0);
      rightMotor2.pwmWrite(parseInt((-1 * data.right * 254) / 100));
    }
  }
});
