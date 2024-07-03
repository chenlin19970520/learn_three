<template>
    <div id="model2" style="height: 100%;width: 100%;"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: 0.6
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0)
scene.add(mesh);

// 将物体添加到场景中
// mesh.position.x = 80;
// mesh.position.set(80,2,10)
// mesh.translateX(100); //沿着x轴平移100
// mesh.translateZ(-100); //沿着x轴平移100

console.log(mesh.position);//位置属性，使用Vector3表示的。


const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper)


const width = 800;
const height = 500;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(200, 200, 200);
camera.lookAt(mesh.position);

const v3 = new THREE.Vector3(1, 1, 1);//实例化一个三维向量对象
v3.normalize();//向量归一化
mesh.translateOnAxis(v3, 100);
console.log(v3)

// mesh.scale.x = 2.0;//放大两倍
// mesh.scale.set(0.5,1.5,2);//网格模型，分别缩小0.5倍 放大1.5倍 放大2倍

// const Euler = new THREE.Euler(Math.PI / 4, Math.PI / 2, Math.PI / 2, "YZX");//创建一个欧拉对象，表示绕着x,y,z轴，旋转45,0,90度。PI表示180度
// Euler.x = Math.PI / 4;
// Euler.y = Math.PI / 2;
// Euler.z = Math.PI / 4; // 通过属性设置欧拉对象值


// mesh.rotation.y += Math.PI/3;//绕y轴的角度设置为60度;
// mesh.rotation.y += Math.PI/3;//绕y轴的角度增加60度;
// mesh.rotation.y -= Math.PI/3;//绕y轴的角度60度;
// mesh.setRotationFromEuler(Euler)


// mesh.rotateZ(Math.PI / 4);




const renderer = new THREE.WebGLRenderer();

renderer.setSize(width, height);
renderer.render(scene, camera);


const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", function () {
    renderer.render(scene, camera);
})

const axis = new THREE.Vector3(1,1,1)
let animation:number | undefined = undefined
function render() {
    // mesh.rotation.y += 0.01;
    mesh.rotateOnAxis(axis,0.01)
    console.log(mesh.rotation, 'rotation')
    renderer.render(scene, camera);

    animation = requestAnimationFrame(render);
}
render();

onMounted(() => {
    document.getElementById("model2")?.appendChild(renderer.domElement);
})

onUnmounted(()=>{
    cancelAnimationFrame(animation as number)
    animation = undefined;
})
</script>

<style scoped></style>