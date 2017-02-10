import Vue from 'vue'
import VueResource from 'vue-resource'
// import filter from './filters'
import App from './app'
Vue.use(VueResource)
import { computedate } from '../../../assets/filters'
Vue.filter('computedate', computedate)
/* eslint-disable no-new */
// 全局配置
Vue.config.debug = false
Vue.config.devtools = false
Vue.config.silent = true
new Vue({
  el: 'body',
  components: { App }
})
