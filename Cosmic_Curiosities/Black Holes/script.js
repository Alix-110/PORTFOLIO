const canvas = document.getElementById("bhCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 300;

let particles = [];
for(let i=0;i<120;i++){
  particles.push({
    angle: Math.random()*2*Math.PI,
    radius: 30 + Math.random()*130,
    speed: 0.01 + Math.random()*0.03,
    size: 2 + Math.random()*2
  });
}

function drawParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const cx = canvas.width/2;
  const cy = canvas.height/2;

  // Black hole center
  ctx.beginPath();
  ctx.arc(cx,cy,20,0,2*Math.PI);
  ctx.fillStyle = '#000';
  ctx.fill();

  // Particles orbit
  particles.forEach(p=>{
    p.angle += p.speed;
    const x = cx + Math.cos(p.angle)*p.radius;
    const y = cy + Math.sin(p.angle)*p.radius;
    ctx.beginPath();
    ctx.arc(x,y,p.size,0,2*Math.PI);
    ctx.fillStyle = '#e0e0e0';
    ctx.fill();
  });

  requestAnimationFrame(drawParticles);
}

document.getElementById('startSim').onclick = ()=>{
  drawParticles();
};
