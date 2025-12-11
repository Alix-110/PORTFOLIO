// Toggle each section content
document.querySelectorAll('h2').forEach(h=>{
  h.addEventListener('click', ()=>{
    const next = h.nextElementSibling;
    if(!next) return;
    next.style.display = (next.style.display==='none')?'':'none';
  });
});

// Smooth scroll for anchors
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const target=document.querySelector(a.getAttribute('href'));
    if(target) target.scrollIntoView({behavior:'smooth'});
  });
});
