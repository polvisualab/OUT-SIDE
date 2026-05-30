import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js"; // ✅

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const light1 = new THREE.DirectionalLight(0xffffff, 10);
light1.position.set(-2, 4, 4);
light1.castShadow = true;
scene.add(light1);
// const light1Helper = new THREE.DirectionalLightHelper(light1, 1); // 1 = tamaño del helper
// scene.add(light1Helper);

const light2 = new THREE.PointLight(0xffffff, 30);
light2.position.set(3, 5, 2);
scene.add(light2);
// const light2Helper = new THREE.PointLightHelper(light2, 1);
// scene.add(light2Helper);

const textureLoader = new THREE.TextureLoader();

/* --- IMPORTANTE CARGAR AQUI EL DIFFUSE QUE ES LO QUE HE MODIFICADO YO MISMO --- */
const diffuseTexture = textureLoader.load(
  "./assets/artist02/concrete_structure/textures/White_Cracked_tibkcjsew_diffuse.png",
);
diffuseTexture.colorSpace = THREE.SRGBColorSpace;
diffuseTexture.flipY = false; //

let model;
const loader = new GLTFLoader();
loader.load("./assets/artist02/concrete_structure/scene.gltf", (gltf) => {
  model = gltf.scene;

  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  model.position.sub(center);
  model.scale.setScalar(1.2);

  const distance = size.length() * 0.2;
  camera.position.set(3, 2, distance);
  camera.near = distance * 0.1;
  camera.far = distance * 10;
  camera.updateProjectionMatrix();

  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.material.map = diffuseTexture;
      child.material.roughness = 1;
      child.material.metalness = 0.0;
      child.material.needsUpdate = true;
    }
  });

  scene.add(model);
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.35;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
