const preview = document.getElementById('preview');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const cameraSelect = document.getElementById('cameraSelect');
const maxLengthInput = document.getElementById('maxLength');
const timer = document.getElementById('timer');
const entriesDiv = document.getElementById('entries');

const saveModal = document.getElementById('saveModal');
const logTitleInput = document.getElementById('logTitle');
const saveLogBtn = document.getElementById('saveLogBtn');
const cancelLogBtn = document.getElementById('cancelLogBtn');

const playerWrapper = document.getElementById('playerWrapper');
const player = document.getElementById('player');
const playerTitle = document.getElementById('playerTitle');

let mediaRecorder, recordedChunks = [];
let stream, countdown;

// Get cameras
async function loadCameras() {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter(d => d.kind === "videoinput");
  cameraSelect.innerHTML = videoDevices.map((d, i) =>
    `<option value="${d.deviceId}">${d.label || `Camera ${i+1}`}</option>`
  ).join("");

  if (videoDevices[0]) startStream(videoDevices[0].deviceId);
}

async function startStream(deviceId) {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
  stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId }, audio: true });
  preview.srcObject = stream;
}

cameraSelect.addEventListener('change', e => startStream(e.target.value));

startBtn.onclick = () => {
  recordedChunks = [];
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = e => {
    if (e.data.size > 0) recordedChunks.push(e.data);
  };

  mediaRecorder.onstop = () => {
    saveModal.classList.remove('hidden');
  };

  mediaRecorder.start();

  startBtn.disabled = true;
  stopBtn.disabled = false;
  timer.textContent = "00:00";

  let seconds = 0;
  countdown = setInterval(() => {
    seconds++;
    let mm = String(Math.floor(seconds / 60)).padStart(2, "0");
    let ss = String(seconds % 60).padStart(2, "0");
    timer.textContent = `${mm}:${ss}`;
    if (seconds >= parseInt(maxLengthInput.value)) stopBtn.click();
  }, 1000);
};

stopBtn.onclick = () => {
  mediaRecorder.stop();
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(countdown);
};

// Save modal actions
saveLogBtn.onclick = () => {
  const title = logTitleInput.value || `Log ${new Date().toLocaleString()}`;
  const blob = new Blob(recordedChunks, { type: 'video/webm' });
  const url = URL.createObjectURL(blob);

  const entry = document.createElement('div');
  entry.className = 'entry';
  entry.innerHTML = `
    <video src="${url}" muted></video>
    <p>${title}</p>
  `;
  entry.onclick = () => {
    playerWrapper.classList.remove('hidden');
    playerTitle.textContent = title;
    player.src = url;
  };

  entriesDiv.prepend(entry);

  logTitleInput.value = "";
  saveModal.classList.add('hidden');
};

cancelLogBtn.onclick = () => {
  saveModal.classList.add('hidden');
};
  
loadCameras();
