<template>
    <div id="first" style="height: 100%;width: 100%;"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

const scene = new THREE.Scene();// 创建一个3D场景
const geometry = new THREE.BoxGeometry(100, 100, 100);// 创建一个长方体几何体
const material = new THREE.MeshLambertMaterial(); // 创建一个网格基础材质
const mesh = new THREE.Mesh(geometry, material); // 创建一个物体，物体由几何体和材质组成
mesh.position.set(0, 0, 0);//设置物体的位置
scene.add(mesh);// 将物体添加到场景中



const pointLight = new THREE.PointLight(0xffffff, 1.0);
pointLight.position.set(-200, 100, -200);
pointLight.decay = 0.0;//光源随着距离的改变会衰减，设置光源衰减属性decay,默认为2.0,不衰减设设置为0.0

scene.add(pointLight)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
scene.add(pointLightHelper)

const gui = new GUI();//实例化一个gui对象

const obj = {
    x: 30,
    y: 30,
    z: 30,
};//创建一个对象，对象的属性值可以被gui库创建的界面改变
const positionControlX =  gui.add(mesh.position, "x", 0, 100).name("x坐标")
const positionControlY = gui.add(mesh.position, "y", 0, 100).name("y坐标")
const positionControlZ = gui.add(mesh.position, "z", 0, 100).name("z坐标")


const intensityControl = gui.add(pointLight, "intensity", 0.1, 2).name("亮度")

intensityControl.onChange(function (value) {
    renderer.render(scene, camera);//执行渲染操作
})
positionControlX.onChange(function (value) {
    renderer.render(scene, camera);//执行渲染操作
})
positionControlY.onChange(function (value) {
    renderer.render(scene, camera);//执行渲染操作
})
positionControlZ.onChange(function (value) {
    renderer.render(scene, camera);//执行渲染操作
})

// gui.domElement.style.width = "300px";
const width = 800;
const height = 500;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);// 创建一个透视投影相机，透视投影相机本质就是模拟人眼观察世界。30：视场角度，width/height:画布宽高比，1：近裁截面，3000：远裁截面
camera.position.set(200, 200, 200);// 设置相机的位置
camera.lookAt(mesh.position);//指定相机观察的3D坐标



const renderer = new THREE.WebGLRenderer();//创建一个渲染器

renderer.setSize(width, height);//设置渲染器的宽高
renderer.render(scene, camera);//执行渲染操作
const constrols = new OrbitControls(camera, renderer.domElement);
constrols.addEventListener("change", () => {
    renderer.render(scene, camera);//执行渲染操作
})
onMounted(() => {
    document.getElementById("first")?.appendChild(renderer.domElement);//将渲染后的画面插入到页面中
})
</script>

<style scoped></style>