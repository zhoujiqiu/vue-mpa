import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './app'
import configRouter from './routers'
import { computedate } from '../../../assets/filters'
Vue.filter('computedate', computedate)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.config.debug = false
Vue.config.devtools = false
Vue.config.silent = true
/* eslint-disable no-new */

const router = new VueRouter()
configRouter(router)
router.beforeEach((transition) => {
  document.body.scrollTop = 0
  if (transition.to.auth) {
    transition.next()
  } else {
    transition.next()
  }
})
router.start(Vue.extend(App), '#app')
// 这里一定要空一个行
