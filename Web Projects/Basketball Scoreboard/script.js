let scoreA = 0;
let scoreB = 0;


function addScore(team, points) {
if (team === "A") {
scoreA += points;
document.getElementById("scoreA").innerText = scoreA;
} else {
scoreB += points;
document.getElementById("scoreB").innerText = scoreB;
}
}

function loadLogo(event, team) {
    const file = event.target.files[0];
    if (!file) return;

    const imgURL = URL.createObjectURL(file);

    if (team === "A") {
        const logo = document.getElementById("logoA");
        logo.src = imgURL;
        logo.style.display = "block";
    } else {
        const logo = document.getElementById("logoB");
        logo.src = imgURL;
        logo.style.display = "block";
    }
}
