<template>
    <div id="first" style="height: 100%;width: 100%;"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();// 创建一个3D场景

const geometry = new THREE.BufferGeometry();
const R = 50; // 圆弧半径
const N = 64;  // 分段数量
const sp = 2 * Math.PI / N; // 两个相邻点间隔圆弧


// 批量生成圆弧上的顶点数据
const arr = [];
for (let i = 0; i < N; i++) {
    const angle = sp * i;//当前点 弧度
    // 以坐标原点为中心，在XOY平面上生成圆弧的顶点数据
    const x = R * Math.cos(angle);
    const y = R * Math.sin(angle);
    arr.push(x,y,0)
}
//类型数组创建顶点数据
const vertices = new Float32Array(arr)
//创建属性缓冲区对象
//3个为一组，表示一个顶点的xyz坐标
const attribue = new THREE.BufferAttribute(vertices, 3);
geometry.attributes.position = attribue;

const material = new THREE.LineBasicMaterial({
    color:0xff0000
})

const line = new THREE.LineLoop(geometry,material)
scene.add(line)



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


const controls = new OrbitControls(camera,renderer.domElement);//创建相机控件轨道控制器
controls.addEventListener("change",function(){
    renderer.render(scene,camera);//如果控件改变了相机参数，必须重新调用渲染操作
})
onMounted(() => {
    document.getElementById("first")?.appendChild(renderer.domElement);//将渲染后的画面插入到页面中
})
</script>

<style scoped></style>