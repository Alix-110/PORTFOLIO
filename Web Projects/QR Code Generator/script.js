let qr;

function generateQR(){
  const text = document.getElementById("textInput").value.trim();
  const qrDiv = document.getElementById("qrCode");
  const downloadBtn = document.getElementById("downloadBtn");

  qrDiv.innerHTML = ''; // clear previous QR code
  qrDiv.classList.remove('show'); // reset animation class

  if(text === '') return;

  qr = new QRCode(qrDiv, {
    text: text,
    width: 200,
    height: 200,
    colorDark : "#00ffff",
    colorLight : "#222",
    correctLevel : QRCode.CorrectLevel.H
  });

  downloadBtn.style.display = 'inline-block';

  // Animate background color morph
  document.body.style.background = getRandomGradient();

  // Trigger QR code animation after a short delay
  setTimeout(() => {
    qrDiv.classList.add('show');
  }, 50);
}


// Function to generate random bright gradient
function getRandomGradient(){
  const colors = [
    '#00ffff', '#ff00ff', '#ffdd00', '#00ff99', '#ff5555', '#ffaa00'
  ];
  const c1 = colors[Math.floor(Math.random()*colors.length)];
  const c2 = colors[Math.floor(Math.random()*colors.length)];
  return `linear-gradient(135deg, ${c1}, ${c2})`;
}

function downloadQR(){
  const qrCanvas = document.querySelector("#qrCode canvas");
  if(!qrCanvas) return;

  const link = document.createElement('a');
  link.href = qrCanvas.toDataURL("image/png");
  link.download = "QRCode.png";
  link.click();
}
