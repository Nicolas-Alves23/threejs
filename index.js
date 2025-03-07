import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js"
// inicializando o height e o width 
const w = window.innerWidth
const h = window.innerHeight
const renderer = new THREE.WebGLRenderer({ antialias : true })
renderer.setSize(w, h);

document.body.appendChild(renderer.domElement)
const fov = 75
const aspect = w / h
const near = 0.2
const far = 10
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.z = 5
const scene = new THREE.Scene()


const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.03

const geo = new THREE.IcosahedronGeometry(1.0, 2)
const mat = new THREE.MeshStandardMaterial({
       color: '#884dfa',
       flatShading: true
})

const mesh = new THREE.Mesh(geo,mat)
scene.add(mesh)

const wireMat = new THREE.MeshBasicMaterial({
    color: '#ffffff',
    wireframe: true
})

const wireMesh = new THREE.Mesh(geo, wireMat)
wireMesh.scale.setScalar(1.002)
mesh.add(wireMesh)

const hemilight = new THREE.HemisphereLight(0xffffff, "#2FED39")
scene.add(hemilight) 

function animate(t = 0){
  requestAnimationFrame(animate)
  mesh.rotation.y = t * 0.0001
  renderer.render(scene,camera)
  controls.update()
}
animate()
