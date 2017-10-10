<template>
  <div id="customer" class="el-card--custom">
    <el-row>
      <el-button-group>
        <el-button type="primary" @click="link('10-1')">客户</el-button>
        <el-button @click="link('10-2')">供应商</el-button>
        <el-button @click="link('10-3')">职员</el-button>
        <el-button @click="link('10-4')">项目</el-button>
        <el-button @click="link('10-5')">部门</el-button>
        <el-button @click="link('10-6')">存货</el-button>
        <el-button @click="link('10-7')">投资单位</el-button>
        <el-button @click="link('10-8')">被投资单位</el-button>
        <el-button @click="link('10-9')">资金账户</el-button>
      </el-button-group>
      <div class="btnBox">
        <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
        <el-button type="primary" @click="multidel">批量删除</el-button>
      </div>
    </el-row>
    <div>
      <el-table :data="cusalllist" border @select="tableSelect" @select-all="tableSelectAll" style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column header-align="center" align="left" prop="cusCode" label="编码">
        </el-table-column>
        <el-table-column header-align="center" align="left" prop="cusName" label="名称">
        </el-table-column>
        <el-table-column align="center" prop="cusAbbname" label="别名">
        </el-table-column>
        <el-table-column align="center" prop="cusPhone" label="电话">
        </el-table-column>
        <el-table-column align="center" prop="cusAddress" label="地址">
        </el-table-column>
        <el-table-column align="center" prop="cusRegcode" label="纳税人识别号">
        </el-table-column>
        <el-table-column align="center" prop="cusBank" label="开户行">
        </el-table-column>
        <el-table-column align="center" prop="cusAccount" label="账号">
        </el-table-column>
        <el-table-column align="center" prop="scope.row.bendfalg" label="状态">
          <template scope="scope">
            <el-button type="info" size="mini" align="right" v-model="scope.row.bendfalg" v-show="scope.row.bendfalg===0?true:false" @click="changeCusSta(scope.$index, scope.row)">已启用</el-button>
            <el-button size="mini" align="right" v-model="scope.row.bendfalg" v-show="scope.row.bendfalg===1?true:false" @click="changeCusSta(scope.$index, scope.row)">已禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button class="el-icon-edit" type="text" size="small" @click="cusEdit(scope.$index, scope.row)"></el-button>
            <el-button class="el-icon-close" size="small" type="text" @click.stop="cusDel(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增客户 -->
    <el-dialog id="dialog" title="新增客户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="编码" :label-width="formLabelWidth">
          <el-input v-model="form.cusCode" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.cusName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="别名" :label-width="formLabelWidth">
          <el-input v-model="form.cusAbbname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.cusPhone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.cusAddress" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="纳税人识别号" :label-width="formLabelWidth">
          <el-input v-model="form.cusRegcode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="开户行" :label-width="formLabelWidth">
          <el-input v-model="form.cusBank" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.cusAccount" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addCustomerData">保 存</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 编辑客户 -->
    <el-dialog id="dialog" title="编辑客户" :visible.sync="dialogForm1Visible">
      <el-form :model="form1">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form1.cusName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="别名" :label-width="formLabelWidth">
          <el-input v-model="form1.cusAbbname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form1.cusPhone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form1.cusAddress" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="纳税人识别号" :label-width="formLabelWidth">
          <el-input v-model="form1.cusRegcode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="开户行" :label-width="formLabelWidth">
          <el-input v-model="form1.cusBank" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form1.cusAccount" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editTableData">保 存</el-button>
        <el-button @click="dialogForm1Visible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'customer',
  mounted() {
    this.getCustomer();
    this.getCustomerCode();
  },
  methods: {
    tableSelect(selection, row) {
      this.ids = '';
      selection.forEach((n, i) => {
        if (i === 0) {
          this.ids += n.cusUid;
        } else {
          this.ids += ',' + n.cusUid;
        }
      });
    },
    tableSelectAll(selection) {
      this.ids = '';
      selection.forEach((n, i) => {
        if (i === 0) {
          this.ids += n.cusUid;
        } else {
          this.ids += ',' + n.cusUid;
        }
      });
    },
    multidel() {
      this.delTableData();
    },

    // 查询客户数据
    getCustomer() {
      let Vue = this;
      Vue.AxiosPost('getCustomer', {
        bookid: Vue.$store.state.accbookUid
      }, function(e) {
        if (e.code === '1') {
          Vue.cusalllist = e.data.cusalllist;
        } else if (e.code === '1006') {
          Vue.cusalllist = [];
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    // 查询客户数据

    // 改变数据状态
    changeCusSta(index, row) {
      this.editNowItem = row.cusUid;
      console.log(this.editNowItem)
      var Vue = this;
      Vue.AxiosPost('changeCusSta', {
        uid: this.editNowItem,
      }, function(e) {
        if (e.code === '1') {
          Vue.Message('客户状态修改成功！', 'success');
          Vue.getCustomer();
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //改变数据状态

    link(route) {
      this.$router.push({ path: route });
    },

    // 获取code
    getCustomerCode() {
      let Vue = this;
      Vue.AxiosPost('getCustomerCode', {
      }, function(e) {
        if (e.code === '1') {
          Vue.form.cusCode = e.data.code
        } else if (e.code === '1006') {
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },


    //新增客户数据
    addCustomerData() {
      var Vue = this;
      Vue.AxiosPost('addCustomerData', {
        accbookUid: Vue.$store.state.accbookUid,
        cusCode: Vue.form.cusCode,
        cusName: Vue.form.cusName,
        cusAbbname: Vue.form.cusAbbname,
        cusPhone: Vue.form.cusPhone,
        cusAddress: Vue.form.cusAddress,
        cusRegcode: Vue.form.cusRegcode,
        cusBank: Vue.form.cusBank,
        cusAccount: Vue.form.cusAccount,
      }, function(e) {
        if (e.code === '1') {
          Vue.Message('保存成功！', 'success');
          Vue.dialogFormVisible = false;
          Vue.getCustomer();
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //新增客户数据

    // 编辑客户
    cusEdit(index, row) {
      this.editNowItem = row.cusUid;
      this.form1.cusName = row.cusName;
      this.form1.cusAbbname = row.cusAbbname;
      this.form1.cusPhone = row.cusPhone;
      this.form1.cusAddress = row.cusAddress;
      this.form1.cusRegcode = row.cusRegcode;
      this.form1.cusBank = row.cusBank;
      this.form1.cusAccount = row.cusAccount;
      this.dialogForm1Visible = true;
    },
    editTableData() {
      let Vue = this;
      Vue.dialogForm1Visible = false;
      Vue.AxiosPost('editcustomerData', {
        accbookUid: Vue.$store.state.accbookUid,
        cusUid: Vue.editNowItem,
        cusName: Vue.form1.cusName,
        cusAbbname: Vue.form1.cusAbbname,
        cusPhone: Vue.form1.cusPhone,
        cusAddress: Vue.form1.cusAddress,
        cusRegcode: Vue.form1.cusRegcode,
        cusBank: Vue.form1.cusBank,
        cusAccount: Vue.form1.cusAccount,
      }, function(e) {
        if (e.code === '1') {
          Vue.getCustomer();
          Vue.Message('修改成功！', 'success');
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });

    },
    // 编辑客户


    // 删除客户
    cusDel(index, row) {
      this.ids = row.cusUid;
      this.$confirm('此操作将删除该客户, 是否继续?', '提示', {
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
      Vue.AxiosPost('delcustomerData', {
        ids: Vue.ids
      }, function(e) {
        if (e.code === '1') {
          Vue.getCustomer();
          Vue.Message('删除成功！', 'success');
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
      Vue.ids = [];
    },
    // 删除客户
  },
  data() {
    return {
      ids: '',
      disabled: true,
      cusalllist: [
        //   {
        //   dsignUid: '',
        //   textname: '',
        //   isdefault: ''
        // }
      ],
      dialogFormVisible: false,
      dialogForm1Visible: false,
      formLabelWidth: '100px',
      bendfalg: '',//是否启用
      // value:bendfalg==0?'0':'1',
      cusCode: '',
      cusName: '',
      cusAbbname: '',
      cusPhone: '',
      cusAddress: '',
      cusRegcode: '',
      cusBank: '',
      cusAccount: '',
      form: { cusCode: '', cusName: '', cusAbbname: '', cusPhone: '', cusAddress: '', cusRegcode: '', cusBank: '', cusAccount: '' },
      form1: { cusName: '', cusAbbname: '', cusPhone: '', cusAddress: '', cusRegcode: '', cusBank: '', cusAccount: '' },
    }
  },
}
</script>

<style lang="scss" scoped>
#customer {
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
