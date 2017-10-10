import Vue from 'vue'
import Router from 'vue-router'
const FinanceIndex = () =>
  import ('@/FinancePages/Index')
const FinanceHome = () =>
  import ('@/FinancePages/Home')
const Voucher = () =>
  import ('@/FinancePages/Voucher/Voucher')
const VoucherEdit = () =>
  import ('@/FinancePages/Voucher/VoucherEdit')
const VoucherList = () =>
  import ('@/FinancePages/VoucherList/VoucherList')
const ImportVoucher = () =>
  import ('@/FinancePages/importVoucher/bankStatements')
const CustomerIndex = () =>
  import ('@/CustomerPages/Index')
const CustomerList = () =>
  import ('@/CustomerPages/CustomerList')
const AccountsList = () =>
  import ('@/CustomerPages/AccountsList')
const Accounts = () =>
  import ('@/CustomerPages/Accounts')

// mk
import Supcal from '@/FinancePages/financial_setup/supcal'
import intialbalance from '@/FinancePages/financial_setup/intialbalance'
import certificate from '@/FinancePages/financial_setup/certificate'
import account from '@/FinancePages/financial_setup/account'
import currency from '@/FinancePages/financial_setup/currency'
import customer from '@/FinancePages/financial_setup/supcal/customer'
import provider from '@/FinancePages/financial_setup/supcal/provider'
import employee from '@/FinancePages/financial_setup/supcal/employee'
import subject from '@/FinancePages/financial_setup/supcal/subject'
import department from '@/FinancePages/financial_setup/supcal/department'
import inventory from '@/FinancePages/financial_setup/supcal/inventory'
import investor from '@/FinancePages/financial_setup/supcal/investor'
import recmoney from '@/FinancePages/financial_setup/supcal/recmoney'
import capaccount from '@/FinancePages/financial_setup/supcal/capaccount'
//mk

// 这是账铺模块开始
//总账
import General from '@/FinancePages/account_book/general'
//总账
//金额数量总账
import Sumgeneral from '@/FinancePages/account_book/sum_account_general'
//金额数量总账
//明细账
import Itemized from '@/FinancePages/account_book/itemized_account'
//明细账
//多栏账
import ColAccount from '@/FinancePages/account_book/col_account'
//多栏账

//核算科目明细账
import ProItemized from '@/FinancePages/account_book/pro_itemized_account'
//核算科目明细账

//金额数量明细账
import SumItemized from '@/FinancePages/account_book/sum_itemized_account'
//金额数量明细账

//凭证汇总表
import Voucher_summary from '@/FinancePages/account_book/voucher_summary'
//凭证汇总表

//科目余额表
import Sub_balance from '@/FinancePages/account_book/sub_balance'
//科目余额表

//核算项目余额表
import Pro_balance from '@/FinancePages/account_book/pro_balance'
//核算项目余额表
// 这是账铺模块完成

// 这是是报表模块
//资产负债表
import Sheet from '@/FinancePages/statement/balance_sheet'
//资产负债表

//利润表
import Profit from '@/FinancePages/statement/Profit'
//利润表

//现金流量表
import Cash from '@/FinancePages/statement/cash'
//现金流量表
// 这是是报表模块

//固定资产管理
//固定资产类别
import Category from '@/FinancePages/fixed_assets/category'
//固定资产类别

//固定资产增加方式
import AddSub from '@/FinancePages/fixed_assets/addsub'
//固定资产增加方式

//固定变动
import Change from '@/FinancePages/fixed_assets/change'
//固定变动

//固定资产卡片减少清单
import Decrease from '@/FinancePages/fixed_assets/decrease'
//固定资产卡片减少清单

//固定资产卡片
import Card from '@/FinancePages/fixed_assets/card'
//固定资产卡片
//工资项目
import WagePro from '@/FinancePages/wage/wage_pro'
//工资表
import WageForms from '@/FinancePages/wage/wage_forms'
//期末结账
import finalBill from '@/FinancePages/finalBill/finalBill'

Vue.use(Router)

export default new Router({
  routes: [{
    //重定向默认首页
    path: '/',
    redirect: '/Finance' //设置路由首页
  }, {
    //财务系统
    path: '/Finance',
    component: FinanceIndex,
    children: [{
      path: '/Finance',
      redirect: '/Finance/home',
    }, {
      path: '/Finance/:page',
      components: {
        'home': FinanceHome,
        '1-1': Voucher,
        '1-3': VoucherEdit,
        '2-1': ImportVoucher,
        '3-1': VoucherList,
        '4-1': General,
        '4-2': Itemized,
        '4-3': Voucher_summary,
        '4-4': Sub_balance,
        '4-5': ColAccount,
        '4-6': Pro_balance,
        '4-7': ProItemized,
        '4-8': Sumgeneral,
        '4-9': SumItemized,
        '5-1': Sheet,
        '5-2': Profit,
        '5-3': Cash,
        '6-1':WagePro,
        '6-2':WageForms,
        '7-1': Category,
        '7-2': AddSub,
        '7-3': Card,
        '7-5': Change,
        '7-4': Decrease,
        '8-1': finalBill,
        '9-1': certificate,
        '9-2': account,
        '9-3': currency,
        '9-4': Supcal,
        '9-5': intialbalance,
        '10-1': customer,
        '10-2': provider,
        '10-3': employee,
        '10-4': subject,
        '10-5': department,
        '10-6': inventory,
        '10-7': investor,
        '10-8': recmoney,
        '10-9': capaccount
      }
    }]
  }, {
    //客户管理系统
    path: '/Customer',
    component: CustomerIndex,
    children: [{
      path: '/Customer',
      redirect: '/Customer/CustomerList',
    }, {
      path: '/Customer/CustomerList',
      component: CustomerList
    }, {
      path: '/Customer/AccountsList',
      component: AccountsList
    }, {
      path: '/Customer/Accounts',
      component: Accounts
    }]
  }]
})
