<template>
    <div id="container"></div>
</template>

<script setup lang="ts">
function init() {
    // 创建百度地图实例
    const bmapgl = new BMapGL.Map('container');
    const point = new BMapGL.Point(116.403748, 39.915055);
    bmapgl.centerAndZoom(point, 17);
    bmapgl.enableScrollWheelZoom(true);


    // 创建mapvgl图层管理器
    const view = new mapvgl.View({
        map: bmapgl,
    })
    // 创建可视化图层，并添加到图层管理器
    const layer = new mapvgl.PointLayer({
        color: 'rgba(50,50,200,1)',
        blend: 'lighter',
        size: 20,//点大小
    })
    view.addLayer(layer)

    // 准备规范化的坐标数据
    const data = [
        {
            geometry: {
                type: "Point",
                coordinates: [116.403748, 39.915055]
            }
        }
    ]

    // 关联图层与数据
    layer.setData(data)

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