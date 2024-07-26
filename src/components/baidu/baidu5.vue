<template>
    <div id="container"></div>
</template>

<script setup lang="ts">
import coordtransform from "coordtransform"

function init() {
    // 创建百度地图实例
    const bmapgl = new BMapGL.Map('container', {
        style: {
            // styleJson: purpleStyle
        }
    });
    const point = new BMapGL.Point(108.0674061, 29.9325113);
    bmapgl.centerAndZoom(point, 16);
    bmapgl.enableScrollWheelZoom(true);


    const view = new mapvgl.View({
        map: bmapgl
    });

    const shapeLayer = new mapvgl.ShapeLayer({
        color: 'rgba(0,0,255,0.6)',
        enablePicked: true,
        selectedIndex: -1,
        selectedColor: '#f00',
        autoSelect: true,
        onClick: e => {
            console.log(e)
        }
    })
    view.addLayer(shapeLayer);
    fetch("/json/lunkuo.json").then(res => {
        return res.json()
    }).then(res => {

        const data = res.features.map(item => {
            return {
                geometry: {
                    type: "Polygon",
                    coordinates: [item.geometry.coordinates[0].map(it => {
                        return coordtransform.gcj02tobd09(it[0], it[1])
                        // return it;
                    })]
                },
                properties: {
                    height: Math.ceil(Math.random() * 100) + 10
                }
            }
        })
        console.log(data)
        shapeLayer.setData(data)
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