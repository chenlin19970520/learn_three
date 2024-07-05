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
// 通过改变几何体顶点坐标，可以改变模型自身相对坐标原点的位置。
geometry.translate(100 / 2, 0, 0)
const mesh = new THREE.Mesh(geometry, material);

mesh.position.set(0, 0, 0)



console.log(mesh.position, '本地坐标')

scene.add(mesh);






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

let frame: any = undefined;
function render() {
    mesh.rotateY(0.01)
    renderer.render(scene, camera);

    frame = requestAnimationFrame(render)
}
render();
onMounted(() => {
    document.getElementById("first")?.appendChild(renderer.domElement);
})
onUnmounted(() => {
    cancelAnimationFrame(frame)
})

</script>

<style scoped></style>