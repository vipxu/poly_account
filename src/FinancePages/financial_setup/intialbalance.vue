<template>
  <div id="intial">
    <div>
      <el-row>
        <h3>类别</h3>
        <el-button-group>
          <el-button @click="getBeginningBalanceList('资产类')">资产</el-button>
          <el-button @click="getBeginningBalanceList('负债类')">负债</el-button>
          <el-button @click="getBeginningBalanceList('共同类')">共同</el-button>
          <el-button @click="getBeginningBalanceList('所有者权益类')">权益</el-button>
          <el-button @click="getBeginningBalanceList('成本类')">成本</el-button>
          <el-button @click="getBeginningBalanceList('损益类')">损益</el-button>
        </el-button-group>
        <el-button type="">刷新</el-button>
        <el-button type="text">币别</el-button>
        <el-select v-model="currencyUid" placeholder="请选择" @change="rateshow">
          <el-option v-for="(item,index) in currencyList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button type="text">汇率</el-button>
        <span>{{exchangeRate}}</span>
        <el-checkbox v-model="show">隐藏数量</el-checkbox>
        <div class="btn">
          <el-button @click="addBeginningBalances()">保存</el-button>
        </div>
      </el-row>
    </div>
    <div>
      <div v-show="!show">
        <el-table :data="generalLedger" border style="width: 100%">
          <el-table-column header-align="center" align="left" prop="accountCode" label="科目编码">
          </el-table-column>
          <el-table-column header-align="center" align="left" prop="accountName" label="科目名称">
            <template scope="scope">
              <span style="margin-right: 40px">{{ scope.row.accountName }}</span>
              <el-button type="text" align="right" size="mini" class="el-icon-plus" style="float:right" @click="adddetail(scope.$index, scope.row)" v-show="scope.row.bassistshow"></el-button>
              <el-button type="text" align="right" size="mini" class="el-icon-close" style="float:right" v-model="scope.row.isAssist" v-show="scope.row.isAssist===1?true:false" @click="auxDel(scope.$index, scope.row)"></el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="accountProperty" label="方向" type="input">
          </el-table-column>
          <el-table-column label="期初余额" align="center">
            <el-table-column align="center" prop="nbS" label="数量">
            </el-table-column>
            <el-table-column label="金额" header-align="center" align="right">
              <template scope="scope">
                <el-input type="text"  v-model="scope.row.mb" v-show="scope.row.bend===1?true:false"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="show">
        <el-table :data="generalLedger" border style="width: 100%">
          <el-table-column header-align="center" align="left" prop="accountCode" label="科目编码">
          </el-table-column>
          <el-table-column header-align="center" align="left" label="科目名称">
            <template scope="scope">
              <span style="margin-right: 40px">{{ scope.row.accountName }}</span>
              <el-button type="text" align="right" size="mini" class="el-icon-plus" style="float:right" @click="adddetail(scope.$index, scope.row)" v-show="scope.row.bassistshow"></el-button>
              <el-button type="text" align="tight" size="mini" class="el-icon-close" style="float:right" v-model="scope.row.isAssist" v-show="scope.row.isAssist===1?true:false" @click="auxDel(scope.$index, scope.row)"></el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="accountProperty" label="方向" type="input">
          </el-table-column>
          <el-table-column label="期初余额" align="center">
            <el-table-column prop="mb" label="金额" header-align="center" align="right">
              <template scope="scope">
                <el-input type="text"  v-model="scope.row.mb" v-show="scope.row.bend===1?true:false"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 增加辅助核算明细 -->
    <el-dialog id="dialog" title="增加明细" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="科目：" :label-width="formLabelWidth">
          <el-input v-model="accountName" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="辅助核算" :label-width="formLabelWidth">
        </el-form-item>
        <el-form-item v-for="(item,index) in auxGroup" :key="index" :label="item.label" :label-width="formLabelWidth">
          <el-select placeholder="请选择" v-model="form[item.value].val" @change="auxChange(form[item.value].val,item.value,item.option)">
            <el-option v-for="(n,i) in item.option" :key="i" :label="n.label" :value="n.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addBeginningBalance()">保 存</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //会计期间uid
      periodUid: '',
      // 是否辅助核算
      isAssist: '',
      // 删除所需要uid
      accassUid: '',
      //期间数组
      periodsList: [],
      //判断加号
      bassist: [],
      // 判断辅助核算项目
      accountS: [],
      disabled: true,
      //科目id
      editNowItem: '',

      nowClassName: '',//当前类别名称

      show: false,
      inp: false,
      dialogFormVisible: false,
      formLabelWidth: '100px',
      accountName: '',
      accountCode: '',
      //表格数据
      generalLedger: [],
      currencyList: [],


      auxGroup: [],

      currencyUid: '',
      exchangeRate: '',
      bend: '',
      value: '',
      form: {
        accountUid: '',
        accountCode: '',
        accountName: '',
        cusname: {
          val: '',
          code: ''
        },//客户
        proname: {
          val: '',
          code: ''
        },//供应商
        persname: {
          val: '',
          code: ''
        },//职员
        depname: {
          val: '',
          code: ''
        },//部门
        invname: {
          val: '',
          code: ''
        },//存货
        investorname: {
          val: '',
          code: ''
        },//投资单位
        investeename: {
          val: '',
          code: ''
        },//被投资单位
        itemname: {
          val: '',
          code: ''
        },//项目
      },
    }
  },
  created() {
    this.getAccountingList();
  },
  mounted() {
    // this.rateshow();
    this.bassistshowa();
    // this.getCurrency();//币别
    this.getPeriodsCurrencysData();//会计期间
    // this.getBeginningBalanceList('资产类');
  },
  methods: {
    //获取期间
    getPeriodsCurrencysData() {
      let Vue = this;
      Vue.AxiosPost('getPeriodsCurrencysList', {
        accbookUid: Vue.$store.state.accbookUid
      }, function(e) {
        if (e.code === '1') {
          e.data.acctBookInfo.periods.forEach((n, i) => {
            Vue.periodsList.push({
              value: n.aperiodUid,
            });
          });
          //默认选中期间
          Vue.periodUid = Vue.periodsList[0].value;
          e.data.acctBookInfo.currencys.forEach((n, i) => {
            Vue.currencyList.push({
              value: n.currencyUid,
              label: n.currencyName,
              rate: n.exchangeRate
            })
          })
          // Vue.currencyList.splice(0,2);
          Vue.currencyUid = Vue.currencyList[2].value;
          // Vue.getBeginningBalanceList('资产类')
        } else if (e.code === '1006') {
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    // 获取期初余额表
    getBeginningBalanceList(name) {
      this.nowClassName = name;
      this.generalLedger = [];
      let Vue = this;
      Vue.AxiosPost('getBeginningBalanceList', {
        accbookUid: Vue.$store.state.accbookUid,
        accountClass: name,
        periodUid: Vue.periodUid,//期间uid
        currencyUid: Vue.currencyUid//币别uid
      }, function(e) {
        if (e.code === '1') {
          e.data.generalLedger.forEach((n, i) => {
            let data = {
              //期间uid
              periodUid: Vue.periodUid,
              //币别uid
              currencyUid: Vue.currencyUid,
              accountUid: n.accountUid,
              accountCode: n.accountCode,
              accountName: n.accountName,
              accountProperty: n.accountProperty,
              isAssist: n.isAssist,
              accassUid: n.accassUid,
              bend: n.bend,
              mb: n.mb,
              // mb: n.mb==0?'':n.mb,
              nbS: n.nbS,
              mbF: n.mbF
            };
            data.bassistshow = false;
            for (let i = 0, l = n.bassist.length; i < l; i++) {
              if (n.bassist[i] === 1) {
                data.bassistshow = true;
                break;
              }
            }
            Vue.generalLedger.push(data);
          });
        } else if (e.code === '1006') {
          Vue.generalLedger = [];
        } else {
          Vue.Message(e.msg, 'error');
        };
      });
    },
    //加号显示
    bassistshowa() {
    },

    // // 辅助核算状态发送
    // updateCal(){
    //  let Vue = this;
    //  Vue.AxiosPost('updateCal',{

    //  },function(e){
    //    if(e.code==='1'){
    //      Vue.Message('辅助核算使用状态修改成功','success')
    //    }else{
    //      Vue.Message('','error')
    //    }
    //  }

    //  )
    // },
    //     delTableData() {
    //   var Vue = this;
    //   Vue.AxiosPost('delAuxData', {
    //     accassUid: this.accassUid
    //   }, function(e) {
    //     if (e.code === '1') {
    //       Vue.Message('核算组合删除成功！', 'success');
    //       getBeginningBalanceList(name);
    //     } else {
    //       Vue.Message(e.msg, 'error');
    //     }
    //   });
    // },

    //辅助核算切换
    auxChange(id, name, op) {
      op.forEach((n, i) => {
        if (id === n.value) {
          this.form[name].code = n.code;
        }
      });
    },

    //增加科目初始余额的辅助核算
    addBeginningBalance() {
      let Vue = this;
      let data = JSON.stringify(Vue.generalLedger);
      data = {
        accountUid: Vue.generalLedger[Vue.nowEditIndex].accountUid,
        accountCode: Vue.generalLedger[Vue.nowEditIndex].accountCode,
        accountName: Vue.generalLedger[Vue.nowEditIndex].accountName,
        periodUid: Vue.periodUid,//期间uid
        currencyUid: Vue.currencyUid,//币别uid
        customUid: '',
        customCode: '',
        bankaccountUid: '',
        bankaccountCode: ''
      };
      if (Vue.form.cusname.val !== '') {
        data.cusUid = Vue.form.cusname.val;//id
        data.cusCode = Vue.form.cusname.code;//code
      } else {
        data.cusUid = '';//id
        data.cusCode = '';//code
      }
      if (Vue.form.proname.val !== '') {
        data.venUid = Vue.form.proname.val;
        data.supCode = Vue.form.proname.code;
      } else {
        data.venUid = '';
        data.supCode = '';
      }
      if (Vue.form.persname.val !== '') {
        data.persUid = Vue.form.persname.val;
        data.personCode = Vue.form.persname.code;
      } else {
        data.persUid = '';
        data.personCode = '';
      }
      if (Vue.form.depname.val !== '') {
        data.depUid = Vue.form.depname.val;
        data.depCode = Vue.form.depname.code;
      } else {
        data.depUid = '';
        data.depCode = '';
      }
      if (Vue.form.invname.val !== '') {
        data.invUid = Vue.form.invname.val;
        data.invCode = Vue.form.invname.code;
      } else {
        data.invUid = '';
        data.invCode = '';
      }
      if (Vue.form.investorname.val !== '') {
        data.investorUid = Vue.form.investorname.val;
        data.investorCode = Vue.form.investorname.code;
      } else {
        data.investorUid = '';
        data.investorCode = '';
      }
      if (Vue.form.investeename.val !== '') {
        data.investeeUid = Vue.form.investeename.val;
        data.investeeCode = Vue.form.investeename.code;
      } else {
        data.investeeUid = '';
        data.investeeCode = '';
      }
      if (Vue.form.itemname.val !== '') {
        data.itemUid = Vue.form.itemname.val;
        data.itemCode = Vue.form.itemname.code;
      } else {
        data.itemUid = '';
        data.itemCode = '';
      }
      Vue.AxiosPost('addBeginningBalance', data, function(e) {
        // console.log(data);
        if (e.code === '1') {
          Vue.Message('新增核算组合保存成功！', 'success');
          Vue.dialogFormVisible = false;
          Vue.getBeginningBalanceList(Vue.nowClassName);
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //增加科目初始余额的辅助核算

    // 编辑科目
    adddetail(index, row) {
      this.nowEditIndex = index;
      this.editNowItem = row.accountUid;
      this.accountName = row.accountCode + '  ' + row.accountName,
        this.dialogFormVisible = true;
      this.getBaccountList();
    },
    //  获取科目是否选择辅助核算
    getBaccountList() {
      let Vue = this;
      this.auxGroup = [];
      Vue.AxiosPost('getBaccountList', {
        accountUid: Vue.editNowItem,
        accbookUid: Vue.$store.state.accbookUid
      }, function(e) {
        if (e.code === '1') {
          e.data.accountS.forEach((n, i) => {
            if (n.bcus === 1) {
              Vue.setOption({
                label: '客户',
                val: 'cusname',
                option: 'customers'
              });
            }
            if (n.bdept === 1) {
              Vue.setOption({
                label: '部门',
                val: 'depname',
                option: 'departments'
              });
            }
            if (n.binv === 1) {
              Vue.setOption({
                label: '存货',
                val: 'invname',
                option: 'inventorys'
              });
            } if (n.bperson === 1) {
              Vue.setOption({
                label: '职员',
                val: 'persname',
                option: 'personnels'
              });
            } if (n.bsup === 1) {
              Vue.setOption({
                label: '供应商',
                val: 'proname',
                option: 'vendors'
              });
            } if (n.binvestee === 1) {
              Vue.setOption({
                label: '投资单位',
                val: 'investorname',
                option: 'investors'
              });
            } if (n.binvestor === 1) {
              Vue.setOption({
                label: '被投资单位',
                val: 'investeename',
                option: 'investees'
              });
            } if (n.bitem === 1) {
              Vue.setOption({
                label: '项目',
                val: 'itemname',
                option: 'auxitems'
              });
            }
          });
        } else if (e.code === '1006') {
          Vue.accountS = [];
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },

    setOption(aux) {
      let data = {
        label: aux.label,
        value: aux.val,
        option: []
      }
      this.$store.state.assistAList[aux.option].forEach((n, i) => {
        data.option.push({
          label: n.name,
          value: n.uid,
          code: n.code
        });
      });
      this.auxGroup.push(data);
    },
    //获取科目是否选择辅助核算

    // // 获取币别
    // getCurrency() {
    //   let Vue = this;
    //   Vue.AxiosPost('getCurrency', {
    //     accbookUid: Vue.$store.state.accbookUid
    //   }, function(e) {
    //     if (e.code === '1') {
    //       e.data.currencyList.forEach((n, i) => {
    //         Vue.currencyList.push({
    //           value: n.currencyUid,
    //           label: n.currencyName,
    //           rate: n.exchangeRate
    //         })
    //       })
    //       Vue.currencyUid = Vue.currencyList[1].value;
    //     } else if (e.code === '1006') {
    //     } else {
    //       Vue.Message(e.msg, 'error');
    //     }
    //   });
    // },

    //保存金额
    addBeginningBalances() {
      let saveData = [];
      console.log(saveData)
      this.generalLedger.forEach((n, i) => {
        saveData.push({
          accountUid: n.accountUid,//科目uid
          mb: n.mb,//金额
          mbF: n.mbF,//数量期初
          nbS: n.nbS,//外币期初
          bend: n.bend,//是否末级
          isAssist: n.isAssist,//是否辅助核算
          periodUid: n.periodUid,//期间uid
          currencyUid: n.currencyUid,//币别uid
          accassUid:n.accassUid,
          // accassUid:n.isAssist==1?n.accountUid:'',
          // accountUid:n.isAssist==0?n.accountUid:'',
        }) ;  
      })
      let Vue = this;
      Vue.AxiosPost('addBeginningBalances', { initialBalance: JSON.stringify(saveData) }, function(e) {
        if (e.code === '1') {
          Vue.Message('保存成功！', 'success');
          Vue.dialogFormVisible = false;
          Vue.getBeginningBalanceList(Vue.nowClassName);
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //保存金额

    // 根据id删除辅助核算
    auxDel(index, row) {
      this.nowEditIndex = index;
      this.editNowItem = row.accountUid;
      this.isAssist = row.isAssist;
      if (this.isAssist === 1) {
        this.accassUid = row.accountUid
      }
      // console.log(this.accassUid)
      this.delTableData();
    },
    delTableData() {
      var Vue = this;
      Vue.AxiosPost('delAuxData', {
        accassUid: this.accassUid
      }, function(e) {
        if (e.code === '1') {
          Vue.Message('核算组合删除成功！', 'success');
          getBeginningBalanceList(name);
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },

    //保存金额

    // 汇率显示
    rateshow() {
      this.getBeginningBalanceList('资产类');
      this.currencyList.forEach((n, i) => {
        if (this.currencyUid === n.value) {
          this.exchangeRate = n.rate;
        }
      })
    },

    link(route) {
      this.$router.push({ path: route });
    }
  }
}
</script>
<style lang="scss" scoped>
#intial {
  .el-row {
    margin-bottom: 15px;
    line-height: 36px;
    h3 {
      float: left;
      margin-right: 10px;
    }
    .btn {
      float: right;
    }
  }
}
</style>
