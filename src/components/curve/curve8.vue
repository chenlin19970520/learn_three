<template>
    <div id="first" style="height: 100%;width: 100%;"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();// 创建一个3D场景



//三维样条 实现飞线轨迹
const p1 = new THREE.Vector3(-100, 0, -100);
const p3 = new THREE.Vector3(100, 0, 100);
//计算p1和p2的中点坐标
const x2 = (p1.x + p3.x) / 2;
const z2 = (p1.z + p3.z) / 2;
const h = 50;
const p2 = new THREE.Vector3(x2, h, z2);

const arr = [p1, p2, p3]
// const curve = new THREE.CatmullRomCurve3(arr);//创建三维样条
const curve = new THREE.QuadraticBezierCurve3(p1, p2, p3);

const points = curve.getPoints(50); // 获取曲线点坐标
const geometry = new THREE.BufferGeometry().setFromPoints(points);//创建模型
const material = new THREE.LineBasicMaterial({
    color: 0xff0000,
})
const line = new THREE.Line(geometry, material);
scene.add(line)



let frame: any = null;
const range = 5;
let start = 0;//起点

let linePoints = points.slice(start, range);
let lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x00ff00,
    linewidth: 15
})
let newLine = new THREE.Line(lineGeometry, lineMaterial);
scene.add(newLine)
function lineAnimation() {
    if (start >= points.length) {
        start = 0;
    }
    linePoints = points.slice(start, start + range);

    lineGeometry.setFromPoints(linePoints)
    renderer.render(scene, camera)
    start = start + 1;


    frame = requestAnimationFrame(lineAnimation)

}


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
    lineAnimation();
})

onUnmounted(() => {
    cancelAnimationFrame(frame)
})

</script>

<style scoped></style>