<template>
    <div id="first" style="height: 100%;width: 100%;"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { render } from "vue";

const scene = new THREE.Scene();
const loader = new GLTFLoader();
const planeGeometry = new THREE.PlaneGeometry(108, 60.7);
const boxGeometry = new THREE.BoxGeometry(100, 100, 100);
const sphereGeometry = new THREE.SphereGeometry(100, 100, 100);

const textureCube = new THREE.CubeTextureLoader();//创建一个环境贴图加载

// 加载环境贴图
// 加载周围环境6个方向贴图
// 上下左右前后6张贴图构成一个立方体空间
// 'px.jpg', 'nx.jpg'：x轴正方向、负方向贴图  p:正positive  n:负negative
// 'py.jpg', 'ny.jpg'：y轴贴图
// 'pz.jpg', 'nz.jpg'：z轴贴图
const texture = textureCube.load(['/images/px.jpg', '/images/nx.jpg', '/images/py.jpg', '/images/ny.jpg', '/images/pz.jpg', '/images/nz.jpg'], () => {
    console.log("加载成功")


    const mesh = new THREE.Mesh(sphereGeometry, material);
    scene.add(mesh)
    scene.background = texture
    renderer.render(scene, camera);

}, () => {
    console.log("加载失败")

});//load方法加载对象，创建一个纹理贴图
texture.colorSpace = THREE.SRGBColorSpace;
const texture1 = new THREE.TextureLoader().load("/images/1.png")
texture1.colorSpace = THREE.SRGBColorSpace;
const material = new THREE.MeshPhysicalMaterial({
    envMap: texture,
    // map:texture1,
    metalness:0,//0玻璃非金属，1金属
    roughness: 0,
    // color: 0xffffff,
    clearcoat:1,//物体表面清漆层或者说透明涂层的厚度
    clearcoatRoughness: 0.1,//透明涂层表面的粗糙度
    // emissive:0xffffff,
    // emissiveMap:texture1

    envMapIntensity: 1, //环境贴图对Mesh表面影响程度
    transmission: 1.0, //玻璃材质透光率，transmission替代opacity  玻璃材质透光率，transmission替代opacity 
    ior:1.5,//折射率 非金属材料的折射率从1.0到2.333。默认值为1.5。
});





let gui = new GUI();
gui.add(material, "metalness", 0, 1).name("材质金属程度").onChange(() => {
    renderer.render(scene, camera)
})
gui.add(material, "roughness", 0, 1).name("材质粗糙程度").onChange(() => {
    renderer.render(scene, camera)
})
gui.add(material, "clearcoat", 0, 1).name("透明涂层的厚度").onChange(() => {
    renderer.render(scene, camera)
})
gui.add(material, "clearcoatRoughness", 0, 1).name("透明涂层表面的粗糙度").onChange(() => {
    renderer.render(scene, camera)
})
gui.add(material, "envMapIntensity", 0, 100).name("环境贴图对Mesh表面影响程度").onChange(() => {
    renderer.render(scene, camera)
})
gui.addColor(material, "emissive").onChange(() => {
    renderer.render(scene, camera)
})
gui.add(material, "transmission", 0, 1).name("玻璃材质透光率").onChange(() => {
    renderer.render(scene, camera)
})

gui.add(material, "ior", 1.0, 2.333).name("折射率").onChange(() => {
    renderer.render(scene, camera)
})
const axesHelper = new THREE.AxesHelper(1050);
scene.add(axesHelper)

const abLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(abLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(20, 200, 20)
// scene.add(directionalLight)

const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5, 0xff0000);
// scene.add(dirLightHelper);

const width = 1080;
const height = 1080;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(-200, 200, -200);

camera.lookAt(0, 0, 0);


const renderer = new THREE.WebGLRenderer();
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor(0xaaaaaa)
renderer.setSize(width, height);



const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", function () {
    renderer.render(scene, camera);
})


onMounted(() => {
    document.getElementById("first")?.appendChild(renderer.domElement);
})

</script>

<style scoped></style>