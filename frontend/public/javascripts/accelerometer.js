const gyroSupported = document.getElementById("gyro-supported");
const info = document.getElementById("info");
const count = document.getElementById("count");

const socket = io();
const accelerometer = new Accelerometer({ frequency: 10 });

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

    socket.emit("accelerometer", {
      x: Math.round(accelerometer.x),
      y: Math.round(accelerometer.y),
      z: Math.round(accelerometer.z),
      timestamp: Math.round(Date.now()),
    });
  }
});

accelerometer.start();
setTimeout(() => {
  accelerometer.stop();
  socket.emit("accelerometer", {
    x: 0,
    y: 0,
    z: 10,
    timestamp: Date.now(),
  });
  info.innerHTML = "Disabled\n";
}, 10 * 1000);
