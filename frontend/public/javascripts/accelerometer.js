const gyroSupported = document.getElementById("gyro-supported");
const info = document.getElementById("info");
const count = document.getElementById("count");
const arrow = document.getElementById("arrow");

const socket = io();
const accelerometer = new Accelerometer({ frequency: 100 });

accelerometer.addEventListener("activate", (e) => {
  info.innerHTML = JSON.stringify(e);
});

let x = 0;
let y = 0;
let z = 0;
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
				<strong>z:</strong> ${Math.round(accelerometer.z)}
			</p>
			<p>
				<strong>timestamp:</strong> ${Math.round(Date.now())}
			</p>
		</div>
	`;
  if (
    x != Math.round(accelerometer.x) ||
    y != Math.round(accelerometer.y) ||
    z != Math.round(accelerometer.z)
  ) {
    x = Math.round(accelerometer.x);
    y = Math.round(accelerometer.y);
    z = Math.round(accelerometer.z);

    if (x == 0 && y == 0) {
      showStop();
    } else {
      hideStop();

      let temp_x = -1 * x;
      let temp_y = -1 * y;
      let direction = Math.atan(temp_y / temp_x);
      if (temp_x < 0) {
        direction += Math.PI;
      } else if (temp_y < 0) {
        direction += 2 * Math.PI;
      }
      info.innerHTML = `
      direction: ${direction}
      <br>
      `;

      arrow.style.transform = `rotate(${-direction}rad)`;
    }

    socket.emit("accelerometer", {
      x: Math.round(accelerometer.x),
      y: Math.round(accelerometer.y),
      z: Math.round(accelerometer.z),
      timestamp: Math.round(Date.now()),
    });
  }
});

accelerometer.start();
// setTimeout(() => {
//   accelerometer.stop();
//   socket.emit("accelerometer", {
//     x: 0,
//     y: 0,
//     z: 10,
//     timestamp: Date.now(),
//   });
//   info.innerHTML = "Disabled\n";
// }, 10 * 1000);

const hideStop = () => {
  document.getElementById("stop-sign").style.display = "none";
  document.getElementById("arrow").style.display = "block";
};

const showStop = () => {
  document.getElementById("stop-sign").style.display = "block";
  document.getElementById("arrow").style.display = "none";
};
