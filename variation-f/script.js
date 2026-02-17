/* ═══════════════════════════════════════════════
   VARIATION F — BENTO GRID / MASONRY
   Script: scroll reveals, interactive cards
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Scroll Reveal ──
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  reveals.forEach((el) => observer.observe(el));

  // ── Hover Tilt Effect (Optional fun touch) ──
  const cards = document.querySelectorAll('.bento-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate rotation based on cursor position
      // const rotateX = ((y / rect.height) - 0.5) * -5;
      // const rotateY = ((x / rect.width) - 0.5) * 5;

      // card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      // card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });

  // ── Form submission placeholder ──
  const form = document.querySelector('.reg-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Waitlist Joined ✓';
      btn.style.background = '#0071e3';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Register';
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }

})();
