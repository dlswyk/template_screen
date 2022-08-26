import Vue from 'vue'
import Router from 'vue-router'
import index  from '@/views/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',component: () => import('@/views/index.vue')},

    {path: '/examples',component: () => import('@/views/examples/index.vue')},

    {path: '/Bar',component: () => import('@/views/examples/Bar.vue')},
    {path: '/FoldLine',component: () => import('@/views/examples/FoldLine.vue')}
  ]
})
