<template>
    <div class="build-modal">
        <div class="modal-header">
            <div class="modal-title">建筑信息</div>
            <!-- <img src="/images/Vector.png" class="modal-close"  alt=""> -->
        </div>
        <div class="modal-body">
            <div class="build-basic">
                <div class="basic-title">基本信息</div>
                <div class="basic-line">
                    <div class="basic-item">
                        <div class="name">厂房名称：</div>
                        <div class="value">重庆市巍峨建筑材料厂</div>
                    </div>
                    <div class="basic-item">
                        <div class="name">建筑面积：</div>
                        <div class="value">2522m²</div>
                    </div>
                    <div class="basic-item">
                        <div class="name">建成时间：</div>
                        <div class="value">2020年-4月-13日</div>
                    </div>
                </div>
                <div class="basic-line">
                    <div class="basic-item">
                        <div class="name">楼宇层数：</div>
                        <div class="value">6层</div>
                    </div>
                    <div class="basic-item">
                        <div class="name">厂房地址：</div>
                        <div class="value">重庆市石柱县下街工业园区</div>
                    </div>
                    <div class="basic-item">
                        <div class="name">容积率：</div>
                        <div class="value">1%</div>
                    </div>
                </div>

                <div class="basic-line">

                    <div class="basic-item">
                        <div class="name">绿地率：</div>
                        <div class="value">78%</div>
                    </div>
                    <div class="basic-item">
                        <div class="name">建筑高度：</div>
                        <div class="value">21m</div>
                    </div>
                    <div class="basic-item">
                        <div class="name">建筑系数：</div>
                        <div class="value">21m</div>
                    </div>
                </div>
                <div class="basic-line">


                    <div class="basic-item">
                        <div class="name">照片资料：</div>
                        <div class="value">
                            <img class="value-img" src="/images/1.png" alt="">
                        </div>
                    </div>
                </div>

            </div>

            <div class="build-table">
                <div class="basic-title">楼层信息</div>
                <div class="table-body">
                    <div class="table-header table-line">
                        <div class="w-1 table-line-item">楼层</div>
                        <div class="w-1  table-line-item">建筑面积</div>
                        <div class="w-4  table-line-item">CAD图纸</div>
                        <div class="w-4  table-line-item">现场照片</div>
                    </div>

                    <div class="table-line" v-for="(item, index) in 6" :key="index">
                        <div class="w-1 table-line-item">{{ index + 1 }}</div>
                        <div class="w-1 table-line-item">100m²</div>
                        <div class="w-4 table-line-item"> <img class="value-img" src="/images/build.png" alt=""></div>
                        <div class="w-4 table-line-item"> <img class="value-img" src="/images/7.jpg" alt=""></div>
                    </div>
                </div>
            </div>
            <div class="build-table">
                <div class="basic-title">租赁信息</div>
                <div class="table-body">
                    <div class="table-header table-line">
                        <div class="w-2 table-line-item">企业名称</div>
                        <div class="w-1  table-line-item">租赁楼层</div>
                        <div class="w-1  table-line-item">租赁面积</div>
                        <div class="w-2  table-line-item">租赁合同</div>
                        <div class="w-1  table-line-item">租赁条款</div>
                        <div class="w-1  table-line-item">开始时间</div>
                        <div class="w-1  table-line-item">结束时间</div>
                        <div class="w-1  table-line-item">租赁状态</div>

                    </div>

                    <div class="table-line" v-for="(item, index) in 6" :key="index">
                        <div @click="handleOpen" class="w-2 table-line-item active">西部创源智行科技（重庆）有限公司</div>
                        <div class="w-1  table-line-item">{{ index + 1 }}</div>
                        <div class="w-1  table-line-item">100m²</div>
                        <div class="w-2  table-line-item">西部创源智行科技（重庆）有限公司租赁厂房合同.doc</div>
                        <div class="w-1  table-line-item">1、按时付租金</div>
                        <div class="w-1  table-line-item">2020年3月11日</div>
                        <div class="w-1  table-line-item">2025年3月11日</div>
                        <div class="w-1  table-line-item">租赁中</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <company-info @close="handleClose" v-if="showCompany" />

</template>

<script setup lang="ts">
import CompanyInfo from "./company-info.vue"
const showCompany = ref(false)
const handleOpen = () => {
    showCompany.value = true;
}
const handleClose = () => {
    showCompany.value = false;
}

defineExpose({
    handleClose
})

</script>

<style lang="less" scoped>
.build-modal {
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translateY(-50%);
    background-image: url('/images/bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    backdrop-filter: blur(10px);

    width: 900px;
    height: 1000px;
    font-size: 14px;
    border-radius: .5rem;
    padding: 1.5rem 2.5rem 3rem 2.5rem;
    box-sizing: border-box;

    .modal-header {
        height: 3rem;
        position: relative;
        border-bottom: 1px solid rgba(255,255,255,0.75);
        margin-bottom: 1rem;
        .modal-title {
            display: inline-block;

            background: linear-gradient(121.01deg, #6EF6FF 18.17%, #FFFFFF 73.63%);
            font-size: 24px;
            font-weight: bold;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            padding: 0 10px;
            box-sizing: border-box;
        }

        .modal-close {
            position: absolute;
            top: 0;
            right: 0;
            cursor: pointer;
        }
    }
}

.modal-body {
    width: 100%;
    height: calc(100% - 4rem);
    overflow-y: auto;
}

.modal-body::-webkit-scrollbar {
    width: 6px;
}

.modal-body::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.modal-body::-webkit-scrollbar-thumb {
    background: #888;
}


.basic-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: rgba(76, 141, 174, 1);
}

.basic-line {
    display: flex;
    margin-bottom: 1rem;
}

.basic-item {
    width: 33%;
    color: #EEE;
    display: flex;
}

.basic-item .name {
    white-space: nowrap;
}

.value-img {
    width: 5rem;
    height: 5rem;
    object-fit: cover;
}


.build-table {
    margin-bottom: 1rem;
}

.table-body {
    border: 1px solid #AAA;
    border-radius: .5rem;
    color: #EEE;
}

.table-header {
    display: flex;
    min-height: 1.5rem;
    line-height: 1.5rem;
}

.table-line {
    display: flex;
    align-items: center;
    padding: 2px;
    box-sizing: border-box;
    border-bottom: 1px solid #AAA;

    &:last-child {
        border-bottom: none;
    }
}


.table-line .w-1 {
    width: 10%;
}

.table-line .w-2 {
    width: 20%;
}

.table-line .w-3 {
    width: 30%;
}

.table-line .w-4 {
    width: 40%;
}

.table-line-item {
    display: flex;
    justify-content: center;
    text-align: center;
}

.active {
    text-decoration: underline;
    cursor: pointer;
}
</style>