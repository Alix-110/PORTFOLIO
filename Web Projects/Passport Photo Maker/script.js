  document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("wasd-popup");
  const closeBtn = document.getElementById("popup-close");

 
  setTimeout(() => {
    popup.style.display = "flex";
  }, 1000);

  
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });
});

const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('downloadBtn');
const croppedPreview = document.getElementById('croppedPreview');

const defaultOriginal = "default-original.png";
const defaultCropped = "default-cropped.png";

let img = new Image();
let isDragging = false;
let cropX = 0, cropY = 0;
const cropSize = 600;


function loadDefaultImages() {
    croppedPreview.src = defaultCropped;
    const defaultImg = new Image();
    defaultImg.onload = () => {
        canvas.width = defaultImg.width;
        canvas.height = defaultImg.height;
        img = defaultImg;
        cropX = (canvas.width - cropSize) / 2;
        cropY = (canvas.height - cropSize) / 2;
        draw();
        updatePreview();
    };
    defaultImg.src = defaultOriginal;
}
loadDefaultImages();


upload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            cropX = (img.width - cropSize) / 2;
            cropY = (img.height - cropSize) / 2;
            draw();
            updatePreview();
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, 0, 0);

   
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    
    ctx.clearRect(cropX, cropY, cropSize, cropSize);
    ctx.drawImage(img, cropX, cropY, cropSize, cropSize, cropX, cropY, cropSize, cropSize);

  
    ctx.strokeStyle = "#00ff88";
    ctx.lineWidth = 3;
    ctx.shadowColor = "#00ff88";
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.roundRect(cropX, cropY, cropSize, cropSize, 8);
    ctx.stroke();
    ctx.shadowBlur = 0;

    
    const centerX = cropX + cropSize / 2;
    const centerY = cropY + cropSize / 2;
    ctx.strokeStyle = "#00ff88";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(centerX - 15, centerY);
    ctx.lineTo(centerX + 15, centerY);
    ctx.moveTo(centerX, centerY - 15);
    ctx.lineTo(centerX, centerY + 15);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
    ctx.stroke();
}


function updatePreview() {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = cropSize;
    tempCanvas.height = cropSize;
    tempCanvas.getContext('2d').drawImage(
        img,
        cropX, cropY, cropSize, cropSize,
        0, 0, cropSize, cropSize
    );
    croppedPreview.src = tempCanvas.toDataURL();
}


canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    if (mouseX >= cropX && mouseX <= cropX + cropSize &&
        mouseY >= cropY && mouseY <= cropY + cropSize) {
        isDragging = true;
        canvas.style.cursor = "move";
    }
});


canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    if (isDragging) {
        cropX = Math.max(0, Math.min(mouseX - cropSize / 2, img.width - cropSize));
        cropY = Math.max(0, Math.min(mouseY - cropSize / 2, img.height - cropSize));
        draw();
        updatePreview();
    }
});


canvas.addEventListener('mouseup', () => {
    isDragging = false;
});


document.addEventListener('keydown', (e) => {
    const step = e.shiftKey ? 20 : 5;
    let moved = false;

    if (e.key.toLowerCase() === "w") {
        cropY = Math.max(0, cropY - step);
        moved = true;
    }
    if (e.key.toLowerCase() === "s") {
        cropY = Math.min(img.height - cropSize, cropY + step);
        moved = true;
    }
    if (e.key.toLowerCase() === "a") {
        cropX = Math.max(0, cropX - step);
        moved = true;
    }
    if (e.key.toLowerCase() === "d") {
        cropX = Math.min(img.width - cropSize, cropX + step);
        moved = true;
    }

    if (moved) {
        draw();
        updatePreview();
    }
});


downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'cropped.png';
    link.href = croppedPreview.src;
    link.click();
});
