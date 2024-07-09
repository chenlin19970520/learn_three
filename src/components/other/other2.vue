<template>
    <div id="first" style="height: 100%;width: 100%;"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { FileLoader  } from "three"

const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
}); 
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0);
scene.add(mesh);


const loader = new THREE.FileLoader();
loader.load("/json/longhe.json",(data)=>{
    console.log(data)
})

const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(200, 200, 200);
camera.lookAt(mesh.position)


const renderer = new THREE.WebGLRenderer();

renderer.setSize(width, height);
renderer.render(scene, camera);

onMounted(() => {
    document.getElementById("first")?.appendChild(renderer.domElement);
})
</script>

<style scoped></style>