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
const geometry = new THREE.BufferGeometry();//创建一个空的几何体，可以通过BufferGeometry自定义任何几何形状，具体一点说就是定义顶点数据。
//类型化数组创建顶点数据
const vertices = new Float32Array([
    0, 0, 0, //顶点1坐标
    100, 0, 0, //顶点2坐标
    100, 100, 0,//顶点3  逆时针 ， 正面
    0, 100, 0, //  顺时针，反面
])

console.log(vertices,'vertices')
const attribue = new THREE.BufferAttribute(vertices, 3);//创建属性缓冲区对象，3个一组，表示一个顶点的坐标
geometry.attributes.position = attribue;// 设置几何体的顶点位置




// 类型化数组创建数据
const indexes = new Uint16Array([
    0, 1, 2, 0, 2, 3
])
//通过threejs的属性缓冲区对象BufferAttribute表示几何体顶点索引.index数据。
geometry.index = new THREE.BufferAttribute(indexes, 1);//索引数据赋值给几何体的index属性，1个为1组


const material = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    side: THREE.FrontSide
    // side: THREE.DoubleSide
    // side: THREE.BackSide

})

// const material = new THREE.MeshBasicMaterial({
//     color: 0xff0000,
// }); // 创建一个网格基础材质
// const mesh = new THREE.Mesh(geometry, material); // 创建一个物体，物体由几何体和材质组成

const mesh = new THREE.Mesh(geometry, material) // 网格模型
mesh.position.set(0, 0, 0);//设置物体的位置
scene.add(mesh);// 将物体添加到场景中

const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);//创建一个环境光，参数1环境光颜色，参数2光照强度.环境光AmbientLight (opens new window)没有特定方向，只是整体改变场景的光照明暗。
scene.add(ambientLight);


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