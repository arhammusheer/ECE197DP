const gyroSupported = document.getElementById("gyro-supported");
const socket = io();
const accelerometer = new Accelerometer({ frequency: 10 });

accelerometer.addEventListener("reading", (e) => {
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
				<strong>timestamp:</strong> ${Math.round(accelerometer.timestamp)}
			</p>
		</div>
	`;

  socket.emit("accelerometer", {
    x: Math.round(accelerometer.x),
    y: Math.round(accelerometer.y),
    z: Math.round(accelerometer.z),
    timestamp: Math.round(accelerometer.timestamp),
  });
});

accelerometer.start();
