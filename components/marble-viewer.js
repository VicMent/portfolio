// filepath: marble-viewer.js

class MarbleViewer extends HTMLElement {
  connectedCallback() {
    this.style.display = "block";
    this.style.width = "150%";
    this.style.height = "100%";
    this.innerHTML = `<canvas id="marble-canvas" style="width:100%;height:100%;display:block;"></canvas>`;
    this.initViewer();
  }

  initViewer() {
    if (!window.THREE || !window.THREE.GLTFLoader) {
      setTimeout(() => this.initViewer(), 100);
      return;
    }

    const canvas = this.querySelector("#marble-canvas");
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(this.clientWidth, this.clientHeight);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      this.clientWidth / this.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 4);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(2, 4, 5);
    scene.add(dirLight);

    // Load marble.glb
    const loader = new THREE.GLTFLoader();
    let marble = null;
    loader.load(
      "assets/marble.glb", // <-- use this path if marble.glb is in the assets folder
      gltf => {
        marble = gltf.scene;
        marble.traverse(obj => {
          if (obj.isMesh) {
            obj.castShadow = true;
            obj.receiveShadow = true;
          }
        });
        scene.add(marble);
      },
      undefined,
      error => {
        console.error("Failed to load marble.glb:", error);
      }
    );

    // Controls
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let rotationY = 0;
    let rotationX = 0;
    let autoSpin = 0.01;

    const onPointerDown = e => {
      isDragging = true;
      lastX = e.clientX || e.touches?.[0]?.clientX || 0;
      lastY = e.clientY || e.touches?.[0]?.clientY || 0;
    };

    const onPointerMove = e => {
      if (!isDragging || !marble) return;
      const x = e.clientX || e.touches?.[0]?.clientX || 0;
      const y = e.clientY || e.touches?.[0]?.clientY || 0;
      const dx = (x - lastX) * 0.01;
      const dy = (y - lastY) * 0.01;
      rotationY += dx;
      rotationX += dy;
      rotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotationX));
      lastX = x;
      lastY = y;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    canvas.addEventListener("mousedown", onPointerDown);
    canvas.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    canvas.addEventListener("touchstart", onPointerDown, { passive: false });
    canvas.addEventListener("touchmove", onPointerMove, { passive: false });
    window.addEventListener("touchend", onPointerUp);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (marble) {
        if (!isDragging) rotationY += autoSpin;
        marble.rotation.y = rotationY;
        marble.rotation.x = rotationX;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Responsive resize
    const onResize = () => {
      renderer.setSize(this.clientWidth, this.clientHeight);
      camera.aspect = this.clientWidth / this.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);
  }
}

customElements.define("marble-viewer", MarbleViewer);