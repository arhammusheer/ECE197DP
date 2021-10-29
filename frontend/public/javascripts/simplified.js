const leftMotor = document.getElementById("left-motor");
const rightMotor = document.getElementById("right-motor");

const leftMotorValue = document.getElementById("left-motor-value");
const rightMotorValue = document.getElementById("right-motor-value");

const socket = io({
  path: "/ece197dp",
});

let throttle = false;
let interval = null;

let touchSupport = "ontouchstart" in document.documentElement;
let active = false;
let stopValueSent = false;

if (touchSupport) {
  window.addEventListener("touchstart", (e) => {
    active = true;
  });
  window.addEventListener("touchend", (e) => {
    active = false;
  });
} else {
  window.addEventListener("mousedown", (e) => {
    active = true;
  });
  window.addEventListener("mouseup", (e) => {
    active = false;
  });
}

let motion = {
  left: 0,
  right: 0,
  timestamp: 0,
};

leftMotor.addEventListener("input", function () {
  setLeftMotor(leftMotor.value);
  if (!throttle || (motion.right == 0 && motion.left == 0)) {
    sendData();
  }
});

rightMotor.addEventListener("input", function () {
  setRightMotor(rightMotor.value);
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

interval = setInterval(() => {
  if (!active) {
    if (leftMotor.value != 0) {
			stopValueSent = false;
      if (motion.left <= 0) {
        setLeftMotor(motion.left + 1);
      } else {
        setLeftMotor(motion.left - 1);
      }

      leftMotorValue.innerHTML = motion.left;
    }

    if (rightMotor.value != 0) {
			stopValueSent = false;
      if (rightMotor.value <= 0) {
        setRightMotor(motion.right + 1);
      } else {
        setRightMotor(motion.right - 1);
      }
      rightMotorValue.innerHTML = motion.right;
    }
    motion.timestamp = Date.now();
    if (!throttle && !stopValueSent) {
      sendData();
      if (motion.left == 0 && motion.right == 0) {
        stopValueSent = true;
      }
      throttle = true;
    }
  }
}, 20);

function setLeftMotor(value) {
  value = parseInt(value);
  leftMotor.value = value;
  leftMotorValue.innerHTML = value;
  motion.left = value;
  motion.timestamp = Date.now();
}

function setRightMotor(value) {
  value = parseInt(value);
  rightMotor.value = value;
  rightMotorValue.innerHTML = value;
  motion.right = value;
  motion.timestamp = Date.now();
}
