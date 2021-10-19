const gyroSupported = document.getElementById("gyro-supported");

const accelerometer = new Accelerometer({ frequency: 60 });

accelerometer.addEventListener("reading", (e) => {
  console.log(e);
  gyroSupported.innerHTML = `
		<div class="m-1">
			<p>
				<strong>x:</strong> ${accelerometer.x}
			</p>
			<p>
				<strong>y:</strong> ${accelerometer.y}
			</p>
			<p>
				<strong>z:</strong> ${accelerometer.z}
			</p>
			<p>
				<strong>timestamp:</strong> ${accelerometer.timestamp}
			</p>
		</div>
	`;
});

accelerometer.start();
