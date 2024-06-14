<script setup lang="ts">
import { menuComponents } from "./config";
// import { ref } from "vue"
const activeComponent = ref<object>({});
const activeComponentIndex = ref<number>(-1);
const changeComponent = (item: any, index: number) => {
  activeComponent.value = item.component;
  activeComponentIndex.value = index;
};
</script>

<template>
  <div class="three-app">
    <div class="three-menu">
      <div class="menu-item" :class="activeComponentIndex === index ? 'active' : ''" @click="changeComponent(item, index)"
        v-for="(item, index) in menuComponents">
        {{ item.name }}
      </div>
    </div>
    <div class="three-body">
      <component :is="activeComponent" />
    </div>
  </div>
</template>

<style scoped>
.three-app {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
}

.three-menu {
  width: 20rem;
  height: 100vh;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  box-sizing: border-box;
}

.menu-item {
  /* text-align: center; */
  font-size: 14px;
  height: 2rem;
  line-height: 2rem;
  cursor: pointer;
  padding: 0rem 2rem;
  box-sizing: border-box;

}

.menu-item:hover {
  background-color: #f5f5f5;
}

.menu-item.active {
  background-color: #f5f5f5;
  font-weight: bold;
}

.three-body {
  flex: 1;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
}
</style>
