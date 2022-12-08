import * as THREE from "three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(110, window.innerWidth / window.innerHeight, 0.01, 2000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var object_switch = null;

const mtlLoader = new MTLLoader();
mtlLoader.setPath('models/');
mtlLoader.load('mm_frame.mtl', (materials) => {
  materials.preload();
  const objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath('models/');
  objLoader.load('mm_frame.obj', (object) => {
    const mesh = object;
    object_switch = object;
    scene.add(mesh);
  });
})

camera.position.z = 5;

const light = new THREE.AmbientLight(0xFFFFFF, 1.0);
scene.add(light);

const animate = function () {
  requestAnimationFrame(animate);
  if (object_switch){
    object_switch.rotation.y += 0.01;
  }
  renderer.render(scene, camera);
};
animate();