import { VueElement } from "vue";


const components = import.meta.globEager("./components/*.vue");
const componentsObject: any = {};
Object.entries(components).forEach((item: any) => {
    componentsObject[item[0].split('/')[2].split('.')[0] as string] = item[1].default;
})

const getComponent = (name: string): VueElement => {
    return componentsObject[name];
}

export const menuComponents = [
    {
        name: "1、第一个3D案例",
        component: getComponent('basic1')
    },
    {
        name: "2、三维坐标系",
        component: getComponent('basic2')
    },
    {
        name: "3、光源对物体的影响",
        component: getComponent('basic3')
    },
    {
        name: "4、相机控件OrbitControls",
        component: getComponent("basic4")
    },
    {
        name: "5、平行光与环境光",
        component: getComponent('basic5')
    },
    {
        name: "6、动画渲染循环",
        component: getComponent('basic6')
    },
    {
        name: "7、Canvas画布全屏",
        component: getComponent('basic7')
    },
    {
        name: "8、stats查看three.js渲染帧率（FPS）",
        component: getComponent('basic8')
    },
    {
        name: "9、阵列立方体和相机适配体验",
        component: getComponent('basic9')
    },
    {
        name: "3D文字",
        component: getComponent('basicText')
    },

]