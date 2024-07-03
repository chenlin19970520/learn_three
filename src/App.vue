<script setup lang="ts">
import { menuComponents } from "./config";
// import { ref } from "vue"
const activeComponent = ref<object>({});
const activeComponentIndex = ref<number>(0);


const firstAcitve = ref(0)

const changeComponent = (item: any, index: number) => {
  activeComponent.value = item.component;
  activeComponentIndex.value = index;
};


const changeMenu = (item: any, index: number) => {
  firstAcitve.value = index;
  activeComponentIndex.value = 0;
  const childrens = item.childrens || [];
  if (childrens.length) {
    activeComponent.value = childrens[activeComponentIndex.value].component;
  }
}

onMounted(() => {
  changeComponent(menuComponents[firstAcitve.value]?.childrens[activeComponentIndex.value], activeComponentIndex.value)
})
</script>

<template>
  <div class="three-app">
    <div class="three-menu">
      <div class="menu-item" v-for="(item, index) in menuComponents">
        <div class="first-name" @click="changeMenu(item, index)" :class="firstAcitve === index ? 'active' : ''">
          <div>{{ item.name }}</div>
          <div class="arrow"></div>
        </div>
        <div class="second-menu" :class="firstAcitve === index ? 'active' : ''"
          v-if="item.childrens && item.childrens.length">
          <div class="second-menu_item" :class="activeComponentIndex === secondIndex ? 'active' : ''"
            v-for="(secondItem, secondIndex) in item.childrens" @click="changeComponent(secondItem, secondIndex)"
            :key="secondIndex">
            <div>{{ secondItem.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="three-body">
      <component :is="activeComponent" />
    </div>

    <div class="bottom">渝ICP备2024034525号</div>
  </div>
</template>

<style scoped>
.three-app {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
}

.bottom {
  position: fixed;
  left:50%;
  bottom:6px;
  transform: translateX(-50%);
  font-size: 10px;
  letter-spacing: 1px;
}

.three-menu {
  min-width: 20rem;
  max-width: 20rem;
  height: 100vh;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  box-sizing: border-box;
  white-space: nowrap;
}


.menu-item {
  /* text-align: center; */
  font-size: 14px;
  line-height: 2rem;
  cursor: pointer;


}

.menu-item .first-name {
  padding: 0rem 1rem;
  box-sizing: border-box;
}

.menu-item .first-name:hover {
  background-color: #f5f5f5;
}

.menu-item .first-name.active {
  background-color: #f5f5f5;
  font-weight: bold;
}

.first-name {
  font-weight: bold;
  position: relative;
}

.first-name .arrow {
  position: absolute;
  top: 50%;
  right: 1.5rem;
  transform: rotate(-90deg) translateY(-50%);
  transition: all .2s ease;
}

.first-name .arrow::after,
.first-name .arrow::before {
  content: "";
  position: absolute;
  top: 50%;
  right: 0;
  width: 7px;
  height: 1px;
  background-color: black;
}

.first-name .arrow::after {
  transform: rotate(45deg) translateY(-50%);
}

.first-name .arrow::before {
  transform: rotate(-45deg) translateY(-50%);
  right: -5px;
}

.first-name.active .arrow {
  transform: rotate(0deg) translateY(-50%);
}

.second-menu {
  height: 0;
  overflow: hidden;
  padding: 0rem 1.5rem;
  box-sizing: border-box;
}

.second-menu.active {
  height: auto;
}

.second-menu_item:hover {
  font-weight: bold;
}

.second-menu_item.active {
  font-weight: bold;

}

.three-body {
  flex: 1;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
}
</style>
