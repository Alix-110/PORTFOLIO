const funcSelect = document.getElementById("funcSelect");
const stepInput = document.getElementById("stepInput");
const rangeInput = document.getElementById("rangeInput");
const generateBtn = document.getElementById("generateBtn");
const canvas = document.getElementById("graphCanvas");
const tooltip = document.getElementById("tooltip");

const ctx = canvas.getContext("2d");

// Adjust for high DPI
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

generateBtn.addEventListener("click", () => {
    generateGraph();
});

function generateGraph() {
    const func = funcSelect.value;
    const stepDeg = parseFloat(stepInput.value);
    const rangeDeg = parseFloat(rangeInput.value);

    if(isNaN(stepDeg) || isNaN(rangeDeg) || stepDeg <=0 || rangeDeg <=0){
        alert("Please enter valid step and range!");
        return;
    }

    // Prepare data
    const data = [];
    for(let angle=0; angle<=rangeDeg; angle+=stepDeg){
        const rad = angle * Math.PI / 180;
        let value = 0;
        if(func === "sin") value = Math.sin(rad);
        else if(func === "cos") value = Math.cos(rad);
        else if(func === "tan") value = Math.tan(rad);

        // Limit tan values for display
        if(func === "tan" && Math.abs(value)>5) value = NaN;
        data.push({x: angle, y: value});
    }

    drawGraph(data);
}

function drawGraph(data){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const padding = 40;
    const w = canvas.width - padding*2;
    const h = canvas.height - padding*2;

    // find min/max
    const ys = data.filter(d => !isNaN(d.y)).map(d => d.y);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    // Animate drawing
    let i = 0;
    function animate(){
        if(i >= data.length) return;

        ctx.beginPath();
        for(let j=0;j<=i;j++){
            const d = data[j];
            if(isNaN(d.y)) continue;
            const x = padding + (d.x/data[data.length-1].x)*w;
            const y = padding + ((maxY - d.y)/(maxY - minY))*h;

            if(j===0 || isNaN(data[j-1].y)) ctx.moveTo(x,y);
            else ctx.lineTo(x,y);
        }
        // color-code positive/negative
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.stroke();

        i++;
        requestAnimationFrame(animate);
    }
    animate();
}

// Tooltip on hover
canvas.addEventListener("mousemove", e=>{
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const padding = 40;
    const w = canvas.width - padding*2;
    const h = canvas.height - padding*2;

    // approximate x
    const xVal = ((mouseX - padding)/w)*parseFloat(rangeInput.value);
    const func = funcSelect.value;
    let yVal = 0;
    if(func === "sin") yVal = Math.sin(xVal*Math.PI/180);
    else if(func === "cos") yVal = Math.cos(xVal*Math.PI/180);
    else if(func === "tan") yVal = Math.tan(xVal*Math.PI/180);

    if(isNaN(yVal) || Math.abs(yVal)>5) {
        tooltip.style.display = 'none';
        return;
    }

    tooltip.style.display = 'block';
    tooltip.style.left = e.clientX + 10 + 'px';
    tooltip.style.top = e.clientY + 10 + 'px';
    tooltip.textContent = `(${xVal.toFixed(1)}°, ${yVal.toFixed(2)})`;
});

canvas.addEventListener("mouseleave", e=>{
    tooltip.style.display = 'none';
});
