import { VueElement } from "vue";


const componentsBasic = import.meta.globEager("./components/basic/*.vue");
const componentsGeometry = import.meta.globEager("./components/geometry/*.vue");
const componentsModel = import.meta.globEager("./components/model/*.vue");
const componentsGltf = import.meta.globEager("./components/gltf/*.vue");
const componentsOther = import.meta.globEager("./components/other/*.vue");
const componentZIndex = import.meta.globEager("./components/zIndex/*.vue");
const componentTexture = import.meta.globEager("./components/texture/*.vue");
const componentPbr = import.meta.globEager("./components/pbr/*.vue");
const componentUi = import.meta.globEager("./components/Ui/*.vue");
const componentMapbox = import.meta.globEager("./components/mapbox/*.vue");




const componentsObject: any = {};

const setComponent = (...args: any[]) => {
    console.log(args, '-')
    args.forEach(components => {
        Object.entries(components).forEach((item: any) => {
            componentsObject[item[0].split('/')[3].split('.')[0] as string] = item[1].default;
        })
    })
}

setComponent(componentsBasic, componentsOther, componentsGeometry, componentsModel, componentsGltf, componentZIndex, componentTexture, componentPbr, componentUi, componentMapbox)
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
        name: "模型对象、材质",
        childrens: [
            {
                name: "1、三维向量Vector3与模型位置",
                component: getComponent('model1')
            },
            {
                name: "2、欧拉Euler与角度属性.rotation",
                component: getComponent('model2')
            },
            {
                name: "3、模型材质颜色（color对象）",
                component: getComponent('model3')
            },
            {
                name: "4、模型材质父类Material",
                component: getComponent('model4')
            },
            {
                name: "5、模型材质和几何属性",
                component: getComponent('model5')
            },
            {
                name: "6、克隆.clone()和复制.copy()",
                component: getComponent('model6')
            }
        ]
    },
    {
        name: "层级模型",
        childrens: [
            {
                name: "Vector3与模型位置、缩放属性",
                component: getComponent('zIndex1')
            },
            {
                name: "遍历模型树结构、查询模型节点",
                component: getComponent('zIndex2')
            },
            {
                name: "本地坐标和世界坐标",
                component: getComponent('zIndex3')
            },
            {
                name: "改变模型相对局部坐标原点位置",
                component: getComponent('zIndex4')
            },
            {
                name: "移除对象remove",
                component: getComponent('zIndex5')
            },
            {
                name: "模型隐藏或者显示",
                component: getComponent('zIndex6')
            },
        ]
    },
    {
        name: "顶点UV坐标，纹理贴图",
        childrens: [
            {
                name: "创建纹理贴图",
                component: getComponent('texture1')
            },
            {
                name: "自定义顶点UV坐标",
                component: getComponent('texture2')
            },
            {
                name: "圆形平面设置纹理贴图",
                component: getComponent('texture3')
            },
            {
                name: "纹理对象Texture阵列",
                component: getComponent('texture4')
            },
            {
                name: "矩形Mesh+背景透明png贴图",
                component: getComponent('texture5')
            },
            {
                name: "UV动画",
                component: getComponent('texture6')
            },
        ]
    },
    {
        name: "加载外部三维模型gltf",
        childrens: [
            {
                name: "建模软件绘制3D场景(Blender)",
                component: getComponent('gltf1')
            },
            {
                name: "GLTF格式简介(web3D领域JPG)",
                component: getComponent('gltf2')
            },
            {
                name: "加载.gltf文件（模型加载全流程）",
                component: getComponent('gltf3')
            },
            {
                name: "OrbitControls辅助设置相机参数",
                component: getComponent('gltf4')
            },
            {
                name: "gltf不同文件形式（.glb)",
                component: getComponent('gltf5')
            },
            {
                name: "模型命名（程序与美术协作）",
                component: getComponent('gltf6')
            },
            {
                name: "递归遍历层级模型修改材质",
                component: getComponent('gltf7')
            },
            {
                name: "外部模型材质是否共享问题",
                component: getComponent('gltf8')
            }, {
                name: "纹理encoding和渲染器",
                component: getComponent('gltf9')
            },
            {
                name: "gltf模型更换.map(纹理.flipY)",
                component: getComponent('gltf10')
            },
        ]
    },
    {
        name: "PBR材质与纹理贴图",
        childrens: [
            {
                name: "环境贴图.envMap（金属效果）",
                component: getComponent('pbr1')
            }
        ]
    },
    {
        name: "渲染器和前端UI界面",
        childrens: [
            {
                name: "threejs Canvas画布布局",
                component: getComponent('ui1')
            },
            {
                name: "UI交互界面与Canvas画布叠加",
                component: getComponent('ui2')
            },
            {
                name: "UI交互按钮与3D场景交互",
                component: getComponent('ui3')
            },
            {
                name: "THREE背景透明度",
                component: getComponent('ui4')
            },
            {
                name: "THREE渲染结果保存为图片",
                component: getComponent('ui5')
            },
            {
                name: "模型冲突，模型闪烁",
                component: getComponent('ui6')
            },
            {
                name: "模型加载进度条",
                component: getComponent('ui7')
            },
        ]
    },
    {
        name: "MapBox",
        childrens: [
            {
                name: "试用",
                component: getComponent('mapbox1')
            },
            {
                name: "高德",
                component: getComponent('gaode1')
            }, {
                name: "楼栋",
                component: getComponent('three-build')
            }
        ]
    },
    {
        name: "其他内容",
        childrens: [
            {
                name: "3D文字",
                component: getComponent('other1')
            },
            {
                name: "渲染河流",
                component: getComponent('other2')
            }
        ]
    }

]