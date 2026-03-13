/**
 * model-showcase.js
 * Three.js FBX viewer with support for multiple showcase model folders.
 *
 * Folder structure:
 * showcase/
 *   <model-folder>/
 *     <model>.fbx
 *     textures/
 *       *_BaseColor.png
 *       *_Normal.png
 *       ...
 *
 * Register each folder in SHOWCASE_MODELS below.
 */

import * as THREE from 'three';
import { FBXLoader }      from 'three/addons/loaders/FBXLoader.js';
import { OrbitControls }  from 'three/addons/controls/OrbitControls.js';

/* ─── Config ──────────────────────────────────────────────────── */

const AUTO_ROTATE_SPEED = 0.6; // OrbitControls autoRotateSpeed units

/**
 * One entry per model folder.
 * `textureSets[*]` keys are optional.
 */
const SHOWCASE_MODELS = [
  {
    id: 'ORK_TEST',
    folder: 'showcase/orktest',
    modelFile: 'OrkTEST_low.fbx',
    description: 'Low-poly character model created for a personal project. Modelled from scratch with game-ready topology and displayed here in an interactive viewer.',
    textureSets: [
      {
        label:        'TEST_PBR',
        baseColor:    'textures/test_BaseColor.png',
        normal:       'textures/test_Normal.png',
        roughness:    'textures/test_Roughness.png',
        metalness:    'textures/test_Metallic.png',
        emission:     'textures/test_Emission.png',
        alpha:        'textures/test_Alpha.png',
        displacement: 'textures/test_Displacement.png',
      },
    ],
  },
  {
    id: 'TROLL',
    folder: 'showcase/troll',
    modelFile: 'cavetroll_low.fbx',
    description: 'Low-poly cave troll character added as a second showcase model, with its own texture set and the same interactive viewer controls.',
    textureSets: [
      {
        label:        'DEFAULT',
        baseColor:    'textures/DefaultMaterial_BaseColor.png',
        normal:       'textures/DefaultMaterial_Normal.png',
        roughness:    'textures/DefaultMaterial_Roughness.png',
        metalness:    'textures/DefaultMaterial_Metallic.png',
        emission:     'textures/DefaultMaterial_Emission.png',
        alpha:        'textures/DefaultMaterial_Alpha.png',
        displacement: 'textures/DefaultMaterial_Displacement.png',
      },
    ],
  },
];

/* ─── DOM refs ────────────────────────────────────────────────── */

const canvas          = document.getElementById('showcase-canvas');
const loaderOverlay   = document.getElementById('showcase-loader');
const loaderText      = loaderOverlay.querySelector('span');
const polyVal         = document.getElementById('showcase-poly');
const vertVal         = document.getElementById('showcase-vert');
const renderModeVal   = document.getElementById('showcase-render-mode');
const modelIdVal      = document.getElementById('showcase-model-id');
const modelDescVal    = document.getElementById('showcase-model-desc');
const selectedAssetVal = document.getElementById('showcase-selected-asset');
const lightingBtn    = document.getElementById('showcase-lighting-btn');
const modeButtons     = document.querySelectorAll('.showcase-mode-btn');
const modelSlider     = document.getElementById('showcase-model-slider');
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
const fillLight = new THREE.DirectionalLight(0xffffff, 0.45);
fillLight.position.set(-110, 50, 95);
scene.add(fillLight);
const rimLight = new THREE.DirectionalLight(0xffffff, 0.35);
rimLight.position.set(-60, 110, -120);
scene.add(rimLight);

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
let currentModelIndex = 0;
let currentTextureIndex = 0;
let currentLightingIndex = 1;
let loadedMaps = [];

const LIGHTING_PRESETS = [
  {
    label: 'STUDIO',
    ambient: { color: 0xffffff, intensity: 0.66 },
    key: { color: 0xffffff, intensity: 1.18, position: [80, 120, 80] },
    fill: { color: 0xb8deff, intensity: 0.36, position: [-110, 50, 95] },
    rim: { color: 0xffffff, intensity: 0.3, position: [-60, 110, -120] },
  },
  {
    label: 'DRAMA',
    ambient: { color: 0xf3f0ff, intensity: 0.3 },
    key: { color: 0xffe5b7, intensity: 1.55, position: [120, 140, 55] },
    fill: { color: 0x8ec5ff, intensity: 0.18, position: [-140, 35, 80] },
    rim: { color: 0xd9eeff, intensity: 0.52, position: [-45, 150, -150] },
  },
  {
    label: 'CAVE',
    ambient: { color: 0xc7d7da, intensity: 0.26 },
    key: { color: 0xd9f6ff, intensity: 0.86, position: [35, 95, 125] },
    fill: { color: 0x8cffb6, intensity: 0.22, position: [-90, 28, 55] },
    rim: { color: 0x6bb8ff, intensity: 0.44, position: [-120, 100, -80] },
  },
];

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

function applyLightConfig(light, config) {
  light.color.set(config.color);
  light.intensity = config.intensity;
  light.position.set(config.position[0], config.position[1], config.position[2]);
}

function applyLightingPreset(index = currentLightingIndex) {
  const preset = LIGHTING_PRESETS[index] || LIGHTING_PRESETS[0];
  currentLightingIndex = LIGHTING_PRESETS.indexOf(preset);

  ambientLight.color.set(preset.ambient.color);
  ambientLight.intensity = preset.ambient.intensity;
  applyLightConfig(dirLight, preset.key);
  applyLightConfig(fillLight, preset.fill);
  applyLightConfig(rimLight, preset.rim);

  if (lightingBtn) {
    lightingBtn.textContent = `LIGHTING :: ${preset.label}`;
  }
}

function hasLoadedTextures() {
  return loadedMaps.some(set => set && Object.values(set).some(Boolean));
}

function syncLightingButton() {
  if (!lightingBtn) return;
  const shouldShow = currentMode === 'textured' && hasLoadedTextures();
  lightingBtn.hidden = !shouldShow;
  lightingBtn.disabled = !shouldShow;
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
  if (maps.displacement) {
    mat.displacementMap = maps.displacement;
    mat.displacementScale = 0.02;
  }
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

function getCurrentModel() {
  return SHOWCASE_MODELS[currentModelIndex] || null;
}

function updateModelMeta(model) {
  if (modelIdVal) {
    modelIdVal.textContent = model
      ? `> MODEL_ID :: ${model.id} / ${model.modelFile}`
      : '> MODEL_ID :: [ UNSET ]';
  }
  if (selectedAssetVal) {
    selectedAssetVal.textContent = model
      ? `[ ${model.id} ]`
      : '[ UNSET ]';
  }
  if (modelDescVal && model) {
    modelDescVal.textContent = model.description || '';
  }
}

function applyMode(mode, textureIndex = currentTextureIndex) {
  if (!rootObject) return;
  const model = getCurrentModel();
  const textureSets = model ? (model.textureSets || []) : [];

  currentMode = mode;
  currentTextureIndex = textureIndex;

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
  renderModeVal.textContent = mode === 'textured' && textureSets[textureIndex]
    ? `[ ${textureSets[textureIndex].label} ]`
    : '[ WIREFRAME ]';

  // Lighting: visible in textured mode, off in wireframe
  ambientLight.visible = (mode === 'textured');
  dirLight.visible     = (mode === 'textured');
  fillLight.visible    = (mode === 'textured');
  rimLight.visible     = (mode === 'textured');

  modeButtons.forEach(btn =>
    btn.classList.toggle('is-active', btn.dataset.mode === mode)
  );

  syncLightingButton();

  // Show / hide slider
  if (textureSlider) {
    textureSlider.style.display =
      (mode === 'textured' && textureSets.length > 1) ? 'flex' : 'none';
  }
}

/* ─── Dispose helper ──────────────────────────────────────────── */

function disposeMaterial(mat) {
  if (!mat) return;
  mat.dispose();
}

function disposeLoadedTextures() {
  loadedMaps.forEach(set => {
    if (!set) return;
    Object.values(set).forEach(tex => {
      if (tex && typeof tex.dispose === 'function') tex.dispose();
    });
  });
  loadedMaps = [];
}

function clearCurrentModel() {
  if (!rootObject) return;
  rootObject.traverse(child => {
    if (!child.isMesh) return;
    if (child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach(disposeMaterial);
      } else {
        disposeMaterial(child.material);
      }
    }
    if (child.geometry) child.geometry.dispose();
  });
  scene.remove(rootObject);
  rootObject = null;
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

const MAP_KEYS = ['baseColor', 'normal', 'displacement', 'roughness', 'metalness', 'emission', 'alpha'];

function resolveAssetPath(model, relativePath) {
  return `${model.folder}/${relativePath}`;
}

function preloadTexturesForModel(model, onDone) {
  const textureSets = model.textureSets || [];
  if (textureSets.length === 0) { onDone(); return; }

  const loader  = new THREE.TextureLoader();
  // Count total individual map files to load across all sets
  let pending   = 0;
  textureSets.forEach(entry => {
    MAP_KEYS.forEach(k => { if (entry[k]) pending++; });
  });

  if (pending === 0) { onDone(); return; }

  textureSets.forEach((entry, i) => {
    loadedMaps[i] = {};
    MAP_KEYS.forEach(k => {
      if (!entry[k]) return;
      const assetPath = resolveAssetPath(model, entry[k]);
      loader.load(
        assetPath,
        tex => {
          loadedMaps[i][k] = tex;
          if (--pending === 0) onDone();
        },
        undefined,
        () => {
          console.warn(`[showcase] failed to load ${k}: ${assetPath}`);
          loadedMaps[i][k] = null;
          if (--pending === 0) onDone();
        }
      );
    });
  });
}

/* ─── Build texture slider (populated after textures load) ─────── */

function buildTextureSlider() {
  const model = getCurrentModel();
  const textureSets = model ? (model.textureSets || []) : [];
  if (!textureSlider) return;

  if (textureSets.length < 2) {
    textureSlider.innerHTML = '';
    textureSlider.style.display = 'none';
    return;
  }

  textureSlider.innerHTML = '';
  textureSets.forEach((entry, i) => {
    const btn = document.createElement('button');
    btn.className = 'showcase-tex-btn' + (i === currentTextureIndex ? ' is-active' : '');
    btn.textContent = entry.label;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.showcase-tex-btn')
        .forEach(b => b.classList.toggle('is-active', b === btn));
      currentTextureIndex = i;
      applyMode('textured', i);
    });
    textureSlider.appendChild(btn);
  });
}

function buildModelSlider() {
  if (!modelSlider) return;

  if (SHOWCASE_MODELS.length < 2) {
    modelSlider.innerHTML = '';
    modelSlider.style.display = 'none';
    return;
  }

  modelSlider.style.display = 'flex';
  modelSlider.innerHTML = '';

  SHOWCASE_MODELS.forEach((entry, i) => {
    const btn = document.createElement('button');
    btn.className = 'showcase-model-btn' + (i === currentModelIndex ? ' is-active' : '');
    btn.textContent = entry.id;
    btn.addEventListener('click', () => {
      if (i === currentModelIndex) return;
      loadModel(i);
      document.querySelectorAll('.showcase-model-btn')
        .forEach(b => b.classList.toggle('is-active', b === btn));
    });
    modelSlider.appendChild(btn);
  });
}

/* ─── Load FBX model ──────────────────────────────────────────── */

function loadModel(index = 0) {
  const model = SHOWCASE_MODELS[index];
  if (!model) {
    loaderText.textContent = 'ERR :: NO_SHOWCASE_MODELS_CONFIGURED';
    return;
  }

  currentModelIndex = index;
  currentTextureIndex = 0;
  updateModelMeta(model);

  loaderOverlay.classList.remove('is-hidden');
  loaderText.textContent = `LOADING_MODEL... ${model.id}`;
  if (lightingBtn) {
    lightingBtn.hidden = true;
    lightingBtn.disabled = true;
  }

  clearCurrentModel();
  disposeLoadedTextures();
  if (textureSlider) {
    textureSlider.innerHTML = '';
    textureSlider.style.display = 'none';
  }

  const loader = new FBXLoader();
  const modelPath = resolveAssetPath(model, model.modelFile);

  loader.load(
    modelPath,
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

      preloadTexturesForModel(model, () => {
        const hasTextures = hasLoadedTextures();

        modeButtons.forEach(btn => {
          if (btn.dataset.mode === 'textured') {
            btn.disabled = !hasTextures;
          }
        });

        const targetMode = (currentMode === 'wireframe' || !hasTextures)
          ? 'wireframe'
          : 'textured';

        applyLightingPreset(currentLightingIndex);
        applyMode(targetMode, 0);
        buildTextureSlider();
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

if (lightingBtn) {
  lightingBtn.addEventListener('click', () => {
    if (lightingBtn.hidden || lightingBtn.disabled) return;
    const nextIndex = (currentLightingIndex + 1) % LIGHTING_PRESETS.length;
    applyLightingPreset(nextIndex);
  });
}

/* ─── Theme-change observer ───────────────────────────────────── */

new MutationObserver(refreshThemeColor).observe(
  document.documentElement,
  { attributes: true, attributeFilter: ['data-theme'] }
);

/* ─── Boot ────────────────────────────────────────────────────── */

resize();
applyLightingPreset(1);
buildModelSlider();
loadModel(0);
animate();
