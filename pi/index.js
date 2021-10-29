let Gpio = require("pigpio");

if (Gpio.initialize) {
  Gpio = Gpio.Gpio;
  console.log("Pigpio initialized");
}

const led = new Gpio(17, { mode: Gpio.OUTPUT });

let dutyCycle = 0;

setInterval(() => {
  led.pwmWrite(dutyCycle);

  dutyCycle += 5;
  if (dutyCycle > 255) {
    dutyCycle = 0;
  }
}, 20);
