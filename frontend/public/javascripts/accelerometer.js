const gyroSupported = document.getElementById("gyro-supported");
const info = document.getElementById("info");
const count = document.getElementById("count");
const arrow = document.getElementById("arrow");

const socket = io({
  path: "/ece197dp",
});

socket.on("accelerometer", (data) => {
  console.log(data);
});

const accelerometer = new Accelerometer({ frequency: 100 });

accelerometer.addEventListener("activate", (e) => {
  info.innerHTML = JSON.stringify(e);
});

let x = 0;
let y = 0;
let counter = 0;

accelerometer.addEventListener("reading", (e) => {
  counter += 1;
  count.innerHTML = counter;
  console.log(e);
  gyroSupported.innerHTML = `
		<div class="m-1">
			<p>
				<strong>x:</strong> ${Math.round(accelerometer.x)}
			</p>
			<p>
				<strong>y:</strong> ${Math.round(accelerometer.y)}
			</p>
			<p>
				<strong>timestamp:</strong> ${Math.round(Date.now())}
			</p>
		</div>
	`;
  if (x != Math.round(accelerometer.x) || y != Math.round(accelerometer.y)) {
    x = Math.round(accelerometer.x);
    y = Math.round(accelerometer.y);

    if (x == 0 && y == 0) {
      showStop();
      socket.emit("simplified", {
        left: 0,
        right: 0,
        timestamp: Date.now(),
      });
    } else {
      hideStop();

      let temp_x = -1 * x;
      let temp_y = -1 * y;
      let direction = Math.atan(temp_y / temp_x);

      if (temp_x < 0) {
        direction += Math.PI; // For arrow
      } else if (temp_y < 0) {
        direction += 2 * Math.PI;
      }
      info.innerHTML = `
      direction: ${direction}
      <br>
      `;

      arrow.style.transform = `rotate(${-direction}rad)`;

      move(x, y);
    }
  }
});

accelerometer.start();

const hideStop = () => {
  document.getElementById("stop-sign").style.display = "none";
  document.getElementById("arrow").style.display = "block";
};

const showStop = () => {
  document.getElementById("stop-sign").style.display = "block";
  document.getElementById("arrow").style.display = "none";
};

function move(x, y) {
  x = -1 * x;
  y = -1 * y;

  if (x < 1 && x > -1) x = 0;
  if (y < 1 && y > -1) y = 0;

  if (y > 10) y = 10;
  if (y < -10) y = -10;

  if (x > 10) x = 10;
  if (x < -10) x = -10;

  let left = 0;
  let right = 0;

  let mag = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  if (mag < -10) mag = -10;
  if (mag > 10) mag = 10;

  if (x == 0) {
    // Forward and backward
    left = Math.round(y * 10);
    right = Math.round(y * 10);
  }
  if (y == 0) {
    // Full left and right
    if (x > 0) {
      // Right
      left = Math.round(x * 10);
      right = 0;
    }
    if (x < 0) {
      // Left
      left = 0;
      right = Math.round(x * 10);
    }
  }
  if (x > 0 && y > 0) {
    // Forward right
    left = Math.round(mag * 10);
    right = Math.round(y * 10);
  }
  if (x > 0 && y < 0) {
    // Backward right
    if (mag > 10) mag = 10;
    if (mag < -10) mag = -10;
    left = -1 * Math.round(mag * 10);
    right = Math.round(y * 10);
  }
  if (x < 0 && y > 0) {
    // Forward left
    right = Math.round(mag * 10);
    left = Math.round(y * 10);
  }
  if (x < 0 && y < 0) {
    // Backward left
    right = -1 * Math.round(mag * 10);
    left = Math.round(y * 10);
  }
  socket.emit("simplified", {
    left: left,
    right: right,
    timestamp: Date.now(),
  });
}
