<template>
    <div id="container"></div>
</template>

<script setup lang="ts">
import { pushScopeId } from 'vue';
import coordtransform from "coordtransform"

function init() {
    // 创建百度地图实例
    const bmapgl = new BMapGL.Map('container', {
        style: {
            styleJson: purpleStyle
        }
    });
    const point = new BMapGL.Point(108.0674061, 29.9325113);
    bmapgl.centerAndZoom(point, 15);
    bmapgl.enableScrollWheelZoom(true);


    // 创建mapvgl图层管理器
    const view = new mapvgl.View({
        map: bmapgl,
    })

    view.startAnimation()
    fetch("/json/car.csv").then(res => {
        return res.text()
    }).then(res => {
        var dataSet = mapv.csv.getDataSet(res);
        var data = dataSet.get();
        console.log(data)
        var lineLayer = new mapvgl.LineTripLayer({
            trailLength: 21,
            color: 'rgb(0, 255, 255)'
        });
        view.addLayer(lineLayer);
        lineLayer.setData(data);
    })

    fetch("/json/公路.json").then(res => {
        return res.json()
    }).then(res => {
        console.log(res)
        const data = res.features.map(item => {
            return {
                geometry: {
                    type: "LineString",
                    coordinates: item.geometry.coordinates[0].map(it => {
                        return coordtransform.gcj02tobd09(it[0], it[1])
                        // return it;
                    })
                }
            }
        })
        var lineLayer = new mapvgl.LineTripLayer({
            trailLength: 21,
            color: 'rgb(0, 255, 255)'
        });
        view.addLayer(lineLayer);
        lineLayer.setData(data);
    })
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
    width: 100%;
    height: 100%;
}
</style>