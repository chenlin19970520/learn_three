<template>
    <div id="four" style="height: 100%;width: 100%;"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";

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

pointLight.position.set(400,200, 300);//设置光源的位置
// pointLight.position.set(0,400,0);//设置光源的位置
// pointLight.position.set(0,0,400);//设置光源的位置


//光源和网格模型Mesh对应一样是三维场景的一部分，自然需要添加到三维场景中才能起作用。
scene.add(pointLight);


const width = 800;
const height = 500;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);

camera.position.set(200, 200, 200);

camera.lookAt(mesh.position);



const renderer = new THREE.WebGLRenderer();

renderer.setSize(width, height);
renderer.render(scene, camera);

onMounted(() => {
    document.getElementById("four")?.appendChild(renderer.domElement);
})
</script>

<style scoped></style>