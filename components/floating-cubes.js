class FloatingCubes extends HTMLElement {
  // Settings for easy adjustment
  static get settings() {
    return {
      cubeCount: 40,
      cubeMinSize: 1.5,
      cubeMaxSize: 3.5,
      cubeColors: [
        0x00ff9d, // Neon Green
        0x00bfff, // Neon Blue
      ],
      cubeAreaWidthPercent: 5.6, // Cubes appear within 60% of the screen width (centered)
      floatRangeMin: 4,
      floatRangeMax: 20,
      floatSpeedMin: 0.2,
      floatSpeedMax: 0.7,
      opacity: 0.7,
      zIndex: -1
    };
  }

  connectedCallback() {
    // Apply z-index and pointer events
    this.style.position = "fixed";
    this.style.top = "0";
    this.style.left = "0";
    this.style.width = "100vw";
    this.style.height = "100vh";
    this.style.pointerEvents = "none";
    this.style.zIndex = FloatingCubes.settings.zIndex;
    this.innerHTML = `<canvas id="cubes-canvas" style="width:100vw;height:100vh;display:block;"></canvas>`;
    this.initCubes();
  }

  initCubes() {
    // Wait for three.js to be loaded
    if (!window.THREE) {
      setTimeout(() => this.initCubes(), 100);
      return;
    }

    const settings = FloatingCubes.settings;
    const canvas = this.querySelector("#cubes-canvas");
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0); // transparent
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 80;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Cubes
    const cubes = [];
    const createCubes = () => {
      // Remove old cubes if any
      cubes.forEach(cube => scene.remove(cube));
      cubes.length = 0;

      const width = window.innerWidth;
      const height = window.innerHeight;
      // Calculate the area where cubes can appear (centered)
      const areaWidth = width * settings.cubeAreaWidthPercent;
      const areaLeft = -((areaWidth / width) * 40) / 2; // -X in world units
      const areaRight = ((areaWidth / width) * 40) / 2; // +X in world units

      for (let i = 0; i < settings.cubeCount; i++) {
        const size = Math.random() * (settings.cubeMaxSize - settings.cubeMinSize) + settings.cubeMinSize;
        const geometry = new THREE.BoxGeometry(size, size, size);
        const material = new THREE.MeshStandardMaterial({
          color: settings.cubeColors[i % settings.cubeColors.length],
          metalness: 0.5,
          roughness: 0.3,
          transparent: true,
          opacity: settings.opacity
        });
        const cube = new THREE.Mesh(geometry, material);

        // X: random within the allowed area (centered)
        const x = areaLeft + Math.random() * (areaRight - areaLeft);
        // Y: random vertical position
        const y = (Math.random() - 0.5) * 40;
        // Z: random depth
        const z = (Math.random() - 0.5) * 40;
        cube.position.set(x, y, z);

        // Give each cube a random rotation speed and direction
        cube.userData = {
          rotX: (Math.random() - 0.5) * 0.01,
          rotY: (Math.random() - 0.5) * 0.01,
          baseY: y,
          floatRange: Math.random() * (settings.floatRangeMax - settings.floatRangeMin) + settings.floatRangeMin,
          floatSpeed: Math.random() * (settings.floatSpeedMax - settings.floatSpeedMin) + settings.floatSpeedMin,
          floatPhase: Math.random() * Math.PI * 2,
          scrollFactor: Math.random() * 0.5 + 0.5 // Each cube reacts differently to scroll
        };

        cubes.push(cube);
        scene.add(cube);
      }
    };

    createCubes();

    // Track scroll position
    let lastScrollY = window.scrollY;
    let scrollDelta = 0;
    let scrollTarget = 0;

    function onScroll() {
      scrollTarget = window.scrollY;
    }
    window.addEventListener("scroll", onScroll);

    // Animation loop
    function animate(time) {
      time = time * 0.001;
      // Smooth scroll delta for physics-like effect
      scrollDelta += (scrollTarget - scrollDelta) * 0.08;

      cubes.forEach(cube => {
        cube.rotation.x += cube.userData.rotX;
        cube.rotation.y += cube.userData.rotY;
        // Floating up and down, plus scroll influence
        const scrollInfluence = scrollDelta * 0.04 * cube.userData.scrollFactor;
        cube.position.y = cube.userData.baseY +
          Math.sin(time * cube.userData.floatSpeed + cube.userData.floatPhase) * cube.userData.floatRange +
          scrollInfluence;
      });
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    // Handle resize responsively
    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      createCubes();
    });
  }
}
customElements.define('floating-cubes', FloatingCubes);