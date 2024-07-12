<template>
    <div id="first" style="height: 100%;width: 100%;"></div>
</template>
<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";

const scene = new THREE.Scene();// 创建一个3D场景


const geometry = new LineGeometry();//创建一个空的几何体，可以通过BufferGeometry自定义任何几何形状，具体一点说就是定义顶点数据。
//类型化数组创建顶点数据
const vertices = new Float32Array([ 
    0.12171228071724727,
    -0.16490905746968565,
    0,
    0.11070972511265609,
    -0.22692282258071828,
    0,
    0.10416264602258707,
    -0.24738783754429505,
    0,
    0.06649425197429082,
    -0.25176729424896394,
    0,
    0.03079598558588259,
    -0.22388068168027075,
    0,
    0.03170355679685599,
    -0.18103873252982794,
    0,
    0.010751228192475537,
    -0.15746776005011043,
    0,
    -0.029832563838454007,
    -0.14836670662214146,
    0,
    -0.09051696379856367,
    -0.13127792117063564,
    0,
    -0.10967090514168376,
    -0.14110097371712982,
    0,
    -0.11225957748820292,
    -0.1643015730291495,
    0,
    -0.08730416171124489,
    -0.19960941112339015,
    0,
    -0.06889582502481062,
    -0.23071743409587953,
    0,
    -0.06956463519418321,
    -0.26484758707658784,
    0,
    -0.12194545670490697,
    -0.28230714644018917,
    0,
    -0.12974358780274997,
    -0.282864637543355,
    0,
    -0.17083282718499504,
    -0.2857987132453559,
    0,
    -0.19527721055669645,
    -0.3023863713615924,
    0,
    -0.2109907588783244,
    -0.33468790601011733,
    0,
    -0.2598795256217272,
    -0.3600043911172861,
    0,
    -0.28163610194542343,
    -0.35507098663515535,
    0,
    -0.3445601084017653,
    -0.2727040900718407,
    0,
    -0.36467886775540137,
    -0.26787031509991266,
    0,
    -0.3809844317590887,
    -0.27757813174366675,
    0,
    -0.3889319630409318,
    -0.2993073154022454,
    0,
    -0.3898758371005897,
    -0.34688459514723036,
    0,
    -0.4199262180295591,
    -0.3985366257001033,
    0,
    -0.41716999407503863,
    -0.4270968628444507,
    0,
    -0.39043713498813304,
    -0.49392070690566925,
    0,
    -0.38955748904504617,
    -0.5111055102747741,
    0,
    -0.39301324096391,
    -0.5370523295495104,
    0,
    -0.3995938303755793,
    -0.5449606613172477,
    0,
    -0.4099303683376547,
    -0.5518508179529817,
    0,
    -0.422963090928306,
    -0.555146870258568,
    0,
    -0.43942782895987875,
    -0.5572620752324156,
    0,
    -0.5418577121006365,
    -0.5372230945096135,
    0,
    -0.5499951352053358,
    -0.5340252759640407,
    0,
    -0.5590457145744949,
    -0.5341396564854222,
    0,
    -0.5640778478739321,
    -0.5359713547098295,
    0,
    -0.5754615833870957,
    -0.5463090529624424,
    0,
    -0.5802703145420764,
    -0.5538097628574405,
    0,
    -0.5827514746067664,
    -0.6002019051616116,
    0,
    -0.5924918080961561,
    -0.6184117188990967,
    0,
    -0.5938154658008443,
    -0.6333898767701953,
    0,
    -0.5838670890645972,
    -0.6485837524878661,
    0,
    -0.5479691570096747,
    -0.66118882536,
    0,
    -0.4746374031578853,
    -0.6472209488994736,
    0,
    -0.4423362456252562,
    -0.6472209488994736,
    0,
    -0.3934446863552239,
    -0.6949522131103549,
    0
])
const attribue = new THREE.BufferAttribute(vertices,3);//创建属性缓冲区对象，3个一组，表示一个顶点的坐标
// geometry.attributes.position = attribue;// 设置几何体的顶点位置
geometry.setPositions(vertices)

// const material = new THREE.PointsMaterial({
//     color:0xff0000,
//     size:10,//点像素尺寸
// });// 创建点模型材质

const material = new LineMaterial({
    color:0xff0000,
    linewidth:10,
});


// const material = new THREE.MeshBasicMaterial({
//     color: 0xff0000,
// }); // 创建一个网格基础材质
// const mesh = new THREE.Mesh(geometry, material); // 创建一个物体，物体由几何体和材质组成

// const points = new THREE.Points(geometry,material) // 点模型对象

const line = new Line2(geometry,material); // 线模型对象
// const lineLoop = new THREE.LineLoop(geometry,material); //闭合线条 模型对象
// const lineSegments = new THREE.LineSegments(geometry,material);//非连续性线条
line.position.set(0, 0, 0);//设置物体的位置
scene.add(line);// 将物体添加到场景中


const width = 800;
const height = 500;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);// 创建一个透视投影相机，透视投影相机本质就是模拟人眼观察世界。30：视场角度，width/height:画布宽高比，1：近裁截面，3000：远裁截面
camera.position.set(200, 200, 200);// 设置相机的位置
camera.lookAt(line.position);//指定相机观察的3D坐标


const renderer = new THREE.WebGLRenderer();//创建一个渲染器

renderer.setSize(width, height);//设置渲染器的宽高
renderer.render(scene, camera);//执行渲染操作


const controls = new OrbitControls(camera, renderer.domElement);//创建相机控件轨道控制器
controls.addEventListener("change", function () {
    console.log('camera.position', camera.position);
    renderer.render(scene, camera);//如果控件改变了相机参数，必须重新调用渲染操作
})

onMounted(() => {
    document.getElementById("first")?.appendChild(renderer.domElement);//将渲染后的画面插入到页面中
    console.log(document.getElementById("first"))
})
</script>

<style scoped></style>