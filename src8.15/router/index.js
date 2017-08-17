import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/page_Main'
import Voucher from '@/pages/page_Voucher'
import Sheet from '@/pages/balance_sheet'
import Profit from '@/pages/page_Profit'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/home',
  }, {
    path: '/:page',
    components: {
      'home': Main,
      '1-1': Voucher,
      '3-1': Sheet,
      '3-2': Profit
    }
  }]
})
