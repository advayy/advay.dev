import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

let scene, camera, renderer, container;
const loader = new GLTFLoader();
let model;

function init() {
  container = document.getElementById('aj-model');
  if (!container) return;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x3a1e08);

  camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.set(0, 1.8, 3);

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setClearAlpha(0);
  container.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 1.5);
  light.position.set(2, 2, 5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040));

  // initial fit + live refit
  fitRendererToContainer();

  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(fitRendererToContainer).observe(container);
  }
  window.addEventListener('resize', fitRendererToContainer);
  window.addEventListener('orientationchange', fitRendererToContainer);
}

function fitRendererToContainer() {
  if (!container || !renderer || !camera) return;
  const w = container.clientWidth;
  const h = container.clientHeight;
  if (!w || !h) return;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

function addNeonGrid(size = 10, divisions = 10) {
  const gridHelper = new THREE.GridHelper(size, divisions, 0xff8000, 0xff8000);
  gridHelper.material.opacity = 0.6;
  gridHelper.material.transparent = true;
  scene.add(gridHelper);
}

loader.load(
  'assets/models/aj-model.glb',
  (gltf) => {
    model = gltf.scene;

    // Center at origin, then scale uniformly to fit
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const sizeVec = box.getSize(new THREE.Vector3()).length();
    const scale = 5 / sizeVec;

    model.scale.setScalar(scale);

    scene.add(model);
  },
  (xhr) => {
    if (xhr.total > 0) console.log(`Loading: ${(xhr.loaded / xhr.total) * 100}%`);
  },
  (error) => console.error('Error loading model', error)
);

function animate() {
  requestAnimationFrame(animate);
  if (model) model.rotation.y += 0.02;
  if (renderer && scene && camera) renderer.render(scene, camera);
}

init();
animate();
addNeonGrid(20, 20);