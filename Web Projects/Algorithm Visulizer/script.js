// Original array to sort
let arr = [5, 3, 8, 4, 2];

// Generate random colors for bars
let colors = arr.map(() => getRandomColor());

// Helper: random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
    return color;
}

// Draw array bars
function drawArray(a, highlight = []) {
    let container = document.getElementById("container");
    container.innerHTML = "";
    a.forEach((num, i) => {
        let bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = num * 30 + "px";
        bar.textContent = num;
        bar.style.backgroundColor = colors[i];
        if (highlight.includes(i)) bar.style.backgroundColor = 'red';
        container.appendChild(bar);
    });
}

// Status and timer
function showStatus(text) {
    document.getElementById("status").innerText = text;
}

function showTimer(ms) {
    document.getElementById("timer").innerText = `Time: ${ms} ms`;
}

// Delay helper
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Timer helpers
function startTimer() {
    return Date.now();
}

function updateTimer(startTime) {
    return Date.now() - startTime;
}

// ---------- Bubble Sort ----------
async function bubbleSort() {
    let a = [...arr];
    drawArray(a);
    showStatus("Starting Bubble Sort...");

    let startTime = startTimer();

    for (let i = 0; i < a.length - 1; i++) {
        for (let j = 0; j < a.length - i - 1; j++) {

            showStatus(`Comparing ${a[j]} and ${a[j+1]}`);
            drawArray(a, [j, j + 1]);
            showTimer(updateTimer(startTime));
            await sleep(500);

            if (a[j] > a[j + 1]) {
                showStatus(`Swapping ${a[j]} and ${a[j+1]}`);
                let temp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = temp;
                drawArray(a, [j, j + 1]);
                showTimer(updateTimer(startTime));
                await sleep(500);
            }
        }
    }

    showStatus("Bubble Sort Completed!");
    showTimer(updateTimer(startTime));
    drawArray(a);
}

// ---------- Selection Sort ----------
async function selectionSort() {
    let a = [...arr];
    drawArray(a);
    showStatus("Starting Selection Sort...");

    let startTime = startTimer();

    for (let i = 0; i < a.length; i++) {
        let minIndex = i;

        for (let j = i + 1; j < a.length; j++) {
            showStatus(`Comparing ${a[j]} with ${a[minIndex]}`);
            drawArray(a, [j, minIndex]);
            showTimer(updateTimer(startTime));
            await sleep(500);

            if (a[j] < a[minIndex]) minIndex = j;
        }

        showStatus(`Swapping ${a[i]} and ${a[minIndex]}`);
        let temp = a[i]; a[i] = a[minIndex]; a[minIndex] = temp;
        drawArray(a, [i, minIndex]);
        showTimer(updateTimer(startTime));
        await sleep(500);
    }

    showStatus("Selection Sort Completed!");
    showTimer(updateTimer(startTime));
    drawArray(a);
}

// ---------- Insertion Sort ----------
async function insertionSort() {
    let a = [...arr];
    drawArray(a);
    showStatus("Starting Insertion Sort...");

    let startTime = startTimer();

    for (let i = 1; i < a.length; i++) {
        let key = a[i];
        let j = i - 1;

        showStatus(`Inserting ${key} at correct position`);
        while (j >= 0 && a[j] > key) {
            showStatus(`Moving ${a[j]} to the right`);
            a[j + 1] = a[j];
            drawArray(a, [j, j + 1]);
            showTimer(updateTimer(startTime));
            await sleep(500);
            j--;
        }

        a[j + 1] = key;
        drawArray(a, [j + 1]);
        showTimer(updateTimer(startTime));
        await sleep(500);
    }

    showStatus("Insertion Sort Completed!");
    showTimer(updateTimer(startTime));
    drawArray(a);
}

// Draw initial array
drawArray(arr);
showStatus("Click a button to start sorting...");
showTimer(0);
