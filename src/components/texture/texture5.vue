<template>
    <div id="first" style="height: 100%;width: 100%;"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { render } from "vue";

const scene = new THREE.Scene();

const planeGeometry = new THREE.PlaneGeometry(108,108);
// const boxGeometry = new THREE.BoxGeometry(100,100,100);
// const sphereGeometry = new THREE.SphereGeometry(100, 100, 100);
const textureLoader = new THREE.TextureLoader();//创建一个纹理贴图加载器，TextureLoader

//部分透明的png图
const texture = textureLoader.load('/images/2.png', () => {
    renderer.render(scene, camera);

});//load方法加载对象，创建一个纹理贴图
texture.colorSpace = THREE.SRGBColorSpace;

const material = new THREE.MeshBasicMaterial({
    map: texture,//将纹理贴图赋值给材质
    side: THREE.DoubleSide,
    transparent:true,
    // color: 0xff0000,
});



const mesh = new THREE.Mesh(planeGeometry, material);
mesh.rotateX(-Math.PI/2)
mesh.position.y = 10;
scene.add(mesh)


// 坐标辅助观察
const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper)

// 网格地面辅助观察
const gridHelper = new THREE.GridHelper(300,25,0x004444,0x004444);
scene.add(gridHelper)



const width = 800;
const height = 500;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);


const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x0000ff, 0.25);//设置背景色
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