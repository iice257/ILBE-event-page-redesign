/* ═══════════════════════════════════════════════
   VARIATION B — PILL / ROUNDED
   Script: scroll reveals, sticky nav, mobile toggle
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
    { threshold: 0.15 }
  );
  reveals.forEach((el) => observer.observe(el));

  // ── Sticky Nav ──
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ── Mobile Toggle ──
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });

  // ── Smooth Scroll ──
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Interactive blob parallax on mouse move ──
  const blobs = document.querySelectorAll('.blob');
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    blobs.forEach((blob, i) => {
      const speed = (i + 1) * 12;
      blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });

  // ── Form submission placeholder ──
  const form = document.getElementById('registerForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'You\'re In! ✓';
      btn.style.background = '#3ecf8e';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Register Now — It\'s Free ✨';
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }
})();
