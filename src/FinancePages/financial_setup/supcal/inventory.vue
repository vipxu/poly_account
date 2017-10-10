<template>
  <div id="inventory" class="el-card--custom">
    <el-row>
      <el-button-group>
        <el-button @click="link('10-1')">客户</el-button>
        <el-button @click="link('10-2')">供应商</el-button>
        <el-button @click="link('10-3')">职员</el-button>
        <el-button @click="link('10-4')">项目</el-button>
        <el-button @click="link('10-5')">部门</el-button>
        <el-button type="primary" @click="link('10-6')">存货</el-button>
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
      <el-table :data="invallList" border style="width: 100%" @select="tableSelect" @select-all="tableSelectAll">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column header-align="center" align="left" prop="invCode" label="编码">
        </el-table-column>
        <el-table-column header-align="center" align="left" prop="invName" label="名称">
        </el-table-column>
        <el-table-column align="center" prop="scope.row.bendfalg" label="状态">
          <template scope="scope">
            <el-button type="info" size="mini" align="right" v-model="scope.row.bendfalg" v-show="scope.row.bendfalg===0?true:false" @click="changeInvSta(scope.$index, scope.row)">已启用</el-button>
            <el-button size="mini" align="right" v-model="scope.row.bendfalg" v-show="scope.row.bendfalg===1?true:false" @click="changeInvSta(scope.$index, scope.row)">已禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button class="el-icon-edit" type="text" size="small" @click="invEdit(scope.$index, scope.row)"></el-button>
            <el-button class="el-icon-close" size="small" type="text" @click.stop="invDel(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增存货 -->
    <el-dialog id="dialog" title="新增存货" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="编码" :label-width="formLabelWidth">
          <el-input v-model="form.invCode" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="存货名称" :label-width="formLabelWidth">
          <el-input v-model="form.invName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addInventoryData">保 存</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 新增存货 -->
    <!-- 编辑存货 -->
    <el-dialog id="dialog" title="编辑存货" :visible.sync="dialogForm1Visible">
      <el-form :model="form1">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form1.invName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editTableData">保 存</el-button>
        <el-button @click="dialogForm1Visible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 编辑存货 -->
  </div>
</template>

<script>
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
export default {
  name: 'inventory',
  data() {
    return {
      ids: '',
      disabled: true,
      invallList: [
        //   {
        //   dsignUid: '',
        //   textname: '',
        //   isdefault: ''
        // }
      ],
      dialogFormVisible: false,
      dialogForm1Visible: false,
      formLabelWidth: '100px',
      invCode: '',
      invName: '',
      bendfalg: '',
      form: { invCode: '', invName: '' },
      form1: { invName: '' }
    }
  },
  mounted() {
    this.getInventory();
    this.getInventoryCode()
  },
  methods: {
    getInventory() {
      let Vue = this;
      Vue.AxiosPost('getInventory', {
        bookid: Vue.$store.state.accbookUid
      }, function(e) {
        if (e.code === '1') {
          Vue.invallList = e.data.invallList;
        } else if (e.code === '1006') {
          Vue.invallList = [];
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    link(route) {
      this.$router.push({ path: route });
    },
    // 改变数据状态
    changeInvSta(index, row) {
      this.editNowItem = row.invUid;
      console.log(this.editNowItem)
      var Vue = this;
      Vue.AxiosPost('changeInvSta', {
        uid: this.editNowItem,
      }, function(e) {
        if (e.code === '1') {
          Vue.Message('存货状态修改成功！', 'success');
          Vue.getInventory();
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //改变数据状态

    // 获取code
    getInventoryCode() {
      let Vue = this;
      Vue.AxiosPost('getInventoryCode', {
      }, function(e) {
        if (e.code === '1') {
          Vue.form.invCode = e.data.code
        } else if (e.code === '1006') {
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //新增存货数据
    addInventoryData() {
      var Vue = this;
      Vue.AxiosPost('addInventoryData', {
        accbookUid: Vue.$store.state.accbookUid,
        invCode: Vue.form.invCode,
        invName: Vue.form.invName,
      }, function(e) {
        if (e.code === '1') {
          Vue.Message('保存成功！', 'success');
          Vue.dialogFormVisible = false;
          Vue.getInventory();
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //新增存货数据

    getcode() {
      let Vue = this;
      Vue.AxiosPost('getcode', {
      }, function(e) {
        if (e.code === '1') {
        } else if (e.code === '1006') {
          Vue.invallList = [];
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },

    // 删除存货
    tableSelect(selection, row) {
      this.ids = '';
      selection.forEach((n, i) => {
        if (i === 0) {
          this.ids += n.invUid;
        } else {
          this.ids += ',' + n.invUid;
        }
      });
    },
    tableSelectAll(selection) {
      this.ids = '';
      selection.forEach((n, i) => {
        if (i === 0) {
          this.ids += n.invUid;
        } else {
          this.ids += ',' + n.invUid;
        }
      });
    },
    multidel() {
      this.delTableData();
    },

    invDel(index, row) {
      this.ids = row.invUid;
      this.$confirm('此操作将删除该存货, 是否继续?', '提示', {
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
      Vue.AxiosPost('delinventoryData', {
        ids: Vue.ids
      }, function(e) {
        if (e.code === '1') {
          Vue.Message('删除成功！', 'success');
          Vue.getInventory();
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
      Vue.ids = [];
    },
    // 删除存货

    // 编辑存货
    invEdit(index, row) {
      this.editNowItem = row.invUid;
      this.form1.invName = row.invName;
      this.dialogForm1Visible = true;
    },
    editTableData() {
      let Vue = this;
      Vue.dialogForm1Visible = false;
      Vue.AxiosPost('editInvData', {
        accbookUid: Vue.$store.state.accbookUid,
        invUid: Vue.editNowItem,
        invName: Vue.form1.invName
      }, function(e) {
        if (e.code === '1') {
          Vue.getInventory();
          Vue.Message('修改成功！', 'success');
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });

    },
    // 编辑存货
  },
}
</script>
<style lang="scss" scoped>
#inventory {
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

