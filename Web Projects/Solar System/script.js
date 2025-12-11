const planets = [
    {id:"mercury", angle:0, speed:0.04},
    {id:"venus", angle:0, speed:0.025},
    {id:"earth", angle:0, speed:0.018},
    {id:"mars", angle:0, speed:0.012},
    {id:"jupiter", angle:0, speed:0.008},
    {id:"saturn", angle:0, speed:0.006},
    {id:"uranus", angle:0, speed:0.004},
    {id:"neptune", angle:0, speed:0.002}
];

const speedSlider = document.getElementById("speedSlider");
let speedMultiplier = parseFloat(speedSlider.value);
const tooltip = document.getElementById("tooltip");
const yearCounter = document.getElementById("yearCounter");
let earthYears = 0;

speedSlider.addEventListener("input", () => {
    speedMultiplier = parseFloat(speedSlider.value);
});

// Set planet sizes proportional to real radius
planets.forEach(p => {
    const el = document.getElementById(p.id);
    const radius = parseFloat(el.dataset.radius);
    el.style.width = `${radius * 2}px`;
    el.style.height = `${radius * 2}px`;
});

// Zoom feature
const solarSystemEl = document.getElementById("solarSystem");
let scale = 1;
document.addEventListener("wheel", (e)=>{
    e.preventDefault();
    scale += e.deltaY * -0.001;
    scale = Math.min(Math.max(0.5, scale), 2);
    solarSystemEl.style.transform = `scale(${scale})`;
});

// Tooltip and click highlight
planets.forEach(p => {
    const el = document.getElementById(p.id);
    const orbit = el.parentElement;

    el.addEventListener("mouseenter", (e)=>{
        tooltip.innerHTML = `<strong>${el.dataset.name}</strong><br>${el.dataset.info}`;
        tooltip.style.display = "block";
    });

    el.addEventListener("mousemove", (e)=>{
        tooltip.style.left = e.pageX + 15 + "px";
        tooltip.style.top = e.pageY + 15 + "px";
    });

    el.addEventListener("mouseleave", ()=>{
        tooltip.style.display = "none";
    });

    el.addEventListener("click", ()=>{
        document.querySelectorAll(".orbit").forEach(o=>o.classList.remove("highlight"));
        orbit.classList.add("highlight");
    });
});

function animate(){
    planets.forEach(planet=>{
        const el = document.getElementById(planet.id);
        const orbit = el.parentElement;
        const radius = orbit.offsetWidth / 2;

        planet.angle += planet.speed * speedMultiplier;
        const rad = planet.angle;
        const x = radius + radius * Math.cos(rad);
        const y = radius + radius * Math.sin(rad);

        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
    });

    // Update Earth year counter
    earthYears += (0.018 * speedMultiplier)/(2*Math.PI);
    yearCounter.textContent = `Earth Years: ${Math.floor(earthYears)}`;

    requestAnimationFrame(animate);
}

let animationRunning = true; // animation state
const playPauseBtn = document.getElementById("playPauseBtn");

playPauseBtn.addEventListener("click", () => {
    animationRunning = !animationRunning;
    playPauseBtn.textContent = animationRunning ? "Pause" : "Play";
});

// Modify animate function to respect animationRunning
function animate(){
    if(animationRunning){
        planets.forEach(planet=>{
            const el = document.getElementById(planet.id);
            const orbit = el.parentElement;
            const radius = orbit.offsetWidth / 2;

            planet.angle += planet.speed * speedMultiplier;
            const rad = planet.angle;
            const x = radius + radius * Math.cos(rad);
            const y = radius + radius * Math.sin(rad);

            el.style.left = `${x}px`;
            el.style.top = `${y}px`;
        });

        // Update Earth year counter
        earthYears += (0.018 * speedMultiplier)/(2*Math.PI);
        yearCounter.textContent = `Earth Years: ${Math.floor(earthYears)}`;
    }

    requestAnimationFrame(animate);
}

animate();


