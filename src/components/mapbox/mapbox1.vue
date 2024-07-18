<template>
    <div id="map"></div>

    <div class="build" v-show="showBuild">
        <three-build ref="threeBuild" />
        <build-info ref="buildInfo" />
        <div class="close-btn" @click="handleBuild"></div>
    </div>


    <land-info ref="landInfo" @close="hideLandModal" v-if="showLand" />


</template>

<script setup lang="ts">
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import ThreeBuild from "./three-build.vue"
import BuildInfo from "./build-info.vue"
import LandInfo from "./land-info.vue"
import longhe from "/json/longhe.json"
mapboxgl.accessToken = "pk.eyJ1IjoiY3FtaW1pIiwiYSI6ImNrdDhmeThkNTExdWIyb25yMXloNzI2Y2UifQ.UZyLRG2RNaLwyY946dDRRQ"

// mapbox通用style模板
const list = [
    "mapbox://styles/mapbox/standard",
    "mapbox://styles/mapbox/standard",
    "mapbox://styles/mapbox/streets-v12",
    "mapbox://styles/mapbox/outdoors-v12",
    "mapbox://styles/mapbox/light-v11",
    "mapbox://styles/mapbox/dark-v11",
    "mapbox://styles/mapbox/satellite-v9",
    "mapbox://styles/mapbox/satellite-streets-v12",
    "mapbox://styles/mapbox/navigation-day-v1",
    "mapbox://styles/mapbox/navigation-night-v1",
]
const mapRef = ref()
const showBuild = ref(false)
const threeBuild = ref();
const buildInfo = ref();
const landInfo = ref();
const showLand = ref(false)

const handleBuild = () => {
    buildInfo.value.handleClose();
    showBuild.value = false;
}



// 添加资源
const addSource = (name: string, data: any, options: any = {}) => {
    mapRef.value.addSource(name, {
        type: "geojson",
        ...options,
        data: data,
    })
}

// 添加3D建筑
const addBuilding = (name: string, color: string) => {
    mapRef.value.addLayer({
        id: `3d-buildings-${name}`,
        source: name,
        type: 'fill-extrusion',
        'minzoom': 15,
        paint: {
            "fill-extrusion-color": color,
            "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "height"],
            ],
            'fill-extrusion-base': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                15.05,
                ['get', 'min_height']
            ],
            "fill-extrusion-opacity": 0.75,
        },
    });
}

// 添加线 
const addLine = (name: string, color: string) => {
    mapRef.value.addLayer({
        id: "line-" + name,
        type: "line",
        source: name,
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': color,
            'line-opacity': 0.5,
            'line-width': 10
        }
    })

    mapRef.value.addLayer({
        id: "line-" + name + '-1',
        type: "line",
        source: name,

        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': '#ffffff',
            'line-width': 2
        }
    })
}

// 添加多边形
const addPolygon = (name: string, color: string) => {
    mapRef.value.addLayer({
        id: "polygon-" + name,
        type: "fill",
        source: name,
        paint: {
            'fill-color': color,
            'fill-opacity': 0.5
        }
    })
}


// 添加渐变线 
const addGradientLine = (name: string) => {
    mapRef.value.addLayer({
        id: "line-" + name,
        type: "line",
        source: name,
        paint: {
            'line-color': 'rgba(0,0,0,0)',
            'line-width': 14,
            // 'line-gradient' must be specified using an expression
            // with the special 'line-progress' property
            'line-gradient': [
                'interpolate',
                ['linear'],
                ['line-progress'],
                0,
                'rgba(0,0,0,0)',
                0.5,
                '#11D4EF',
                1,
                'rgba(0,0,0,0)',
            ]
        },
        layout: {
            'line-cap': 'round',
            'line-join': 'round'
        }
    })


}



// 动态线数据
const getAnimatinoLineData = (data: any, start: number, size: number) => {

    return {
        type: "FeatureCollection",
        features: data.features.map((item: any) => {
            const coordinates = item.geometry.coordinates[0];
            let newCoordinates = [];
            if (start + size > coordinates.length) {
                const otherSize = size - (coordinates.length - start)
                newCoordinates = [...coordinates.slice(start, coordinates.length), ...coordinates.slice(0, otherSize)];
            } else {
                newCoordinates = coordinates.slice(start, start + size);
            }
            return {
                properties: {
                    type: "Feature",
                },
                geometry: {
                    type: "LineString",
                    coordinates: newCoordinates
                }
            }
        })
    }
}

let lineFrame: any = null
// 添加动态线
const addAnimationLine = (data: any) => {
    let start = 0;
    let size = 20;
    const lineData = getAnimatinoLineData(data, start, size);

    addSource('animation-line', lineData, {
        lineMetrics: true
    })
    addGradientLine('animation-line',)

    const length = data.features[0].geometry.coordinates[0].length

    const animationLoop = () => {
        start += 1;
        if (start >= length) {
            start = 0;
        }
        const source = mapRef.value.getSource('animation-line')
        const lineData = getAnimatinoLineData(data, start, size)
        source.setData(lineData);
        lineFrame = requestAnimationFrame(animationLoop)
    }
    animationLoop();
}


// 获取轮廓数据
const getData = () => {
    fetch("/json/lunkuo.json").then(res => {
        return res.json()
    }).then(res => {
        res.features.forEach((item: any, index: number) => {
            item.properties.height = index < 119 ? 40 : 20;
            item.properties.base_height = 1;
            item.properties.name = 'model' + index;
        })
        const yuanqu = {
            ...res,
            features: res.features.filter((_, index: number) => {
                return index < 119;
            })
        }
        const other = {
            ...res,
            features: res.features.filter((_, index: number) => {
                return index >= 119;
            })
        }
        addSource('yuanqu', yuanqu)
        addSource('other', other)

        addBuilding('yuanqu', '#4C8DAE')
        addBuilding('other', '#AAAAAA')

    })
}

// 获取高速数据
const getRailwarys = () => {
    fetch("/json/railways.json").then(res => {
        return res.json()
    }).then(res => {
        addSource('railway', res)
        addLine('railway', '#00ff00')
    })
}


// 获取公路数据
const getWays = () => {
    fetch("/json/公路.json").then(res => {
        return res.json()
    }).then(res => {
        addSource('way', res)
        addLine('way', '#00ffff')
    })
}


// 获取园区2的数据
const getOtherArea = () => {
    fetch("/json/lunkuo2.json").then(res => {
        return res.json()
    }).then(res => {
        addSource('otherArea', res)
        addPolygon('otherArea', '#4C8DAE')

        addAnimationLine(res)
    })
}

function showBuildModal() {
    showBuild.value = true
}
function hideBuildModal() {
    showBuild.value = false
}

function showLandModal(){
    showLand.value = true;
}
function hideLandModal(){
    showLand.value = false
}

const showMap = () => {
    document.getElementById("mapbox-gl").style.zIndex = 2;
}

const hideMap = () => {
    hideBuildModal();
    document.getElementById("mapbox-gl").style.zIndex = 1;
}


// 移动到园区1
function flyToFirst() {
    mapRef.value.flyTo({
        center: [
            108.05462930469744,
            29.93831287442443
        ],
        zoom: 16,
        essential: true,
    })
}
// 移动到园区2
function flyToSecond() {
    mapRef.value.flyTo({
        center: [
            108.07919495494211,
            29.957322232868666
        ],
        zoom: 16,
        essential: true,
    })
}

function init() {

    mapRef.value = new mapboxgl.Map({
        container: "map", // container ID
        style: list[5],
        // style: 'mapbox://styles/mapbox/streets-v11',
        center: [
            108.05462930469744,
            29.93831287442443
        ], // starting position [lng, lat]
        zoom: 16, // starting zoom
        antialias: true,
        pitch: 60,//俯视角度
        bearing: -20,//旋转角度
    })
    mapRef.value.on('load', () => {
        getRailwarys();
        getWays();
        getData();
        getOtherArea();


        mapRef.value.on("click", (e) => {
            const features = mapRef.value.queryRenderedFeatures(e.point, {
                layers: ['3d-buildings-yuanqu', 'polygon-otherArea']
            })
            if (features.length > 0) {
                const feature = features[0];//获取第一特征
                console.log(feature)
                const layer = feature.layer;

                switch (layer.id) {
                    case "3d-buildings-yuanqu":
                        showBuildModal();

                        break;
                    case "polygon-otherArea":
                        showLandModal()
                        break;
                }

            }
        })

    })
}
onMounted(() => {
    init();
})

onUnmounted(() => {
    cancelAnimationFrame(lineFrame)
})

</script>

<style scoped>
#map {
    width: 100vw;
    height: 100vh;
}

.build {
    position: absolute;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;

}

.close-btn {
    position: absolute;
    top: 2rem;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
}

.close-btn::before,
.close-btn::after {
    content: '';
    width: 2rem;
    height: 2px;
    background-color: white;
    position: absolute;
    top: .9rem;
    right: 0;
}

.close-btn::before {
    transform: rotate(45deg);
}

.close-btn::after {
    transform: rotate(-45deg);
}
</style>