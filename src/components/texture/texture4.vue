<template>
    <div id="first" style="height: 100%;width: 100%;"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();

const planeGeometry = new THREE.PlaneGeometry(1080, 607);
// const boxGeometry = new THREE.BoxGeometry(100,100,100);
// const sphereGeometry = new THREE.SphereGeometry(100, 100, 100);
const textureLoader = new THREE.TextureLoader();//创建一个纹理贴图加载器，TextureLoader

const texture = textureLoader.load('/images/1.png', () => {
    renderer.render(scene, camera);
});//load方法加载对象，创建一个纹理贴图
texture.colorSpace = THREE.SRGBColorSpace;

//设置纹理贴图的阵列模式
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
// uv两个方向纹理重复数据
texture.repeat.set(12,12);//注意选择合适的数量

const material = new THREE.MeshLambertMaterial({
    map: texture,//将纹理贴图赋值给材质
    side: THREE.DoubleSide,
    // color: 0xff0000,
});



const mesh = new THREE.Mesh(planeGeometry, material);
mesh.rotateX(-Math.PI/2);
scene.add(mesh)



const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper)


const abLight = new THREE.AmbientLight(0xffffff,2);
scene.add(abLight)

const width = 800;
const height = 500;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.render(scene, camera);


const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", function () {
    renderer.render(scene, camera);
})


onMounted(() => {
    document.getElementById("first")?.appendChild(renderer.domElement);
})

</script>

<style scoped></style>