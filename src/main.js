// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import $ from 'jquery'

import API from '@/assets/js/API.js'

import '@/assets/theme-custom/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
})

Vue.prototype.AxiosPost = function (fun, data, callback) {
  API[fun](data)
    .then(function (response) {
      callback(response);
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

//更新辅助核算
Vue.prototype.getAccountingList = function () {
  var Vue = this;

  Vue.AxiosPost('getAccountingList', {
    accbookUid: Vue.$store.state.accbookUid
  }, function (e) {
    if (e.code === '1') {
      let al = e.data.assistAList;
      Vue.$store.commit('getAccountingList', {
        auxitems: al.auxitems, //项目核算列表
        currencys: al.currencys, //币别核算列表
        customclasss: al.customclasss, //自定义核算列表
        customers: al.customers, //客户核算列表
        departments: al.departments, //部门核算列表
        inventorys: al.inventorys, //存货核算列表
        investees: al.investees, //被投资单位核算列表
        investors: al.investors, //投资单位核算列表
        personnels: al.personnels, //个人往来核算列表
        vendors: al.vendors, //供应商核算列表
        bankAccounts: al.bankAccounts //资金账户
      });
    } else if (e.code === '1006') {
      Vue.$store.state.assistAList = {};
    } else {
      Vue.Message(e.msg, 'error');
    }
  });
}
//更新辅助核算

//更新科目数据
Vue.prototype.getSubjectData = function (cb) {
  var Vue = this;

  function count(a, b) {
    let subData = [];
    for (let i = 0, l = a.length; i < l; i++) {
      let data = {
        label: a[i].accountCode + ' ' + a[i].accountName,
        code: a[i].accountCode,
        id: a[i].accountUid,
        assist: a[i].assist,
        cmeasure: a[i].cmeasure,
        currencyUidList: a[i].currencyUidList,
        customClassUid: a[i].customClassUid,
        accountProperty: a[i].accountProperty
      };
      Vue.$store.commit('getSubjectAllList', $.extend(true, {}, data));
      if (b) {
        if (a[i].bend === 0) {
          data.children = count(a[i].lowerLevel, b + '_' + a[i].accountName);
        } else {
          data.value = a[i].accountCode + ' ' + b + '_' + a[i].accountName;
          Vue.$store.commit('getSubjectData', $.extend(true, {}, data));
        }
      } else {
        if (a[i].bend === 0) {
          data.children = count(a[i].lowerLevel, a[i].accountName);
        } else {
          data.value = a[i].accountCode + ' ' + a[i].accountName;
          Vue.$store.commit('getSubjectData', $.extend(true, {}, data));
        }
      }
      subData[i] = data;
    }
    return subData;
  }

  Vue.AxiosPost('getSubjectList', {
    accbookUid: Vue.$store.state.accbookUid
  }, function (e) {
    if (cb) {
      cb(Vue);
    }
    if (e.code === '1') {
      Vue.$store.state.subjectList = [];
      for (var i = 0, l = e.data.acctTits.length; i < l; i++) {
        Vue.$store.commit('getSubjectTreeData', count(e.data.acctTits[i].subList));
      }
    } else if (e.code === '1006') {
      Vue.$store.state.subjectTreeData = [];
    } else {
      Vue.Message(e.msg, 'error');
    }
  });
}
//获取科目列表数据
//更新科目数据

//金额千分位，补零，显示的一个全局方法
Vue.prototype.moneyChange = {
  outputmoney: function (number) {
    // number = number.replace(/\,/g, "");
    if (isNaN(number) || number == "") return "";
    number = Math.round(number * 100) / 100;
    if (number < 0)
      return '-' + this.outputdollars(Math.floor(Math.abs(number) - 0) + '') + this.outputcents(Math.abs(number) - 0);
    else
      return this.outputdollars(Math.floor(number - 0) + '') + this.outputcents(number - 0);
  },
  outputdollars: function (number) {
    if (number.length <= 3)
      return (number == '' ? '0' : number);
    else {
      var mod = number.length % 3;
      var output = (mod == 0 ? '' : (number.substring(0, mod)));
      for (var i = 0; i < Math.floor(number.length / 3); i++) {
        if ((mod == 0) && (i == 0))
          output += number.substring(mod + 3 * i, mod + 3 * i + 3);
        else
          output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
      }
      return (output);
    }
  },
  outputcents: function (amount) {
    amount = Math.round(((amount) - Math.floor(amount)) * 100);
    return (amount < 10 ? '.0' + amount : '.' + amount);
  }
}
