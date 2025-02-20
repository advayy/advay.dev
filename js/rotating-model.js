import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

let scene, camera, renderer;

const loader = new GLTFLoader();
let model;





function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x3b3835);

  const viewerContainer = document.getElementById('aj-model');
  
  const width = viewerContainer.clientWidth || 500;
  const height = viewerContainer.clientHeight || 500;

  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(0, 2, 3.5);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  viewerContainer.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 1.5);
  light.position.set(2, 2, 5);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040));


  const resizeObserver = new ResizeObserver(() => onWindowResize());
  resizeObserver.observe(viewerContainer);
}


function addNeonGrid(size = 10, divisions = 10) {
  const gridHelper = new THREE.GridHelper(size, divisions, 0x00FF00, 0x00FF00);
  gridHelper.material.opacity = 0.6;
  gridHelper.material.transparent = true;
  scene.add(gridHelper);
}

loader.load(
  'assets/models/aj-model.glb',
  (gltf) => {
    model = gltf.scene;
    model.position.set(0, 0, 0);

    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3()).length();
    const scale = 5 / size;
    model.scale.set(scale, scale, scale);

    scene.add(model);
  },
  (xhr) => console.log(`Loading: ${(xhr.loaded / xhr.total) * 100}%`),
  (error) => console.error('Error loading model', error)
);

function animate() {
  requestAnimationFrame(animate);
  if (model) model.rotation.y += 0.02;
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


init();
animate();
addNeonGrid(20, 20);


function onWindowResize() {
  const viewerContainer = document.getElementById('aj-model');
  const width = viewerContainer.clientWidth;
  const height = viewerContainer.clientHeight;
  if (width > 0 && height > 0) {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
}
