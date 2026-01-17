import * as THREE from 'three';
import './style.css'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ffcc, wireframe: true } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const clock = new THREE.Clock()


const tick = () => {
  // Update objects, handle user input, etc.
  // ...
  const elapsedTime = clock.getElapsedTime(); // Total elapsed time since the clock started



  cube.rotation.y = Math.sin(elapsedTime)
  cube.rotation.x = Math.sin(elapsedTime)
  cube.rotation.z = Math.cos(elapsedTime)

  // Render the scene
  renderer.render(scene, camera);
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

// Start the loop
tick();