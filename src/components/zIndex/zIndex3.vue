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
// mesh的世界坐标就是mesh.position与group.position的累加
mesh.position.set(50, 0, 0) //改变子对象的.position，子对象在3D空间中的坐标会发生改变。
const group = new THREE.Group(); 
group.add(mesh);
group.position.set(0,100,0)//改变父对象的.position，子对象在3D空间中的位置也会跟着变化，也就是说父对象.position和子对象.position叠加才是才是子对象的.position。
scene.add(group);
//任何一个模型的本地坐标(局部坐标)就是模型的.position属性。
//一个模型的世界坐标，说的是，模型自身.position和所有父对象.position累加的坐标。

const worldPostion = new THREE.Vector3();
mesh.getWorldPosition(worldPostion);//读取物体的世界坐标，并赋值给worldPostion
console.log(worldPostion,'世界坐标')
console.log(mesh.position,'本地坐标')




const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper)

//给mesh添加局部坐标系
const axesHelper1 = new THREE.AxesHelper(150);
mesh.add(axesHelper1)

const width = 800;
const height = 500;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(200, 200, 200);
camera.lookAt(0,0,0);


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