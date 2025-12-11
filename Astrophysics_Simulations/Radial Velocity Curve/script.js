// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Toggle sections
document.querySelectorAll("h2").forEach(h => {
    h.addEventListener("click", () => {
        let next = h.nextElementSibling;
        if (next.style.display === "none") {
            next.style.display = "block";
        } else {
            next.style.display = "none";
        }
    });
});
