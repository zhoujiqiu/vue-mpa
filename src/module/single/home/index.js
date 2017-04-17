import Vue from 'vue'
import App from './app'
import axios from 'axios'
import VueRouter from 'vue-router'
import Routers from './routers'

Vue.use(VueRouter)
Vue.prototype.$http = axios

// 全局配置
Vue.config.debug = false
Vue.config.devtools = false
Vue.config.silent = true

// 并且配置路由规则
const router = new VueRouter({
  mode: 'hash',
  routes: Routers
})

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
