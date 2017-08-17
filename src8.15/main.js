// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import $ from 'jquery'

import '@/assets/theme-custom/index.css'
import '@/assets/css/frame.css'
import '@/assets/css/icon.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

Vue.directive('focus', {
  inserted: function (el) {
    el.focus();
  }
})

Vue.directive('select', {
  inserted: function (el) {
    el.select();
  }
})