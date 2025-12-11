// Scroll button
document.getElementById("scrollToAnimation")
    .addEventListener("click", () => {
        document.getElementById("animationDemo")
            .scrollIntoView({ behavior: "smooth" });
    });

// Modal elements
const videoModal = document.getElementById("videoModal");
const playButton = document.getElementById("playButton");
const closeModal = document.getElementById("closeModal");
const keplerVideo = document.getElementById("keplerVideo");

// Open modal
playButton.addEventListener("click", () => {
    videoModal.style.display = "flex";
    keplerVideo.currentTime = 0;
    keplerVideo.play();
});

// Close modal
closeModal.addEventListener("click", () => {
    videoModal.style.display = "none";
    keplerVideo.pause();
});

// Background click closes modal
window.onclick = function (e) {
    if (e.target === videoModal) {
        videoModal.style.display = "none";
        keplerVideo.pause();
    }
};
