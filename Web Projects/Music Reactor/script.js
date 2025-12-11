const audioFile = document.getElementById("audioFile");
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 300;

let audioCtx, analyser, source, dataArray;

audioFile.addEventListener("change",(e)=>{
    const file = e.target.files[0];
    if(!file) return;

    const audio = new Audio(URL.createObjectURL(file));
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 64;

    dataArray = new Uint8Array(analyser.frequencyBinCount);

    audio.play();
    animate();
});

function animate(){
    requestAnimationFrame(animate);
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0,0,canvas.width,canvas.height);

    const barWidth = canvas.width / dataArray.length;
    dataArray.forEach((value,i)=>{
        const barHeight = value * 2;
        const x = i * barWidth;
        ctx.fillStyle = `hsl(${i*15}, 100%, 50%)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);
    });
}
