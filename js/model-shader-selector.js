import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";


let scene, camera, renderer, controls, currentModel;
let lightSphere, light;
let currentShader = 'default';
let orbitSpeed = 0.001;
let isSphereMoving = true;

const ambientColor = { type: "c", value: new THREE.Color(0.0, 0.0, 1.0) };
const diffuseColor = { type: "c", value: new THREE.Color(0.0, 1.0, 1.0) };
const specularColor = { type: "c", value: new THREE.Color(1.0, 1.0, 1.0) };
const kAmbient = { type: "f", value: 0.3 };
const kDiffuse = { type: "f", value: 0.6 };
const kSpecular = { type: "f", value: 1.0 };
const shininess = { type: "f", value: 50.0 };

const lightColor = { type: "c", value: new THREE.Color(1.0, 1.0, 1.0) };
const toonColor = { type: "c", value: new THREE.Color(1.0, 0.8, 0.4) };
const toonColor2 = { type: "c", value: new THREE.Color(0.8, 0.1, 0.35) };
const outlineColor = { type: "c", value: new THREE.Color(0.0, 0.0, 0.0) };
const ticks = { type: "f", value: 0.0 };

let defaultColor = { color: 0xFFFFFF };
let backgroundColor = { color: 0x000000 };


function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(backgroundColor.color);

  const viewerContainer = document.getElementById('3d-viewer');
  const width = viewerContainer.clientWidth || 500;
  const height = viewerContainer.clientHeight || 500;

  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(0, 1, 5);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  viewerContainer.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(lightColor.value, 0.5);
  scene.add(ambientLight);

  createLight();

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;

  loadModel('assets/models/lotus.glb');

  const resizeObserver = new ResizeObserver(() => onWindowResize());
  resizeObserver.observe(viewerContainer);

  document.querySelectorAll('.shader-item').forEach((item) => {
    item.addEventListener('click', () => {
      const shaderName = item.getAttribute('data-shader');
      applyShader(shaderName);

      document.querySelectorAll('.shader-item').forEach((shaderItem) => {
        shaderItem.classList.remove('active');
      });
      item.classList.add('active');
    });
  });
}


const toggleButton = document.getElementById('toggle-move');
toggleButton.addEventListener('click', () => {
  isSphereMoving = !isSphereMoving;
  if (isSphereMoving) {
    toggleButton.textContent = 'Stop Sphere Movement';
  } else {
    toggleButton.textContent = 'Start Sphere Movement';
  }
});


function createLight() {
  const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: lightColor.value });
  lightSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(lightSphere);

  light = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(light);
}

function updateLightPosition() {
  const time = performance.now() * orbitSpeed;
  const radius = 11;

  lightSphere.position.x = radius * Math.cos(time);
  lightSphere.position.z = radius * Math.sin(time);
  lightSphere.position.y = 4 + Math.sin(time * 0.5); 
  
  light.position.copy(lightSphere.position);

  updateShaderLightPosition(lightSphere.position);
}

function getSpherePosition() {
  return lightSphere.position;
}

function updateShaderLightPosition(position) {
  if (currentModel) {
    currentModel.traverse((child) => {
      if (child.isMesh && child.material.uniforms && child.material.uniforms.spherePosition) {
        child.material.uniforms.spherePosition.value = position;
      }
    });
  }
}

let defaultMaterials = new Map();
function loadModel(modelPath) {
    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
        if (currentModel) {
            scene.remove(currentModel);
        }
        currentModel = gltf.scene;
        currentModel.scale.set(1, 1, 1);
        scene.add(currentModel);

        const box = new THREE.Box3().setFromObject(currentModel);
        const size = box.getSize(new THREE.Vector3()).length();
        const center = box.getCenter(new THREE.Vector3());
        camera.position.copy(center);
        camera.position.add(new THREE.Vector3(size * 1.5, size * 1.2, size * 1.5)); 
        camera.lookAt(center);
        controls.target.copy(center);

        currentModel.traverse((child) => {
            if (child.isMesh) {
                if (!child.material) {
                    child.material = new THREE.MeshStandardMaterial(defaultColor);
                }

                if (!defaultMaterials.has(child)) {
                    defaultMaterials.set(child, child.material.clone());
                }
            }
        });

        applyShader(currentShader);
    });
}
  


function loadShader(name) {
  return new Promise((resolve, reject) => {
    const vertexShaderPath = `assets/shaders/${name}.vs.glsl`;
    const fragmentShaderPath = `assets/shaders/${name}.fs.glsl`;

    Promise.all([
      fetch(vertexShaderPath).then(res => res.text()),
      fetch(fragmentShaderPath).then(res => res.text())
    ])
      .then(([vertexShader, fragmentShader]) => {
        resolve({ vertexShader, fragmentShader });
      })
      .catch(reject);
  });
}

function applyShader(shaderName) {
    if (!currentModel) return;
    currentShader = shaderName;

    if (shaderName === 'default') {
        currentModel.traverse((child) => {
            if (child.isMesh) {
                if (defaultMaterials.has(child)) {
                    child.material = defaultMaterials.get(child).clone();
                } else {
                    child.material = new THREE.MeshStandardMaterial(defaultColor);
                }
            }
        });

    } else if (shaderName === 'none') {
        currentModel.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial(defaultColor);
            }
        });

    } else {
        loadShader(shaderName).then(({ vertexShader, fragmentShader }) => {
            let shaderUniforms = {
                time: { value: 0 },
            };

            if (shaderName === 'blinn_phong') {
                shaderUniforms.ambientColor = ambientColor;
                shaderUniforms.kAmbient = kAmbient;
                shaderUniforms.diffuseColor = diffuseColor;
                shaderUniforms.kDiffuse = kDiffuse;
                shaderUniforms.specularColor = specularColor;
                shaderUniforms.kSpecular = kSpecular;
                shaderUniforms.shininess = shininess;
            }

            if (shaderName === 'sphere' || shaderName === 'dots' || shaderName === 'toon') {
                shaderUniforms.spherePosition = { value: getSpherePosition() };
            }

            if (shaderName === 'dots' || shaderName === 'xray') {
                shaderUniforms.ticks = ticks;
            }

            if (shaderName === 'toon') {
                shaderUniforms.toonColor = toonColor;
                shaderUniforms.toonColor2 = toonColor2;
                shaderUniforms.outlineColor = outlineColor;
            }

            currentModel.traverse((child) => {
                if (child.isMesh) {
                    const shaderMaterial = new THREE.ShaderMaterial({
                        vertexShader,
                        fragmentShader,
                        uniforms: shaderUniforms,
                    });
                    child.material = shaderMaterial;
                }
            });
        });
    }
}


function onWindowResize() {
  const viewerContainer = document.getElementById('3d-viewer');
  const width = viewerContainer.clientWidth;
  const height = viewerContainer.clientHeight;
  if (width > 0 && height > 0) {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
}


function animate() {
    requestAnimationFrame(animate);
    controls.update();
  
    const time = performance.now() / 1000;

    if (currentShader === 'xray' || currentShader === 'dots') {
        currentModel.traverse((child) => {
        if (child.isMesh && child.material.uniforms && child.material.uniforms.ticks) {
          child.material.uniforms.ticks.value = time;
        }
      });
    }
  
    if (isSphereMoving){
        updateLightPosition();
    }
  
    renderer.render(scene, camera);
  }
  
  
function addNeonGrid(size = 10, divisions = 10) {
  const gridHelper = new THREE.GridHelper(size, divisions, 0x00FF00, 0x00FF00);
  gridHelper.material.opacity = 0.6;
  gridHelper.material.transparent = true;
  scene.add(gridHelper);
}


init();
animate();
addNeonGrid(20, 20);

document.querySelectorAll('.model-item').forEach((item) => {
  item.addEventListener('click', () => {
    const modelPath = item.getAttribute('data-model');
    loadModel(modelPath);
  });
});
