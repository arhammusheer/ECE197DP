const leftMotor = document.getElementById("left-motor");
const rightMotor = document.getElementById("right-motor");

const leftMotorValue = document.getElementById("left-motor-value");
const rightMotorValue = document.getElementById("right-motor-value");

const socket = io({
  path: "/ece197dp",
});

let throttle = false;

let motion = {
  left: 0,
  right: 0,
  timestamp: 0,
};

leftMotor.addEventListener("input", function () {
  leftMotorValue.innerHTML = leftMotor.value;
  motion.left = leftMotor.value;
  motion.timestamp = Date.now();
  if (!throttle || (motion.right == 0 && motion.left == 0)) {
    sendData();
  }
});

rightMotor.addEventListener("input", function () {
  rightMotorValue.innerHTML = rightMotor.value;
  motion.right = rightMotor.value;
  motion.timestamp = Date.now();
  if (!throttle || (motion.right == 0 && motion.left == 0)) {
    sendData();
  }
});

function sendData() {
  console.log(motion);
  socket.emit("simplified", motion);
  throttle = true;
  setTimeout(() => {
    throttle = false;
  }, 50);
}

setInterval(() => {
  if (leftMotor.value != 0) {
    if (leftMotor.value <= 0) {
      leftMotor.value -= -1;
    } else {
      leftMotor.value -= 1;
    }
    motion.left = leftMotor.value;
    motion.timestamp = Date.now();
    leftMotorValue.innerHTML = leftMotor.value;
    if (!throttle || (motion.right == 0 && motion.left == 0)) {
      sendData();
    }
  }
}, 20);

setInterval(() => {
  if (rightMotor.value != 0) {
    if (rightMotor.value <= 0) {
      rightMotor.value -= -1;
    } else {
      rightMotor.value -= 1;
    }
    motion.right = rightMotor.value;
    motion.timestamp = Date.now();
    rightMotorValue.innerHTML = rightMotor.value;
    if (!throttle || (motion.right == 0 && motion.left == 0)) {
      sendData();
    }
  }
}, 20);
