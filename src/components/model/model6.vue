<template>
    <div id="first" style="height: 100%;width: 100%;"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
});
const mesh = new THREE.Mesh(geometry, material); 
mesh.position.set(0, 0, 0)
scene.add(mesh);

const mesh2 = mesh.clone();
mesh2.position.x = 110;
scene.add(mesh2)

// mesh2.material.color.set(0x00ff00);// 通过clone方法克隆的物理模型与原来的共享材质
// mesh2.position.y = 100; // 通过clone方法克隆的物理模型不予原来的共享几何体


mesh2.material = mesh.material.clone();
mesh2.geometry = mesh.geometry.clone();
// 通过材质和几何体各自克隆之后，两者都不共享。
mesh2.material.color.set(0x00ff00);//
mesh2.position.y = 100; // 


mesh.position.copy(mesh2.position);//位置重合
mesh.position.y += 100;//mesh在原来的y轴上加100 



const v1 = new THREE.Vector3(0, 0, 0);
console.log(v1,'v1')
const v2 = v1.clone();
console.log(v2,'v2')
v2.x = 10; // 修改 v2 的 x 坐标后v1不改变，clone后没有关联关系
const v3 = new THREE.Vector3(0, 0, 10);
v3.copy(v2);//将v2的值赋值给v3
console.log(v3,'v3')



const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper)


const width = 800;
const height = 500;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(200, 200, 200);
camera.lookAt(mesh.position);




const renderer = new THREE.WebGLRenderer();

renderer.setSize(width, height);
renderer.render(scene, camera);


const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", function () {
    renderer.render(scene, camera);
})

let frame:any = null;
function render(){
    mesh.rotateY(0.01);//mesh旋转动画
    mesh2.rotation.copy(mesh.rotation);//同步mesh的姿态角度，不管mesh如何变化，mesh2始终保持一致
    renderer.render(scene,camera);
    frame = requestAnimationFrame(render)
}


onMounted(() => {
    document.getElementById("first")?.appendChild(renderer.domElement);

    render()
})

onUnmounted(()=>{
    cancelAnimationFrame(frame);
})
</script>

<style scoped></style>