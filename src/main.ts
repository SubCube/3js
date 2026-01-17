import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';
import GUI from 'lil-gui';

// addons
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const gui = new GUI({
  width: 400,
  title: 'Debug UI Panel',
  closeFolders: false,
});

/*
 * INFO:
 * To show or hide debug UI panel press h on your keyboard
 */
window.addEventListener('keydown', (event) => {
  if (event.key === 'h') gui.show(gui._hidden);
});

const cubeFolder = gui.addFolder('Example Cube');
const guiObj = {
  color: '#22ccff',
  spin: () => {
    gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2, duration: 2 });
  },
  subdivision: 1,
};

// canvas
const canvas = document.querySelector<HTMLCanvasElement>('#app')!;

// scene
const scene = new THREE.Scene();

// objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: guiObj.color,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Adding mesh to GUI
cubeFolder.add(mesh.position, 'y').name('Position Y').min(-3).max(3).step(0.01);
cubeFolder.add(mesh, 'visible');
cubeFolder.add(material, 'wireframe');
cubeFolder.addColor(guiObj, 'color').onChange((_val: THREE.Color) => {
  material.color.set(guiObj.color);
});
cubeFolder.add(guiObj, 'spin').name('animate');
cubeFolder
  .add(guiObj, 'subdivision')
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange(() => {
    mesh.geometry.dispose();
    mesh.geometry = new THREE.BoxGeometry(1, 1, 1, guiObj.subdivision, guiObj.subdivision, guiObj.subdivision);
  });

// NOTE: custom triangle
// scene.add(triangle);

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Clock
// const clock = new THREE.Clock();

// resize window
window.addEventListener('resize', () => {
  console.log('resize');
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  // update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// fullscreen? (on dbl click)
window.addEventListener('dblclick', () => {
  // NOTE: on old safari => should check document.webkitFullscreenElement
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animation
const tick = () => {
  // const elapsedTime = clock.getElapsedTime();

  // NOTE: update controls
  controls.update();
  // end

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();