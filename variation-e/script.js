/* ═══════════════════════════════════════════════
   VARIATION E — GLASSMORPHISM / AURORA
   Script: scroll reveals, mobile toggle, orbs parallax
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

  // ── Sticky Nav ──
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ── Mobile Toggle ──
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
      });
    });
  }

  // ── Mouse Parallax for Orbs ──
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    const orb3 = document.querySelector('.orb-3');

    if (orb1) orb1.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    if (orb2) orb2.style.transform = `translate(${x * -30}px, ${y * -30}px)`;
    if (orb3) orb3.style.transform = `translate(${x * 10}px, ${y * 40}px)`;
  });

  // ── Form submission placeholder ──
  const form = document.querySelector('.reg-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Welcome Aboard! 🚀';
      btn.style.background = '#00d2ff';
      btn.style.boxShadow = '0 0 40px #00d2ff';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Get Free Ticket';
        btn.style.background = '';
        btn.style.boxShadow = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }

})();
