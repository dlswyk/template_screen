import Vue from 'vue'
import App from './App.vue'
import router from './router'

import api from "@/utils/api.js";
import config from "@/utils/config.js";

//各种插件引入
import "@/utils/plugins.js";

Vue.config.productionTip = false


// 接口文件
Vue.prototype.$api = api;

// 公共方法
Vue.prototype.$config = config;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
