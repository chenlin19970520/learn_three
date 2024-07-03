<template>
    <div id="first" style="height: 100%;width: 100%;"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
});
const mesh = new THREE.Mesh(geometry, material); 
mesh.position.set(0, 0, 0)
scene.add(mesh);

const color = new THREE.Color(0xffff00);
color.r = 0.0;
color.setRGB(0,1,0);// RGB方式设置颜色
color.setHex(0x00ff00);//十六进制设置颜色
color.setStyle('#00ff00');// 前端css颜色设置
color.set(0x00ff00)
color.set('#00ff00')

// material.color = color;
// material.color.set(0x15af21)
material.color.set('rgb(111,222,111)')
console.log(color,'color')


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