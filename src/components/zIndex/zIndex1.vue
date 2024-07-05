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








const group = new THREE.Group();//创建一个组
const mesh1 = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(geometry, material);

mesh2.translateX(125);
// group.add(mesh1);//添加mesh1,作为group的子对象
mesh1.add(mesh2) ;//Mesh也可以添加子对象，mesh和group的父类都是Object3D,
group.add(mesh1);//添加mesh2,作为group的子对象
scene.add(group); //添加group到scene,作为scene的子对象

console.log(scene.children,"scene.children")
console.log(group.children,"group.children")

group.translateY(100);//父对象平移，子对象也会平移

group.scale.set(0.5,0.5,0.5);//父对象缩放，子对象也会缩放

group.rotateY(Math.PI/4);//父对象旋转，子对象也会旋转


const Object3D = new THREE.Object3D();
Object3D.add(mesh1,mesh2);//父对象添加子对象，子对象的原父对象删除
scene.add(Object3D)


const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper)


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