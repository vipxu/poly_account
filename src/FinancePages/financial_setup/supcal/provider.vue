<template>
  <div id="provider" class="el-card--custom">
    <el-row>
      <el-button-group>
        <el-button @click="link('10-1')">客户</el-button>
        <el-button type="primary" @click="link('10-2')">供应商</el-button>
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
      <el-table :data="cusalllist" border style="width: 100%" @select="tableSelect" @select-all="tableSelectAll">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column header-align="center" align="left" prop="venCode" label="编码">
        </el-table-column>
        <el-table-column header-align="center" align="left" prop="venName" label="名称">
        </el-table-column>
        <el-table-column align="center" prop="venPhone" label="电话">
        </el-table-column>
        <el-table-column align="center" prop="venAddress" label="地址">
        </el-table-column>
        <el-table-column align="center" prop="venBank" label="开户行">
        </el-table-column>
        <el-table-column align="center" prop="venAccount" label="账号">
        </el-table-column>
        <el-table-column align="center" prop="scope.row.bendfalg" label="状态">
          <template scope="scope">
            <el-button type="info" size="mini" align="right" v-model="scope.row.bendfalg" v-show="scope.row.bendfalg===0?true:false" @click="changeProSta(scope.$index, scope.row)">已启用</el-button>
            <el-button size="mini" align="right" v-model="scope.row.bendfalg" v-show="scope.row.bendfalg===1?true:false" @click="changeProSta(scope.$index, scope.row)">已禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button class="el-icon-edit" type="text" size="small" @click="proEdit(scope.$index, scope.row)"></el-button>
            <el-button class="el-icon-close" size="small" type="text" @click.stop="proDel(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增供应商 -->
    <el-dialog id="dialog" title="新增供应商" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="供应商编码" :label-width="formLabelWidth">
          <el-input v-model="form.venCode" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="供应商名称" :label-width="formLabelWidth">
          <el-input v-model="form.venName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="供应商电话" :label-width="formLabelWidth">
          <el-input v-model="form.venPhone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="供应商地址" :label-width="formLabelWidth">
          <el-input v-model="form.venAddress" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="供应商账户" :label-width="formLabelWidth">
          <el-input v-model="form.venAccount" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="开户行" :label-width="formLabelWidth">
          <el-input v-model="form.venBank" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addProviderData">保 存</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 编辑供应商 -->
    <el-dialog id="dialog" title="编辑供应商" :visible.sync="dialogForm1Visible">
      <el-form :model="form1">
        <el-form-item label="供应商编码" :label-width="formLabelWidth">
          <el-input v-model="form1.venCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="供应商名称" :label-width="formLabelWidth">
          <el-input v-model="form1.venName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="供应商电话" :label-width="formLabelWidth">
          <el-input v-model="form1.venPhone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="供应商地址" :label-width="formLabelWidth">
          <el-input v-model="form1.venAddress" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="供应商账号" :label-width="formLabelWidth">
          <el-input v-model="form1.venAccount" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="开户行" :label-width="formLabelWidth">
          <el-input v-model="form1.venBank" auto-complete="off"></el-input>
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
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
export default {
  name: 'provider',
  mounted() {
    this.getProvider();
    this.getVendorCode()
  },
  methods: {
    // 删除方法
    tableSelect(selection, row) {
      this.ids = '';
      selection.forEach((n, i) => {
        if (i === 0) {
          this.ids += n.venUid;
        } else {
          this.ids += ',' + n.venUid;
        }
      });
    },
    tableSelectAll(selection) {
      this.ids = '';
      selection.forEach((n, i) => {
        if (i === 0) {
          this.ids += n.venUid;
        } else {
          this.ids += ',' + n.venUid;
        }
      });
    },
    multidel() {
      this.delTableData();
    },

    // 获取供应商数据
    getProvider() {
      let Vue = this;
      Vue.AxiosPost('getProvider', {
        bookid: Vue.$store.state.accbookUid
      }, function(e) {
        if (e.code === '1') {
          Vue.cusalllist = e.data.venallList;
        } else if (e.code === '1006') {
          Vue.venallList = [];
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    link(route) {
      this.$router.push({ path: route });
    },

    // 改变数据状态
    changeProSta(index, row) {
      this.editNowItem = row.venUid;
      console.log(this.editNowItem)
      var Vue = this;
      Vue.AxiosPost('changeProSta', {
        uid: this.editNowItem,
      }, function(e) {
        if (e.code === '1') {
          Vue.Message('职员状态修改成功！', 'success');
          Vue.getProvider();
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //改变数据状态
    // 获取code
    getVendorCode() {
      let Vue = this;
      Vue.AxiosPost('getVendorCode', {
      }, function(e) {
        if (e.code === '1') {
          Vue.form.venCode = e.data.code
        } else if (e.code === '1006') {
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //新增供应商数据
    addProviderData() {
      var Vue = this;
      Vue.AxiosPost('addProviderData', {
        accbookUid: Vue.$store.state.accbookUid,
        venCode: Vue.form.venCode,
        venName: Vue.form.venName,
        venPhone: Vue.form.venPhone,
        venAddress: Vue.form.venAddress,
        venAccount: Vue.form.venAccount,
        venBank: Vue.form.venBank,
      }, function(e) {
        if (e.code === '1') {
          Vue.Message('保存成功！', 'success');
          Vue.dialogFormVisible = false;
          Vue.getProvider();
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //新增供应商数据

    // 删除供应商
    proDel(index, row) {
      this.ids = row.venUid;
      this.$confirm('此操作将删除该供应商, 是否继续?', '提示', {
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
      Vue.AxiosPost('delProviderData', {
        ids: Vue.ids
      }, function(e) {
        if (e.code === '1') {
          Vue.Message('删除成功！', 'success');
          Vue.getProvider();
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
      Vue.ids = [];
    },
    // 删除供应商

    // 编辑供应商
    proEdit(index, row) {
      this.editNowItem = row.venUid;
      this.form1.venCode = row.venCode;
      this.form1.venName = row.venName;
      this.form1.venPhone = row.venPhone;
      this.form1.venAddress = row.venAddress;
      this.form1.venAccount = row.venAccount;
      this.form1.venBank = row.venBank;
      this.dialogForm1Visible = true;
    },
    editTableData() {
      let Vue = this;
      Vue.dialogForm1Visible = false;
      Vue.AxiosPost('editproviderData', {
        accbookUid: Vue.$store.state.accbookUid,
        venUid: Vue.editNowItem,
        venCode: Vue.form1.venCode,
        venName: Vue.form1.venName,
        venAbbname: Vue.form1.venAbbname,
        venPhone: Vue.form1.venPhone,
        venAddress: Vue.form1.venAddress,
        venAccount: Vue.form1.venAccount,
        venBank: Vue.form1.venBank,
      }, function(e) {
        if (e.code === '1') {
          Vue.getProvider();
          Vue.Message('修改成功！', 'success');
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });

    },
    // 编辑供应商
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
      venCode: '',
      venName: '',
      venPhone: '',
      venAddress: '',
      venAccount: '',
      venBank: '',
      bused: '',
      bendfalg: '',
      form: { venCode: '', venName: '', venPhone: '', venAddress: '', venAccount: '', venBank: '' },
      form1: { venCode: '', venName: '', venPhone: '', venAddress: '', venAccount: '', venBank: '' },
    }
  },
}
</script>
<style lang="scss" scoped>
#provider {
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

