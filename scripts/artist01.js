import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".model-container");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    70,
    container.clientWidth / container.clientHeight,
    0.1,
    1000,
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.enablePan = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2;

  // 👇 añade esto justo aquí
  controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN,
  };
  renderer.domElement.style.touchAction = "none";

  // 👇 añade esto aquí
  controls.enabled = false;

  renderer.domElement.addEventListener(
    "touchstart",
    (e) => {
      e.stopPropagation();
    },
    { passive: true },
  );

  renderer.domElement.addEventListener("pointerenter", () => {
    controls.enabled = true;
  });

  renderer.domElement.addEventListener("pointerleave", () => {
    controls.enabled = false;
  });

  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 2);
  dirLight.position.set(5, 10, 7);
  scene.add(dirLight);

  // ── Carga MTL + OBJ ──────────────────────────────────────────
  const basePath = "./assets/artist01/naia-modelo3d-01/";

  const mtlLoader = new MTLLoader();
  mtlLoader.setPath(basePath);
  mtlLoader.setResourcePath(basePath);
  mtlLoader.load("3DModel.mtl", (materials) => {
    // 👈 nombre de tu .mtl
    materials.preload();

    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath(basePath);
    objLoader.load("3DModel.obj", (obj) => {
      const box = new THREE.Box3().setFromObject(obj);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      obj.position.sub(center);

      const distance = size.length();
      camera.position.set(1, 1.2, distance * 0.2, distance);
      camera.near = distance * 0.1;
      camera.far = distance * 10;
      camera.updateProjectionMatrix();

      controls.update();
      scene.add(obj);
    });
  });

  window.addEventListener("resize", () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
});
