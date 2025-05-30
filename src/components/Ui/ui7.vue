<template>
    <div id="first" style="height: 100%;width: 100%;"></div>

    <div class="progess-line">
        <div :style="{ width: prorStyle }" class="line-body"></div>
    </div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const prorStyle = ref(`0%`);

const scene = new THREE.Scene();// 创建一个3D场景

const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
}); // 创建一个网格基础材质



const loader = new GLTFLoader();//创建gltf的加载器对象；
loader.load("/models/phoenix_bird/scene.gltf", function (gltf) {
    scene.add(gltf.scene);

    renderer.render(scene, camera);
}, (progress) => {
    console.log(progress)
    prorStyle.value = `${(progress.loaded / progress.total) * 100}%`
})


const width = 800;
const height = 500;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);// 创建一个透视投影相机，透视投影相机本质就是模拟人眼观察世界。30：视场角度，width/height:画布宽高比，1：近裁截面，3000：远裁截面
camera.position.set(200, 200, 200);// 设置相机的位置



const renderer = new THREE.WebGLRenderer();//创建一个渲染器
renderer.setSize(width, height);//设置渲染器的宽高
renderer.render(scene, camera);//执行渲染操作

onMounted(() => {
    document.getElementById("first")?.appendChild(renderer.domElement);//将渲染后的画面插入到页面中
    console.log(document.getElementById("first"))
})
</script>

<style scoped>
.progess-line {
    position: fixed;
    top: 2rem;
    left: 50%;
    width: 200px;
    height: 10px;
    background-color: gainsboro;
    border-radius: 10px;
}

.line-body {
    height: 100%;
    background: linear-gradient(to right, #d14d12, #00ee00);
    transition: all .15s ease-in;
    border-radius: 10px;
}
</style>