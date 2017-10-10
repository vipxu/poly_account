<template>
  <div id="invenstor" class="el-card--custom">
    <el-row>
      <el-button-group>
        <el-button @click="link('10-1')">客户</el-button>
        <el-button @click="link('10-2')">供应商</el-button>
        <el-button @click="link('10-3')">职员</el-button>
        <el-button @click="link('10-4')">项目</el-button>
        <el-button @click="link('10-5')">部门</el-button>
        <el-button @click="link('10-6')">存货</el-button>
        <el-button type="primary" @click="link('10-7')">投资单位</el-button>
        <el-button @click="link('10-8')">被投资单位</el-button>
        <el-button @click="link('10-9')">资金账户</el-button>
      </el-button-group>
      <div class="btnBox">
        <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
        <el-button type="primary" @click="multidel">批量删除</el-button>
      </div>
    </el-row>
    <div>
      <el-table :data="iorallList" border style="width: 100%" @select="tableSelect" @select-all="tableSelectAll">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column header-align="center" align="left" prop="investorCode" label="编码">
        </el-table-column>
        <el-table-column header-align="center" align="left" prop="investorName" label="名称">
        </el-table-column>
        <el-table-column align="center" prop="abbr" label="简称">
        </el-table-column>
        <el-table-column align="right" prop="holdingRate" label="持股比例（%）">
          <!-- <template scope="scope">
                        <span>{{scope.row.holdingRate}}</span>
                        <el-button type="text" size="small">%</el-button>
                      </template> -->
        </el-table-column>
        <el-table-column align="right" prop="subscriCapital" label="认缴资本（万）">
        </el-table-column>
        <el-table-column align="right" prop="paidCapital" label="实缴资本(万)">
        </el-table-column>
        <el-table-column align="center" prop="investType" label="出资方式">
        </el-table-column>
        <el-table-column align="center" prop="scope.row.bendfalg" label="状态">
          <template scope="scope">
            <el-button type="info" size="mini" align="right" v-model="scope.row.bendfalg" v-show="scope.row.bendfalg===0?true:false" @click="changeInvestorSta(scope.$index, scope.row)">已启用</el-button>
            <el-button size="mini" align="right" v-model="scope.row.bendfalg" v-show="scope.row.bendfalg===1?true:false" @click="changeInvestorSta(scope.$index, scope.row)">已禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button class="el-icon-edit" type="text" size="small" @click="investorEdit(scope.$index, scope.row)"></el-button>
            <el-button class="el-icon-close" size="small" type="text" @click.stop="invesDel(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增投资单位 -->
    <el-dialog id="dialog" title="新增投资单位" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="投资单位编码" :label-width="formLabelWidth">
          <el-input v-model="form.investorCode" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="投资单位名称" :label-width="formLabelWidth">
          <el-input v-model="form.investorName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="简称" :label-width="formLabelWidth">
          <el-input v-model="form.abbr" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="持股比例" :label-width="formLabelWidth">
          <el-input v-model="form.holdingRate" auto-complete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item label="认缴资本" :label-width="formLabelWidth">
          <el-input v-model="form.subscriCapital" auto-complete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item label="实缴资本" :label-width="formLabelWidth">
          <el-input v-model="form.paidCapital" auto-complete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item label="出资方式" :label-width="formLabelWidth">
          <el-input v-model="form.investType" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addInvestorData">保 存</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 新增投资单位 -->

    <!-- 编辑投资单位 -->
    <el-dialog id="dialog" title="编辑投资单位" :visible.sync="dialogForm1Visible">
      <el-form :model="form1">
        <el-form-item label="投资单位名称" :label-width="formLabelWidth">
          <el-input v-model="form1.investorName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="简称" :label-width="formLabelWidth">
          <el-input v-model="form1.abbr" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="持股比例" :label-width="formLabelWidth">
          <el-input v-model="form1.holdingRate" auto-complete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item label="认缴资本" :label-width="formLabelWidth">
          <el-input v-model="form1.subscriCapital" auto-complete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item label="实缴资本" :label-width="formLabelWidth">
          <el-input v-model="form1.paidCapital" auto-complete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item label="出资方式" :label-width="formLabelWidth">
          <el-input v-model="form1.investType" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editTableData">保 存</el-button>
        <el-button @click="dialogForm1Visible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 编辑投资单位 -->
  </div>
</template>

<script>
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
export default {
  name: 'invenstor',
  data() {
    return {
      ids: '',
      disabled: '',
      iorallList: [
        //   {
        //   dsignUid: '',
        //   textname: '',
        //   isdefault: ''
        // }
      ],
      dialogFormVisible: false,
      dialogForm1Visible: false,
      formLabelWidth: '100px',
      investorCode: '',
      investorName: '',
      abbr: '',
      holdingRate: '',
      subscriCapital: '',
      paidCapital: '',
      investType: '',
      bendfalg: '',
      form: { investorCode: '', investorName: '', abbr: '', holdingRate: '', subscriCapital: '', paidCapital: '', investType: '', },
      form1: { investorCode: '', investorName: '', abbr: '', holdingRate: '', subscriCapital: '', paidCapital: '', investType: '', }
    }
  },
  mounted() {
    this.getInvenstor();
    this.getInvestorCode()
  },
  methods: {
    getInvenstor() {
      let Vue = this;
      Vue.AxiosPost('getInvenstor', {
        bookid: Vue.$store.state.accbookUid
      }, function(e) {
        if (e.code === '1') {
          Vue.iorallList = e.data.iorallList;
        } else if (e.code === '1006') {
          Vue.iorallList = [];
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    link(route) {
      this.$router.push({ path: route });
    },

    // 改变数据状态
    changeInvestorSta(index, row) {
      this.editNowItem = row.investorUid;
      var Vue = this;
      Vue.AxiosPost('changeInvestorSta', {
        uid: this.editNowItem,
      }, function(e) {
        if (e.code === '1') {
          Vue.Message('投资单位状态修改成功！', 'success');
          Vue.getInvenstor();
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //改变数据状态
    // 获取code
    getInvestorCode() {
      let Vue = this;
      Vue.AxiosPost('getInvestorCode', {
      }, function(e) {
        if (e.code === '1') {
          Vue.form.investorCode = e.data.code
        } else if (e.code === '1006') {
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //新增投资单位数据
    addInvestorData() {
      var Vue = this;
      Vue.AxiosPost('addInvestorData', {
        accbookUid: Vue.$store.state.accbookUid,
        investorCode: Vue.form.investorCode,
        investorName: Vue.form.investorName,
        abbr: Vue.form.abbr,
        holdingRate: Vue.form.holdingRate,
        subscriCapital: Vue.form.subscriCapital,
        paidCapital: Vue.form.paidCapital,
        investType: Vue.form.investType
      }, function(e) {
        if (e.code === '1') {
          Vue.Message('保存成功！', 'success');
          Vue.dialogFormVisible = false;
          Vue.getInvenstor();
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //新增投资单位数据

    // 删除投资单位
    tableSelect(selection, row) {
      this.ids = '';
      selection.forEach((n, i) => {
        if (i === 0) {
          this.ids += n.investorUid;
        } else {
          this.ids += ',' + n.investorUid;
        }
      });
    },
    tableSelectAll(selection) {
      this.ids = '';
      selection.forEach((n, i) => {
        if (i === 0) {
          this.ids += n.investorUid;
        } else {
          this.ids += ',' + n.investorUid;
        }
      });
    },
    multidel() {
      this.delTableData();
    },

    invesDel(index, row) {
      this.ids = row.investorUid;
      this.$confirm('此操作将删除该投资单位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delTableData();
      }).catch(() => {
        this.Message('已取消删除', 'info');
      });
    },
    delTableData() {
      var Vue = this;
      Vue.AxiosPost('delInvestorData', {
        ids: Vue.ids
      }, function(e) {
        if (e.code === '1') {
          Vue.getInvenstor();
          Vue.Message('删除成功！', 'success');
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
      Vue.ids = [];
    },
    // 删除投资单位

    // 编辑投资单位
    investorEdit(index, row) {
      this.editNowItem = row.investorUid;
      this.form1.investorName = row.investorName;
      this.form1.abbr = row.abbr;
      this.form1.holdingRate = row.holdingRate;
      this.form1.subscriCapital = row.subscriCapital;
      this.form1.paidCapital = row.paidCapital;
      this.form1.investType = row.investType;
      this.dialogForm1Visible = true;
    },
    editTableData() {
      let Vue = this;
      Vue.dialogForm1Visible = false;
      Vue.AxiosPost('editInvestorData', {
        accbookUid: Vue.$store.state.accbookUid,
        investorUid: Vue.editNowItem,
        investorName: Vue.form1.investorName,
        abbr: Vue.form1.abbr,
        holdingRate: Vue.form1.holdingRate,
        subscriCapital: Vue.form1.subscriCapital,
        paidCapital: Vue.form1.paidCapital,
        investType: Vue.form1.investType,
      }, function(e) {
        if (e.code === '1') {
          Vue.getInvenstor();
          Vue.Message('修改成功！', 'success');
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });

    },
    // 编辑投资单位
  },
}
</script>
<style lang="scss" scoped>
#invenstor {
  .el-row {
    margin-bottom: 15px;
    .el-button-group {
      float: left;
    }
    .btnBox {
      float: right;
    }
  }
}
</style>
