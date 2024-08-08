/* eslint-disable no-unused-vars */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();

// Door Textures
const doorColorTexture = textureLoader.load("../src/assets/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("../src/assets/textures/door/alpha.jpg");
console.log(doorAlphaTexture);

const ambientOcclusionTexture = textureLoader.load(
  "./assets/textures/door/ambientOcclusion.jpg"
);
const heightTexture = textureLoader.load("/assets/textures/door/height.jpg");
const metalnessTexture = textureLoader.load(
  "./assets/textures/door/metalness.jpg"
);
const normalTexture = textureLoader.load("/assets/textures/door/normal.jpg");
const roughnessTexture = textureLoader.load(
  "./assets/textures/door/roughness.jpg"
);

// Environment Textures
const gradientFirstTexture = textureLoader.load(
  "./assets/textures/gradients/3.jpg"
);
// const gradientSecondTexture = textureLoader.load("./assets/textures/gradients/5.jpg")

//
const matcapTexture = textureLoader.load("/assets/textures/matcaps/1.png");
// const matcaps2Texture = textureLoader.load("./assets/textures/matcaps/2.png")
// const matcaps3Texture = textureLoader.load("./assets/textures/matcaps/3.png")
// const matcaps4Texture = textureLoader.load("./assets/textures/matcaps/4.png")
// const matcaps5Texture = textureLoader.load("./assets/textures/matcaps/5.png")
// const matcaps6Texture = textureLoader.load("./assets/textures/matcaps/6.png")
// const matcaps7Texture = textureLoader.load("./assets/textures/matcaps/7.png")
// const matcaps8Texture = textureLoader.load("./assets/textures/matcaps/8.png")

// Specifying type of textures provided to Three JS
// doorColorTexture.colorSpace = THREE.SRGBColorSpace
// matcapTexture.colorSpace = THREE.SRGBColorSpace

// Mesh and Geometry
const material = new THREE.MeshBasicMaterial({ map: doorColorTexture });

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 30, 30), material);
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
);
torus.position.x = 1.5;
sphere.position.x = -1.5;
scene.add(sphere, plane, torus);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  plane.rotation.y = 0.1 * elapsedTime;
  sphere.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  torus.rotation.x = -0.15 * elapsedTime;
  sphere.rotation.x = -0.15 * elapsedTime;
  plane.rotation.x = -0.15 * elapsedTime;
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
