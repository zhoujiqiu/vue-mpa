import Vue from 'vue'
import App from './app'
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 全局配置
Vue.config.debug = false
Vue.config.devtools = false
Vue.config.silent = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: (createElement) => createElement(App)
})
