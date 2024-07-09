<template>
    <div id="first" style="height: 100%;width: 100%;"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();

const planeGeometry = new THREE.PlaneGeometry(108, 60.7);
// const boxGeometry = new THREE.BoxGeometry(100,100,100);
// const sphereGeometry = new THREE.SphereGeometry(100, 100, 100);
const textureLoader = new THREE.TextureLoader();//创建一个纹理贴图加载器，TextureLoader

const texture = textureLoader.load('/images/1.png', () => {
    renderer.render(scene, camera);

});//load方法加载对象，创建一个纹理贴图
texture.colorSpace = THREE.SRGBColorSpace;

//设置纹理贴图的偏移量
// texture.offset.x +=0.3;//纹理U方向偏移 正往左移，负往右移
// 设置.wrapS也就是U方向，纹理映射模式(包裹模式)
texture.wrapS = THREE.RepeatWrapping;//对应offste.x偏移
// 设置UV两个方向纹理重复数量
texture.repeat.x = 50;

// texture.offset.y -=0.4;//纹理V方向偏移， //正往下移动，负往上移动
// 设置.wrapT也就是V方向，纹理映射模式
texture.wrapT = THREE.RepeatWrapping;//对应offste.y偏移
texture.repeat.y = 50

const material = new THREE.MeshBasicMaterial({
    map: texture,//将纹理贴图赋值给材质
    side: THREE.DoubleSide,
    // color: 0xff0000,
});



const mesh = new THREE.Mesh(planeGeometry, material);
scene.add(mesh)



const axesHelper = new THREE.AxesHelper(150);
// scene.add(axesHelper)





const width = 800;
const height = 500;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(20, 20, 3);
camera.lookAt(0, 20, -10);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.render(scene, camera);


// const controls = new OrbitControls(camera, renderer.domElement);
// controls.addEventListener("change", function () {
//     renderer.render(scene, camera);
// })

let frame: any = null;
function render() {
    texture.offset.x += 0.01;//设置纹理动画，偏移量根据纹理和动画需要，设置合适的值
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