import { VueElement } from "vue";


const componentsBasic = import.meta.globEager("./components/basic/*.vue");
const componentsGeometry = import.meta.globEager("./components/geometry/*.vue");
const componentsOther = import.meta.globEager("./components/other/*.vue");

const componentsObject: any = {};

const setComponent = (...args: any[]) => {
    console.log(args, '-')
    args.forEach(components => {
        Object.entries(components).forEach((item: any) => {
            componentsObject[item[0].split('/')[3].split('.')[0] as string] = item[1].default;
        })
    })
}

setComponent(componentsBasic, componentsOther, componentsGeometry)
const getComponent = (name: string): VueElement => {
    return componentsObject[name];
}

export const menuComponents = [
    {
        name: "基础内容",
        childrens: [
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
                name: "10、Threejs常见几何体简介",
                component: getComponent('basic10')
            },
            {
                name: "11、高光网格材质Phong",
                component: getComponent('basic11')
            },
            {
                name: "12、WebGL渲染器设置（锯齿模糊）",
                component: getComponent('basic12')
            },
            {
                name: "13、gui.js库（可视化改变三维场景）",
                component: getComponent('basic13')
            }, {
                name: "14、gui.js调试界面2 - 颜色命名",
                component: getComponent('basic14')
            }, {
                name: "15、gui.js调试界面3 - 下拉菜单、单选框",
                component: getComponent("basic15")
            },
            {
                name: "16、分组",
                component: getComponent('basic16')
            }
        ]
    },
    {
        name: "几何体BufferGeometry",
        childrens: [
            {
                name: "1、几何体顶点位置数据和点模型",
                component: getComponent('geometry1')
            },
            {
                name: "2、线模型对象",
                component: getComponent("geometry2")
            },
            {
                name: "3、网格模型（三角形概念）",
                component: getComponent("geometry3")
            }, {
                name: "4、构建一个矩形平面几何体",
                component: getComponent("geometry4")
            }, {
                name: "5、几何体顶点索引数据",
                component: getComponent('geometry5')
            }, {
                name: "6、顶点法线数据",
                component: getComponent('geometry6')
            }, {
                name: "7、查看three.js自带的几何体顶点",
                component: getComponent('geometry7')
            }, {
                name: "8、旋转、缩放、平移几何体",
                component: getComponent('geometry8')
            }
        ]
    },
    {
        name: "其他内容",
        childrens: [
            {
                name: "3D文字",
                component: getComponent('basicText')
            }
        ]
    }

]