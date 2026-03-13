(function () {
  'use strict';

  // ── AudioContext (lazy — created on first user gesture) ───────────────────
  var ctx = null;
  var muted = false;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  // ── Synth primitives ──────────────────────────────────────────────────────

  /*
   * tone(freq, endFreq, type, vol, dur, attack)
   *   Plays a single oscillator that frequency-sweeps from freq → endFreq.
   *   Envelope: hard attack → exponential decay to silence.
   */
  function tone(freq, endFreq, type, vol, dur, attack) {
    if (muted) return;
    var ac = getCtx();
    var osc  = ac.createOscillator();
    var gain = ac.createGain();
    osc.connect(gain);
    gain.connect(ac.destination);

    var t   = ac.currentTime;
    var atk = attack || 0.005;

    osc.type = type || 'square';
    osc.frequency.setValueAtTime(freq, t);
    if (endFreq !== freq) {
      osc.frequency.linearRampToValueAtTime(endFreq, t + dur);
    }

    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(vol, t + atk);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  /*
   * seq(notes, noteLen)
   *   Schedules an array of {freq, type?, vol?} objects as a rapid arpeggio,
   *   each note noteLen seconds apart. Classic 8-bit jingle / coin sound.
   */
  function seq(notes, noteLen) {
    if (muted) return;
    var ac = getCtx();
    notes.forEach(function (note, i) {
      var t    = ac.currentTime + i * noteLen;
      var osc  = ac.createOscillator();
      var gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.type = note.type || 'square';
      osc.frequency.setValueAtTime(note.freq, t);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(note.vol || 0.08, t + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + noteLen * 0.88);
      osc.start(t);
      osc.stop(t + noteLen);
    });
  }

  // ── Sound library ─────────────────────────────────────────────────────────
  //   Each entry is a self-contained function — easy to tune independently.

  var SND = {

    // Nav cursor-move tick: short square blip ascending
    hover: function () {
      tone(523, 659, 'square', 0.032, 0.055, 0.003);
    },

    // Nav confirm click: quick three-note rising chip arpeggio
    click: function () {
      seq([{ freq: 659 }, { freq: 784 }, { freq: 1047 }], 0.046);
    },

    // Buddy lifted: triangle pop (soft, percussive)
    pickup: function () {
      tone(294, 523, 'triangle', 0.07, 0.14, 0.005);
    },

    // Buddy released / thrown: sawtooth descending whoosh
    throw: function () {
      tone(440, 165, 'sawtooth', 0.052, 0.22, 0.008);
    },

    // Buddy hits the floor: low square blip down
    bounce: function () {
      tone(220, 110, 'square', 0.042, 0.09, 0.003);
    },

    // Glyph tapped: short triangle ping
    tap: function () {
      tone(880, 880, 'triangle', 0.028, 0.07, 0.003);
    },

    // Glyph collected: 4-note coin arpeggio
    collect: function () {
      seq([
        { freq: 523 },
        { freq: 659 },
        { freq: 784 },
        { freq: 1047 },
      ], 0.055);
    },

    // Loader done: 5-note ascending boot jingle
    boot: function () {
      seq([
        { freq: 262 },
        { freq: 330 },
        { freq: 392 },
        { freq: 523 },
        { freq: 659, vol: 0.10 },
      ], 0.1);
    },

    // Slot-in element enters viewport: quick triangle scan beep
    scan: function () {
      tone(880, 1100, 'triangle', 0.022, 0.07, 0.004);
    },

    // Form field focused: quiet square tick
    formfocus: function () {
      tone(330, 330, 'square', 0.022, 0.05, 0.003);
    },

    // Form submitted: 5-note victory fanfare
    formsubmit: function () {
      seq([
        { freq: 523 },
        { freq: 659 },
        { freq: 784 },
        { freq: 1047 },
        { freq: 1319, vol: 0.10 },
      ], 0.075);
    },
  };

  // ── Public API ────────────────────────────────────────────────────────────

  window.SFX = {
    play:    function (name) { if (SND[name]) SND[name](); },
    mute:    function () { muted = true; },
    unmute:  function () { muted = false; },
    toggle:  function () { muted = !muted; return muted; },
    isMuted: function () { return muted; },
  };

  // ── Initialise AudioContext on first pointer interaction ──────────────────

  document.addEventListener('pointerdown', function () { getCtx(); }, { once: true });

  // ── Nav links ─────────────────────────────────────────────────────────────

  document.querySelectorAll('.terminal-nav-link').forEach(function (btn) {
    if (btn.id === 'sfx-toggle') return; // handled separately below
    btn.addEventListener('mouseenter', function () { window.SFX.play('hover'); });
    btn.addEventListener('click',      function () { window.SFX.play('click'); });
  });

  // ── Mute toggle button ────────────────────────────────────────────────────

  var muteBtn = document.getElementById('sfx-toggle');

  function syncMuteBtn(nowMuted) {
    if (!muteBtn) return;
    muteBtn.textContent = nowMuted ? '[♪ OFF]' : '[♪ ON]';
    muteBtn.classList.toggle('is-muted', nowMuted);
    muteBtn.setAttribute('aria-label', nowMuted ? 'Unmute sound effects' : 'Mute sound effects');
  }

  if (muteBtn) {
    muteBtn.addEventListener('click', function () {
      var nowMuted = window.SFX.toggle();
      syncMuteBtn(nowMuted);
      if (!nowMuted) window.SFX.play('hover'); // audible confirmation of unmute
    });
  }

  // M key shortcut (ignored when typing in inputs)
  document.addEventListener('keydown', function (e) {
    if ((e.key !== 'm' && e.key !== 'M') || e.target.closest('input, textarea')) return;
    var nowMuted = window.SFX.toggle();
    syncMuteBtn(nowMuted);
    if (!nowMuted) window.SFX.play('hover');
  });

  // ── Contact form ──────────────────────────────────────────────────────────

  document.querySelectorAll('.contact-input, .contact-textarea').forEach(function (el) {
    el.addEventListener('focus', function () { window.SFX.play('formfocus'); });
  });

  var contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function () { window.SFX.play('formsubmit'); });
  }

  // ── Buddy: pickup + throw ─────────────────────────────────────────────────
  // (bounce is called from buddy.js directly via window.SFX.play)

  var buddy = document.getElementById('screen-buddy');
  if (buddy) {
    buddy.addEventListener('pointerdown', function () { window.SFX.play('pickup'); });
    buddy.addEventListener('pointerup',   function () { window.SFX.play('throw'); });
  }

  // ── Glyphs: tap sound on click, collect sound when buddy grabs them ───────

  var glyphLayer = document.getElementById('glyph-layer');
  if (glyphLayer) {
    new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        // Newly spawned glyph → hook its click for the tap sound
        m.addedNodes.forEach(function (node) {
          if (node.classList && node.classList.contains('float-glyph')) {
            node.addEventListener('click', function () {
              window.SFX.play('tap');
            });
          }
        });
        // Class changed on an existing glyph → fired when is-collected is added
        if (m.type === 'attributes' && m.target.classList.contains('is-collected')) {
          window.SFX.play('collect');
        }
      });
    }).observe(glyphLayer, {
      childList: true,
      subtree:   true,
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  // ── Loader: boot jingle once the bar hits 100% ────────────────────────────

  var loader = document.getElementById('loader');
  if (loader) {
    new MutationObserver(function (mutations, obs) {
      mutations.forEach(function (m) {
        if (m.target.classList.contains('is-hidden')) {
          window.SFX.play('boot');
          obs.disconnect();
        }
      });
    }).observe(loader, { attributes: true, attributeFilter: ['class'] });
  }

  // ── Scroll: single scan blip per scroll gesture (debounced) ─────────────
  //   Fires once when the user starts scrolling, then won't fire again until
  //   800 ms after scrolling fully stops — so rapid scrolling = one beep.

  var scrollActive = false;
  var scrollCooldown = null;

  window.addEventListener('scroll', function () {
    if (!scrollActive) {
      window.SFX.play('scan');
      scrollActive = true;
    }
    clearTimeout(scrollCooldown);
    scrollCooldown = setTimeout(function () {
      scrollActive = false;
    }, 800);
  }, { passive: true });

})();
