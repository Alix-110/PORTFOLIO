// Smooth scrolling for possible internal anchors
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  });
});

// Toggle sections by clicking the heading
document.querySelectorAll('h2').forEach(h=>{
  h.addEventListener('click', ()=>{
    let next = h.nextElementSibling;
    if (!next) return;
    next.style.display = (next.style.display === 'none') ? '' : 'none';
  });
});
