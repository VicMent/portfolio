/**
 * model-showcase.js
 * Three.js FBX wireframe viewer with PBR texture-set support.
 *
 * ── Adding / swapping texture sets ────────────────────────────
 * Each entry in SHOWCASE_TEXTURES is one full PBR material set.
 * All keys are optional — omit any you don't have.
 *
 * Example (add to SHOWCASE_TEXTURES array):
 * {
 *   label:        'SKIN_B',
 *   baseColor:    'showcase/textures/skin_b_BaseColor.png',
 *   normal:       'showcase/textures/skin_b_Normal.png',
 *   roughness:    'showcase/textures/skin_b_Roughness.png',
 *   metalness:    'showcase/textures/skin_b_Metallic.png',
 *   emission:     'showcase/textures/skin_b_Emission.png',
 *   alpha:        'showcase/textures/skin_b_Alpha.png',
 * }
 *
 * A toggle button per set appears automatically in the controls
 * bar once more than one set is registered.
 * ──────────────────────────────────────────────────────────────
 */

import * as THREE from 'three';
import { FBXLoader }      from 'three/addons/loaders/FBXLoader.js';
import { OrbitControls }  from 'three/addons/controls/OrbitControls.js';

/* ─── Config ──────────────────────────────────────────────────── */

const MODEL_PATH       = 'showcase/OrkTEST_low.fbx';
const AUTO_ROTATE_SPEED = 0.6; // OrbitControls autoRotateSpeed units

/**
 * Texture sets. Each entry becomes one "skin" the user can select.
 * Keys map directly to MeshStandardMaterial map slots.
 * All keys are optional — omit what you don't have.
 *
 * Supported keys:
 *   baseColor, normal, roughness, metalness, emission, alpha
 */
const SHOWCASE_TEXTURES = [
  {
    label:     'TEST_PBR',
    baseColor: 'showcase/textures/test_BaseColor.png',
    normal:    'showcase/textures/test_Normal.png',
    roughness: 'showcase/textures/test_Roughness.png',
    metalness: 'showcase/textures/test_Metallic.png',
    emission:  'showcase/textures/test_Emission.png',
    alpha:     'showcase/textures/test_Alpha.png',
  },
];

/* ─── DOM refs ────────────────────────────────────────────────── */

const canvas          = document.getElementById('showcase-canvas');
const loaderOverlay   = document.getElementById('showcase-loader');
const loaderText      = loaderOverlay.querySelector('span');
const polyVal         = document.getElementById('showcase-poly');
const vertVal         = document.getElementById('showcase-vert');
const renderModeVal   = document.getElementById('showcase-render-mode');
const modeButtons     = document.querySelectorAll('.showcase-mode-btn');
const textureSlider   = document.getElementById('showcase-texture-slider');

/* ─── Renderer ────────────────────────────────────────────────── */

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);

/* ─── Scene ───────────────────────────────────────────────────── */

const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 5000);
camera.position.set(0, 40, 260);

/* ─── Lighting (used only in textured mode) ───────────────────── */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(80, 120, 80);
scene.add(dirLight);

/* ─── Controls ────────────────────────────────────────────────── */

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping    = true;
controls.dampingFactor    = 0.07;
controls.enableZoom       = true;
controls.minDistance      = 60;
controls.maxDistance      = 1200;
controls.autoRotate       = true;
controls.autoRotateSpeed  = AUTO_ROTATE_SPEED;

/* ─── State ───────────────────────────────────────────────────── */

let rootObject    = null;
let currentMode   = 'textured';
/**
 * loadedMaps[i] = { baseColor: Texture|null, normal: Texture|null, ... }
 * Parallel to SHOWCASE_TEXTURES.
 */
const loadedMaps  = [];

/* ─── Theme colour helper ─────────────────────────────────────── */

function getThemeColor() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-primary').trim();
  return new THREE.Color(raw.length ? raw : '#00ff66');
}

/* ─── Material factories ──────────────────────────────────────── */

function makeWireframeMat() {
  return new THREE.MeshBasicMaterial({
    color:     getThemeColor(),
    wireframe: true,
  });
}

/**
 * Build a full PBR MeshStandardMaterial from a loaded map-set object.
 * @param {Object} maps  – loadedMaps[i]
 */
function makeTexturedMat(maps) {
  const mat = new THREE.MeshStandardMaterial({
    roughness: 1,
    metalness: 1,
  });

  if (maps.baseColor) mat.map          = maps.baseColor;
  if (maps.normal)    mat.normalMap     = maps.normal;
  if (maps.roughness) mat.roughnessMap  = maps.roughness;
  if (maps.metalness) mat.metalnessMap  = maps.metalness;
  if (maps.emission) {
    mat.emissiveMap = maps.emission;
    mat.emissive    = new THREE.Color(1, 1, 1);
  }
  if (maps.alpha) {
    mat.alphaMap    = maps.alpha;
    mat.transparent = true;
    mat.alphaTest   = 0.05;
  }

  mat.needsUpdate = true;
  return mat;
}

/* ─── Apply render mode ───────────────────────────────────────── */

function applyMode(mode, textureIndex = 0) {
  if (!rootObject) return;
  currentMode = mode;

  rootObject.traverse(child => {
    if (!child.isMesh) return;
    disposeMaterial(child.material);

    if (mode === 'wireframe') {
      child.material = makeWireframeMat();
    } else if (mode === 'textured' && loadedMaps[textureIndex]) {
      child.material = makeTexturedMat(loadedMaps[textureIndex]);
    } else {
      // Fallback if set didn't load — stay wireframe
      child.material = makeWireframeMat();
    }
  });

  // Update UI
  renderModeVal.textContent = mode === 'textured' && SHOWCASE_TEXTURES[textureIndex]
    ? `[ ${SHOWCASE_TEXTURES[textureIndex].label} ]`
    : '[ WIREFRAME ]';

  // Lighting: visible in textured mode, off in wireframe
  ambientLight.visible = (mode === 'textured');
  dirLight.visible     = (mode === 'textured');

  modeButtons.forEach(btn =>
    btn.classList.toggle('is-active', btn.dataset.mode === mode)
  );

  // Show / hide slider
  if (textureSlider) {
    textureSlider.style.display =
      (mode === 'textured' && SHOWCASE_TEXTURES.length > 1) ? 'flex' : 'none';
  }
}

/* ─── Dispose helper ──────────────────────────────────────────── */

function disposeMaterial(mat) {
  if (!mat) return;
  const slots = [
    'map', 'normalMap', 'roughnessMap', 'metalnessMap',
    'emissiveMap', 'alphaMap',
  ];
  slots.forEach(slot => { if (mat[slot]) mat[slot].dispose(); });
  mat.dispose();
}

/* ─── Refresh wireframe colour on theme change ────────────────── */

function refreshThemeColor() {
  if (currentMode !== 'wireframe' || !rootObject) return;
  const col = getThemeColor();
  rootObject.traverse(child => {
    if (child.isMesh && child.material?.wireframe) {
      child.material.color.set(col);
    }
  });
}

/* ─── Preload textures listed in SHOWCASE_TEXTURES ────────────── */

const MAP_KEYS = ['baseColor', 'normal', 'roughness', 'metalness', 'emission', 'alpha'];

function preloadTextures(onDone) {
  if (SHOWCASE_TEXTURES.length === 0) { onDone(); return; }

  const loader  = new THREE.TextureLoader();
  // Count total individual map files to load across all sets
  let pending   = 0;
  SHOWCASE_TEXTURES.forEach(entry => {
    MAP_KEYS.forEach(k => { if (entry[k]) pending++; });
  });

  if (pending === 0) { onDone(); return; }

  SHOWCASE_TEXTURES.forEach((entry, i) => {
    loadedMaps[i] = {};
    MAP_KEYS.forEach(k => {
      if (!entry[k]) return;
      loader.load(
        entry[k],
        tex => {
          loadedMaps[i][k] = tex;
          if (--pending === 0) onDone();
        },
        undefined,
        () => {
          console.warn(`[showcase] failed to load ${k}: ${entry[k]}`);
          loadedMaps[i][k] = null;
          if (--pending === 0) onDone();
        }
      );
    });
  });
}

/* ─── Build texture slider (populated after textures load) ─────── */

function buildTextureSlider() {
  if (!textureSlider || SHOWCASE_TEXTURES.length < 2) return;

  textureSlider.innerHTML = '';
  SHOWCASE_TEXTURES.forEach((entry, i) => {
    const btn = document.createElement('button');
    btn.className = 'showcase-tex-btn' + (i === 0 ? ' is-active' : '');
    btn.textContent = entry.label;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.showcase-tex-btn')
        .forEach(b => b.classList.toggle('is-active', b === btn));
      applyMode('textured', i);
    });
    textureSlider.appendChild(btn);
  });
}

/* ─── Load FBX model ──────────────────────────────────────────── */

function loadModel() {
  const loader = new FBXLoader();

  loader.load(
    MODEL_PATH,
    object => {
      // Centre and fit inside a ~120-unit sphere
      const box    = new THREE.Box3().setFromObject(object);
      const centre = box.getCenter(new THREE.Vector3());
      const size   = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale  = 120 / maxDim;

      object.scale.setScalar(scale);
      object.position.sub(centre.multiplyScalar(scale));

      rootObject = object;
      scene.add(object);

      preloadTextures(() => {
        applyMode('textured');
        buildTextureSlider();

        // Enable TEXTURED button only when at least one set has maps
        modeButtons.forEach(btn => {
          if (btn.dataset.mode === 'textured') {
            const hasTextures = loadedMaps.some(
              set => set && Object.values(set).some(Boolean)
            );
            btn.disabled = !hasTextures;
          }
        });
      });

      // Collect stats
      let polys = 0, verts = 0;
      object.traverse(child => {
        if (!child.isMesh || !child.geometry) return;
        const geo = child.geometry;
        polys += geo.index
          ? geo.index.count / 3
          : geo.attributes.position.count / 3;
        verts += geo.attributes.position.count;
      });
      polyVal.textContent = `[ ${Math.round(polys).toLocaleString()} ]`;
      vertVal.textContent = `[ ${verts.toLocaleString()} ]`;

      loaderOverlay.classList.add('is-hidden');
    },
    xhr => {
      if (xhr.total) {
        const pct = Math.round((xhr.loaded / xhr.total) * 100);
        loaderText.textContent = `LOADING_MODEL... ${pct}%`;
      }
    },
    err => {
      console.error('[showcase] FBX load error:', err);
      loaderText.textContent = 'ERR :: FAILED_TO_LOAD_MODEL';
    }
  );
}

/* ─── Resize ──────────────────────────────────────────────────── */

function resize() {
  const shell = canvas.parentElement;
  const w = shell.clientWidth;
  const h = shell.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

const resizeObserver = new ResizeObserver(resize);
resizeObserver.observe(canvas.parentElement);

/* ─── Render loop ─────────────────────────────────────────────── */

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

/* ─── Mode button events ──────────────────────────────────────── */

modeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (!btn.disabled) applyMode(btn.dataset.mode);
  });
});

/* ─── Theme-change observer ───────────────────────────────────── */

new MutationObserver(refreshThemeColor).observe(
  document.documentElement,
  { attributes: true, attributeFilter: ['data-theme'] }
);

/* ─── Boot ────────────────────────────────────────────────────── */

resize();
loadModel();
animate();
