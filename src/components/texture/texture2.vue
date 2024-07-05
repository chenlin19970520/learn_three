<template>
    <div id="first" style="height: 100%;width: 100%;"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();

const planeGeometry = new THREE.PlaneGeometry(100,100);
// const boxGeometry = new THREE.BoxGeometry(100,100,100);
// const sphereGeometry = new THREE.SphereGeometry(100, 100, 100);
const textureLoader = new THREE.TextureLoader();//创建一个纹理贴图加载器，TextureLoader

const texture = textureLoader.load('/images/1.png', () => {
    renderer.render(scene, camera);

});//load方法加载对象，创建一个纹理贴图
texture.colorSpace = THREE.SRGBColorSpace;

const material = new THREE.MeshBasicMaterial({
    map: texture,//将纹理贴图赋值给材质
    side: THREE.DoubleSide,
    // color: 0xff0000,
});

//顶点UV坐标可以在0~1.0之间任意取值
console.log(planeGeometry.attributes.uv)
const uvs = new Float32Array([
    0.3,0.7,
    0.5,0.7,
    0.3,0.3,
    0.5,0.3
])
planeGeometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))


const mesh = new THREE.Mesh(planeGeometry, material);
scene.add(mesh)



const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper)


const width = 800;
const height = 500;
const camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 3000);
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