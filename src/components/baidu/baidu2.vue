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


    // 准备规范化的坐标数据
    const data = [
        {
            geometry: {
                type: "Point",
                coordinates: [116.403748, 39.915055]
            }
            ,
            properties:{
                text:"重庆博悦嘉科技有限公司"
            }
        },
        {
            geometry: {
                type: "Point",
                coordinates: [116.413748, 39.925055]
            }
            ,
            properties:{
                text:"重庆数次方科技有限公司"
            }
        }
    ]


    const layer = new mapvgl.LabelLayer({
        textAlign: 'center',
        textColor: '#fff',
        borderColor: '#04f',
        backgroundColor: '#000',
        borderWidth:3,
        padding: [2, 8],
        borderRadius: 2,
        fontSize: 16,
        lineHeight: 24,
        collides: true, // 是否开启碰撞检测, 数量较多时建议打开

        enablePicked: true,
        autoSelect: true,
        onClick: e => {
            console.log("点击事件",e)
        },
       
    })
    view.addLayer(layer)

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