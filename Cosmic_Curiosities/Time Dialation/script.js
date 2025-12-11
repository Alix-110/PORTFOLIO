const canvas = document.getElementById("speedCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 200;

function draw(speed){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#e5e5e5";
    ctx.font = "18px Roboto";
    ctx.fillText(`Speed: ${speed}% of light`, 10, 30);

    let dilation = 1 / Math.sqrt(1 - (speed/100)**2);
    ctx.fillText(`Time Dilation Factor: ${dilation.toFixed(4)}x`, 10, 70);

    ctx.fillStyle = "#4a90e2";
    ctx.fillRect(50, 120, speed*5, 20);
}

document.getElementById("startAnimation").onclick = () => {
    let speed = 0;
    const interval = setInterval(()=>{
        if(speed >= 99){
            clearInterval(interval);
        }
        draw(speed);
        speed++;
    },50);
};
