import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    assistAList: {}, //辅助核算
    subjectList: [], //末级科目
    subjectAllList: [], //所有科目
    subjectTreeData: [], //科目树

    accbookUid: '78242e7a80ce11e7bb6800163e08a430', //账套id
    useruid: "6ae5f543921b11e7bb6800163e08a430", //会计id
    ayearUid: "734d48fd88dc11e7bb6800163e08a430", //会计年度id
    voucherUid: '', //当前凭证uid
    //公共页签
    publicPage: [{
      '10-1': {
        text: '客户'
      },
      '10-2': {
        text: '供应商'
      },
      '10-3': {
        text: '职员'
      },
      '10-4': {
        text: '项目'
      },
      '10-5': {
        text: '部门'
      },
      '10-6': {
        text: '存货'
      },
      '10-7': {
        text: '投资单位'
      },
      '10-8': {
        text: '被投资单位'
      },
      '10-9': {
        text: '资金账户'
      },
      '1-3': {
        text: '凭证'
      },
      // 例如：'10-10': {text: 'wowo'} text是页签的title
    }],
    //公共页签
    //客户管理系统
    customer: {},
    //客户管理系统

    //--xgw--
    //明细账数据
    //form表单的初始数据
    itemizedForm: {
      //会计开始时间
      accountantBegin: '',
      //至结束时间
      accountantEnd: ''
    },
    //总账调明细账科目编号和名字
    subjectVal: {}
    //--xgw--
  },
  mutations: {
    //辅助核算
    getAccountingList(state, data) {
      state.assistAList = data;
    },

    //末级科目
    getSubjectData(state, data) {
      state.subjectList.push(data);
    },

    //所有科目
    getSubjectAllList(state, data) {
      data.value = data.label;
      delete data.label;
      state.subjectAllList.push(data);
    },

    //科目树
    getSubjectTreeData(state, data) {
      state.subjectTreeData.push(data);
    },

    //--xgw--
    getSubjectVal(state, data) {
      state.subjectVal = data;
    }
    //--xgw--
  }
})
