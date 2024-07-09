<template>
    <div>
        <div id="five" style="height: 100%;width: 100%;"></div>
    </div>
</template>

<script setup lang="ts">
import * as THREE from "three"
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();


const loader = new GLTFLoader();//创建gltf的加载器对象；
loader.load("/models/phoenix_bird/scene.gltf", function (gltf) {
    scene.add(gltf.scene);
    // 遍历所有节点
    gltf.scene.traverse(function(obj){
        if(obj.isMesh) {
            console.log(obj,'模型节点')
            console.log(obj.material,'模型材质')
            obj.material = obj.material.clone();
            obj.material = new THREE.MeshLambertMaterial({
                color: 0xffff00,
                emissive: 0xff00ff,
                emissiveIntensity: 1,
                side: THREE.DoubleSide
            })

        }
    })

    
    renderer.render(scene, camera);
})



const axesHelper = new THREE.AxesHelper(1050);
scene.add(axesHelper)

const abLight = new THREE.AmbientLight(0xffffff,1);
scene.add(abLight);


const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 30000);
camera.position.set(500, 500, 500);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.render(scene, camera);//如果控件改变了相机参数，必须重新调用渲染操作

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", function () {
    renderer.render(scene, camera);
})


onMounted(() => {
    document.getElementById("five")?.appendChild(renderer.domElement)
})
</script>

<style scoped></style>