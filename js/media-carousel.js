(function () {
  'use strict';

  // Keep this list in sync with files inside /MEDIA.
  var MEDIA_FILES = [
    'Screenshot 2025-11-28 170757.png',
    'Screenshot 2025-11-28 170855.png',
    'Screenshot 2025-12-11 173548.png',
    'Screenshot 2025-12-11 181634.png',
    'Screenshot 2025-12-11 182402.png',
    'Screenshot 2025-12-11 183052.png',
    'Screenshot 2025-12-11 183925.png',
    'Screenshot 2025-12-11 185008.png',
    'Screenshot 2025-12-12 095922.png',
    'Screenshot 2025-12-12 104706.png',
    'Screenshot 2026-01-14 144250.png',
    'Screenshot 2026-01-15 155926.png',
    'Screenshot 2026-02-01 225052.png',
    'Screenshot 2026-02-02 111900.png',
    'Screenshot 2026-02-09 144307.png',
    'Screenshot 2026-02-11 100219.png',
    'Screenshot 2026-02-12 115749.png',
    'Screenshot 2026-02-23 153431.png',
    'Screenshot 2026-03-13 133218.png',
    'Screenshot 2026-03-13 133357.png',
    'Screenshot 2026-03-13 133532.png'
  ];

  var root = document.getElementById('media-carousel');
  var track = document.getElementById('media-carousel-track');
  var status = document.getElementById('media-carousel-status');
  var counter = document.getElementById('media-carousel-counter');

  if (!root || !track || !MEDIA_FILES.length) return;

  function shuffle(list) {
    var arr = list.slice();
    for (var i = arr.length - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  function displayName(fileName) {
    return fileName.replace(/\.[^.]+$/, '').replace(/^Screenshot\s*/, 'SHOT_');
  }

  function clamp(num, min, max) {
    return Math.max(min, Math.min(max, num));
  }

  var files = shuffle(MEDIA_FILES);
  var slides = [];
  var index = 0;
  var autoTimer = null;
  var total = files.length;
  var isDragging = false;
  var dragPointerId = null;
  var dragLastX = 0;
  var dragLastY = 0;
  var dragAccumX = 0;
  var dragAccumY = 0;
  var DRAG_STEP_PX = 44;

  files.forEach(function (fileName, i) {
    var figure = document.createElement('figure');
    figure.className = 'media-slide';
    figure.setAttribute('role', 'group');
    figure.setAttribute('aria-label', 'Screenshot ' + (i + 1) + ' of ' + total);

    var img = document.createElement('img');
    img.src = 'MEDIA/' + encodeURIComponent(fileName);
    img.alt = 'Project screenshot ' + (i + 1);
    img.loading = i < 3 ? 'eager' : 'lazy';
    img.decoding = 'async';
    img.addEventListener('load', function () {
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        figure.dataset.ratio = String(img.naturalWidth / img.naturalHeight);
        if (figure.classList.contains('is-active')) layout();
      }
    });

    var cap = document.createElement('figcaption');
    cap.textContent = displayName(fileName);

    figure.appendChild(img);
    figure.appendChild(cap);
    track.appendChild(figure);
    slides.push(figure);
  });

  function updateText() {
    if (counter) counter.textContent = (index + 1) + ' / ' + total;
    if (status) {
      status.textContent = '[ STREAM_ACTIVE :: ITEM_' + String(index + 1).padStart(2, '0') + ' ]';
    }
  }

  function relOffset(from, to, size) {
    var raw = to - from;
    if (raw > size / 2) raw -= size;
    if (raw < -size / 2) raw += size;
    return raw;
  }

  function layout() {
    var width = root.clientWidth || window.innerWidth;
    var viewport = root.querySelector('.media-carousel-viewport');
    var viewportHeight = viewport ? viewport.clientHeight : Math.round(window.innerHeight * 0.55);
    var spacing = Math.min(330, Math.max(140, width * 0.23));
    var zStep = Math.min(210, Math.max(95, width * 0.13));
    var baseW = clamp(width * 0.28, 210, 470);
    var baseH = clamp(width * 0.18, 130, 280);
    var activeMaxW = clamp(width * 0.8, 320, 980);
    var activeMaxH = clamp(viewportHeight * 0.84, 190, 520);

    slides.forEach(function (slide, i) {
      var rel = relOffset(index, i, total);
      var isActive = rel === 0;
      var abs = Math.abs(rel);
      var x = rel * spacing;
      var z = 220 - abs * zStep;
      var y = abs > 0 ? abs * 6 : 0;
      var rotY = rel * -14;
      var rotX = abs * 1.3;
      var scale = Math.max(0.42, 1 - abs * 0.095);
      var opacity = Math.max(0.07, 1 - abs * 0.22);
      var blur = Math.min(4.5, abs * 1.05);
      var ratio = Number(slide.dataset.ratio) || (16 / 9);
      var slideW = baseW;
      var slideH = baseH;

      if (isActive) {
        slideW = activeMaxW;
        slideH = slideW / ratio;

        if (slideH > activeMaxH) {
          slideH = activeMaxH;
          slideW = slideH * ratio;
        }

        slideW = clamp(slideW, 220, activeMaxW);
        slideH = clamp(slideH, 140, activeMaxH);
      }

      slide.style.setProperty('--slide-w', slideW.toFixed(2) + 'px');
      slide.style.setProperty('--slide-h', slideH.toFixed(2) + 'px');

      slide.style.transform =
        'translate3d(' + x + 'px,' + y + 'px,' + z + 'px) ' +
        'rotateY(' + rotY + 'deg) rotateX(' + rotX + 'deg) scale(' + scale + ')';
      slide.style.opacity = String(opacity);
      slide.style.filter = 'blur(' + blur + 'px)';
      slide.style.zIndex = String(1000 - Math.floor(abs * 10));
      slide.classList.toggle('is-active', isActive);
    });

    updateText();
  }

  function step(dir) {
    index = (index + dir + total) % total;
    layout();
    if (window.SFX && typeof window.SFX.play === 'function') {
      window.SFX.play('hover');
    }
  }

  function pauseAuto() {
    if (autoTimer) {
      window.clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  function startAuto() {
    pauseAuto();
    autoTimer = window.setInterval(function () {
      step(1);
    }, 2800);
  }

  root.addEventListener('dragstart', function (event) {
    event.preventDefault();
  });

  root.addEventListener('pointerdown', function (event) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    isDragging = true;
    dragPointerId = event.pointerId;
    dragLastX = event.clientX;
    dragLastY = event.clientY;
    dragAccumX = 0;
    dragAccumY = 0;

    root.classList.add('is-dragging');
    root.setPointerCapture(event.pointerId);
    pauseAuto();
  });

  root.addEventListener('pointermove', function (event) {
    if (!isDragging || event.pointerId !== dragPointerId) return;

    var dx = event.clientX - dragLastX;
    var dy = event.clientY - dragLastY;
    dragLastX = event.clientX;
    dragLastY = event.clientY;

    dragAccumX += dx;
    dragAccumY += dy;

    // Advance when horizontal drag crosses threshold.
    if (Math.abs(dragAccumX) >= DRAG_STEP_PX && Math.abs(dragAccumX) > Math.abs(dragAccumY) * 0.6) {
      step(dragAccumX < 0 ? 1 : -1);
      dragAccumX = 0;
      dragAccumY = 0;
    }
  });

  function endDrag(event) {
    if (!isDragging || event.pointerId !== dragPointerId) return;

    isDragging = false;
    dragPointerId = null;
    dragAccumX = 0;
    dragAccumY = 0;
    root.classList.remove('is-dragging');
    startAuto();
  }

  root.addEventListener('pointerup', endDrag);
  root.addEventListener('pointercancel', endDrag);

  root.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      step(1);
      startAuto();
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      step(-1);
      startAuto();
    }
  });

  root.addEventListener('mouseenter', pauseAuto);
  root.addEventListener('mouseleave', startAuto);

  window.addEventListener('resize', layout);

  layout();
  startAuto();
})();
