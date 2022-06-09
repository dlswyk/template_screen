import Vue from 'vue'

// echart基础配置
import * as echarts from 'echarts';
import echartsOp from  "@/static/js/echartOp.js";
import echartsGL from 'echarts-gl' // 引入echarts

// 全屏
import fullScreen from  "@/utils/fullScreen.js";


import config from "@/static/js/config.js";
import {get,post,postmult} from "@/static/js/request.js";
import api from "@/utils/api.js";

// echart  配置
Vue.prototype.$echarts = echarts;
Vue.prototype.$mychar =  echartsOp;
Vue.prototype.$echartsGL = echartsGL // 引入组件（将echarts注册为全局）
Vue.prototype.$fullScreen =  fullScreen;
Vue.prototype.$config = config;

// 请求方式
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$postmult = postmult;

// 接口文件
Vue.prototype.$api = api;


// 自动注册组件
// 获取公共组件文件路径集合（只获取文件夹下面的index.vue）
// const requireComponent = require.context('@/components/common', true, /index+\.(vue|js)$/)

// // 遍历得到组件路径
// requireComponent.keys().forEach(fileName => {
  
//   // 组件内容
//   const componentConfig = requireComponent(fileName).default;
//   // 以文件夹名称作为公共组件的名字
//   let arr = fileName.split('/');
//   const componentName =  arr[arr.length-2].replace(/\.\w+$/, '');

//   // 挂载全局
//   Vue.component(componentName,componentConfig)
// })
