<template>
    <div id="first" style="height: 100%;width: 100%;"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

const scene = new THREE.Scene();// 创建一个3D场景
const geometry = new THREE.BoxGeometry(100, 100, 100);// 创建一个长方体几何体
const material = new THREE.MeshPhongMaterial(); // 创建一个高光
const mesh = new THREE.Mesh(geometry, material); // 创建一个物体，物体由几何体和材质组成
mesh.position.set(0, 0, 0);//设置物体的位置
scene.add(mesh);// 将物体添加到场景中



const pointLight = new THREE.PointLight(0xffffff, 1.0);
pointLight.position.set(-200, 100, -200);
pointLight.decay = 0.0;//光源随着距离的改变会衰减，设置光源衰减属性decay,默认为2.0,不衰减设设置为0.0
scene.add(pointLight)
const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
scene.add(pointLightHelper)



const ambientLight = new THREE.AmbientLight(0x0000ff, 0.5);
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xff0000, 1.0);
directionalLight.position.set(200, 100, 200);
directionalLight.target = mesh;
scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 10);
scene.add(directionalLightHelper)

const gui = new GUI();//实例化一个gui对象


const materialFolder = gui.addFolder("材质");//创建gui子菜单
materialFolder.close();

const obj = {
    color:0x00ffff, //材质颜色
    specular:0x111111,//材质高光颜色
}

materialFolder.addColor(obj,'color').onChange(val=>{
    mesh.material.color.set(val)
    renderer.render(scene, camera);//执行渲染操作
})

materialFolder.addColor(obj,'specular').onChange((val)=>{
    mesh.material.specular.set(val)
    renderer.render(scene, camera);//执行渲染操作
})


const ambientFolder = gui.addFolder("环境光");
ambientFolder.add(ambientLight,'intensity',0,2);//环境光强度

const directionalFolder = gui.addFolder("平行光");
directionalFolder.add(directionalLight,'intensity',0,2);//平行光强度

const directionalPositionFolder = directionalFolder.addFolder("位置");//子菜单中的子菜单
directionalPositionFolder.add(directionalLight.position,'x',-400,400);//平行光位置
directionalPositionFolder.add(directionalLight.position,'y',-400,400);//平行光位置
directionalPositionFolder.add(directionalLight.position,'z',-400,400);//平行光位置


gui.onChange(val=>{
    console.log(val)
    renderer.render(scene, camera);//执行渲染操作
})

// colorControl.onChange((value) => {
//     mesh.material.color.set(value)
//     renderer.render(scene, camera);//执行渲染操作
// })

// gui.domElement.style.width = "300px";
const width = 800;
const height = 500;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);// 创建一个透视投影相机，透视投影相机本质就是模拟人眼观察世界。30：视场角度，width/height:画布宽高比，1：近裁截面，3000：远裁截面
camera.position.set(200, 200, 200);// 设置相机的位置
camera.lookAt(mesh.position);//指定相机观察的3D坐标



const renderer = new THREE.WebGLRenderer();//创建一个渲染器

renderer.setSize(width, height);//设置渲染器的宽高
renderer.render(scene, camera);//执行渲染操作
const constrols = new OrbitControls(camera, renderer.domElement);
constrols.addEventListener("change", () => {
    renderer.render(scene, camera);//执行渲染操作
})
onMounted(() => {
    document.getElementById("first")?.appendChild(renderer.domElement);//将渲染后的画面插入到页面中
})
</script>

<style scoped></style>