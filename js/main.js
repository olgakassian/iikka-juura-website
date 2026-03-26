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

  /* ── Reel card thumbnails ── */
  function initReelThumbs() {
    document.querySelectorAll('.reel-card[data-thumb]').forEach(function (card) {
      var thumb = card.dataset.thumb;
      var bg    = card.querySelector('.reel-bg');
      if (!bg) return;
      var img = new Image();
      img.onload = function () {
        bg.style.backgroundImage = 'url(' + thumb + ')';
        bg.style.backgroundSize  = 'cover';
        bg.style.backgroundPosition = 'center';
        card.classList.add('has-thumb');
      };
      img.src = thumb;
    });
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
    var form    = document.getElementById('contactForm');
    var btn     = document.getElementById('submitBtn');
    var success = document.getElementById('formSuccess');
    var errorEl = document.getElementById('formError');
    if (!form || !btn) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      btn.textContent      = 'Sending...';
      btn.disabled         = true;
      errorEl.style.display = 'none';
      errorEl.textContent  = '';

      fetch('https://formspree.io/f/xqegakbg', {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
      .then(function (res) {
        if (res.ok) {
          form.style.display    = 'none';
          success.style.display = 'flex';
        } else {
          return res.json().then(function (data) {
            throw new Error(data.error || 'Submission failed. Please try again.');
          });
        }
      })
      .catch(function (err) {
        errorEl.textContent  = err.message || 'Something went wrong. Please try again or email directly.';
        errorEl.style.display = 'block';
        btn.textContent      = 'Send It \u2192';
        btn.disabled         = false;
      });
    });
  }

  /* ── Boot ── */
  document.addEventListener('DOMContentLoaded', function () {
    initNavScroll();
    initReelThumbs();
    initReelCards();
    initContactForm();
  });
})();
