<template>
    <img class="land" :src="fileUrl" alt="">

    <div id="container"></div>


    <button class="export-btn position-btn" @click="exportInfo">导出数据</button>
    <button class="change-btn position-btn">
        <span>切换背景图</span>
        <input @change="uploadFile" type="file">
    </button>

    <div class="opacity-controls">
        <input class="opacity-input" v-model="opacityValue" type="text">
        <button class="position-btn" @click="setOpacity">保存透明度</button>
    </div>
</template>

<script setup lang="ts">
import coordtransform from "coordtransform"

const buildList = ref([]);// 建筑列表
const polygonList = ref([]);// 区域列表
const currentBuild: any = ref([]);// 当前建筑
const markerList = ref([]);//当前marker列表
const point = ref(); // 当前点位


const opacityValue = ref(0.5)
const fileUrl = ref()
const mapRef = ref();

function init() {
    // 创建百度地图实例
    mapRef.value = new BMapGL.Map('container', {
        style: {
            // styleJson: purpleStyle
        }
    });
    const centerPoint = new BMapGL.Point(108.0674061, 29.9325113);
    mapRef.value.centerAndZoom(centerPoint, 16);
    mapRef.value.enableScrollWheelZoom(true);

    mapRef.value.addEventListener('click', (e) => {
        point.value = [e.latlng.lng, e.latlng.lat]
        currentBuild.value.push(point.value)
        createPoint()
    })

    mapRef.value.addEventListener('rightclick', (e) => {
        console.log(e, '右击')
        if (currentBuild.value.length) {
            createPolygon();
        }
    })
}


function createPolygon( sAdd: boolean = true, index = buildList.value.length) {

    const polygon = new BMapGL.Polygon(
        currentBuild.value.map((item: any) => {
            return new BMapGL.Point(item[0], item[1])
        }),
        {
        strokeColor: "#FF33FF",
        strokeOpacity: 0.2,
        strokeWeight: 6,
        fillColor: "#1791fc",
        fillOpacity: 0.35,
    })

    // polygon.on('rightclick', (e) => {
    //     const name = e.target.name;
    //     console.log(name)
    //     const index = name.split('-')[1];
    //     mapRef.value.remove(polygon)
    //     buildList.value[index] = null;

    //     console.log(polygonList.value, buildList.value)
    // })
    // polygon.name = 'polygon-' + index;
    // if (isAdd) {
    //     buildList.value.push(currentBuild.value);
    // }
    mapRef.value.addOverlay(polygon)

    // 清空上一个区域
    markerList.value.forEach(item => {
        mapRef.value.removeOverlay(item)
    })
    markerList.value = [];
    currentBuild.value = [];
}

function createPoint() {
    const marker = new BMapGL.Marker(new BMapGL.Point(point.value[0], point.value[1]))
    mapRef.value.addOverlay(marker)
    markerList.value.push(marker)
}

function uploadFile(e) {
    const file = e.target.files[0];
    fileUrl.value = URL.createObjectURL(file);
}

function setOpacity() {
    const value: number = Number(opacityValue.value);
    if (!isNaN(value)) {
        document.getElementById("container").style.opacity = value;
    }
}

function exportInfo() {
    const jianzu = {
        type: "FeatureCollection",
        features: buildList.value.filter(item => {
            return item && item.length
        }).map(item => {
            return {
                properties: {
                    type: "Feature"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [
                        [
                            ...item.map(it => {
                                return changeGeo(it)
                            })
                        ]
                    ]
                }
            }
        })
    }
}


onMounted(() => {
    init()
})
</script>

<style>
.BMap_cpyCtrl span,
.anchorBL {
    display: none !important;
}
</style>

<style scoped>
#container {
    width: 100vw;
    min-height: 100vh;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
}


.land {
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
}


.position-btn {
    border: none;
    background-color: rgba(0, 0, 255, 0.25);
    width: 6rem;
    height: 2.5rem;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    border-radius: .25rem;
    cursor: pointer;
    box-shadow: 0 2px 5px 0px rgba(0, 0, 255, 0.25);
    z-index: 999;
}

.position-btn:hover {
    color: white;
}

.position-btn:active {
    box-shadow: 0 5px 10px 0px rgba(0, 0, 255, 0.25);
}

.export-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
}

.change-btn {
    position: absolute;
    top: 1rem;
    right: 8rem;
}

.change-btn input {
    position: absolute;
    top: 0;
    left: 0;
    width: 6rem;
    height: 2.5rem;
    background-color: transparent;
    border: none;
    outline: none;
    opacity: 0;
    cursor: pointer;
}

.opacity-controls {
    position: absolute;
    top: 1rem;
    right: 15em;
    z-index: 999;
}

.opacity-input {
    height: 2.5rem;
    font-size: 1rem;
    padding: 0.5rem;
    box-sizing: border-box;
    border: 2px solid rgba(0, 0, 255, 0.25);
    border-radius: 0.25rem;
    margin-right: 1rem;
    outline: none;
}
</style>