import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const container = document.getElementById("home-canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

let distanceThreshold = 5;
let mousePos = new THREE.Vector2(0, 0); 

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

camera.position.z = 10;

const models = [];
const numModels = 40; 
const zMin = -10, zMax = 0; 
const yMin = -10, yMax = 10;

const speed = 0.05; 
const range = 20; 

const minDirectionChangeTime = 3000; 
const maxDirectionChangeTime = 7000;

const scaleFactor = 0.1;

const ambientLight = new THREE.AmbientLight(0xCCCCCC, 4.0);
scene.add(ambientLight);

const loader = new GLTFLoader();
loader.load("assets/models/chovy.glb", (gltf) => {
    for (let i = 0; i < numModels; i++) {
        const model = gltf.scene.clone();
        model.scale.set(scaleFactor, scaleFactor, scaleFactor);
        
        model.position.set(
            (Math.random() - 0.5) * range, 
            Math.random() * (yMax - yMin) + yMin, 
            Math.random() * (zMax - zMin) + zMin 
        );

        let dir = Math.random() < 0.5 ? 1 : -1;
        let rot = dir === 1 ? Math.PI / 2 : -Math.PI / 2;
        model.rotation.y = rot; 
        
        models.push({
            mesh: model,
            originalPosition: model.position.clone(),
            direction: dir, 
            lastDirectionChangeTime: Date.now(), 
            timeUntilNextChange: Math.random() * (maxDirectionChangeTime - minDirectionChangeTime) + minDirectionChangeTime, 
            rotation: rot,
            isChasing: false
        });
        scene.add(model);
    }

    // iterate models and change them all to neon green material
    models.forEach((modelObj) => {
        modelObj.mesh.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x00ff00, emissive: 0x00ff00, emissiveIntensity: 1.5 });
            }
        });
    });
});


const bubbles = [];
const bubbleCount = 30;

function createBubble() {
    const geometry = new THREE.SphereGeometry(0.1, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.5 });
    const bubble = new THREE.Mesh(geometry, material);

    bubble.position.set(
        (Math.random() - 0.5) * range,
        -10,
        Math.random() * (zMax - zMin) + zMin
    );

    bubbles.push(bubble);
    scene.add(bubble);
}


for (let i = 0; i < bubbleCount; i++) {
    setTimeout(() => {
        createBubble();
    }, Math.random() * 5000);
}


window.addEventListener("mousemove", (event) => {
    mousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePos.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
    requestAnimationFrame(animate);

    const now = Date.now();

    models.forEach((modelObj) => {
        const { mesh, direction, lastDirectionChangeTime, timeUntilNextChange, rotation, isChasing } = modelObj;

        const elapsed = now - lastDirectionChangeTime;


        if (elapsed > timeUntilNextChange && !modelObj.isChasing) {

            modelObj.direction *= -1;


            modelObj.timeUntilNextChange = Math.random() * (maxDirectionChangeTime - minDirectionChangeTime) + minDirectionChangeTime;


            modelObj.lastDirectionChangeTime = now;


            modelObj.rotation = modelObj.direction === 1 ? Math.PI / 2 : -Math.PI / 2;
            mesh.rotation.y = modelObj.rotation;
        }

        const cursorPos = new THREE.Vector3(mousePos.x * camera.position.z, mousePos.y * camera.position.z, 0);
        const distanceToCursor = mesh.position.distanceTo(cursorPos);

        if (distanceToCursor < distanceThreshold) {
            modelObj.isChasing = true;

            const directionToCursor = new THREE.Vector3().subVectors(cursorPos, mesh.position).normalize();
            const angleToCursor = Math.atan2(directionToCursor.y, directionToCursor.x);
            mesh.rotation.y = angleToCursor + Math.PI / 2;

        } else {
            modelObj.isChasing = false;

            mesh.position.x += modelObj.direction * speed;

            const cameraHalfWidth = Math.tan(THREE.MathUtils.degToRad(camera.fov)) * camera.position.z * camera.aspect;
            const cameraHalfHeight = Math.tan(THREE.MathUtils.degToRad(camera.fov)) * camera.position.z;

            if (mesh.position.x > cameraHalfWidth - 0.5) {
                mesh.position.x = cameraHalfWidth - 0.5;
            } else if (mesh.position.x < -cameraHalfWidth + 0.5) {
                mesh.position.x = -cameraHalfWidth + 0.5;
            }

            if (mesh.position.y > cameraHalfHeight - 0.25) {
                mesh.position.y = cameraHalfHeight - 0.25;
            } else if (mesh.position.y < -cameraHalfHeight + 0.25) {
                mesh.position.y = -cameraHalfHeight + 0.25;
            }
        }
    });

    bubbles.forEach(bubble => {
        bubble.position.y += 0.06;

        if (bubble.position.y > 10) {
            bubble.position.y = -10* Math.random();
            bubble.position.x = (Math.random() - 0.5) * range;
        }
    });

    renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
