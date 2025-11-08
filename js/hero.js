// hero.js - Animate fade-up sections on scroll
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // 一次性加载
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));
});
