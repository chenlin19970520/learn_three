<template>
    <div id="container"></div>
</template>

<script setup lang="ts">
import coordtransform from "coordtransform"
import { texture } from "three/examples/jsm/nodes/Nodes.js";

function init() {
    // 创建百度地图实例
    const bmapgl = new BMapGL.Map('container', {
        style: {
            styleJson: darkStyle
        }
    });
    const point = new BMapGL.Point(108.0674061, 29.9325113);
    bmapgl.centerAndZoom(point, 16);
    bmapgl.enableScrollWheelZoom(true);


    const view = new mapvgl.View({
        map: bmapgl
    });


    const rippleLayer = new mapvgl.GroundRippleLayer({
        size: 40,
        opacity: 0.0,
        segs: 100,
        scale: 10,
        speed: 30,
        color: [245 / 255, 35 / 255, 35 / 255, 0.2]

    });

    view.startAnimation();
    view.addLayer(rippleLayer);
    const data = [{
        geometry: { type: 'Point', coordinates: [point.lng, point.lat] }
    }];
    rippleLayer.setData(data);

    const shapeLayer = new mapvgl.ShapeLayer({
        style: 'ripple',
        rippleLayer: rippleLayer,
        color: 'rgba(0,0,255,0.6)',
        enablePicked: true,
        selectedIndex: -1,
        selectedColor: '#ee1111',
        autoSelect: true,
        texture: "/images/wall2.png",
        isTextureFull: true,
        textureScale: 0.05,
        topColor: "rgba(39,50,85,1.0)",
        onClick: (e) => {

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