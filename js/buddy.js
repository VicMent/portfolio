(function () {
  const CONFIG = window.PORTFOLIO_CONFIG || {};
  const buddyConfig = CONFIG.buddy || {};

  const buddy = document.getElementById("screen-buddy");
  if (!buddy) return;

  const pre = buddy.querySelector("pre");
  if (!pre) return;

  const glyphLayer = document.getElementById("glyph-layer");
  const scoreHud = document.getElementById("score-hud");

  const glyphChars = ["*", "+", "#", "%", "$", "@"];
  const glyphs = [];
  let glyphSpawnTimer = 0;
  const GLYPH_SPAWN_INTERVAL = 3.5; // seconds
  const GLYPH_MAX = 10;
  const GLYPH_FLOAT_AMPLITUDE = 10;
  const GLYPH_FLOAT_SPEED = 1;
  const GLYPH_GRAVITY = 1400; // px/s^2
  let score = 0;

  const sprites = {
    idle: " /\\_/\\\n( -.- )\n > ^ <",
    right: " /\\_/\\\n( o.> )\n > ^ <",
    left: " /\\_/\\\n( <.o )\n > ^ <",
    up: " /\\_/\\\n( o.o )\n  ^ ^ ",
    down: " /\\_/\\\n( o.o )\n v   v",
  };

  let currentSprite = "idle";

  function setSprite(name) {
    if (currentSprite === name || !sprites[name]) return;
    currentSprite = name;
    pre.textContent = sprites[name];
  }

  let x = window.innerWidth / 2;
  let y = window.innerHeight - 60;
  const baseWander = typeof buddyConfig.wanderSpeed === "number" ? buddyConfig.wanderSpeed : 60;
  let vx = baseWander; // initial horizontal wander speed
  let vy = 0;
  const gravity = typeof buddyConfig.gravity === "number" ? buddyConfig.gravity : 2200; // px/s^2
  const bounceFactor = typeof buddyConfig.bounceFactor === "number" ? buddyConfig.bounceFactor : 0.35;
  const throwPower = typeof buddyConfig.throwPower === "number" ? buddyConfig.throwPower : 1.0;
  const floorOffset = 40; // distance from bottom of viewport

  let lastTime = 0;
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let lastDragX = 0;
  let lastDragY = 0;
  let lastDragTime = 0;
  let isOnGround = true;

  function updateScore(delta) {
    score += delta;
    if (score < 0) score = 0;
    if (scoreHud) {
      const padded = String(score).padStart(3, "0");
      scoreHud.textContent = `SCORE ${padded}`;
    }
  }

  function getFloorY() {
    return window.innerHeight - floorOffset;
  }

  function applyPosition() {
    buddy.style.transform = `translate(${x}px, ${y}px)`;
  }

  function spawnGlyph() {
    if (!glyphLayer) return;
    if (glyphs.length >= GLYPH_MAX) return;

    const side = Math.random() > 0.5 ? "left" : "right";
    const margin = 28;
    const minY = 80;
    const maxY = window.innerHeight - 120;
    const yPos = Math.random() * (maxY - minY) + minY;

    const el = document.createElement("div");
    el.className = "float-glyph";
    el.textContent = glyphChars[Math.floor(Math.random() * glyphChars.length)];
    glyphLayer.appendChild(el);

    const width = el.offsetWidth || 10;
    const xPos = side === "left"
      ? margin + width / 2
      : window.innerWidth - margin - width / 2;

    const glyph = {
      el,
      x: xPos,
      originY: yPos,
      y: yPos,
      vy: 0,
      floatPhase: Math.random() * Math.PI * 2,
      state: "floating", // "floating" | "falling" | "resting" | "collected"
    };

    el.style.transform = `translate(${glyph.x}px, ${glyph.y}px)`;

    el.addEventListener("click", () => {
      if (glyph.state === "collected") return;
      glyph.state = "falling";
      glyph.vy = 0;
    });

    glyphs.push(glyph);
  }

  function step(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    if (!isDragging) {
      // simple horizontal wandering when grounded
      if (isOnGround && Math.abs(vx) < 20) {
        vx = (Math.random() > 0.5 ? 1 : -1) * baseWander;
      }

      // gravity
      if (!isOnGround) {
        vy += gravity * dt;
      }

      x += vx * dt;
      y += vy * dt;

      const width = buddy.offsetWidth || 60;
      const floorY = getFloorY();

      // floor collision
      if (y >= floorY) {
        y = floorY;
        if (vy > 0) {
          vy *= -bounceFactor; // bounce
          if (window.SFX) window.SFX.play('bounce');
        }
        if (Math.abs(vy) < 40) {
          vy = 0;
          isOnGround = true;
        }
      }

      // side walls bounce
      const minX = width / 2 + 8;
      const maxX = window.innerWidth - width / 2 - 8;
      if (x < minX) {
        x = minX;
        vx = Math.abs(vx);
      } else if (x > maxX) {
        x = maxX;
        vx = -Math.abs(vx);
      }
    }

    // Floating glyphs: spawn, move, fall, and detect collisions with buddy
    const dtClamped = Math.min(dt, 0.05);
    glyphSpawnTimer += dtClamped;
    if (glyphSpawnTimer >= GLYPH_SPAWN_INTERVAL) {
      glyphSpawnTimer = 0;
      spawnGlyph();
    }

    const buddyWidth = buddy.offsetWidth || 60;
    const buddyHeight = buddy.offsetHeight || 40;
    const buddyCenterX = x + buddyWidth / 2;
    const buddyCenterY = y + buddyHeight / 2;
    const hitRadius = 40;

    const floorY = getFloorY();

    for (const glyph of glyphs) {
      if (glyph.state === "collected") continue;

      if (glyph.state === "floating") {
        glyph.floatPhase += GLYPH_FLOAT_SPEED * dtClamped;
        glyph.y = glyph.originY + Math.sin(glyph.floatPhase) * GLYPH_FLOAT_AMPLITUDE;
      } else if (glyph.state === "falling") {
        glyph.vy += GLYPH_GRAVITY * dtClamped;
        glyph.y += glyph.vy * dtClamped;
        if (glyph.y >= floorY) {
          glyph.y = floorY;
          glyph.vy = 0;
          glyph.state = "resting";
        }
      }

      glyph.el.style.transform = `translate(${glyph.x}px, ${glyph.y}px)`;

      // Collision with buddy
      const dx = buddyCenterX - glyph.x;
      const dy = buddyCenterY - glyph.y;
      if (dx * dx + dy * dy <= hitRadius * hitRadius) {
        glyph.state = "collected";
        glyph.el.classList.add("is-collected");
        updateScore(1);
      }
    }

    // Decide sprite based on movement
    const speed = Math.hypot(vx, vy);
    const minSpeed = 20;
    if (isOnGround && speed < minSpeed) {
      setSprite("idle");
    } else if (Math.abs(vx) >= Math.abs(vy)) {
      setSprite(vx >= 0 ? "right" : "left");
    } else if (vy < 0) {
      setSprite("up");
    } else {
      setSprite("down");
    }

    applyPosition();
    window.requestAnimationFrame(step);
  }

  // Drag & throw
  buddy.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    buddy.setPointerCapture(event.pointerId);
    isDragging = true;
    isOnGround = false;
    vx = 0;
    vy = 0;
    dragOffsetX = x - event.clientX;
    dragOffsetY = y - event.clientY;
    lastDragX = event.clientX;
    lastDragY = event.clientY;
    lastDragTime = performance.now();
  });

  buddy.addEventListener("pointermove", (event) => {
    if (!isDragging) return;
    const now = performance.now();
    const dt = (now - lastDragTime) / 1000 || 0.016;

    const newX = event.clientX + dragOffsetX;
    const newY = event.clientY + dragOffsetY;

    // compute velocity from drag movement for throw
    vx = ((newX - x) / dt) * throwPower;
    vy = ((newY - y) / dt) * throwPower;

    x = newX;
    y = newY;
    lastDragX = event.clientX;
    lastDragY = event.clientY;
    lastDragTime = now;
    applyPosition();
  });

  function endDrag(event) {
    if (!isDragging) return;
    isDragging = false;
    try {
      buddy.releasePointerCapture(event.pointerId);
    } catch (_) {
      // ignore
    }
  }

  buddy.addEventListener("pointerup", endDrag);
  buddy.addEventListener("pointercancel", endDrag);

  // When scrolling, knock the buddy off any ledge so gravity pulls it down again
  window.addEventListener("scroll", () => {
    // Any scroll gives a little jolt so he reacts
    isOnGround = false;
    vy += gravity * 0.03;
  });

  window.addEventListener("resize", () => {
    // keep buddy within new viewport
    const width = buddy.offsetWidth || 60;
    const minX = width / 2 + 8;
    const maxX = window.innerWidth - width / 2 - 8;
    if (x < minX) x = minX;
    if (x > maxX) x = maxX;
    const floorY = getFloorY();
    if (y > floorY) y = floorY;
    applyPosition();
  });

  applyPosition();
  window.requestAnimationFrame(step);
})();
