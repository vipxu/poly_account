// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import $ from 'jquery'

import API from '@/assets/js/API.js'

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

//自定义指令
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
//自定义指令

Vue.prototype.AxiosPost = function (fun, data, callback1) {
  API[fun](data)
    .then(function (response) {
      callback1(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

Vue.prototype.Message = function (txt, type) {
  this.$message({
    showClose: true,
    message: txt,
    type: type
  });
}
