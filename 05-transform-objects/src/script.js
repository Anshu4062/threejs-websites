import './style.css'
import * as THREE from 'three'


// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()


/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: "#5A639C" })
const mesh = new THREE.Mesh(geometry, material)
// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1

mesh.position.set(0.7, -0.6, 1)  // Does same as -> mesh.position.x = 0.7  mesh.position.y = -0.6  mesh.position.z = 1
// console.log(mesh.position.length())  // Gives the distance of mesh from center of scene

//Scale of mesh
// mesh.scale.x = 1  // Increases the size of x-axis of mesh
// mesh.scale.y = 1
// mesh.scale.z = 1
mesh.scale.set(2, 0.5, 0.5)

scene.add(mesh)


//Axes Helper
const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)


/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}


/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// console.log(mesh.position.distanceTo(camera.position))  // For checking distance between camera and mesh


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)