import Vue from 'vue'
import App from './App.vue'
import router from './router'

import {get,post,postmult} from "@/static/js/request.js";
import api from "@/utils/api.js";
import config from "@/static/js/config.js";

//各种插件引入
import "@/utils/plugins.js";

Vue.config.productionTip = false

// 请求方式
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$postmult = postmult;

// 接口文件
Vue.prototype.$api = api;

// 公共方法
Vue.prototype.$config = config;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
