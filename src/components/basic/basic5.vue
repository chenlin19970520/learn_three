<template>
    <div id="five" style="height: 100%;width: 100%;"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshLambertMaterial(); // 创建一个漫反射材质
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0);
scene.add(mesh);

const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper)


const pointLight = new THREE.PointLight(0xffffff, 1.0);//创建一个点光源，参数1光源颜色，参数2光照强度
pointLight.intensity = 1.0;//设置光照强度
pointLight.decay = 0.0;//光源随着距离的改变会衰减，设置光源衰减属性decay,默认为2.0,不衰减设设置为0.0
// pointLight.position.set(400, 200, 300);//设置光源的位置
pointLight.position.set(-400,-200,-300);//设置光源的位置
// pointLight.position.set(0,0,400);//设置光源的位置
scene.add(pointLight);
const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);//创建一个点光源辅助器
scene.add(pointLightHelper);

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);//创建一个环境光，参数1环境光颜色，参数2光照强度.环境光AmbientLight (opens new window)没有特定方向，只是整体改变场景的光照明暗。
// scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffff00, 1.0);//创建一个平行光光源，参数1光源颜色，参数2光照强度
// directionalLight.position.set(400, 200, 300);//设置光源的位置
// directionalLight.position.set(100,0,0);//设置光源的位置
// directionalLight.position.set(0,100,0);//设置光源的位置
// directionalLight.position.set(100,100,100);//设置光源的位置
directionalLight.position.set(100,60,50);//设置光源的位置




// directionalLight.target = mesh;//方向指向网格模型mesh，默认为(0,0,0)
directionalLight.target = mesh;//方向指向网格模型mesh，默认为(0,0,0)

scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 10);//创建一个平行光光源辅助器
scene.add(directionalLightHelper);

const width = 800;
const height = 500;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(200, 200, 200);
camera.lookAt(mesh.position);



const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.render(scene, camera);



const controls = new OrbitControls(camera, renderer.domElement);//创建相机控件轨道控制器
controls.addEventListener("change", function () {
    renderer.render(scene, camera);//如果控件改变了相机参数，必须重新调用渲染操作
})

onMounted(() => {
    document.getElementById("five")?.appendChild(renderer.domElement);
})
</script>

<style scoped></style>