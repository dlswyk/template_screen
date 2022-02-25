import Vue from 'vue'
import App from './App.vue'
import router from './router'
import config from "@/static/js/config.js";
import * as echarts from 'echarts';
import {get,post,postmult} from "@/static/js/request.js";
import api from "@/static/js/api.js";
import echartsOption from "@/static/js/echartOp.js";

Vue.config.productionTip = false

// 公共方法
Vue.prototype.$config = config;
Vue.prototype.$echarts = echarts;

// 请求方式
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$postmult = postmult;

// 接口文件
Vue.prototype.$api = api;

// echart  配置
Vue.prototype.$echartsOp = echartsOption;

//pc端大屏  整体百分比缩小



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
