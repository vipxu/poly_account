<template>
  <div id="account" class="el-card--custom">
    <el-row>
      <el-radio-group v-model="accountRadio" @change="accountChange">
        <el-radio-button label="资产"></el-radio-button>
        <el-radio-button label="负债"></el-radio-button>
        <el-radio-button label="共同"></el-radio-button>
        <el-radio-button label="权益"></el-radio-button>
        <el-radio-button label="成本"></el-radio-button>
        <el-radio-button label="损益"></el-radio-button>
      </el-radio-group>
      <div class="btnBox">
        <el-button type="primary">新增</el-button>
        <!-- <el-button type="primary" @click="multidel">批量删除</el-button> -->
      </div>
    </el-row>
    <div>
      <el-table :data="dsignList" border style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column width="150" label="操作" align="center">
          <template scope="scope">
            <el-button class="el-icon-plus" type="text" size="small" @click="addAcc(scope.$index, scope.row)"></el-button>
            <el-button class="el-icon-edit" size="small" type="text" @click="accEdit(scope.$index, scope.row)"></el-button>
            <el-button class="el-icon-close" size="small" type="text" @click.stop="absDel(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
        <el-table-column label="编码" type="text" header-align="center" align="left" prop="accountCode">
        </el-table-column>
        <el-table-column label="名称" type="text" header-align="center" align="left" prop="accountName">
        </el-table-column>
        <el-table-column label="类别" type="text" header-align="center" align="left" prop="accountClass">
        </el-table-column>
        <el-table-column label="余额方向" type="text" align="center" prop="accountProperty">
        </el-table-column>
        <el-table-column label="外币" type="text" align="center" prop="bcdefinel">
        </el-table-column>
        <el-table-column label="数量" type="text" align="center" prop="cmeasure">
        </el-table-column>
        <el-table-column label="状态" type="input" align="center" prop="bclose">
          <template scope="scope">
            <el-button type="info" size="mini" align="right" v-model="scope.row.bclose" v-show="scope.row.bclose===0?true:false" @click="changeAccSta(scope.$index, scope.row)">已启用</el-button>
            <el-button size="mini" align="right" v-model="scope.row.bclose" v-show="scope.row.bclose===1?true:false" @click="changeAccSta(scope.$index, scope.row)">已禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增科目 -->
    <el-dialog id="dialog" size="tiny" title="新增下级科目" :visible.sync="dialogFormVisible">
      <el-form v-model="form">
        <el-form-item label="科目编码" :label-width="formLabelWidth" :required="true">
          <el-input v-model="form.accountCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="科目名称" :label-width="formLabelWidth" :required="true">
          <el-input v-model="form.accountName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级科目" :label-width="formLabelWidth">
          <el-input v-model="form.higherAcc" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="科目类别" :label-width="formLabelWidth">
          <el-input v-model="form1.accountSmallClass" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="余额方向" :label-width="formLabelWidth" v-model="accountProperty">
          <template>
            <el-radio class="radio" v-model="accountProperty" label="借">借</el-radio>
            <el-radio class="radio" v-model="accountProperty" label="贷">贷</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="辅助核算" :label-width="formLabelWidth">
          <el-checkbox v-model="a"></el-checkbox>
          <template>
            <el-checkbox-group v-if="a" v-model="auxCheckbox" @change="aChange">
              <el-checkbox label="bcus">客户</el-checkbox>
              <el-checkbox label="bsup">供应商</el-checkbox>
              <el-checkbox label="bperson">职员</el-checkbox>
              <el-checkbox label="bitem">项目</el-checkbox>
              <el-checkbox label="bdept">部门</el-checkbox>
              <el-checkbox label="binv">存货</el-checkbox>
              <el-checkbox label="binvestor">投资单位</el-checkbox>
              <el-checkbox label="binvestee">被投资人</el-checkbox>
              <el-checkbox label="bbankJournal">资金账户</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-form-item>
        <el-form-item label="数量核算" :label-width="formLabelWidth">
          <el-checkbox v-model="b"></el-checkbox>
          <el-input v-if="b" v-model="form.cmeasure" placeholder="计量单位"></el-input>
        </el-form-item>
        <el-form-item label="外币核算" :label-width="formLabelWidth" v-model="form.bforeign">
          <el-checkbox v-model="c"></el-checkbox>
          <template>
            <el-checkbox-group v-if="c" v-model="curCheckbox">
              <el-checkbox :label="item.currencyUid" v-for="(item, index) in currencyList" :key="index">{{ item.currencyName }}</el-checkbox>
            </el-checkbox-group>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addAccountData">保 存</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 新增科目 -->
    <!-- 编辑科目 -->
    <el-dialog id="dialog" size="tiny" title="编辑科目" :visible.sync="dialogForm1Visible">
      <el-form :model="form1">
        <el-form-item label="科目编码" :label-width="formLabelWidth">
          <el-input v-model="form1.accountCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="科目名称" :label-width="formLabelWidth">
          <el-input v-model="form1.accountName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级科目" :label-width="formLabelWidth">
          <el-input v-model="form1.higherAcc" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="科目类别" :label-width="formLabelWidth">
          <el-input v-model="form1.accountSmallClass" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="余额方向" :label-width="formLabelWidth" v-model="form1.accountProperty">
          <el-radio class="radio" v-model="accountProperty" label="借">借</el-radio>
          <el-radio class="radio" v-model="accountProperty" label="贷">贷</el-radio>
        </el-form-item>
        <el-form-item label="辅助核算" :label-width="formLabelWidth">
          <el-checkbox v-model="a"></el-checkbox>
          <el-checkbox-group v-if="a" v-model="auxCheckbox">
            <el-checkbox label="bcus">客户</el-checkbox>
            <el-checkbox label="bsup">供应商</el-checkbox>
            <el-checkbox label="bperson">职员</el-checkbox>
            <el-checkbox label="bitem">项目</el-checkbox>
            <el-checkbox label="bdept">部门</el-checkbox>
            <el-checkbox label="binv">存货</el-checkbox>
            <el-checkbox label="binvestor">投资单位</el-checkbox>
            <el-checkbox label="binvestee">被投资人</el-checkbox>
            <el-checkbox label="bbankJournal">资金账户</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="数量核算" :label-width="formLabelWidth">
          <el-checkbox v-model="b"></el-checkbox>
          <template>
            <el-checkbox-group v-if="b">
              <el-input v-model="form1.cmeasure" placeholder="计量单位">计量单位</el-input>
            </el-checkbox-group>
          </template>
        </el-form-item>
        <el-form-item label="外币核算" :label-width="formLabelWidth" v-model="form1.bforeign">
          <el-checkbox v-model="c"></el-checkbox>
          <el-checkbox-group v-if="c" v-model="curCheckbox">
            <el-checkbox :label="item.currencyUid" v-for="(item, index) in currencyList" :key="index">{{ item.currencyName }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editTableData">保 存</el-button>
        <el-button @click="dialogForm1Visible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 编辑科目 -->
  </div>
</template>
<script>
export default {
  name: 'account',
  data() {
    return {
      //选择类别
      accountUid: [],
      accountRadio: '资产',

      a: false,//控制辅助核算显示
      b: false,//控制数量核算显示
      c: false,//控制币别核算显示
      supcal: ['0', ''],
      accountProperty: '',//借贷方向
      dsignList: [
        //   {
        //   dsignUid: '',
        //   textname: '',
        //   isdefault: ''
        // }
      ],
      currencyList: [],//币别列表数据
      dialogFormVisible: false,//新增对话框显示
      dialogForm1Visible: false,//编辑对话框显示
      formLabelWidth: '100px',
      currencyName: '',//币别名称
      accountCode: '',//科目编码
      accountName: '',//科目名称
      accountClass: '',//科目类别
      accountSmallClass: '',//科目小类
      bclose: '',


      auxCheckbox: [],//核算数组
      curCheckbox: [],//币别数组

      bdefinition: '',
      bamount: '',
      bforeign: '',
      cexchName: '',
      cmeasure: '',
      bcdefine1: [],

      nowEditIndex: '',

      form: {
        currencyName: '',
        accountCode: '',
        accountName: '',
        accountClass: '',
        accountSmallClass: '',
        accountProperty: '',
        bcus: '',
        bsup: '',
        bperson: '',
        bitem: '',
        bdept: '',
        binv: '',
        binvestor: '',
        binvestee: '',
        bbankJournal: '',
        bdefinition: '',
        bamount: '',
        bforeign: '',
        cexchName: '',
        cmeasure: '',
        bcdefine1: ''
      }
    }
  },
  computed: {
    form1: function() {
      let row = this.dsignList[this.nowEditIndex];
      if (row) {
        let data = {
          accountCode: row.accountCode,  //科目编码
          accountUid: row.accountUid,
          accountName: row.accountName,  //科目名称
          accountClass: row.accountClass,//科目类别
          accountProperty: row.accountProperty, //余额方向
          accountSmallClass: row.accountSmallClass, //科目类别
          higherAcc: row.accountCode.substring(0, 4) + '  ' + row.accountName, //上级科目
          bdefinition: row.bdefinition, //是否自定义
          bforeign: row.bforeign, //是否外币
          cmeasure: row.cmeasure, //计量单位
          bcdefine1: JSON.stringify(this.curCheckbox)  // 存储外币的集合
        };
        this.auxCheckbox.forEach((item, index) => {
          switch (item) {
            case 'bcus':
              data.bcus = 1;
              break;
            case 'bsup':
              data.bsup = 1;
              break;
            case 'bperson':
              data.bperson = 1;
              break;
            case 'bitem':
              data.bitem = 1;
              break;
            case 'bdept':
              data.bdept = 1;
              break;
            case 'binv':
              data.binv = 1;
              break;
            case 'binvestor':
              data.binvestor = 1;
              break;
            case 'binvestee':
              data.binvestee = 1;
              break;
            case 'bbankJournal':
              data.bbankJournal = 1;
              break;

            default:
              break;
          }
        });
        if (!data.bcus) {
          data.bcus = 0;
        }
        if (!data.bsup) {
          data.bsup = 0;
        }
        if (!data.bperson) {
          data.bperson = 0;
        }
        if (!data.bitem) {
          data.bitem = 0;
        }
        if (!data.bdept) {
          data.bdept = 0;
        }
        if (!data.binv) {
          data.binv = 0;
        }
        if (!data.binvestor) {
          data.binvestor = 0;
        }
        if (!data.binvestee) {
          data.binvestee = 0;
        }
        if (!data.bbankJournal) {
          data.bbankJournal = 0;
        }
        data.bforeign = 'bforeign' ? 1 : 0;
        return data;
      } else {
        let data = {
          currencyName: '',
          accountCode: '',
          accountName: '',
          accountClass: '',
          accountSmallClass: '',
          accountProperty: '',
          bcus: '',
          bsup: '',
          bperson: '',
          bitem: '',
          bdept: '',
          binv: '',
          binvestor: '',
          binvestee: '',
          bbankJournal: '',
          bdefinition: '',
          bamount: '',
          bforeign: '',
          cexchName: '',
          cmeasure: '',
          bcdefine1: ''
        };
        return data;
      }
    }
  },
  mounted() {
    this.getAccount('资产类');
    this.getCurrency()
  },
  methods: {
    accountChange(label) {
      let name = '';
      switch (label) {
        case '资产':
          name = '资产类';
          break;
        case '负债':
          name = '负债类';
          break;
        case '共同':
          name = '共同类';
          break;
        case '权益':
          name = '所有者权益类';
          break;
        case '成本':
          name = '成本类';
          break;
        case '损益':
          name = '损益类';
          break;

        default:
          break;
      }
      this.getAccount(name);
    },

    getAccount(name) {
      let Vue = this;
      Vue.AxiosPost('getAccount', {
        accbookUid: Vue.$store.state.accbookUid,
        accountClass: name
      }, function(e) {
        if (e.code === '1') {
          Vue.dsignList = e.data.accountingSubjectList;
        } else if (e.code === '1006') {
          Vue.dsignList = [];
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },

    // 获取币别
    getCurrency() {
      let Vue = this;
      Vue.AxiosPost('getCurrency', {
        accbookUid: Vue.$store.state.accbookUid
      }, function(e) {
        if (e.code === '1') {
          Vue.currencyList = e.data.currencyList;
        } else if (e.code === '1006') {
          Vue.currencyList = [];
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    // 获取币别


    //新增科目数据
    addAcc(index, row) {
      this.nowEditIndex = index;
      this.editNowItem = row.accountUid;
      this.dialogFormVisible = true;
      this.addAccForm();
    },
    //新增科目辅助核算
    aChange() {
      let data = this.form;
      this.auxCheckbox.forEach((item, index) => {
        switch (item) {
          case 'bcus':
            data.bcus = 1;
            break;
          case 'bsup':
            data.bsup = 1;
            break;
          case 'bperson':
            data.bperson = 1;
            break;
          case 'bitem':
            data.bitem = 1;
            break;
          case 'bdept':
            data.bdept = 1;
            break;
          case 'binv':
            data.binv = 1;
            break;
          case 'binvestor':
            data.binvestor = 1;
            break;
          case 'binvestee':
            data.binvestee = 1;
            break;
          case 'bbankJournal':
            data.bbankJournal = 1;
            break;

          default:
            break;
        }
      });
      if (!data.bcus) {
        data.bcus = 0;
      }
      if (!data.bsup) {
        data.bsup = 0;
      }
      if (!data.bperson) {
        data.bperson = 0;
      }
      if (!data.bitem) {
        data.bitem = 0;
      }
      if (!data.bdept) {
        data.bdept = 0;
      }
      if (!data.binv) {
        data.binv = 0;
      }
      if (!data.binvestor) {
        data.binvestor = 0;
      }
      if (!data.binvestee) {
        data.binvestee = 0;
      }
      if (!data.bbankJournal) {
        data.bbankJournal = 0;
      }
    },
    //获取对话框数据
    addAccForm() {
      let row = this.dsignList[this.nowEditIndex];
      if (row) {
        let data = this.form;
        data.accountUid = row.accountUid;
        data.accountCode = row.accountCode;
        data.accountName = '';
        data.accountClass = row.accountClass;
        data.accountSmallClass = row.accountSmallClass;
        data.higherAcc = row.accountCode.substring(0, 4) + '  ' + row.accountName;
        data.bcdefine1 = JSON.stringify(this.curCheckbox);
        // console.log(JSON.stringify(this.curCheckbox));
        this.curCheckbox = [];
        this.auxCheckbox = [];
        data.bforeign = this.bforeign ? 1 : 0;
      } else {
        let data = {
          currencyName: '',
          accountCode: '',
          accountName: '',
          accountClass: '',
          accountSmallClass: '',
          accountProperty: '',
          bcus: '',
          bsup: '',
          bperson: '',
          bitem: '',
          bdept: '',
          binv: '',
          binvestor: '',
          binvestee: '',
          bbankJournal: '',
          bdefinition: '',
          bamount: '',
          bforeign: '',
          // cexchName: '',
          cmeasure: '',
          bcdefine1: ''
        };
      }
    },

    addAccountData() {
      var Vue = this;
      Vue.AxiosPost('addAccountData', {
        accbookUid: Vue.$store.state.accbookUid, //账套uid
        accountUid: Vue.form.accountUid,
        accountCode: Vue.form.accountCode, //科目编码
        accountName: Vue.form.accountName, //科目名称
        accountClass: Vue.form.accountClass, //科目大类
        accountSmallClass: Vue.form.accountSmallClass, //科目小类
        accountProperty: Vue.accountProperty,  //余额方向
        bcus: Vue.form.bcus, //是否客户
        bsup: Vue.form.bsup, //是否供应商
        bperson: Vue.form.bperson, //是否职员
        bitem: Vue.form.bitem,  //是否项目
        bdept: Vue.form.bdept,  //是否部门
        binv: Vue.form.binv,  //是否存货
        binvestor: Vue.form.binvestor,  //是否投资单位
        binvestee: Vue.form.binvestee, //是否被投资单位
        bbankJournal: Vue.form.bbankJournal, //是否资金账户
        bdefinition: Vue.form.bdefinition,  //是否自定义
        bamount: Vue.form.bamount,  //是否数量
        bforeign: Vue.form.bforeign,  //是否外币
        cmeasure: Vue.form.cmeasure,  //计量单位
        bcdefine1: JSON.stringify(this.curCheckbox),  //存储外币的集合
      }, function(e) {
        if (e.code === '1') {
          Vue.dialogFormVisible = false;
          Vue.Message('保存成功！', 'success');
          Vue.getAccount('资产类');
          // Vue.getAccountingList();//更新辅助核算
          Vue.getSubjectData();//生成科目树并更新科目数据
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //新增科目数据

    // 删除科目
    absDel(index, row) {
      this.editNowItem = row.accountUid;
      this.accountCode = row.accountCode.substring(0, row.accountCode.length - 2);
      this.dsignList.forEach((n, i) => {
        if (this.accountCode === n.accountCode) {
          this.accountUid1 = n.accountUid;
        }
      })
      this.$confirm('此操作将删除该科目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delTableData(row.accountUid);
      }).catch(() => {
        this.Message('已取消删除', 'info');
      });
    },
    delTableData(id) {
      var Vue = this;
      Vue.AxiosPost('delaccountData', {
        accountUid: id,
        accountUid1: this.accountUid1
      }, function(e) {
        if (e.code === '1') {
          Vue.Message('删除成功！', 'success');
          Vue.getAccount('资产类');
          Vue.getSubjectData();//生成科目树并更新科目数据
        } else {
          Vue.Message(e.msg, 'error');
          Vue.getAccount('资产类');
          Vue.getSubjectData();//生成科目树并更新科目数据
        }
      });
    },
    // 删除科目

    // 批量删除科目
    // tableSelect(selection, row) {
    //   this.ids = '';
    //   selection.forEach((n, i) => {
    //     if (i === 0) {
    //       this.ids += n.accountUid;
    //     } else {
    //       this.ids += ',' + n.accountUid;
    //     }
    //   });
    // },
    // tableSelectAll(selection) {
    //   this.ids = '';
    //   selection.forEach((n, i) => {
    //     if (i === 0) {
    //       this.ids += n.accountUid;
    //     } else {
    //       this.ids += ',' + n.accountUid;
    //     }
    //   });
    // },
    // multidel() {
    //   this.delTableData();
    // },

    // absDel(index, row) {
    //   this.ids = row.accountUid;
    //   this.$confirm('此操作将删除该科目, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.delTableData();
    //   }).catch(() => {
    //     this.Message('已取消删除', 'info');
    //   });
    // },
    // delTableData() {
    //   var Vue = this;
    //   Vue.AxiosPost('delAccountsData', {
    //     accountUid: Vue.ids
    //   }, function(e) {
    //     if (e.code === '1') {
    //       Vue.Message('删除成功！', 'success');
    //       Vue.getAccount('资产类');
    //     } else {
    //       Vue.Message(e.msg, 'error');
    //     }
    //   });
    //   Vue.ids = [];
    // },
    // 批量删除科目

    // 改变科目状态
    changeAccSta(index, row) {
      this.editNowItem = row.accountUid;
      // console.log(this.editNowItem)
      var Vue = this;
      Vue.AxiosPost('changeAccSta', {
        accountUid: this.editNowItem,
      }, function(e) {
        if (e.code === '1') {
          Vue.Message('科目状态修改成功！', 'success');
          Vue.getAccount('资产类');
          Vue.getSubjectData();//生成科目树并更新科目数据
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //改变科目状态

    //编辑科目数据
    accEdit(index, row) {
      this.nowEditIndex = index;
      this.editNowItem = row.accountUid;
      this.dialogForm1Visible = true;
      this.editAccForm();
    },
    //编辑科目辅助核算
    bChange() {
      let data = this.form1;
      this.auxCheckbox.forEach((item, index) => {
        switch (item) {
          case 'bcus':
            data.bcus = 1;
            break;
          case 'bsup':
            data.bsup = 1;
            break;
          case 'bperson':
            data.bperson = 1;
            break;
          case 'bitem':
            data.bitem = 1;
            break;
          case 'bdept':
            data.bdept = 1;
            break;
          case 'binv':
            data.binv = 1;
            break;
          case 'binvestor':
            data.binvestor = 1;
            break;
          case 'binvestee':
            data.binvestee = 1;
            break;
          case 'bbankJournal':
            data.bbankJournal = 1;
            break;

          default:
            break;
        }
      });
      if (!data.bcus) {
        data.bcus = 0;
      }
      if (!data.bsup) {
        data.bsup = 0;
      }
      if (!data.bperson) {
        data.bperson = 0;
      }
      if (!data.bitem) {
        data.bitem = 0;
      }
      if (!data.bdept) {
        data.bdept = 0;
      }
      if (!data.binv) {
        data.binv = 0;
      }
      if (!data.binvestor) {
        data.binvestor = 0;
      }
      if (!data.binvestee) {
        data.binvestee = 0;
      }
      if (!data.bbankJournal) {
        data.bbankJournal = 0;
      }
    },
    //获取对话框数据
    editAccForm() {
      let row = this.dsignList[this.nowEditIndex];
      if (row) {
        let data = this.form1;
        data.accountUid = row.accountUid;
        data.accountCode = row.accountCode;
        data.accountName = row.accountName;
        data.accountClass = row.accountClass;
        data.accountSmallClass = row.accountSmallClass;
        data.higherAcc = row.accountCode.substring(0, 4) + '  ' + row.accountName;
        data.bcdefine1 = JSON.stringify(this.curCheckbox);
        console.log(JSON.stringify(this.curCheckbox));
        this.curCheckbox = [];
        this.auxCheckbox = [];
        data.bforeign = this.bforeign ? 1 : 0;
      } else {
        let data = {
          currencyName: '',
          accountCode: '',
          accountUid: '',
          accountName: '',
          accountClass: '',
          accountSmallClass: '',
          accountProperty: '',
          bcus: '',
          bsup: '',
          bperson: '',
          bitem: '',
          bdept: '',
          binv: '',
          binvestor: '',
          binvestee: '',
          bbankJournal: '',
          bdefinition: '',
          bamount: '',
          bforeign: '',
          cexchName: '',
          cmeasure: '',
          bcdefine1: ''
        };
      }
    },

    editTableData() {
      var Vue = this;
      Vue.AxiosPost('updateAccountingSubject', {
        accbookUid: Vue.$store.state.accbookUid, //账套uid
        accountUid: Vue.form1.accountUid,//科目uid
        accountCode: Vue.form1.accountCode, //科目编码
        accountName: Vue.form1.accountName, //科目名称
        accountClass: Vue.form1.accountClass, //科目大类
        accountSmallClass: Vue.form1.accountSmallClass, //科目小类
        accountProperty: Vue.accountProperty,  //余额方向
        bcus: Vue.form1.bcus, //是否客户
        bsup: Vue.form1.bsup, //是否供应商
        bperson: Vue.form1.bperson, //是否职员
        bitem: Vue.form1.bitem,  //是否项目
        bdept: Vue.form1.bdept,  //是否部门
        binv: Vue.form1.binv,  //是否存货
        binvestor: Vue.form1.binvestor,  //是否投资单位
        binvestee: Vue.form1.binvestee, //是否被投资单位
        bbankJournal: Vue.form1.bbankJournal, //是否资金账户
        bdefinition: Vue.form1.bdefinition,  //是否自定义
        bamount: Vue.form1.bamount,  //是否数量
        bforeign: Vue.form1.bforeign,  //是否外币
        cmeasure: Vue.form1.cmeasure,  //计量单位
        bcdefine1: JSON.stringify(this.curCheckbox),  //存储外币的集合
      }, function(e) {
        if (e.code === '1') {
          Vue.dialogForm1Visible = false;
          Vue.Message('修改成功！', 'success');
          Vue.getAccount('资产类');
          Vue.getSubjectData();//生成科目树并更新科目数据
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //编辑科目数据

    link(route) {
      this.$router.push({ path: route });
    },
  }
}
</script>

<style lang="scss" scoped>
#account {
  .el-row {
    margin-bottom: 15px;
    line-height: 36px;
    .el-radio-group {
      float: left;
    }
    .btnBox {
      float: right;
    }
  }
}
</style>
