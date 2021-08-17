import Vue from 'vue'
import App from './App.vue'
import router from './router'
import config from "@common/js/config.js";
import {get,post,postmult} from "@common/js/request.js";
import api from "@common/js/api.js";
import echartsOption from "@common/js/echartsOption.js";

Vue.config.productionTip = false

// 公共方法
Vue.prototype.$config = config;

// 请求方式
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$postmult = postmult;

// 接口文件
Vue.prototype.$api = api;

// echart  配置
Vue.prototype.$echartsOption = echartsOption;

//pc端大屏  整体百分比缩小



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
