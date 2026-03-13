(function () {
  'use strict';

  // ── Slot-in observer ─────────────────────────────────────────────────────────
  //
  // Watches every .slot-in element. When 12% of an element enters the viewport
  // (with a -60px bottom margin so it fires slightly before the edge), the class
  // .is-visible is added. CSS transitions on opacity + transform do the rest.
  // The observer is disconnected per-element (one-shot) so re-scrolling up and
  // back down won't replay the animation.
  //
  // Stagger: controlled purely via the --slot-delay CSS custom property set as
  // an inline style on each element. No JS timing needed.
  // ─────────────────────────────────────────────────────────────────────────────

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12,
    }
  );

  document.querySelectorAll('.slot-in').forEach(function (el) {
    io.observe(el);
  });
})();
