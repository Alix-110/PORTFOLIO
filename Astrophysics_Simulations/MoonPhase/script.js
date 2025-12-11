// Smooth scrolling for section links (if any links are added)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Toggle visibility for code blocks
document.querySelectorAll('h2').forEach(header => {
    header.addEventListener('click', () => {
        const next = header.nextElementSibling;
        if (next.style.display === 'none') {
            next.style.display = 'block';
        } else {
            next.style.display = 'none';
        }
    });
});
