import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './app'
Vue.use(VueResource)
/* eslint-disable no-new */
// 全局配置
Vue.config.debug = false
Vue.config.devtools = false
Vue.config.silent = true
new Vue({
  el: 'body',
  render: h => h(App)
}).$mount('#news_list')
