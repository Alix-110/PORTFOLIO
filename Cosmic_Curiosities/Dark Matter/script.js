/* script.js
   Interactive behavior for Dark Matter page:
   - Rotation curve demo
   - Rotating galaxy visualization
   - Cosmic web visual
*/

/* small util */
function clamp(v,a,b){ return Math.max(a, Math.min(b, v)); }

/* ROTATION CURVE + GALAXY */
(function(){
  const rotCanvas = document.getElementById('rotationCanvas');
  const gCanvas = document.getElementById('galaxyCanvas');
  if(!rotCanvas || !gCanvas) return;

  const ctxR = rotCanvas.getContext('2d');
  const ctxG = gCanvas.getContext('2d');
  const widthR = rotCanvas.width, heightR = rotCanvas.height;
  const widthG = gCanvas.width, heightG = gCanvas.height;

  let haloMass = parseFloat(document.getElementById('haloMass').value || 1);

  function visibleVelocity(r){
    return Math.sqrt( (r*r) / (r*r + 0.6*0.6) ) * 180;
  }
  function haloVelocity(r, mass){
    const rc = 4;
    return Math.sqrt(mass) * 80 * (1 - Math.exp(-r/rc));
  }

  function drawRotation(mass){
    ctxR.clearRect(0,0,widthR,heightR);
    ctxR.strokeStyle = 'rgba(255,255,255,0.08)';
    ctxR.beginPath(); ctxR.moveTo(40,20); ctxR.lineTo(40,heightR-30); ctxR.lineTo(widthR-20,heightR-30); ctxR.stroke();

    const maxR = 20;
    const points = 100;
    const vxVis = [], vxTot = [];
    for(let i=0;i<=points;i++){
      const r = (i/points) * maxR;
      vxVis.push(visibleVelocity(r));
      vxTot.push(Math.sqrt(visibleVelocity(r)*visibleVelocity(r) + haloVelocity(r,mass)*haloVelocity(r,mass)));
    }

    const x0 = 40, y0 = heightR-30, xScale = (widthR - 80)/points, yScale = 0.9;
    ctxR.beginPath(); ctxR.strokeStyle = '#4fa9ff'; ctxR.lineWidth = 2;
    for(let i=0;i<=points;i++){
      const x = x0 + i * xScale;
      const y = y0 - vxVis[i] * ( (heightR-80)/300 ) * yScale;
      if(i===0) ctxR.moveTo(x,y); else ctxR.lineTo(x,y);
    }
    ctxR.stroke();

    ctxR.beginPath(); ctxR.strokeStyle = '#ffd24d'; ctxR.lineWidth = 2.5;
    for(let i=0;i<=points;i++){
      const x = x0 + i * xScale;
      const y = y0 - vxTot[i] * ( (heightR-80)/300 ) * yScale;
      if(i===0) ctxR.moveTo(x,y); else ctxR.lineTo(x,y);
    }
    ctxR.stroke();

    ctxR.fillStyle = '#9cd2ff'; ctxR.font = '12px sans-serif';
    ctxR.fillText('Radius (kpc) →', widthR/2, heightR-8);
    ctxR.fillText('V (km/s)', 6, 28);
    ctxR.fillStyle = '#4fa9ff'; ctxR.fillRect(widthR-140, 24, 10, 6); ctxR.fillStyle='#cfeaff'; ctxR.fillText('Visible mass', widthR-120, 30);
    ctxR.fillStyle = '#ffd24d'; ctxR.fillRect(widthR-140, 44, 10, 6); ctxR.fillStyle='#f7e5c0'; ctxR.fillText('With dark halo', widthR-120, 50);
  }

  // galaxy visual
  const stars = [];
  const Nstars = 280;
  for(let i=0;i<Nstars;i++){
    const a = Math.random()*Math.PI*2;
    const r = Math.pow(Math.random(), 0.9) * 140;
    stars.push({a,r,angSpeed:0.0008 + 0.001*Math.random(), size:1 + Math.random()*1.6});
  }
  let gAng = 0;
  function drawGalaxy(){
    ctxG.clearRect(0,0,widthG,heightG);
    const grd = ctxG.createRadialGradient(widthG/2, heightG/2, 10, widthG/2, heightG/2, 220);
    grd.addColorStop(0, 'rgba(255,210,120,0.05)');
    grd.addColorStop(1, 'rgba(0,30,60,0.0)');
    ctxG.fillStyle = grd; ctxG.fillRect(0,0,widthG,heightG);

    const halo = parseFloat(document.getElementById('haloMass').value || 1);

    for(let i=0;i<stars.length;i++){
      const st = stars[i];
      const speedFactor = 0.0006 + 0.0008 * clamp(halo,0,5);
      const ang = st.a + gAng * (1 + st.r/200 * clamp(halo,0,5));
      const x = widthG/2 + Math.cos(ang) * st.r;
      const y = heightG/2 + Math.sin(ang) * st.r * 0.9;
      ctxG.fillStyle = 'rgba(255,255,255,0.9)';
      ctxG.beginPath(); ctxG.arc(x,y,st.size,0,Math.PI*2); ctxG.fill();
    }
    ctxG.strokeStyle = 'rgba(200,230,255,0.06)'; ctxG.lineWidth = 2;
    ctxG.beginPath(); ctxG.arc(widthG/2, heightG/2, 160, 0, Math.PI*2); ctxG.stroke();

    gAng += 0.002 + 0.001 * clamp(halo,0,5);
    requestAnimationFrame(drawGalaxy);
  }

  document.getElementById('runRotation').addEventListener('click', ()=>{
    haloMass = parseFloat(document.getElementById('haloMass').value);
    document.getElementById('haloMassLabel').textContent = haloMass.toFixed(1);
    drawRotation(haloMass);
  });

  drawRotation(haloMass);
  drawGalaxy();
})();

/* COSMIC WEB (visual) */
(function(){
  const webCanvas = document.getElementById('webCanvas');
  if(!webCanvas) return;
  const ctx = webCanvas.getContext('2d');
  const W = webCanvas.width, H = webCanvas.height;
  let nodes = [];
  let links = [];
  let running = false;
  const densityControl = document.getElementById('webDensity');

  function initWeb(){
    nodes = []; links = [];
    const n = Math.floor(80 * parseFloat(densityControl.value));
    for(let i=0;i<n;i++){
      nodes.push({ x: Math.random()*W, y: Math.random()*H, vx: (Math.random()-0.5)*0.3, vy: (Math.random()-0.5)*0.3, mass: 1 + Math.random()*2 });
    }
    for(let i=0;i<n;i++){
      for(let j=i+1;j<n;j++){
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const d2 = dx*dx + dy*dy;
        if(d2 < (120*120) && Math.random() < 0.08) links.push([i,j]);
      }
    }
  }

  function stepWeb(){
    ctx.clearRect(0,0,W,H);
    const grd = ctx.createLinearGradient(0,0,W,H);
    grd.addColorStop(0,'rgba(0,10,30,0.2)'); grd.addColorStop(1,'rgba(0,0,10,0.15)');
    ctx.fillStyle = grd; ctx.fillRect(0,0,W,H);

    ctx.strokeStyle = 'rgba(100,180,255,0.12)'; ctx.lineWidth = 1;
    for(let k=0;k<links.length;k++){
      const a = nodes[links[k][0]], b = nodes[links[k][1]];
      ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
    }

    for(let i=0;i<nodes.length;i++){
      const n = nodes[i];
      n.x += n.vx; n.y += n.vy;
      if(n.x < 0 || n.x > W) n.vx *= -1;
      if(n.y < 0 || n.y > H) n.vy *= -1;
      ctx.beginPath();
      ctx.fillStyle = 'rgba(180,230,255,0.9)'; ctx.arc(n.x,n.y,1.6,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.fillStyle = 'rgba(60,140,255,0.06)'; ctx.arc(n.x,n.y,6,0,Math.PI*2); ctx.fill();
    }
    if(running) requestAnimationFrame(stepWeb);
  }

  document.getElementById('startWeb').addEventListener('click', ()=>{
    initWeb(); running = true; stepWeb();
  });
  document.getElementById('stopWeb').addEventListener('click', ()=>{ running = false; });
  document.getElementById('webDensity').addEventListener('input', ()=>{ if(running) initWeb(); });

  initWeb();
})();
