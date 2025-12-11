// Smooth scrolling for anchors (if used)
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) target.scrollIntoView({behavior:'smooth'});
  });
});

// Toggle each section's following content by clicking the heading (useful for long pages)
document.querySelectorAll('h2').forEach(h=>{
  h.addEventListener('click', ()=>{
    const next = h.nextElementSibling;
    if(!next) return;
    next.style.display = (next.style.display === 'none') ? '' : 'none';
  });
});
