import './style.css';
import * as THREE from 'three';
import gsap from "gsap";

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: "#FAF9F6" })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera 
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// // Time
// let time = Date.now()
const clock = new THREE.Clock()

// Animations

gsap.to(mesh.position, {
    duration: 1,
    delay: 0.1,
    x: 1
})

const tick = () => 
{
    const elapsedTime = clock.getElapsedTime()

    // Update Objects
    mesh.rotation.y = elapsedTime * Math.PI * 2 // Multiply by 2*pi to make 1 rotation each second

    // mesh.position.y = Math.sin(elapsedTime) // Math sin function used to reverse the animations

    // const currentTime = Date.now()
    // const deltaTime = currentTime - time
    // time = currentTime

    // mesh.rotation.x += 0.001 * deltaTime

    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()
