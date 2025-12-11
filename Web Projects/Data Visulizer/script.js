const canvas = document.getElementById('chartCanvas');
const ctx = canvas.getContext('2d');

let dataPoints = []; // store {label, value} objects

function addData() {
  const value = parseFloat(document.getElementById('dataValue').value);
  const label = document.getElementById('dataLabel').value.trim();
  if(label && !isNaN(value)){
    dataPoints.push({label, value});
    document.getElementById('dataValue').value = '';
    document.getElementById('dataLabel').value = '';
  }
}

function resetData() {
  dataPoints = [];
  drawChart();
}

function drawChart() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  if(dataPoints.length === 0) return;

  const padding = 50;
  const width = canvas.width - 2*padding;
  const height = canvas.height - 2*padding;

  const values = dataPoints.map(p => p.value);
  const maxVal = Math.max(...values);
  const minVal = Math.min(...values);

  const points = dataPoints.map((p, i) => {
    const x = padding + (i/(dataPoints.length-1))*width;
    const y = padding + height - ((p.value - minVal)/(maxVal - minVal))*height;
    return {x, y, label:p.label, val:p.value};
  });

  // Draw axes
  ctx.strokeStyle = "#111";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, padding+height);
  ctx.lineTo(padding+width, padding+height);
  ctx.stroke();
  ctx.closePath();

  // Animated line drawing
  let i = 0;
  function animateLine() {
    if(i < points.length-1){
      // Draw line segment
      ctx.strokeStyle = "#00c3ff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(points[i].x, points[i].y);
      ctx.lineTo(points[i+1].x, points[i+1].y);
      ctx.stroke();
      ctx.closePath();

      // Draw point with small scale animation
      let scale = 0;
      function animatePoint() {
        if(scale < 1){
          scale += 0.1;
          ctx.fillStyle = "#ff00ff";
          ctx.beginPath();
          ctx.arc(points[i+1].x, points[i+1].y, 5*scale, 0, Math.PI*2);
          ctx.fill();
          ctx.closePath();
          requestAnimationFrame(animatePoint);
        }
      }
      animatePoint();

      i++;
      setTimeout(animateLine, 150); // delay between segments for smooth effect
    }
  }

  animateLine();

  // Hover tooltip
  canvas.onmousemove = function(e){
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    drawAxes(points); // redraw axes and points for hover effect

    points.forEach(p=>{
      const dx = mx - p.x;
      const dy = my - p.y;
      if(Math.sqrt(dx*dx + dy*dy) < 8){
        ctx.fillStyle = "#111";
        ctx.fillRect(p.x+10, p.y-25, 50, 20);
        ctx.fillStyle = "#fff";
        ctx.font="14px Arial";
        ctx.fillText(p.val, p.x+15, p.y-10);
      }
    });
  }

  function drawAxes(points){
    // Clear canvas
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Draw axes
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, padding+height);
    ctx.lineTo(padding+width, padding+height);
    ctx.stroke();
    ctx.closePath();

    // Draw points
    points.forEach(p=>{
      ctx.fillStyle = "#ff00ff";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, Math.PI*2);
      ctx.fill();
      ctx.closePath();
    });

    // Draw line segments
    ctx.strokeStyle = "#00c3ff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for(let j=1; j<points.length; j++){
      ctx.lineTo(points[j].x, points[j].y);
    }
    ctx.stroke();
    ctx.closePath();
  }
}
