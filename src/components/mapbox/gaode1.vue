<template>
    <img class="land" src="/images/land.jpg" alt="">
    <div id="container"></div>
    <button class="export-btn" @click="exportInfo">导出数据</button>
</template>



<script setup lang="ts">
import coordtransform from "coordtransform"

const key = "331ed9fe9b2bc08a21ef65c76ee71a4c";


const buildList = ref([]);// 建筑列表
const polygonList = ref([]);// 区域列表

const currentBuild: any = ref([]);// 当前建筑
const markerList = ref([]);//当前marker列表

const point = ref(); // 当前点位

const mapRef = ref();

onMounted(() => {
    mapRef.value = new AMap.Map("container", {
        center: [108.053175, 29.936159],
        zoom: 17,
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

// AMapLoader.load({
//     key: key, //申请好的Web端开发者 Key，调用 load 时必填
//     version: "2.0", //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
// }).then((AMap: any) => {
// mapRef.value = new AMap.Map("container", {
//     center: [108.053175, 29.936159],
//     zoom: 17,
// })
// mapRef.value.on("click", (e: any) => {
//     const lng = e.lnglat.lng;
//     const lat = e.lnglat.lat;
//     console.log(lng, lat)
//     point.value = [lng, lat];
//     currentBuild.value.push(point.value)
//     createPoint(AMap);
// })

// mapRef.value.on("rightclick", () => {
//     console.log("双击")
//     createPolygon(AMap);
// })


// const oldBuild = getStore('buildList');
// if (oldBuild) {
//     buildList.value = oldBuild;
//     buildList.value.forEach((element, elementIndex) => {
//         if (element) {
//             currentBuild.value = element;
//             createPolygon(AMap, false, elementIndex)
//         }
//     });
// }
// }).catch(err => {
//     console.log(err)
// })



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
        fillOpacity: 0.35
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

    console.log(jianzu)
}


watch(() => buildList.value, (val) => {
    setStore("buildList", val)
}, {
    deep: true,
})


</script>

<style scoped>
#container {
    width: 100%;
    height: 100%;
    opacity: 1;
    position: absolute;
    top: 0;
    left: 0;
}

.land {
    content: "";
    background-image: url('/images/land.jpg');
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.export-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    border: none;
    background-color: rgba(0, 0, 255, 0.25);
    width: 6rem;
    height: 2.5rem;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    border-radius: .25rem;
    cursor: pointer;
    box-shadow: 0 5px 10px 0px rgba(0, 0, 255, 0.25);

    &:hover {
        color: white;
    }
}
</style>