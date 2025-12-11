// script.js - lightweight interactivity for the simulation page
// Features:
//  - Smooth scrolling to sections using nav buttons
//  - Toggle (show/hide) explanation blocks (code explanations, etc.)
//  - Small visual feedback on buttons

document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll for nav buttons
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const target = btn.getAttribute("data-target");
      if (!target) return;
      const el = document.querySelector(target);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // small button ripple / active style
      btn.style.transform = "translateY(-3px)";
      setTimeout(() => btn.style.transform = "", 220);
    });
  });

  // Toggle collapsible regions (for code explanations)
  document.querySelectorAll(".toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target");
      if (!target) return;
      const el = document.querySelector(target);
      if (!el) return;
      if (el.style.display === "block") {
        el.style.display = "none";
        btn.textContent = "Show / Hide Line-by-line Explanation";
      } else {
        el.style.display = "block";
        btn.textContent = "Hide Line-by-line Explanation";
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  });

  // Small visual tweak: fade-in cards as user scrolls
  const cards = document.querySelectorAll(".card");
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      } else {
        entry.target.style.opacity = 0.8;
        entry.target.style.transform = "translateY(6px)";
      }
    });
  }, { threshold: 0.07 });

  cards.forEach(c => {
    c.style.opacity = 0.9;
    c.style.transform = "translateY(6px)";
    obs.observe(c);
  });
});

// Ensure the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const openBtn = document.getElementById("openVideoBtn");
  const closeBtn = document.getElementById("closeVideoBtn");
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("orbitVideo");

  // Open modal and play video
  openBtn.addEventListener("click", () => {
    modal.classList.add("show");
    video.play().catch(() => {
      console.log("Autoplay blocked; click the play button inside the video.");
    });
  });

  // Close modal function
  function closeModal() {
    modal.classList.remove("show");
    setTimeout(() => {
      video.pause();
      video.currentTime = 0;
    }, 300);
  }

  // Close modal on clicking close button
  closeBtn.addEventListener("click", closeModal);

  // Close modal when clicking outside the content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
});
