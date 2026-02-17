/* ═══════════════════════════════════════════════
   VARIATION A — EDITORIAL / MAGAZINE
   Script: scroll reveals, sticky nav, mobile toggle
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Scroll Reveal ──
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  reveals.forEach((el) => revealObserver.observe(el));

  // ── Sticky Nav ──
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ── Mobile Toggle ──
  const toggle = document.getElementById('navToggle');
  const links = document.querySelector('.nav__links');
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('open');
    });
  });

  // ── Smooth Scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Simple parallax on hero ──
  const hero = document.querySelector('.hero__content');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      hero.style.transform = `translateY(${y * 0.2}px)`;
      hero.style.opacity = 1 - y / (window.innerHeight * .8);
    }
  });

  // ── Form submission placeholder ──
  const form = document.getElementById('registerForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Registered ✓';
      btn.style.background = '#6b8f71';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Register Now — It\'s Free';
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }
})();
