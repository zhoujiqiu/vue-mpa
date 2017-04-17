import Vue from 'vue'
import axios from 'axios'
import App from './app'
Vue.prototype.$http = axios

// 全局配置
Vue.config.debug = false
Vue.config.devtools = false
Vue.config.silent = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: (createElement) => createElement(App)
})
