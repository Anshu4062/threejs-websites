/* eslint-disable no-unused-vars */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

// Initializing Lil-GUI
const gui = new GUI();

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
const checkingPublicDirectory = textureLoader.load("/images/color");

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

// // MeshStandardMaterial
// const material = new THREE.MeshStandardMaterial();
// material.metalness = 1;
// material.roughness = 1;
// material.map = doorColorTexture;
// material.aoMap = ambientOcclusionTexture;
// material.side = THREE.DoubleSide;
// material.displacementMap = heightTexture;
// material.displacementScale = 0.1;
// material.metalnessMap = metalnessTexture
// material.roughnessMap = roughnessTexture
// material.normalMap = normalTexture
// material.normalScale.set(0.5, 0.5)
// // material.transparent = true
// material.alphaMap = doorAlphaTexture
// gui.add(material, "metalness").min(0).max(1).step(0.0001);
// gui.add(material, "roughness").min(0).max(1).step(0.0001);

// MeshPhysicalMaterial
const material = new THREE.MeshPhysicalMaterial();
material.metalness = 1;
material.roughness = 1;
// material.map = doorColorTexture;
// material.aoMap = ambientOcclusionTexture;
// material.side = THREE.DoubleSide;
// material.displacementMap = heightTexture;
// material.displacementScale = 0.1;
// material.metalnessMap = metalnessTexture;
// material.roughnessMap = roughnessTexture;
// material.normalMap = normalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);
// material.clearcoat = 1
// material.clearcoatRoughness = 0

// material.sheen = 1;
// material.sheenRoughness = 0.25;
// material.sheenColor.set(1, 1, 1);

// material.iridescence = 1;
// material.iridescenceIOR = 1
// material.iridescenceThicknessRange = [100, 800]
// // material.wireframe = true
// gui.add(material, "iridescence").min(0).max(1).step(0.0001);
// gui.add(material, "iridescenceIOR").min(1).max(2.333).step(0.0001);
// gui.add(material.iridescenceThicknessRange, "0").min(1).max(1000).step(1);
// gui.add(material.iridescenceThicknessRange, "1").min(1).max(1000).step(1);

// gui.add(material, "sheen").min(0).max(1).step(0.0001);
// gui.add(material, "sheenRoughness").min(0).max(1).step(0.0001);
// gui.add(material, "sheenColor").min(0).max(1).step(0.0001);

// gui.add(material, "clearcoat").min(0).max(1).step(0.0001)
// gui.add(material, "clearcoatRoughness").min(0).max(1).step(0.0001)

material.transmission = 1
material.ior = 1.5
material.thickness = 0.5

gui.add(material, "transmission").min(0).max(1).step(0.0001)
gui.add(material, "ior").min(0).max(10).step(0.0001)
gui.add(material, "thickness").min(1).max(10).step(0.0001)

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 30, 30), material);
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 50, 50), material);
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
// const anbientLight = new THREE.AmbientLight("#fff", 1)
// scene.add(anbientLight)

// const pointLight = new THREE.PointLight("#fff", 30)
// pointLight.position.x = 2
// pointLight.position.y = 0.5
// pointLight.position.z = 4
// material.side = THREE.DoubleSide
// scene.add(pointLight)

/**
 * Environment Map
 */
const rgbeLoader = new RGBELoader();
rgbeLoader.load("./assets/textures/environmentMap/2k.hdr", (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = environmentMap;
  scene.environment = environmentMap;
});

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
