<template>
  <div id="capaccount" class="el-card--custom">
    <el-row>
      <el-button-group>
        <el-button @click="link('10-1')">客户</el-button>
        <el-button @click="link('10-2')">供应商</el-button>
        <el-button @click="link('10-3')">职员</el-button>
        <el-button @click="link('10-4')">项目</el-button>
        <el-button @click="link('10-5')">部门</el-button>
        <el-button @click="link('10-6')">存货</el-button>
        <el-button @click="link('10-7')">投资单位</el-button>
        <el-button @click="link('10-8')">被投资单位</el-button>
        <el-button type="primary" @click="link('10-9')">资金账户</el-button>
      </el-button-group>
      <div class="btnBox">
        <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
        <el-button type="primary" @click="multidel">批量删除</el-button>
      </div>
    </el-row>
    <div>
      <el-table :data="bkaccountList" border style="width: 100%" @select="tableSelect" @select-all="tableSelectAll">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column header-align="center" align="left" prop="bkaccountCode" label="编码">
        </el-table-column>
        <el-table-column align="center" prop="abbr" label="账户简称" type="input">
        </el-table-column>
        <el-table-column align="center" prop="bankbranch" label="金融机构名" type="input">
        </el-table-column>
        <el-table-column align="center" prop="bankAdd" label="银行营业网点" type="input">
        </el-table-column>
        <el-table-column align="center" prop="bkaccountName" label="账户名" type="input">
        </el-table-column>
        <el-table-column align="center" prop="bkaccountNum" label="账号" type="input">
        </el-table-column>
        <el-table-column align="center" prop="bkaccountType" label="账户类别" type="input">
        </el-table-column>
        <el-table-column align="center" prop="purpose" label="账户用途" type="input">
        </el-table-column>
        <el-table-column align="center" prop="blimit" label="账户使用用途是否受限" type="input">
          <template scope="scope">
            <el-button type="text" size="mini" align="right" v-model="scope.row.blimit" v-show="scope.row.blimit===1?true:false">是</el-button>
            <el-button type="text" size="mini" align="right" v-model="scope.row.blimit" v-show="scope.row.blimit===0?true:false">否</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="linkman" label="银行客户经理" type="input">
        </el-table-column>
        <el-table-column align="center" prop="scope.row.bendfalg" label="状态">
          <template scope="scope">
            <el-button type="info" size="mini" align="right" v-model="scope.row.bendfalg" v-show="scope.row.bendfalg===1?true:false" @click="changeBankSta(scope.$index, scope.row)">已启用</el-button>
            <el-button size="mini" align="right" v-model="scope.row.bendfalg" v-show="scope.row.bendfalg===0?true:false" @click="changeBankSta(scope.$index, scope.row)">已禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button class="el-icon-edit" type="text" size="small" @click="capEdit(scope.$index, scope.row)"></el-button>
            <el-button class="el-icon-close" size="small" type="text" @click.stop="capDel(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增资金账户 -->
    <el-dialog id="dialog" title="新增资金账户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="账户编码" :label-width="formLabelWidth">
          <el-input v-model="form.bkaccountCode" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="账户简称" :label-width="formLabelWidth">
          <el-input v-model="form.abbr" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行机构名" :label-width="formLabelWidth">
          <el-input v-model="form.bankbranch" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行营业点" :label-width="formLabelWidth">
          <el-input v-model="form.bankAdd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账户名" :label-width="formLabelWidth">
          <el-input v-model="form.bkaccountName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.bkaccountNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账户类型" :label-width="formLabelWidth">
          <el-input v-model="form.bkaccountType" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账户用途" :label-width="formLabelWidth">
          <el-input v-model="form.purpose" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行经理" :label-width="formLabelWidth">
          <el-input v-model="form.linkman" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行电话" :label-width="formLabelWidth">
          <el-input v-model="form.linkmanPhone" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addBankAccountData">保 存</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 新增资金账户 -->

    <!-- 编辑资金账户 -->
    <el-dialog id="dialog" title="编辑资金账户" :visible.sync="dialogForm1Visible">
      <el-form :model="form1">
        <el-form-item label="账户简称" :label-width="formLabelWidth">
          <el-input v-model="form1.abbr" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行机构名" :label-width="formLabelWidth">
          <el-input v-model="form1.bankbranch" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行营业点" :label-width="formLabelWidth">
          <el-input v-model="form1.bankAdd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账户名" :label-width="formLabelWidth">
          <el-input v-model="form1.bkaccountName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form1.bkaccountNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账户类型" :label-width="formLabelWidth">
          <el-input v-model="form1.bkaccountType" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账户用途" :label-width="formLabelWidth">
          <el-input v-model="form1.purpose" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否受限" :label-width="formLabelWidth">
          <el-select v-model="form1.blimit">
            <el-option v-for="(item,index) in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="银行经理" :label-width="formLabelWidth">
          <el-input v-model="form1.linkman" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行电话" :label-width="formLabelWidth">
          <el-input v-model="form1.linkmanPhone" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editTableData">保 存</el-button>
        <el-button @click="dialogForm1Visible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 编辑资金账户 -->
  </div>
</template>

<script>
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
export default {
  name: 'capaccount',
  data() {
    return {
      options: [{
        value: '1',
        label: '是'
      }, {
        value: '0',
        label: '否'
      }],
      blimit: '',
      ids: '',
      disabled: true,
      bkaccountList: [
        //   {
        //   dsignUid: '',
        //   textname: '',
        //   isdefault: ''
        // }
      ],
      dialogFormVisible: false,
      dialogForm1Visible: false,
      formLabelWidth: '100px',
      bkaccountCode: '',
      abbr: '',
      bankbranch: '',
      bankAdd: '',
      bkaccountName: '',
      bkaccountNum: '',
      bkaccountType: '',
      purpose: '',
      linkman: '',
      linkmanPhone: '',
      bendfalg: '',
      form: { bkaccountCode: '', abbr: '', bankbranch: '', bankAdd: '', bkaccountName: '', bkaccountNum: '', bkaccountType: '', purpose: '', linkman: '', linkmanPhone: '', },
      form1: { bkaccountCode: '', abbr: '', bankbranch: '', blimit: '', bankAdd: '', bkaccountName: '', bkaccountNum: '', bkaccountType: '', purpose: '', linkman: '', linkmanPhone: '', },
    }
  },
  mounted() {
    this.getAllList();
    this.getBankCode()
  },
  methods: {
    getAllList() {
      let Vue = this;
      Vue.AxiosPost('getAllList', {
        bookid: Vue.$store.state.accbookUid
      }, function(e) {
        if (e.code === '1') {
          Vue.bkaccountList = e.data.bkaccountList;
        } else if (e.code === '1006') {
          Vue.dsignList = [];
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    link(route) {
      this.$router.push({ path: route });
    },

    // 改变数据状态
    changeBankSta(index, row) {
      this.editNowItem = row.bankaccountUid;
      var Vue = this;
      Vue.AxiosPost('changeBankSta', {
        uid: this.editNowItem,
      }, function(e) {
        if (e.code === '1') {
          Vue.Message('资金账户状态修改成功！', 'success');
          Vue.getAllList();
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //改变数据状态

    // 删除存货
    tableSelect(selection, row) {
      this.ids = '';
      selection.forEach((n, i) => {
        if (i === 0) {
          this.ids += n.bankaccountUid;
        } else {
          this.ids += ',' + n.bankaccountUid;
        }
      });
    },
    tableSelectAll(selection) {
      this.ids = '';
      selection.forEach((n, i) => {
        if (i === 0) {
          this.ids += n.bankaccountUid;
        } else {
          this.ids += ',' + n.bankaccountUid;
        }
      });
    },
    multidel() {
      this.delTableData();
    },

    // 删除资金账户
    capDel(index, row) {
      this.ids = row.bankaccountUid;
      this.$confirm('此操作将删除该资金账户, 是否继续?', '提示', {
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
      Vue.AxiosPost('delbankAccountData', {
        ids: Vue.ids
      }, function(e) {
        if (e.code === '1') {
          Vue.getAllList();
          Vue.Message('删除成功！', 'success');
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
      Vue.ids = [];
    },
    // 删除资金账户

    // 获取code
    getBankCode() {
      let Vue = this;
      Vue.AxiosPost('getBankCode', {
      }, function(e) {
        if (e.code === '1') {
          Vue.form.bkaccountCode = e.data.code
        } else if (e.code === '1006') {
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },

    //新增资金账户数据
    addBankAccountData() {
      var Vue = this;
      Vue.AxiosPost('addBankAccountData', {
        accbooktUid: Vue.$store.state.accbookUid,
        bkaccountCode: Vue.form.bkaccountCode,
        abbr: Vue.form.abbr,
        bankbranch: Vue.form.bankbranch,
        bankAdd: Vue.form.bankAdd,
        bkaccountName: Vue.form.bkaccountName,
        bkaccountNum: Vue.form.bkaccountNum,
        bkaccountType: Vue.form.bkaccountType,
        purpose: Vue.form.purpose,
        linkman: Vue.form.linkman,
        linkmanPhone: Vue.form.linkmanPhone
      }, function(e) {
        if (e.code === '1') {
          Vue.Message('保存成功！', 'success');
          Vue.dialogFormVisible = false;
          Vue.getAllList();
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //新增资金账户数据

    // 编辑资金账户
    capEdit(index, row) {
      this.editNowItem = row.bankaccountUid;
      this.form1.abbr = row.abbr;
      this.form1.bankbranch = row.bankbranch;
      this.form1.bankAdd = row.bankAdd;
      this.form1.bkaccountName = row.bkaccountName;
      this.form1.bkaccountNum = row.bkaccountNum;
      this.form1.bkaccountType = row.bkaccountType;
      this.form1.purpose = row.purpose;
      this.form1.linkman = row.linkman;
      this.form1.linkmanPhone = row.linkmanPhone;
      this.dialogForm1Visible = true;
    },
    editTableData() {
      let Vue = this;
      Vue.dialogForm1Visible = false;
      Vue.AxiosPost('editbankAccountData', {
        accbookUid: Vue.$store.state.accbookUid,
        bankaccountUid: Vue.editNowItem,
        abbr: Vue.form1.abbr,
        bankbranch: Vue.form1.bankbranch,
        bankAdd: Vue.form1.bankAdd,
        bkaccountName: Vue.form1.bkaccountName,
        bkaccountNum: Vue.form1.bkaccountNum,
        bkaccountType: Vue.form1.bkaccountType,
        purpose: Vue.form1.purpose,
        linkman: Vue.form1.linkman,
        blimit: Vue.form1.blimit,
        linkmanPhone: Vue.form1.linkmanPhone,
      }, function(e) {
        if (e.code === '1') {
          Vue.getAllList();
          Vue.Message('修改成功！', 'success');
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });

    },
    // 编辑资金账户
  }

}
</script>
<style lang="scss" scoped>
#capaccount {
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
