document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('h2').forEach(header => {
    header.addEventListener('click', () => {
        let next = header.nextElementSibling;
        if(next.style.display === 'none') {
            next.style.display = 'block';
        } else {
            next.style.display = 'none';
        }
    });
});
