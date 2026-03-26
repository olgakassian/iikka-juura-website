/* ══════════════════════════════════════
   IIKKA JUURA — Main JavaScript
   ══════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Sticky nav background on scroll ── */
  function initNavScroll() {
    var nav = document.querySelector('nav');
    if (!nav) return;

    function onScroll() {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Reel card click → open Instagram ── */
  function initReelCards() {
    document.querySelectorAll('.reel-card[data-url]').forEach(function (card) {
      card.addEventListener('click', function () {
        window.open(card.dataset.url, '_blank');
      });
    });
  }

  /* ── Contact form basic handler ── */
  function initContactForm() {
    var form = document.getElementById('contactForm');
    var btn  = document.getElementById('submitBtn');
    if (!form || !btn) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      btn.textContent = 'Sending...';
      btn.disabled    = true;

      // Replace this with your actual form endpoint (Netlify Forms,
      // Formspree, etc.) For now we simulate a short delay.
      setTimeout(function () {
        btn.textContent = 'Sent!';
        form.reset();

        setTimeout(function () {
          btn.textContent = 'Send It \u2192';
          btn.disabled    = false;
        }, 2000);
      }, 800);
    });
  }

  /* ── Boot ── */
  document.addEventListener('DOMContentLoaded', function () {
    initNavScroll();
    initReelCards();
    initContactForm();
  });
})();
