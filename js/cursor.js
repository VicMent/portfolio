(function () {
  'use strict';

  var cursor = document.getElementById('custom-cursor');
  if (!cursor) return;

  // Mobile/touch devices should keep the native cursor behavior.
  if (window.matchMedia('(pointer: coarse)').matches) {
    cursor.style.display = 'none';
    return;
  }

  // ── Position state ────────────────────────────────────────────────────────
  var tx = -200, ty = -200;   // mouse target
  var cx = -200, cy = -200;   // current (lerped)
  var LERP = 0.28;            // 0 = never catches up, 1 = instant
  var HALF = 18;              // half of cursor width/height (36 / 2)
  var firstMove = false;

  // ── Mouse tracking ────────────────────────────────────────────────────────
  document.addEventListener('mousemove', function (e) {
    tx = e.clientX;
    ty = e.clientY;
    if (!firstMove) {
      // Snap on first move so it doesn't fly in from offscreen
      cx = tx;
      cy = ty;
      cursor.style.opacity = '1';
      firstMove = true;
    }
  });

  document.addEventListener('mouseleave', function () {
    cursor.style.opacity = '0';
  });

  document.addEventListener('mouseenter', function () {
    if (firstMove) cursor.style.opacity = '1';
  });

  // ── Render loop ───────────────────────────────────────────────────────────
  (function tick() {
    // Lerp toward target
    cx += (tx - cx) * LERP;
    cy += (ty - cy) * LERP;

    // Snap when close enough to avoid infinite micro-drift
    if (Math.abs(tx - cx) < 0.08) cx = tx;
    if (Math.abs(ty - cy) < 0.08) cy = ty;

    cursor.style.transform =
      'translate(' + Math.round(cx - HALF) + 'px,' + Math.round(cy - HALF) + 'px)';

    requestAnimationFrame(tick);
  })();

  // ── Click pulse ───────────────────────────────────────────────────────────
  document.addEventListener('mousedown', function () {
    cursor.classList.add('is-clicking');
  });

  document.addEventListener('mouseup', function () {
    cursor.classList.remove('is-clicking');
  });

  // ── Hover state ───────────────────────────────────────────────────────────
  //  Fires on any element that's interactive (or explicitly marked as such)
  var INTERACTIVE =
    'a, button, input, textarea, select, label, ' +
    '[role="button"], [role="link"], [tabindex], ' +
    '.screen-buddy, .terminal-nav-link, .contact-submit';

  document.addEventListener('mouseover', function (e) {
    if (e.target.matches(INTERACTIVE) || e.target.closest(INTERACTIVE)) {
      cursor.classList.add('is-hovering');
    }
  });

  document.addEventListener('mouseout', function (e) {
    if (e.target.matches(INTERACTIVE) || e.target.closest(INTERACTIVE)) {
      cursor.classList.remove('is-hovering');
    }
  });
})();
