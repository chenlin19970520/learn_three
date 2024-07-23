<template>
    <div id="first" style="height: 100%;width: 100%;"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { add } from "three/examples/jsm/nodes/Nodes.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();// 创建一个3D场景


const geometry = new THREE.PlaneGeometry(100, 100);// 创建一个长方体几何体
const material = new THREE.MeshLambertMaterial({
    color: 0xff0000,
    side:THREE.DoubleSide
}); // 创建一个网格基础材质
const mesh = new THREE.Mesh(geometry, material); // 创建一个物体，物体由几何体和材质组成
mesh.position.set(0, 0, 0);//设置物体的位置
scene.add(mesh);// 将物体添加到场景中

const geometry1 = new THREE.PlaneGeometry(100, 100);// 创建一个长方体几何体
const material1 = new THREE.MeshLambertMaterial({
    color: 0x00ff00,
    side:THREE.DoubleSide
}); // 创建一个网格基础材质
const mesh1 = new THREE.Mesh(geometry1, material1); // 创建一个物体，物体由几何体和材质组成
mesh.position.set(0, 0, 0);//设置物体的位置
scene.add(mesh1);// 将物体添加到场景中
mesh1.position.z = 0.1


const width = 800;
const height = 500;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);// 创建一个透视投影相机，透视投影相机本质就是模拟人眼观察世界。30：视场角度，width/height:画布宽高比，1：近裁截面，3000：远裁截面
camera.position.set(200, 200, 200);// 设置相机的位置
camera.lookAt(mesh.position);//指定相机观察的3D坐标


const light = new THREE.AmbientLight(0xffffff, 1);

scene.add(light)


const renderer = new THREE.WebGLRenderer({
    logarithmicDepthBuffer: true
});//创建一个渲染器

renderer.setSize(width, height);//设置渲染器的宽高
renderer.render(scene, camera);//执行渲染操作

const controls = new OrbitControls(camera, renderer.domElement);//创建相机控件轨道控制器

controls.addEventListener("change", function () {
    renderer.render(scene, camera);//如果控件改变了相机参数，必须重新调用渲染操作
})
onMounted(() => {
    document.getElementById("first")?.appendChild(renderer.domElement);//将渲染后的画面插入到页面中
})
</script>

<style scoped></style>