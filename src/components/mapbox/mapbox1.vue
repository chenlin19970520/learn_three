<template>
    <div id="map"></div>
</template>

<script setup lang="ts">
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import longhe from "/json/longhe.json"

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
const getData = () => {
    // fetch("/json/shizhu.geojson").then(res => {
    //     return res.json()
    // }).then(res => {
    //     res.features.forEach((item, index) => {

    //         item.properties.height = 50;
    //         item.properties.base_height = 1;
    //         item.properties.name = 'model' + index;
    //         item.properties.color = "0xff0000"
    //     })
    //     console.log(res);
    //     init(res)
    // })

    fetch("/json/longhe.json").then(res => {
        return res.json()
    }).then(res => {
        mapRef.value.on('load', () => {
            mapRef.value.setConfigProperty('basemap', 'lightPreset', 'dusk');
            mapRef.value.addSource('longhe', {
                type: "geojson",
                data: res
            })
            mapRef.value.addLayer({
                id: "longhe",
                type: "line",
                source: "longhe",
                paint: {
                    'line-color': 'red',
                    'line-opacity': 0.8,
                    'line-width': 10
                }
            })
        })
    })
}

mapboxgl.accessToken = "pk.eyJ1IjoiY3FtaW1pIiwiYSI6ImNrdDhmeThkNTExdWIyb25yMXloNzI2Y2UifQ.UZyLRG2RNaLwyY946dDRRQ"

function init(result: any) {
    // let defaultBuild = {
    //     type: "FeatureCollection",
    //     crs: {
    //         type: "name",
    //         properties: {
    //             name: "EPSG:4326",
    //         },
    //     },
    //     features: [],
    // };



    mapRef.value.on('load', () => {

        mapRef.value.addSource('shizhu', {
            type: "geojson",
            data: result
        })
        mapRef.value.addLayer({
            id: "line",
            type: "line",
            source: "shizhu",
            paint: {
                'line-color': 'red',
                'line-opacity': 0.8,
                'line-width': 10
            }
        })

        mapRef.value.addLayer({
            id: "shizhu",
            type: "fill",
            source: "shizhu",
            paint: {
                'fill-color': '#0080ff',
                'fill-opacity': 0.5
            }
        })


        mapRef.value.addLayer({
            id: '3d-buildings',
            source: 'shizhu',
            type: 'fill-extrusion',
            paint: {
                'fill-extrusion-color': '#aaa',
                'fill-extrusion-height': ['get', 'height'],
                'fill-extrusion-base': ['get', 'min_height'],
                'fill-extrusion-opacity': 1
            }
        });
    })
}
onMounted(() => {
    mapRef.value = new mapboxgl.Map({
        container: "map", // container ID
        // style: "mapbox://styles/cqmimi/cky9obe4o0u2114ju9ieckrj2", // style URL

        // style: list[0],
        center: [108.08249997, 29.95315189], // starting position [lng, lat]
        zoom: 16, // starting zoom
        antialias: true,
    })
    getData();
})
</script>

<style scoped>
#map {
    width: 100vw;
    height: 100vh;
}
</style>