// Smooth scroll for internal anchors (if present)
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  });
});

// Toggle sections by clicking headings
document.querySelectorAll('h2').forEach(h=>{
  h.addEventListener('click', ()=>{
    let next = h.nextElementSibling;
    if (!next) return;
    next.style.display = (next.style.display === 'none') ? '' : 'none';
  });
});
