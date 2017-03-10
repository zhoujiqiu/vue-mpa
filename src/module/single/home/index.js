import Vue from 'vue'
import App from './app'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Detail from './detail'
import List from './list'

Vue.use(VueRouter)
Vue.use(VueResource)

// 全局配置
Vue.config.debug = false
Vue.config.devtools = false
Vue.config.silent = true

// 并且配置路由规则
const router = new VueRouter({
  hashbang: false,
  history: true,
  saveScrollPosition: true,
  suppressTransitionError: true,
  routes: [
    {
      path: '/list',
      component: List
    },
    {
      path: '/',
      redirect: '/list'
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    }
  ]
})

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
