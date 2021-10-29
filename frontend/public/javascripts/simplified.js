const leftMotor = document.getElementById("left-motor");
const rightMotor = document.getElementById("right-motor");

const leftMotorValue = document.getElementById("left-motor-value");
const rightMotorValue = document.getElementById("right-motor-value");

leftMotor.addEventListener("input", function () {
  leftMotorValue.innerHTML = leftMotor.value;
});

rightMotor.addEventListener("input", function () {
  rightMotorValue.innerHTML = rightMotor.value;
});
