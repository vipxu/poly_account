import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'
import Voucher from '@/pages/Voucher'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/home',
  }, {
    path: '/:page',
    components: {
      'home': Main,
      '1-1': Voucher
    }
  }]
})
