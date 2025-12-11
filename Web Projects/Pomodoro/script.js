const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const statusEl = document.getElementById("status");

const workInput = document.getElementById("workMinutes");
const breakInput = document.getElementById("breakMinutes");

const circle = document.querySelector(".progress-ring-circle");
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

let workTime = parseInt(workInput.value) * 60;
let breakTime = parseInt(breakInput.value) * 60;
let timeLeft = workTime;
let timerInterval = null;
let onBreak = false;

function updateCircle() {
    const percent = timeLeft / (onBreak ? breakTime : workTime);
    const offset = circumference * (1 - percent);
    circle.style.strokeDashoffset = offset;
}

function updateTimer() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    timerEl.textContent = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
    updateCircle();
}

function startTimer() {
    if(timerInterval) return;
    timerInterval = setInterval(() => {
        if(timeLeft > 0) {
            timeLeft--;
            updateTimer();
        } else {
            onBreak = !onBreak;
            timeLeft = onBreak ? parseInt(breakInput.value)*60 : parseInt(workInput.value)*60;
            statusEl.textContent = onBreak ? "Break" : "Work";
            updateTimer();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    pauseTimer();
    workTime = parseInt(workInput.value) * 60;
    breakTime = parseInt(breakInput.value) * 60;
    onBreak = false;
    timeLeft = workTime;
    statusEl.textContent = "Work";
    updateTimer();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateTimer();
