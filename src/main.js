import Vue from 'vue'
import App from './App.vue'
import router from './router'

//配置引入
import "@/utils/plugins.js";

Vue.config.productionTip = false



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
