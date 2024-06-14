<template>
    <div id="two" style="height: 100%;width: 100%;"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";

const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(100, 100,100);
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    transparent: true,//开启透明
    opacity: 0.5,
}); 
const mesh = new THREE.Mesh(geometry, material); 
mesh.position.set(0, 0, 0);
scene.add(mesh);

const axesHelper = new THREE.AxesHelper(150);//创建一个辅助观察坐标系，参数为size：number。
//three.js坐标轴颜色红R、绿G、蓝B分别对应坐标系的x、y、z轴，对于three.js的3D坐标系默认y轴朝上。
scene.add(axesHelper)

const width = 800;
const height = 500;
const camera = new THREE.PerspectiveCamera(30, width / height, 1,375);// 创建一个透视投影相机，透视投影相机本质就是模拟人眼观察世界。30：视场角度，width/height:画布宽高比，1：近裁截面，3000：远裁截面
// camera.position.set(-1000, 0, 0);// 设置相机的位置，从x轴的负1000位置观察物体，看到一个矩形平面
camera.position.set(200,200,200);// 设置相机的位置，

camera.lookAt(mesh.position);//指定相机观察的3D坐标
// camera.lookAt(-2000,0,0);//指定相机观察的3D坐标,// 相机视线沿着x轴负半轴，mesh位于相机后面，自然看不到



const renderer = new THREE.WebGLRenderer();

renderer.setSize(width, height);
renderer.render(scene, camera);

onMounted(() => {
    document.getElementById("two")?.appendChild(renderer.domElement);
})
</script>

<style scoped></style>