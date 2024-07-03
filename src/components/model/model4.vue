<template>
    <div id="first" style="height: 100%;width: 100%;"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();
// const geometry = new THREE.BoxGeometry(100, 100, 100);
const planeGeometry = new THREE.PlaneGeometry(50,50)
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
});

// material.transparent = true;
// material.opacity = 0.5;
// material.side = THREE.DoubleSide;
// material.side = THREE.BackSide;
material.side = THREE.FrontSide;
console.log(material.side,'material.side')

const mesh = new THREE.Mesh(planeGeometry, material); 
mesh.position.set(0, 0, 0)
scene.add(mesh);




const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper)


const width = 800;
const height = 500;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(200, 200, 200);
camera.lookAt(mesh.position);




const renderer = new THREE.WebGLRenderer();

renderer.setSize(width, height);
renderer.render(scene, camera);


const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", function () {
    renderer.render(scene, camera);
})


onMounted(() => {
    document.getElementById("first")?.appendChild(renderer.domElement);
})
</script>

<style scoped></style>