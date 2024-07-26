<template>
    <div id="container"></div>
</template>

<script setup lang="ts">
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