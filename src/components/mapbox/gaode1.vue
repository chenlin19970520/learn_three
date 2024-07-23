<template>
    <img class="land" :src="fileUrl" alt="">
    <div id="container"></div>
    <button class="export-btn position-btn" @click="exportInfo">导出数据</button>
    <button class="change-btn position-btn" @click="exportInfo">
        <span>切换背景图</span>
        <input @change="uploadFile" type="file">
    </button>

    <div class="opacity-controls">
        <input class="opacity-input"  v-model="opacityValue" type="text">
        <button class="position-btn" @click="setOpacity">保存透明度</button>
    </div>

</template>



<script setup lang="ts">
import coordtransform from "coordtransform"
// import { yuanqu } from "./yuanqu"

const key = "331ed9fe9b2bc08a21ef65c76ee71a4c";


const buildList = ref([]);// 建筑列表
const polygonList = ref([]);// 区域列表

const opacityValue = ref(0.5)
const fileUrl = ref()

const currentBuild: any = ref([]);// 当前建筑
const markerList = ref([]);//当前marker列表

const point = ref(); // 当前点位

const mapRef = ref();

onMounted(() => {
    mapRef.value = new AMap.Map("container", {
        center: [108.053175, 29.936159],
        zoom: 16,
        viewMode: '3D', //地图模式
        // terrain: true //开启地形图
    })
    mapRef.value.on("click", (e: any) => {
        const lng = e.lnglat.lng;
        const lat = e.lnglat.lat;
        console.log(e)
        point.value = [lng, lat];
        currentBuild.value.push(point.value)
        createPoint(AMap);
    })

    mapRef.value.on("rightclick", () => {
        console.log("双击")
        if (currentBuild.value.length) {
            createPolygon(AMap);
        }
    })



    const oldBuild = getStore('buildList');
    if (oldBuild) {
        buildList.value = oldBuild;
        buildList.value.forEach((element, elementIndex) => {
            if (element) {
                currentBuild.value = element;
                createPolygon(AMap, false, elementIndex)
            }
        });
    }

})


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

function createPoint(AMap: any) {
    const marker = new AMap.Marker({
        position: new AMap.LngLat(point.value[0], point.value[1])
    })
    mapRef.value.add(marker)
    markerList.value.push(marker)
}

function createPolygon(AMap: any, isAdd: boolean = true, index = buildList.value.length) {
    const polygon = new AMap.Polygon({
        path: currentBuild.value.map((item: any) => {
            return new AMap.LngLat(item[0], item[1])
        }),
        strokeColor: "#FF33FF",
        strokeOpacity: 0.2,
        strokeWeight: 6,
        fillColor: "#1791fc",
        fillOpacity: 0.35,
        // height: 100,
        // extrusionHeight: 100,

    })

    polygon.on('rightclick', (e) => {
        const name = e.target.name;
        console.log(name)
        const index = name.split('-')[1];
        mapRef.value.remove(polygon)
        buildList.value[index] = null;

        console.log(polygonList.value, buildList.value)
    })
    polygon.name = 'polygon-' + index;
    if (isAdd) {
        buildList.value.push(currentBuild.value);
    }
    mapRef.value.add(polygon)

    // 清空上一个区域
    markerList.value.forEach(item => {
        mapRef.value.remove(item)
    })
    markerList.value = [];
    currentBuild.value = [];
}

function setStore(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}
function getStore(key) {
    return JSON.parse(localStorage.getItem(key))
}

function changeGeo(arr: any) {
    return coordtransform.gcj02towgs84(arr[0], arr[1]);
}

function changeGeoTwo(arr: any) {
    return coordtransform.wgs84togcj02(arr[0], arr[1]);
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


// const newYuan = yuanqu.filter(item => {
//     return item && item.length >= 4
// })



function getRandomInt(min: number, max: number) {
    min = Math.ceil(min); // 确保min是整数
    max = Math.floor(max); // 确保max是整数
    return Math.floor(Math.random() * (max - min + 1)) + min; // 返回介于min和max之间的整数
}
// 生成高德数据中心数据格式
const initGaodeGeo = () => {

    const geoData = {
        type: "FeatureCollection",
        features: newYuan.map(item => {
            const newItem = [...item, item[0]]
            return {
                type: "Feature",
                properties: {
                    type: "Feature",
                    h: getRandomInt(50, 100),
                    _HEIGHT_PROP: "h",
                    _AS_CUBE: "Y"
                },
                geometry: {
                    type: "Polygon",
                    coordinates: [
                        newItem
                    ]
                }
            }
        })
    }
}

watch(() => buildList.value, (val) => {
    setStore("buildList", val)
}, {
    deep: true,
})


</script>

<style scoped>
#container {
    width: 100vw;
    min-height: 100vh;
    height: 100%;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
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