/* ═══════════════════════════════════════════════
   VARIATION C — FLAT NEGATIVE SPACE
   Script: scroll reveals, sticky nav, mobile toggle, marquee
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
    { threshold: 0.12 }
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
    toggle.textContent = links.classList.contains('open') ? '✕' : '☰';
  });
  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.textContent = '☰';
    });
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

  // ── Pause marquee on hover ──
  const marquee = document.querySelector('.marquee-track');
  if (marquee) {
    marquee.addEventListener('mouseenter', () => {
      marquee.style.animationPlayState = 'paused';
    });
    marquee.addEventListener('mouseleave', () => {
      marquee.style.animationPlayState = 'running';
    });
  }

  // ── Counter animation for section numbers ──
  const nums = document.querySelectorAll('.label-num');
  const numObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.transition = 'opacity .5s';
          e.target.style.opacity = '1';
        }
      });
    },
    { threshold: 0.5 }
  );
  nums.forEach((n) => {
    n.style.opacity = '0';
    numObserver.observe(n);
  });

  // ── Form submission placeholder ──
  const form = document.getElementById('registerForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Registered ✓';
      btn.style.background = '#fff';
      btn.style.color = '#111';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Register — Free →';
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }
})();
