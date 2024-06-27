<template>
    <div id="first" style="height: 100%;width: 100%;"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();// 创建一个3D场景


const axesHelper = new THREE.AxesHelper(150);//创建一个辅助观察坐标系，参数为size：number。
//three.js坐标轴颜色红R、绿G、蓝B分别对应坐标系的x、y、z轴，对于three.js的3D坐标系默认y轴朝上。
scene.add(axesHelper)

const material = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    side: THREE.FrontSide,
    wireframe:true,//显示线框
})

const geometry = new THREE.BoxGeometry(100,100,100,2,2,2);
// const geometry = new THREE.PlaneGeometry(100,100,2,2);
// const geometry = new THREE.SphereGeometry(50);



console.log("几何体:",geometry)
console.log("几何体-位置:",geometry.attributes.position)
console.log("几何体-索引:",geometry.index)



const mesh = new THREE.Mesh(geometry, material) // 网格模型
mesh.position.set(0, 0, 0);//设置物体的位置
scene.add(mesh);// 将物体添加到场景中

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);//创建一个环境光，参数1环境光颜色，参数2光照强度.环境光AmbientLight (opens new window)没有特定方向，只是整体改变场景的光照明暗。
// scene.add(ambientLight);


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