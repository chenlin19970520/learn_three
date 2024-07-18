<template>
    <div id='build' style="width:100%;height:100%">

    </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();


const build = [0, 30, 60, 90, 120, 150]
const material = new THREE.MeshPhongMaterial({
    color: 0x4C8DAE,
    transparent: true,
    opacity: 0.85
});
const group = new THREE.Group();
group.scale.set(1, 1, 1)
build.forEach((item) => {
    const geometry = new THREE.BoxGeometry(100, 29, 80, 10);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-70, item, 100)
    group.add(mesh)

})
scene.add(group)





const pointLight = new THREE.PointLight(0xffffff, 1.0);//创建一个点光源，参数1光源颜色，参数2光照强度
pointLight.intensity = 1.0;//设置光照强度
pointLight.decay = 0.0;//光源随着距离的改变会衰减，设置光源衰减属性decay,默认为2.0,不衰减设设置为0.0

pointLight.position.set(400, 200, 300);//设置光源的位置
scene.add(pointLight);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(250, 150, 350);
camera.lookAt(100,100, 50)


const renderer = new THREE.WebGLRenderer({
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera)


let frame: any = null;
let step = 0.1;
let start = 0;

const animationBuild = () => {
    start += step
    group.scale.set(1, start, 1)
    renderer.render(scene, camera);
    if (start >= 1) {
        cancelAnimationFrame(frame)
    } else {
        frame = requestAnimationFrame(animationBuild)
    }
}


const controls = new OrbitControls(camera, renderer.domElement);//创建相机控件轨道控制器
controls.addEventListener("change", function () {
    renderer.render(scene, camera);//如果控件改变了相机参数，必须重新调用渲染操作
})

onMounted(() => {
    document.getElementById('build')?.appendChild(renderer.domElement);
})
</script>

<style scoped></style>