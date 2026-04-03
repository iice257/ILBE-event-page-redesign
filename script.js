/* ═══════════════════════════════════════════════
   VARIATION D — NEO-BRUTALIST
   Script: scroll reveals, mobile toggle, marquee
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Dark Mode Toggle ──
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggle.textContent = '☀️';
    }
    
    themeToggle.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
      }
    });
  }

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
      btn.style.background = 'var(--text)';
      btn.style.color = 'var(--bg)';
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
  
  // ── Scroll Indicator ──
  const indicator = document.querySelector('.scroll-indicator');
  if (indicator) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        indicator.style.opacity = '0';
      } else {
        indicator.style.opacity = '0.8';
      }
    });
  }

  // ── Marquee pause on hover ──
  const marquee = document.querySelector('.track');
  if (marquee) {
    marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
    marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
  }

  // ── Ripple Grid Canvas ──
  const canvas = document.getElementById('rippleGrid');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let points = [];
    let mx = -1000, my = -1000;
    
    // Config
    const spacing = 50; 
    const mouseRadius = 150;
    const force = 30; // max displacement

    function resize() {
      // make it match the hero section exactly
      width = canvas.parentElement.offsetWidth;
      height = canvas.parentElement.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      initGrid();
    }

    function initGrid() {
      points = [];
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
          row.push({
            x: j * spacing,
            y: i * spacing,
            bx: j * spacing,
            by: i * spacing,
            vx: 0,
            vy: 0
          });
        }
        points.push(row);
      }
    }

    window.addEventListener('resize', resize);
    
    // Track mouse over the hero section
    const hero = document.getElementById('hero');
    hero.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    });
    hero.addEventListener('mouseleave', () => {
      mx = -1000;
      my = -1000;
    });

    function draw() {
      ctx.clearRect(0, 0, width, height);
      
      // Update points
      for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points[i].length; j++) {
          let p = points[i][j];
          let dx = mx - p.x;
          let dy = my - p.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          
          let targetX = p.bx;
          let targetY = p.by;

          if (dist < mouseRadius) {
            let f = (mouseRadius - dist) / mouseRadius;
            let angle = Math.atan2(dy, dx);
            targetX -= Math.cos(angle) * f * force;
            targetY -= Math.sin(angle) * f * force;
          }

          // Spring physics
          p.vx += (targetX - p.x) * 0.1;
          p.vy += (targetY - p.y) * 0.1;
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.8;
          p.vy *= 0.8;
        }
      }

      ctx.beginPath();
      // Subtle Princeton Orange for the lines
      ctx.strokeStyle = 'rgba(255, 143, 0, 0.35)'; // Princeton Orange
      ctx.lineWidth = 1.5;

      // Draw horizontal lines
      for (let i = 0; i < points.length; i++) {
        ctx.moveTo(points[i][0].x, points[i][0].y);
        for (let j = 1; j < points[i].length; j++) {
          ctx.lineTo(points[i][j].x, points[i][j].y);
        }
      }

      // Draw vertical lines
      for (let j = 0; j < points[0].length; j++) {
        ctx.moveTo(points[0][j].x, points[0][j].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i][j].x, points[i][j].y);
        }
      }
      ctx.stroke();

      // Draw subtle nodes for intersections near mouse
      for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points[i].length; j++) {
          let p = points[i][j];
          let dx = mx - p.x;
          let dy = my - p.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < mouseRadius) {
            let nodeAlpha = (mouseRadius - dist) / mouseRadius;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 143, 0, ${nodeAlpha * 0.8})`;
            ctx.fill();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    resize();
    draw();
  }

})();
