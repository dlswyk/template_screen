import Vue from 'vue'

// echart基础配置
import * as echarts from 'echarts';
import echartsOp from  "@/static/js/echartOp.js";
import * as echartsGL from 'echarts-gl' //

// 全屏
import fullScreen from  "@/utils/fullScreen.js";

// echart  配置
Vue.prototype.$echarts = echarts;
Vue.prototype.$mychar =  echartsOp;
Vue.prototype.$echartsGL = echartsGL 
Vue.prototype.$fullScreen =  fullScreen;

