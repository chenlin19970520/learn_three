<template>
    <div id="first" style="height: 100%;width: 100%;"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(20, 20, 20);
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
});

const group = new THREE.Group();
group.name = "院士廷"
for (let i = 0; i < 5; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, i * 30);
    mesh.name = `${i + 1}号楼`
    group.add(mesh);
}



const group1 = new THREE.Group();
group1.name = "院士廷2期"
for (let i = 0; i < 5; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(i * 30, 0, 0);
    mesh.name = `${i + 6}号楼`
    group1.add(mesh);
}
group1.position.y = 30;


const model = new THREE.Group();
model.add(group, group1)
model.name = "重庆富力院士廷"
model.position.set(-50, 0, -25);
scene.add(model);


model.traverse((obj) => {
    console.log("所有模型节点的名称：", obj.name)
    if (obj.isMesh) {
        obj.material.color.set(0x0000ff);
    }
})

const nameNode = scene.getObjectByName("1号楼")
console.log(nameNode,'nameNode')
nameNode.material.color.set(0x00ff00);//改变1号楼的材质颜色，会导致所有的楼栋的材质颜色改变，因为使用同一材质。


const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper)


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