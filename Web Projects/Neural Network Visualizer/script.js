function activation(x) {
    return 1 / (1 + Math.exp(-x));  // sigmoid
}

function update() {
    let i1 = parseFloat(document.getElementById("input1").value);
    let i2 = parseFloat(document.getElementById("input2").value);
    let i3 = parseFloat(document.getElementById("input3").value);

    let w1 = parseFloat(document.getElementById("w1").value);
    let w2 = parseFloat(document.getElementById("w2").value);
    let w3 = parseFloat(document.getElementById("w3").value);

    let neuron = document.getElementById("neuron");
    let outNode = document.getElementById("outputNode");

    let raw = i1*w1 + i2*w2 + i3*w3;
    let out = activation(raw);

    document.getElementById("outputValue").innerText = out.toFixed(4);

    // Glow animation
    neuron.classList.add("active");
    outNode.classList.add("active");

    setTimeout(() => {
        neuron.classList.remove("active");
        outNode.classList.remove("active");
    }, 300);

    drawLines();
}

function drawLines() {
    positionLine("node1", "neuron", "line1");
    positionLine("node2", "neuron", "line2");
    positionLine("node3", "neuron", "line3");
}

function positionLine(startId, endId, lineId) {
    const start = document.getElementById(startId).getBoundingClientRect();
    const end = document.getElementById(endId).getBoundingClientRect();

    const svg = document.querySelector(".lines").getBoundingClientRect();

    let x1 = start.left - svg.left + start.width/2;
    let y1 = start.top - svg.top + start.height/2;

    let x2 = end.left - svg.left + end.width/2;
    let y2 = end.top - svg.top + end.height/2;

    let line = document.getElementById(lineId);
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
}

// update continuously on change
document.querySelectorAll("input").forEach(el => {
    el.addEventListener("input", update);
});

window.onload = () => {
    update();
    drawLines();
};
