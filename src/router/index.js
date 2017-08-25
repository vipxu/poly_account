import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'
import Voucher from '@/pages/Voucher'
import Sheet from '@/pages/balance_sheet'
import Profit from '@/pages/Profit'
import Cash from '@/pages/cash'
import General from '@/pages/account_book/general1'
import Itemized from '@/pages/account_book/itemized_account'
import Voucher_summary from '@/pages/account_book/voucher_summary1'
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
      '2-1':General,
      '2-2':Itemized,
      '2-3':Voucher_summary,
      '3-1': Sheet,
      '3-2': Profit,
      '3-3':Cash
    }
  }]
})