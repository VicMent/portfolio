window.PORTFOLIO_CONFIG = {
  asciiAnimation: {
    // Interval between ASCII frames in milliseconds
    intervalMs: 400,
  },
  cursorTrail: {
    // Minimum time between new dots (ms)
    throttleMs: 1,
    // Maximum number of dots on screen at once
    maxDots: 50,
  },
  loader: {
    // Maximum random increment per fake loading tick
    fakeStepMax: 12,
    // Ceiling to stop at while waiting for real load
    fakeCeiling: 90,
  },
  buddy: {
    // Gravity in px/s^2
    gravity: 2200,
    // Energy retained after a bounce (0-1)
    bounceFactor: 0.35,
    // Base horizontal wander speed when on ground
    wanderSpeed: 60,
    // Scale of velocity when you throw him
    throwPower: 0.2,
  },
};
