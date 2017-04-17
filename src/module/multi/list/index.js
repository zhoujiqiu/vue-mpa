import Vue from 'vue'
import axios from 'axios'
import App from './app'
Vue.prototype.$http = axios

/* eslint-disable no-new */
// 全局配置
Vue.config.debug = false
Vue.config.devtools = false
Vue.config.silent = true
new Vue({
  el: 'body',
  render: h => h(App)
}).$mount('#news_list')
