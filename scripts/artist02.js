import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

document.addEventListener("DOMContentLoaded", () => {
  // Apunta al contenedor y al canvas del HTML
  const container = document.querySelector(".canvas-col");
  const canvas = document.getElementById("threejs-canvas");

  const getWidth = () => container.clientWidth;
  const getHeight = () => container.clientHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    70,
    getWidth() / getHeight(),
    0.1,
    1000,
  );

  // Usa el canvas existente en lugar de crear uno nuevo
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(getWidth(), getHeight());
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  // Ya NO hagas document.body.appendChild, el canvas ya está en el HTML

  scene.add(new THREE.AmbientLight(0xffffff, 3));

  const light1 = new THREE.DirectionalLight(0xffffff, 10);
  light1.position.set(-2, 4, 4);
  light1.castShadow = true;
  scene.add(light1);

  const light2 = new THREE.PointLight(0xffffff, 30);
  light2.position.set(3, 5, 2);
  scene.add(light2);

  const textureLoader = new THREE.TextureLoader();
  const diffuseTexture = textureLoader.load(
    "./assets/artist02/concrete_structure/textures/White_Cracked_tibkcjsew_diffuse.png",
  );
  diffuseTexture.colorSpace = THREE.SRGBColorSpace;
  diffuseTexture.flipY = false;

  function updateCameraForSize(size) {
    const distance = size.length() * 0.2;
    const isMobile = getWidth() < 780;

    if (isMobile) {
      camera.position.set(8, 2, distance * 1.8);
    } else {
      camera.position.set(4, 2, distance);
    }

    camera.near = distance * 0.1;
    camera.far = distance * 10;
    camera.aspect = getWidth() / getHeight();
    camera.updateProjectionMatrix();
  }

  let model;
  let modelSize = new THREE.Vector3();

  const loader = new GLTFLoader();
  loader.load("./assets/artist02/concrete_structure/scene.gltf", (gltf) => {
    model = gltf.scene;
    model.scale.setScalar(1.2);

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    box.getSize(modelSize);
    model.position.sub(center);

    updateCameraForSize(modelSize);

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
    renderer.setSize(getWidth(), getHeight());
    renderer.setPixelRatio(window.devicePixelRatio);

    if (modelSize.length() > 0) {
      updateCameraForSize(modelSize);
    }
  });
});
