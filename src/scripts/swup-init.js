import Swup from 'swup';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupScrollPlugin from '@swup/scroll-plugin';
import SwupScriptsPlugin from '@swup/scripts-plugin';

/**
 * Initializes scroll reveals on data-reveal elements.
 */
function initReveals() {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );

    document
      .querySelectorAll('[data-reveal]:not(.is-visible)')
      .forEach((element) => observer.observe(element));
  } else {
    document
      .querySelectorAll('[data-reveal]')
      .forEach((element) => element.classList.add('is-visible'));
  }
}

/**
 * Ensures the mobile menu details element closes when a link is tapped.
 */
function initMobileMenu() {
  const menu = document.querySelector('header details');
  if (menu) {
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.open = false;
      });
    });
  }
}

/**
 * Initialize Swup with Head, Scroll, and Scripts plugins.
 */
const swup = new Swup({
  containers: ['#swup', '#site-header'],
  animateHistoryBrowsing: true,
  plugins: [
    new SwupHeadPlugin({
      awaitAssets: true,
    }),
    new SwupScrollPlugin({
      animateScroll: false,
    }),
    new SwupScriptsPlugin({
      head: false,
      body: true,
      optin: false,
    }),
  ],
});

// Hook into Swup page:view lifecycle to re-bind event listeners and observe reveals
swup.hooks.on('page:view', () => {
  initReveals();
  initMobileMenu();
});

// Initial load execution
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initReveals();
    initMobileMenu();
  });
} else {
  initReveals();
  initMobileMenu();
}

// Escape key to close mobile menu
document.addEventListener('keydown', (event) => {
  const menu = document.querySelector('header details');
  if (menu && event.key === 'Escape' && menu.open) {
    menu.open = false;
    menu.querySelector('summary')?.focus();
  }
});

// Click outside to close mobile menu
document.addEventListener('click', (event) => {
  const menu = document.querySelector('header details');
  if (menu && menu.open && !menu.contains(event.target)) {
    menu.open = false;
  }
});
