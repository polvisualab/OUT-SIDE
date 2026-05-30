import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// ── Contenedor ──────────────────────────────────────────────
const container = document.querySelector(".3d-model-container");

// ── Escena, cámara, renderer ─────────────────────────────────
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  70,
  container.clientWidth / container.clientHeight,
  0.1,
  1000,
);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// ── Controles ────────────────────────────────────────────────
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// ── Iluminación ──────────────────────────────────────────────
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

// ── Carga del modelo ─────────────────────────────────────────
const loader = new OBJLoader();
loader.load(
  "./assets/TU_MODELO.obj", // 👈 reemplaza esta ruta
  (obj) => {
    // Centra el modelo automáticamente
    const box = new THREE.Box3().setFromObject(obj);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    obj.position.sub(center);

    // Posiciona la cámara según el tamaño del modelo
    const distance = size.length();
    camera.position.set(0, distance * 0.4, distance);
    camera.near = distance * 0.01;
    camera.far = distance * 10;
    camera.updateProjectionMatrix();

    controls.update();
    scene.add(obj);
  },
  (xhr) => console.log(`Cargando: ${(xhr.loaded / xhr.total) * 100}%`),
  (error) => console.error("Error al cargar el modelo:", error),
);

// ── Responsive ───────────────────────────────────────────────
window.addEventListener("resize", () => {
  const w = container.clientWidth;
  const h = container.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});

// ── Loop de animación ────────────────────────────────────────
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
