<template>

    <div id="container"></div>

</template>



<script setup lang="ts">


const key = "331ed9fe9b2bc08a21ef65c76ee71a4c";



const mapRef = ref();





onMounted(() => {
    mapRef.value = new AMap.Map("container", {
        center: [108.053175, 29.936159],
        zoom: 17,
        viewMode: '3D', //地图模式
        // terrain: true //开启地形图
    })





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
</style>