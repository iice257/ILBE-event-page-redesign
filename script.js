/* ═══════════════════════════════════════════════
   VARIATION D — NEO-BRUTALIST
   Script: scroll reveals, mobile toggle, marquee
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

  // ── Mobile Toggle ──
  const toggle = document.getElementById('navToggle');
  const close = document.getElementById('navClose');
  const links = document.getElementById('navLinks');

  if (toggle && links && close) {
    toggle.addEventListener('click', () => {
      links.classList.add('open');
    });
    close.addEventListener('click', () => {
      links.classList.remove('open');
    });
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
      });
    });
  }

  // ── Form submission placeholder ──
  const form = document.querySelector('.reg-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'DONE. YOU ARE IN.';
      btn.style.background = '#000';
      btn.style.color = '#fff';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'REGISTER NOW';
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }

  // ── Marquee pause on hover ──
  const marquee = document.querySelector('.track');
  if (marquee) {
    marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
    marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
  }

})();
