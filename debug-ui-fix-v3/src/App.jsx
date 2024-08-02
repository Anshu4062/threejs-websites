import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import GUI from "lil-gui";

//Debug UI Initialization
const gui = new GUI({
  width: 400,
  title: "Debug UI",
  // , closeFolders: true    // For closing folders by default
});

gui.close(); // To close Main Folder by default
//Hide debug UI
gui.hide()
// Show Debug UI
addEventListener("keydown", (event) => {
  if (event.key == "h") {
    gui.show(gui._hidden);
  }
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
let debugObject = {};
debugObject.color = "#ff0000";

let geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: debugObject.color });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Debug UI

const Folder = gui.addFolder("Folder");
const ByDefaultClosedFolder = gui.addFolder("ByDefaultClosedFolder");
ByDefaultClosedFolder.close();

Folder.add(mesh.position, "y").min(-2).max(2).step(0.01).name("vertical axis");
ByDefaultClosedFolder.add(mesh, "visible");
ByDefaultClosedFolder.add(material, "wireframe");
ByDefaultClosedFolder.addColor(debugObject, "color").onChange(() => {
  material.color.set(debugObject.color);
});

debugObject.spin = () => {
  gsap.to(mesh.rotation, {
    y: mesh.rotation.y + 2 * Math.PI,
  });
};

Folder.add(debugObject, "spin");

debugObject.subdivision = 3;
Folder.add(debugObject, "subdivision")
  .min(1)
  .max(40)
  .step(1)
  .onFinishChange(() => {
    mesh.geometry.dispose(); // Delete previous geometries
    mesh.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObject.subdivision,
      debugObject.subdivision,
      debugObject.subdivision
    );
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

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
