<template>
    <div id="first" style="height: 100%;width: 100%;"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();// 创建一个3D场景


const pointsArr = [
    new THREE.Vector3(0,0,0),
    new THREE.Vector3(10,40,0),
    new THREE.Vector3(30,10,30),
    new THREE.Vector3(-10,0,100),
    new THREE.Vector3(-30,50,50),
]

const arr = [
    new THREE.Vector2(0,0),
    new THREE.Vector2(10,40),
    new THREE.Vector2(30,10),
    new THREE.Vector2(40,60),
    new THREE.Vector2(60,70),
]

// const curve = new THREE.CatmullRomCurve3(pointsArr);//创建三维样条曲线
const curve = new THREE.SplineCurve(arr);
const points = curve.getPoints(50)


const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({
    color: 0x0000ff,
    linewidth: 1
    // size:10,

});

const line = new THREE.Line(geometry, material);
scene.add(line);

const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper)


const width = 800;
const height = 500;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);// 创建一个透视投影相机，透视投影相机本质就是模拟人眼观察世界。30：视场角度，width/height:画布宽高比，1：近裁截面，3000：远裁截面
camera.position.set(200, 200, 200);// 设置相机的位置
camera.lookAt(0, 0, 0);//指定相机观察的3D坐标


const renderer = new THREE.WebGLRenderer();//创建一个渲染器
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