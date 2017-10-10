<template>
  <div id="subject" class="el-card--custom">
    <el-row>
      <el-button-group>
        <el-button @click="link('10-1')">客户</el-button>
        <el-button @click="link('10-2')">供应商</el-button>
        <el-button @click="link('10-3')">职员</el-button>
        <el-button type="primary" @click="link('10-4')">项目</el-button>
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
      <el-table :data="itemallList" border style="width: 100%" @select="tableSelect" @select-all="tableSelectAll">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column header-align="center" align="left" prop="itemCode" label="编码">
        </el-table-column>
        <el-table-column header-align="center" align="left" prop="itemName" label="名称">
        </el-table-column>
        <el-table-column align="center" prop="scope.row.bendfalg" label="状态">
          <template scope="scope">
            <el-button type="info" size="mini" align="right" v-model="scope.row.bendfalg" v-show="scope.row.bendfalg===0?true:false" @click="changeItemSta(scope.$index, scope.row)">已启用</el-button>
            <el-button size="mini" align="right" v-model="scope.row.bendfalg" v-show="scope.row.bendfalg===1?true:false" @click="changeItemSta(scope.$index, scope.row)">已禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button class="el-icon-edit" type="text" size="small" @click="subEdit(scope.$index, scope.row)"></el-button>
            <el-button class="el-icon-close" size="small" type="text" @click.stop="subDel(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增项目 -->
    <el-dialog id="dialog" title="新增项目" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="编码" :label-width="formLabelWidth">
          <el-input v-model="form.itemCode" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.itemName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addsubjectData">保 存</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 新增项目 -->

    <!-- 编辑项目 -->
    <el-dialog id="dialog" title="编辑项目" :visible.sync="dialogForm1Visible">
      <el-form :model="form1">
        <el-form-item label="项目名称" :label-width="formLabelWidth">
          <el-input v-model="form1.itemName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级编码" :label-width="formLabelWidth">
          <el-input v-model="form1.sparentUid" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="编码级次" :label-width="formLabelWidth">
          <el-input v-model="form1.igrade" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否末级" :label-width="formLabelWidth">
          <el-input v-model="form1.bend" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="年度字段" :label-width="formLabelWidth">
          <el-input v-model="form1.iyear" auto-complete="off"></el-input>
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
  name: 'subject',
  data() {
    return {
      ids: '',
      disabled: true,
      itemallList: [
        //   {
        //   dsignUid: '',
        //   textname: '',
        //   isdefault: ''
        // }
      ],
      dialogFormVisible: false,
      dialogForm1Visible: false,
      formLabelWidth: '100px',
      itemCode: '',
      itemName: '',
      form: { itemCode: '', itemName: '' },
      form1: { itemName: '', sparentUid: '', igrade: '', bend: '', iyear: '' }
    }
  },
  mounted() {
    this.getSubject();
    this.getItemCode()
  },
  methods: {
    getSubject() {
      let Vue = this;
      Vue.AxiosPost('getSubject', {
        bookid: Vue.$store.state.accbookUid
      }, function(e) {
        if (e.code === '1') {
          Vue.itemallList = e.data.itemallList;
        } else if (e.code === '1006') {
          Vue.itemallList = [];
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    link(route) {
      this.$router.push({ path: route });
    },

    // 改变数据状态
    changeItemSta(index, row) {
      this.editNowItem = row.itemUid;
      var Vue = this;
      Vue.AxiosPost('changeItemSta', {
        uid: this.editNowItem,
      }, function(e) {
        if (e.code === '1') {
          Vue.Message('项目状态修改成功！', 'success');
          Vue.getAccountingList();//更新辅助核算
          Vue.getSubject();
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //改变数据状态
    // 获取code
    getItemCode() {
      let Vue = this;
      Vue.AxiosPost('getItemCode', {
      }, function(e) {
        if (e.code === '1') {
          Vue.form.itemCode = e.data.code
        } else if (e.code === '1006') {
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },

    //新增项目数据
    addsubjectData() {
      var Vue = this;
      Vue.AxiosPost('addsubjectData', {
        accbookUid: Vue.$store.state.accbookUid,
        itemCode: Vue.form.itemCode,
        itemName: Vue.form.itemName,
      }, function(e) {
        if (e.code === '1') {
          Vue.Message('保存成功！', 'success');
          Vue.dialogFormVisible = false;
          Vue.getSubject();
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //新增项目数据

    // 批量删除职员数据
    tableSelect(selection, row) {
      this.ids = '';
      selection.forEach((n, i) => {
        if (i === 0) {
          this.ids += n.itemUid;
        } else {
          this.ids += ',' + n.itemUid;
        }
      });
    },
    tableSelectAll(selection) {
      this.ids = '';
      selection.forEach((n, i) => {
        if (i === 0) {
          this.ids += n.itemUid;
        } else {
          this.ids += ',' + n.itemUid;
        }
      });
    },
    multidel() {
      this.delTableData();
    },
    // 删除客户
    subDel(index, row) {
      this.ids = row.itemUid;
      this.$confirm('此操作将删除该项目, 是否继续?', '提示', {
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
      Vue.AxiosPost('delsubjectData', {
        ids: Vue.ids
      }, function(e) {
        if (e.code === '1') {
          Vue.getSubject();
          Vue.Message('删除成功！', 'success');
        } else {
          Vue.Message('该项目已被使用', 'error');
        }
      });
      Vue.ids = [];
    },
    // 删除客户

    // 编辑项目
    subEdit(index, row) {
      this.editNowItem = row.itemUid;
      this.form1.itemName = row.itemName;
      this.form1.sparentUid = row.sparentUid;
      this.form1.igrade = row.igrade;
      this.form1.bend = row.bend;
      this.form1.iyear = row.iyear;
      this.dialogForm1Visible = true;
    },
    editTableData() {
      let Vue = this;
      Vue.dialogForm1Visible = false;
      Vue.AxiosPost('editsubData', {
        accbookUid: Vue.$store.state.accbookUid,
        itemUid: Vue.editNowItem,
        itemName: Vue.form1.itemName,
        sparentUid: Vue.form1.sparentUid,
        igrade: Vue.form1.igrade,
        bend: Vue.form1.bend,
        iyear: Vue.form1.iyear,
      }, function(e) {
        if (e.code === '1') {
          Vue.getSubject();
          Vue.Message('修改成功！', 'success');
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });

    },
    // 编辑项目
  },
}
</script>
<style lang="scss" scoped>
#subject {
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
