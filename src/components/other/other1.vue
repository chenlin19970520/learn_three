<template>
    <div id="text" style="height: 100%;width: 100%;"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const scene = new THREE.Scene();

const loader = new FontLoader();
console.log(FontLoader)
loader.load("/src/components/font2.json", function (font) {
    const geometry = new TextGeometry('Hello three.js!', {
        font: font,
        size: 80,
        depth: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelSegments: 5
    });
    const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        flatShading: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
    renderer.render(scene, camera);
}, () => {

}, (err) => {
    console.log(err)
})

// const geometry = new THREE.BoxGeometry(100, 100, 100);
// const material = new THREE.MeshLambertMaterial();
// const mesh = new THREE.Mesh(geometry, material);


const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper)


const pointLight = new THREE.PointLight(0xffffff, 1.0);
pointLight.intensity = 1.0;
pointLight.decay = 0.0;
pointLight.position.set(400, 200, 300);
scene.add(pointLight);


const width = 800;
const height = 500;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(200, 500, 500);
camera.lookAt(0, 0, 0);



const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.render(scene, camera);

onMounted(() => {
    document.getElementById("text")?.appendChild(renderer.domElement);
})
</script>

<style scoped></style>