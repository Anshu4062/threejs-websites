/* eslint-disable no-unused-vars */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

const gui = new GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();

// Door Textures
const doorColorTexture = textureLoader.load(
  "../src/assets/textures/door/color.jpg"
);
const doorAlphaTexture = textureLoader.load(
  "../src/assets/textures/door/alpha.jpg"
);

const ambientOcclusionTexture = textureLoader.load(
  "../src/assets/textures/door/ambientOcclusion.jpg"
);
const heightTexture = textureLoader.load(
  "../src/assets/textures/door/height.jpg"
);
const metalnessTexture = textureLoader.load(
  "../src/assets/textures/door/metalness.jpg"
);
const normalTexture = textureLoader.load(
  "../src/assets/textures/door/normal.jpg"
);
const roughnessTexture = textureLoader.load(
  "../src/assets/textures/door/roughness.jpg"
);

// Environment Textures
const gradientFirstTexture = textureLoader.load(
  "../src/assets/textures/gradients/5.jpg"
);
// const gradientSecondTexture = textureLoader.load("./assets/textures/gradients/5.jpg")

//
const matcapTexture = textureLoader.load(
  "../src/assets/textures/matcaps/1.png"
);

// Checking Public Directory
const checkingPublicDirectory = textureLoader.load("/images/color")

// const matcaps2Texture = textureLoader.load("./assets/textures/matcaps/2.png")
// const matcaps3Texture = textureLoader.load("./assets/textures/matcaps/3.png")
// const matcaps4Texture = textureLoader.load("./assets/textures/matcaps/4.png")
// const matcaps5Texture = textureLoader.load("./assets/textures/matcaps/5.png")
// const matcaps6Texture = textureLoader.load("./assets/textures/matcaps/6.png")
// const matcaps7Texture = textureLoader.load("./assets/textures/matcaps/7.png")
// const matcaps8Texture = textureLoader.load("./assets/textures/matcaps/8.png")

// Specifying type of textures provided to Three JS
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

// MeshMatcapMaterial
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture


// Mesh and Geometry
// const material = new THREE.MeshBasicMaterial();  // For light shaders
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true
// material.map = doorColorTexture
// material.color = new THREE.Color("#00F");
// material.wireframe = true;
// material.side = THREE.DoubleSide

// We need to enable transparency for applying opacity
// material.transparent = true
// material.alphaMap = doorAlphaTexture
// material.opacity = 0.1

// MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial() // Closer the mesh more lighter and far the mesh more darker
// material.side = THREE.DoubleSide

// MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial() // This needs actual light without actual light nothing will be visible

// MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color("#1188ff")

// MeshToonMaterial
// gradientFirstTexture.magFilter = THREE.NearestFilter; //Zooms small Pixels
// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientFirstTexture
// gradientFirstTexture.generateMipmaps = false

// MeshStandardMaterial
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.45
material.roughness = 0.65
gui.add(material, "metalness").min(0).max(1).step(0.0001)
gui.add(material, "roughness").min(0).max(1).step(0.0001)

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
 * Lights
 */
const anbientLight = new THREE.AmbientLight("#fff", 1)
scene.add(anbientLight)

const pointLight = new THREE.PointLight("#fff", 30)
pointLight.position.x = 2
pointLight.position.y = 0.5
pointLight.position.z = 4
material.side = THREE.DoubleSide
scene.add(pointLight)

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
