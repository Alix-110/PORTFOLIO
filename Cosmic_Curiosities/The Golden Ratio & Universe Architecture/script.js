/* golden.js
   Controls:
   - spiralCanvas: draws golden rectangles + spiral smoothly
   - convergeChart: shows ratios of Fibonacci(n)/Fibonacci(n-1) converging to phi
*/

// Utilities
function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }

// ---- Spiral animation ----
const spiralCanvas = document.getElementById('spiralCanvas');
const sctx = spiralCanvas.getContext('2d');
const sW = spiralCanvas.width;
const sH = spiralCanvas.height;
const center = { x: sW/2, y: sH/2 };

let spiralAnim = { running:false, req:null, iter:8, scale:12, speed:8, step:0, rects:[] };

function genGoldenRects(n){
  // make a list of rectangles (x,y,w,h, orientation)
  // start with a square centered and keep adding rectangles outward
  const rects = [];
  // We'll start from a central square of size base
  const base = 10;
  let w = base, h = base;
  // We'll store scale-independent sizes, then multiply by scale
  // Build Fibonacci-like sizes for rectangle sides (use successive sums)
  let sizes = [1,1];
  for(let i=2;i<n;i++) sizes[i] = sizes[i-1] + sizes[i-2];
  // We'll position rectangles iteratively around a growing bounding box
  // Represent rectangles as {x,y,w,h,dir} where dir=0 right,1 down,2 left,3 up (where next rectangle attaches)
  // We'll center initial square
  let cx = center.x, cy = center.y;
  // To simplify, compute cumulative bounding and positions:
  // Start with first square placed with top-left at (cx - base/2, cy - base/2)
  let x = cx - w/2, y = cy - h/2;
  let dir = 0;
  rects.push({x:x, y:y, w:w, h:h, dir:dir});
  // For each next size, add rectangle adjacent to existing bounding box
  // We'll use sizes array to determine width/height multiples; sizes are >0
  // Keep a bounding box
  let minX = x, minY = y, maxX = x + w, maxY = y + h;
  for(let i=1;i<n;i++){
    const s = sizes[i] * 1; // base multiplier, scale later
    // determine placement based on dir
    if(dir === 0){
      // place to the right: x = maxX, y = cy - s*base/2
      const nw = s * base; const nh = s * base;
      const nx = maxX;
      const ny = cy - nh/2;
      rects.push({x:nx, y:ny, w:nw, h:nh, dir:dir});
      maxX = nx + nw;
    } else if(dir === 1){
      const nw = s * base; const nh = s * base;
      const nx = cx - nw/2;
      const ny = maxY;
      rects.push({x:nx, y:ny, w:nw, h:nh, dir:dir});
      maxY = ny + nh;
    } else if(dir === 2){
      const nw = s * base; const nh = s * base;
      const nx = minX - nw;
      const ny = cy - nh/2;
      rects.push({x:nx, y:ny, w:nw, h:nh, dir:dir});
      minX = nx;
    } else {
      const nw = s * base; const nh = s * base;
      const nx = cx - nw/2;
      const ny = minY - nh;
      rects.push({x:nx, y:ny, w:nw, h:nh, dir:dir});
      minY = ny;
    }
    // rotate dir
    dir = (dir + 1) % 4;
    // update cx,cy roughly to center bounding box
    cx = (minX + maxX)/2; cy = (minY + maxY)/2;
  }

  return rects;
}

// Better approach: generate canonical golden rectangles using iterative algorithm
function genGoldenRects2(n, scaleFactor){
  // Generate rectangles starting from a central square sized scaleFactor * 1
  const rects = [];
  // Fibonacci-like lengths:
  const fib = [1,1];
  for(let i=2;i<n;i++) fib[i] = fib[i-1] + fib[i-2];
  // Start from center with a square of side fib[n-1]
  // But more intuitive: start with square of size fib[n-1] and build inward... to ensure fit
  // We'll construct rectangles outward by simulating adding rectangles around previous bounding
  const base = scaleFactor;
  // We'll maintain bounding box anchored at center
  let minX = center.x - base * fib[0] / 2;
  let minY = center.y - base * fib[0] / 2;
  let maxX = center.x + base * fib[0] / 2;
  let maxY = center.y + base * fib[0] / 2;
  // first square
  rects.push({x:minX, y:minY, w:base*fib[0], h:base*fib[0], dir:0});
  let dir = 0;
  for(let i=1;i<n;i++){
    const sizePx = base * fib[i];
    if(dir===0){
      const x = maxX; const y = center.y - sizePx/2;
      rects.push({x,y,w:sizePx,h:sizePx,dir});
      maxX = x + sizePx;
    } else if(dir===1){
      const x = center.x - sizePx/2; const y = maxY;
      rects.push({x,y,w:sizePx,h:sizePx,dir});
      maxY = y + sizePx;
    } else if(dir===2){
      const x = minX - sizePx; const y = center.y - sizePx/2;
      rects.push({x,y,w:sizePx,h:sizePx,dir});
      minX = x;
    } else {
      const x = center.x - sizePx/2; const y = minY - sizePx;
      rects.push({x,y,w:sizePx,h:sizePx,dir});
      minY = y;
    }
    dir = (dir + 1) % 4;
  }
  return rects;
}

// Draw an animated spiral over the rectangles
function drawSpiralFrame(rects, progress){
  // progress: 0..1 overall progress of drawing
  sctx.clearRect(0,0,sW,sH);

  // subtle grid
  sctx.save();
  sctx.globalAlpha = 0.08;
  sctx.strokeStyle = '#8fbfdfff';
  for(let gx=0; gx<sW; gx+=40){ sctx.beginPath(); sctx.moveTo(gx,0); sctx.lineTo(gx,sH); sctx.stroke(); }
  for(let gy=0; gy<sH; gy+=40){ sctx.beginPath(); sctx.moveTo(0,gy); sctx.lineTo(sW,gy); sctx.stroke(); }
  sctx.restore();

  // draw rectangles up to current index
  const total = rects.length;
  const upto = Math.floor(progress * total);
  for(let i=0;i<upto;i++){
    const r = rects[i];
    sctx.strokeStyle = `rgba(0,180,255,${0.12 + 0.7*(i/total)})`;
    sctx.lineWidth = 1.2;
    sctx.strokeRect(r.x, r.y, r.w, r.h);
  }

  // draw spiral smoothly: approximate by many small arc segments across rectangles
  // We'll compute arcs per rect: each rect contributes a quarter-circle along its inner corner
  let drawn = progress * total;
  // for each rect index, draw fractional quarter arc
  for(let i=0;i<total;i++){
    const r = rects[i];
    const fraction = clamp(progress * total - i, 0, 1); // 0..1 fraction for this segment
    // determine arc center and angles depending on dir
    let cx, cy, radius, startAngle, endAngle;
    // quarter circle radius = min(r.w, r.h)
    radius = Math.min(r.w, r.h);
    // compute center and angles by dir (matching rectangle placement)
    // (we assume each rect is square here)
    if(r.dir === 0){ // right: arc center at r.x, r.y + r.h
      cx = r.x; cy = r.y + r.h; startAngle = Math.PI * 1.5; endAngle = Math.PI * 2;
    } else if(r.dir === 1){ // down: center at r.x, r.y
      cx = r.x; cy = r.y; startAngle = 0; endAngle = Math.PI * 0.5;
    } else if(r.dir === 2){ // left: center at r.x + r.w, r.y
      cx = r.x + r.w; cy = r.y; startAngle = Math.PI * 0.5; endAngle = Math.PI;
    } else { // up: center at r.x + r.w, r.y + r.h
      cx = r.x + r.w; cy = r.y + r.h; startAngle = Math.PI; endAngle = Math.PI * 1.5;
    }
    const angleSpan = endAngle - startAngle;
    const drawTo = startAngle + angleSpan * fraction;
    sctx.beginPath();
    // draw arc from startAngle to drawTo
    sctx.strokeStyle = `rgba(${Math.floor(255*(i/total))},${200},${50},0.95)`;
    sctx.lineWidth = 2;
    sctx.arc(cx, cy, radius, startAngle, drawTo);
    sctx.stroke();
  }
}

// Animation driver
function startSpiralAnimation(){
  const itInput = document.getElementById('iterations');
  const scaleInput = document.getElementById('scaleFactor');
  const speedInput = document.getElementById('speed');
  const n = clamp(parseInt(itInput.value)||8, 1, 18);
  const scaleFactor = clamp(parseInt(scaleInput.value)||12, 4, 28);
  const speedVal = clamp(parseInt(speedInput.value)||8, 1, 20);

  spiralAnim.iter = n;
  spiralAnim.scale = scaleFactor;
  spiralAnim.speed = speedVal;
  spiralAnim.rects = genGoldenRects2(n, scaleFactor);
  spiralAnim.running = true;
  spiralAnim.startT = performance.now();
  spiralAnim.duration = 1800 + (n*200); // ms total, grows with n
  spiralAnim.req && cancelAnimationFrame(spiralAnim.req);

  function stepFrame(now){
    if(!spiralAnim.running) return;
    const elapsed = now - spiralAnim.startT;
    const prog = clamp(elapsed / spiralAnim.duration, 0, 1);
    drawSpiralFrame(spiralAnim.rects, prog);
    if(prog < 1) spiralAnim.req = requestAnimationFrame(stepFrame);
    else { spiralAnim.running = false; }
  }
  spiralAnim.req = requestAnimationFrame(stepFrame);
}

function stopSpiralAnimation(){
  spiralAnim.running = false;
  if(spiralAnim.req) cancelAnimationFrame(spiralAnim.req);
}

// Buttons
document.getElementById('startSpiral').addEventListener('click', startSpiralAnimation);
document.getElementById('stopSpiral').addEventListener('click', stopSpiralAnimation);
document.getElementById('resetSpiral').addEventListener('click', ()=>{
  stopSpiralAnimation();
  sctx.clearRect(0,0,sW,sH);
});

// ---- Fibonacci -> phi convergence demo ----
const phi = (1 + Math.sqrt(5)) / 2;
const fibStartBtn = document.getElementById('startConverge');
const fibTermsInput = document.getElementById('fibTerms');
const convergeOutput = document.getElementById('convergeOutput');
const convergeCanvas = document.getElementById('convergeChart');
const cctx = convergeCanvas.getContext('2d');

function genFib(n){
  const f = [1,1];
  for(let i=2;i<n;i++) f[i] = f[i-1] + f[i-2];
  return f;
}

function drawConvergenceChart(ratios){
  // clear
  cctx.clearRect(0,0,convergeCanvas.width,convergeCanvas.height);
  // background grid
  cctx.save();
  cctx.strokeStyle = 'rgba(255,255,255,0.04)';
  cctx.lineWidth = 1;
  for(let y=0;y<convergeCanvas.height;y+=20){
    cctx.beginPath(); cctx.moveTo(0,y); cctx.lineTo(convergeCanvas.width,y); cctx.stroke();
  }
  cctx.restore();

  if(ratios.length < 2) return;
  // map ratios to chart coordinates
  const pad = 20;
  const w = convergeCanvas.width - pad*2;
  const h = convergeCanvas.height - pad*2;
  const min = Math.min(...ratios, phi - 0.1);
  const max = Math.max(...ratios, phi + 0.1);
  // draw line
  cctx.beginPath();
  for(let i=0;i<ratios.length;i++){
    const x = pad + (i/(ratios.length-1)) * w;
    const y = pad + (1 - (ratios[i]-min)/(max-min)) * h;
    if(i===0) cctx.moveTo(x,y); else cctx.lineTo(x,y);
  }
  cctx.strokeStyle = '#00d2ff';
  cctx.lineWidth = 2.2;
  cctx.stroke();

  // draw phi line
  const phiY = pad + (1 - (phi - min)/(max-min)) * h;
  cctx.beginPath(); cctx.moveTo(pad, phiY); cctx.lineTo(pad+w, phiY);
  cctx.strokeStyle = 'rgba(255,215,0,0.6)'; cctx.lineWidth = 1;
  cctx.setLineDash([4,4]); cctx.stroke(); cctx.setLineDash([]);
  // label phi
  cctx.fillStyle = '#ffd700'; cctx.font = '12px IBM Plex Sans';
  cctx.fillText('φ ≈ ' + phi.toFixed(6), pad+6, phiY - 8);
}

function runConverge(){
  const n = clamp(parseInt(fibTermsInput.value)||12, 3, 25);
  const animate = document.getElementById('animateConverge').checked;
  const f = genFib(n);
  const ratios = [];
  for(let i=1;i<f.length;i++){
    ratios.push(f[i]/f[i-1]);
  }
  // show list
  convergeOutput.innerHTML = '<strong>Ratios (F[n]/F[n-1]):</strong><ol>' + ratios.map(r => `<li>${r.toFixed(8)}</li>`).join('') + '</ol>';
  // draw chart
  drawConvergenceChart(ratios);

  if(animate){
    // animate highlighting each ratio over time
    let idx = 0;
    const interval = 700;
    const timer = setInterval(()=>{
      if(idx >= ratios.length){ clearInterval(timer); return; }
      // flash the current ratio in output
      const items = convergeOutput.querySelectorAll('li');
      items.forEach((li,i)=> li.style.background = i===idx ? 'rgba(0,211,255,0.08)' : 'transparent');
      // small pulse on chart: draw a circle
      const pad = 20; const w = convergeCanvas.width - pad*2; const h = convergeCanvas.height - pad*2;
      const min = Math.min(...ratios, phi - 0.1);
      const max = Math.max(...ratios, phi + 0.1);
      const x = pad + (idx/(ratios.length-1)) * w;
      const y = pad + (1 - (ratios[idx]-min)/(max-min)) * h;
      // draw pulsing dot
      let pulse = 0;
      const pFrames = 18;
      const pulseAnim = setInterval(()=>{
        cctx.beginPath();
        cctx.fillStyle = `rgba(0,211,255,${0.15 + 0.6*(1 - pulse/pFrames)})`;
        cctx.arc(x,y,6 + pulse*0.5,0,Math.PI*2); cctx.fill();
        pulse++;
        if(pulse>pFrames) clearInterval(pulseAnim);
      }, 20);
      idx++;
    }, interval);
  }
}

document.getElementById('startConverge').addEventListener('click', runConverge);

// initialize small demos
drawConvergenceChart([1.5, 1.66666667, 1.6, 1.625, 1.61538462, 1.619047619]);
