document.getElementById("fib-btn").addEventListener("click", () => {
  const n = parseInt(document.getElementById("fib-input").value);
  const resultEl = document.getElementById("fib-result");
  if (!n || n <= 0) { resultEl.textContent = "Enter a positive number!"; return; }

  let fib = [0, 1];
  for(let i=2; i<n; i++) {
    fib[i] = fib[i-1] + fib[i-2];
  }
  resultEl.textContent = `First ${n} Fibonacci numbers: ${fib.slice(0,n).join(', ')}`;
});

const canvas = document.getElementById('fib-canvas');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
let fibNumbers = [];
let currentStep = 0;
let direction = 0; // 0=right,1=down,2=left,3=up
let x = centerX;
let y = centerY;
let speed = 5;
const scale = 10;

// Generate Fibonacci numbers
function generateFibonacci(n) {
  let fib = [1,1];
  for(let i=2; i<n; i++){
    fib[i] = fib[i-1] + fib[i-2];
  }
  return fib.slice(0,n);
}

// Interpolate color along gradient (yellow to red)
function getColor(step, total) {
  const r = Math.floor(255 * (step / total));
  const g = Math.floor(215 * (1 - step / total));
  const b = 0;
  return `rgb(${r},${g},${b})`;
}

// Draw smooth arc for current step
function drawStep() {
  if(currentStep >= fibNumbers.length) return;

  const size = fibNumbers[currentStep] * scale;
  ctx.strokeStyle = getColor(currentStep, fibNumbers.length);
  ctx.lineWidth = 2;
  ctx.beginPath();

  // Draw small segments along the arc for smooth animation
  const segments = 50; // number of segments per square
  for(let i=0; i<segments; i++){
    const t = i/segments;
    let angleStart, angleEnd;
    let radius = size;
    switch(direction){
      case 0: angleStart = 1.5*Math.PI + t*0.5*Math.PI; angleEnd = angleStart; break;
      case 1: angleStart = 0 + t*0.5*Math.PI; angleEnd = angleStart; break;
      case 2: angleStart = 0.5*Math.PI + t*0.5*Math.PI; angleEnd = angleStart; break;
      case 3: angleStart = Math.PI + t*0.5*Math.PI; angleEnd = angleStart; break;
    }
    const px = x + radius*Math.cos(angleEnd);
    const py = y + radius*Math.sin(angleEnd);
    if(i===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
  }
  ctx.stroke();

  // Move x,y for next square
  switch(direction){
    case 0: x += size; y -= size; break;
    case 1: x += size; y += size; break;
    case 2: x -= size; y += size; break;
    case 3: x -= size; y -= size; break;
  }
  direction = (direction + 1) % 4;
  currentStep++;

  setTimeout(()=>requestAnimationFrame(()=>drawStep()), 50 / speed);
}

// Button click event
document.getElementById("fib-animation-btn").addEventListener("click", ()=>{
  const n = parseInt(document.getElementById("fib-animation-input").value);
  if(!n || n<1 || n>20){
    alert("Enter a number between 1 and 20!");
    return;
  }
  fibNumbers = generateFibonacci(n);

  currentStep = 0;
  direction = 0;
  x = centerX;
  y = centerY;
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // Get speed from slider
  speed = parseInt(document.getElementById("speed-slider").value);

  drawStep();
});
