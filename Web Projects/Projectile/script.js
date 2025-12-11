const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let animationId;
let time = 0;
let dt = 0.05; // time increment

function launch() {
  cancelAnimationFrame(animationId);
  time = 0;

  const v = parseFloat(document.getElementById("velocity").value);
  const angle = parseFloat(document.getElementById("angle").value) * Math.PI/180;
  const g = parseFloat(document.getElementById("gravity").value);

  const vx = v * Math.cos(angle);
  const vy = v * Math.sin(angle);

  function draw() {
    const x = vx * time;
    const y = vy * time - 0.5 * g * time * time;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Draw ground
    ctx.fillStyle = "#888";
    ctx.fillRect(0, canvas.height-10, canvas.width, 10);

    // Draw projectile
    ctx.beginPath();
    ctx.arc(x, canvas.height -10 - y, 10, 0, Math.PI*2);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.closePath();

    time += dt;

    if(canvas.height-10 - y < canvas.height) {
      animationId = requestAnimationFrame(draw);
    }
  }

  draw();
}

function resetCanvas() {
  cancelAnimationFrame(animationId);
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // Draw ground
  ctx.fillStyle = "#888";
  ctx.fillRect(0, canvas.height-10, canvas.width, 10);
}

// Initial ground
resetCanvas();
