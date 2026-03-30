(function () {
  'use strict';

  const toggle = document.getElementById('navToggle');
  const close = document.getElementById('navClose');
  const links = document.getElementById('navLinks');

  if (toggle && close && links) {
    toggle.addEventListener('click', () => {
      links.classList.add('open');
      document.body.classList.add('nav-open');
    });

    close.addEventListener('click', () => {
      links.classList.remove('open');
      document.body.classList.remove('nav-open');
    });

    links.querySelectorAll('a').forEach((anchor) => {
      anchor.addEventListener('click', () => {
        links.classList.remove('open');
        document.body.classList.remove('nav-open');
      });
    });
  }
})();
