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

// console.log(mesh,'mesh')
console.log(mesh.geometry,'mesh.geometry')
console.log(mesh.material,'mesh.material')
//访问模型的材质，并设置材质的颜色属性
// mesh.material.color.set(0x00ff00)
//访问模型的几何体，并设置几何体顶点数据
// mesh.geometry.translate(0,100,0)

//材质或几何体共享
const mesh1 = new THREE.Mesh(geometry,material)
const mesh2 = new THREE.Mesh(geometry,material)

mesh1.position.set(150,0,0)
mesh2.position.set(300,0,0)

scene.add(mesh1,mesh2);//可一次添加多个Mesh物体

//mesh,mesh1和mesh2共享一个材质，改变一个颜色，另一个会跟着改变
mesh1.material.color.set(0x0000ff)
//同理，mesh共享一个几何体geometry，改变一个顶点，另一个也会跟着改变
mesh2.geometry.translate(0,100,0)

const axesHelper = new THREE.AxesHelper(550);
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