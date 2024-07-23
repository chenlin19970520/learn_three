<template>
    <div id="first"></div>
    <button @click="save">下载图片</button>
</template>
<script setup lang="ts">
import * as THREE from "three";

const scene = new THREE.Scene();// 创建一个3D场景
const geometry = new THREE.BoxGeometry(100, 100, 100);// 创建一个长方体几何体
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
}); // 创建一个网格基础材质
const mesh = new THREE.Mesh(geometry, material); // 创建一个物体，物体由几何体和材质组成
mesh.position.set(0, 0, 0);//设置物体的位置
scene.add(mesh);// 将物体添加到场景中


const width = 800;
const height = 500;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);// 创建一个透视投影相机，透视投影相机本质就是模拟人眼观察世界。30：视场角度，width/height:画布宽高比，1：近裁截面，3000：远裁截面
camera.position.set(200, 200, 200);// 设置相机的位置
camera.lookAt(mesh.position);//指定相机观察的3D坐标


const renderer = new THREE.WebGLRenderer({
    //想把canvas画布上内容下载到本地，需要设置为true
    preserveDrawingBuffer: true,
});//创建一个渲染器

renderer.setSize(width, height);//设置渲染器的宽高
renderer.render(scene, camera);//执行渲染操作

function save() {
    const link = document.createElement('a')
    const canvas = renderer.domElement;
    link.href = canvas.toDataURL('image/png')
    link.download = 'threejs.png'
    link.click();

}

onMounted(() => {
    document.getElementById("first")?.appendChild(renderer.domElement);//将渲染后的画面插入到页面中
})
</script>

<style scoped></style>