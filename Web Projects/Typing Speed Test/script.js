const texts = [
  "The quick brown fox jumps over the lazy dog.",
  "Learning JavaScript is fun and rewarding.",
  "Practice makes perfect when typing fast.",
  "Portfolio projects showcase your skills.",
  "Interactive apps are engaging for users."
];

const textDisplay = document.getElementById("textDisplay");
const inputArea = document.getElementById("inputArea");
const timerEl = document.getElementById("timer");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const restartBtn = document.getElementById("restartBtn");

let currentText = "";
let startTime = null;
let interval = null;

function startTest() {
  inputArea.disabled = false;
  inputArea.value = "";
  inputArea.focus();
  currentText = texts[Math.floor(Math.random()*texts.length)];
  textDisplay.innerHTML = "";
  
  currentText.split("").forEach(char => {
    const span = document.createElement("span");
    span.innerText = char;
    textDisplay.appendChild(span);
  });
  
  startTime = new Date();
  if(interval) clearInterval(interval);
  interval = setInterval(updateStats, 100);
  
  document.body.style.background = `linear-gradient(135deg, #${Math.floor(Math.random()*16777215).toString(16)}, #${Math.floor(Math.random()*16777215).toString(16)})`;
}

function updateStats() {
  const elapsed = Math.floor((new Date() - startTime)/1000);
  timerEl.innerText = `Time: ${elapsed}s`;
  
  const typed = inputArea.value;
  const wordsTyped = typed.trim().split(/\s+/).length;
  const minutes = elapsed/60 || 1;
  wpmEl.innerText = `WPM: ${Math.round(wordsTyped/minutes)}`;
  
  let correct = 0;
  const spans = textDisplay.querySelectorAll("span");
  spans.forEach((span,i)=>{
    const char = typed[i];
    if(char==null) span.className = "";
    else if(char === span.innerText) {
      span.className = "correct";
      correct++;
    } else {
      span.className = "incorrect";
    }
  });
  const accuracy = Math.round((correct/typed.length)*100) || 0;
  accuracyEl.innerText = `Accuracy: ${accuracy}%`;
  
  if(typed === currentText) {
    clearInterval(interval);
    inputArea.disabled = true;
  }
}

inputArea.addEventListener("input", updateStats);
restartBtn.addEventListener("click", startTest);

startTest();
