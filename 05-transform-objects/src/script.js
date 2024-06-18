import './style.css'
import * as THREE from 'three'


//// Canvas
const canvas = document.querySelector('canvas.webgl')


//// Scene
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


//// Scale of mesh
// mesh.scale.x = 1  // Increases the size of x-axis of mesh
// mesh.scale.y = 1
// mesh.scale.z = 1
mesh.scale.set(2, 0.5, 0.5)


//// Rotation - It's not a Vector3 rather it is a Euler

//Quaternion - Used to update rotation but in mathematical way

mesh.rotation.reorder("YXZ") // reorder in rotation changes the first axis created with rotation to the first assigned value(like here reorder("YXZ") will make first created axis which is "x" below to Y-axis), 2nd to 2nd assigned and same for 3rd

mesh.rotation.x = Math.PI * 0.25 // For rotating 3D object we use rotation // pi = 3.14159265359 or use (Math.PI)
mesh.rotation.y = Math.PI * 0.25
// Gimbal lock - When you can no more rotate

scene.add(mesh) 


//// Axes Helper
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

camera.lookAt(3, 0, 0) // Other way -> (camera.lookAt(new THREE.Vector3(3, 0, 0)))

// console.log(mesh.position.distanceTo(camera.position))  // For checking distance between camera and mesh


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)