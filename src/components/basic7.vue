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
pointLight.position.set(-400, -200, -300);//设置光源的位置
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
directionalLight.position.set(100, 60, 50);//设置光源的位置




// directionalLight.target = mesh;//方向指向网格模型mesh，默认为(0,0,0)
directionalLight.target = mesh;//方向指向网格模型mesh，默认为(0,0,0)

scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 10);//创建一个平行光光源辅助器
scene.add(directionalLightHelper);

const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(200, 200, 200);
camera.lookAt(mesh.position);



const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);




const controls = new OrbitControls(camera, renderer.domElement);//创建相机控件轨道控制器
controls.addEventListener("change", function () {
    console.log("相机改变")
    renderer.render(scene, camera);//如果控件改变了相机参数，必须重新调用渲染操作
})

const clock = new THREE.Clock();
function animationRender() {

    const spt = clock.getDelta() * 1000;//获取自上一帧渲染以来经过的时间
    // console.log('两帧渲染时间间隔（毫秒）',spt);
    // console.log('帧率FPS',1000/spt)

    renderer.render(scene, camera);
    mesh.rotateY(0.01); // 围绕Y轴旋转0.01弧度，
    // mesh.rotateX(0.01);//围绕X轴旋转0.01弧度
    mesh.rotateZ(0.01);//围绕Z轴旋转0.01弧度


    requestAnimationFrame(animationRender);
}

onMounted(() => {
    document.getElementById("five")?.appendChild(renderer.domElement);
    animationRender();

    window.onresize = function () {
        renderer.setSize(window.innerWidth, window.innerHeight);//渲染器重置宽高
        camera.aspect = window.innerWidth / window.innerHeight; // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
        // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
        // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
        // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
        camera.updateProjectionMatrix();
    }
})
</script>

<style scoped></style>