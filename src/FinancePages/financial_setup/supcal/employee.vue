<template>
  <div id="employee" class="el-card--custom">
    <el-row>
      <el-button-group>
        <el-button @click="link('10-1')">客户</el-button>
        <el-button @click="link('10-2')">供应商</el-button>
        <el-button type="primary" @click="link('10-3')">职员</el-button>
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
      <el-table :data="perallList" border style="width: 100%" @select="tableSelect" @select-all="tableSelectAll">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column header-align="center" align="left" prop="persCode" label="编码">
        </el-table-column>
        <el-table-column header-align="center" align="left" prop="persName" label="名称">
        </el-table-column>
        <el-table-column align="center" prop="deptName" label="部门">
        </el-table-column>
        <el-table-column align="center" prop="scope.row.bendfalg" label="状态">
          <template scope="scope">
            <el-button type="info" size="mini" align="right" v-model="scope.row.bendfalg" v-show="scope.row.bendfalg===0?true:false" @click="changePerSta(scope.$index, scope.row)">已启用</el-button>
            <el-button size="mini" align="right" v-model="scope.row.bendfalg" v-show="scope.row.bendfalg===1?true:false" @click="changePerSta(scope.$index, scope.row)">已禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button class="el-icon-edit" type="text" size="small" @click="persEdit(scope.$index, scope.row)"></el-button>
            <el-button class="el-icon-close" size="small" type="text" @click.stop="empDel(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增职员 -->
    <el-dialog id="dialog" title="新增职员" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="职员编码" :label-width="formLabelWidth">
          <el-input v-model="form.persCode" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="职员名称" :label-width="formLabelWidth">
          <el-input v-model="form.persName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" :label-width="formLabelWidth">
          <el-select v-model="depUid" placeholder="请选择" @change="getdepName()">
            <el-option v-for="(item,index) in depallList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addpersonnelData">保 存</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 新增职员 -->

    <!-- 编辑职员 -->
    <el-dialog id="dialog" title="编辑职员" :visible.sync="dialogForm1Visible">
      <el-form :model="form1">
        <el-form-item label="职员名称" :label-width="formLabelWidth">
          <el-input v-model="form1.persName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门名称" :label-width="formLabelWidth">
          <el-select v-model="depUid" placeholder="请选择" @change="getdepName()">
            <el-option v-for="(item,index) in depallList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editTableData">保 存</el-button>
        <el-button @click="dialogForm1Visible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 编辑职员 -->
  </div>
</template>

<script>
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
export default {
  name: 'employee',
  data() {
    return {
      ids: '',
      disabled: true,
      perallList: [
        //   {
        //   dsignUid: '',
        //   textname: '',
        //   isdefault: ''
        // }
      ],
      dialogFormVisible: false,
      dialogForm1Visible: false,
      formLabelWidth: '100px',
      persCode: '',
      persName: '',
      bused: '',
      bendfalg: '',
      depallList: [],
      depUid: '',
      depName: '',
      form: { persCode: '', persName: '' },
      form1: { persName: '' }
    }
  },
  mounted() {
    this.getEmployee();
    this.getPersonnelCode();
    this.getDepartment()
  },
  methods: {
    getEmployee() {
      let Vue = this;
      Vue.AxiosPost('getEmployee', {
        bookid: Vue.$store.state.accbookUid
      }, function(e) {
        if (e.code === '1') {
          Vue.perallList = e.data.perallList;
        } else if (e.code === '1006') {
          Vue.perallList = [];
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    link(route) {
      this.$router.push({ path: route });
    },

    // 获取部门信息
    getDepartment() {
      let Vue = this;
      Vue.AxiosPost('getDepartment', {
        bookid: Vue.$store.state.accbookUid
      }, function(e) {
        if (e.code === '1') {
          e.data.depallList.forEach((n, i) => {
            Vue.depallList.push({
              value: n.depUid,
              label: n.depName,
              name: n.depName
            })
          })
        } else if (e.code === '1006') {
          Vue.depallList = [];
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },

    // 改变数据状态
    changePerSta(index, row) {
      this.editNowItem = row.persUid;
      console.log(this.editNowItem)
      var Vue = this;
      Vue.AxiosPost('changePerSta', {
        uid: this.editNowItem,
      }, function(e) {
        if (e.code === '1') {
          Vue.Message('职员状态修改成功！', 'success');
          Vue.getEmployee();
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //改变数据状态

    // 获取code
    getPersonnelCode() {
      let Vue = this;
      Vue.AxiosPost('getPersonnelCode', {
      }, function(e) {
        if (e.code === '1') {
          Vue.form.persCode = e.data.code
        } else if (e.code === '1006') {
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //获取部门名称
    getdepName() {
      this.depallList.forEach((n, i) => {
        if (this.depUid === n.value) {
          this.depName = n.name
        }
      })
    },
    //新增职员数据
    addpersonnelData() {
      var Vue = this;
      Vue.AxiosPost('addpersonnelData', {
        accbookUid: Vue.$store.state.accbookUid,
        persCode: Vue.form.persCode,
        persName: Vue.form.persName,
        depUid: Vue.depUid,
        deptName: Vue.depName
      }, function(e) {
        if (e.code === '1') {
          Vue.Message('保存成功！', 'success');
          Vue.dialogFormVisible = false;
          Vue.getEmployee();
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //新增职员数据

    // 批量删除职员数据
    tableSelect(selection, row) {
      this.ids = '';
      selection.forEach((n, i) => {
        if (i === 0) {
          this.ids += n.persUid;
        } else {
          this.ids += ',' + n.persUid;
        }
      });
    },
    tableSelectAll(selection) {
      this.ids = '';
      selection.forEach((n, i) => {
        if (i === 0) {
          this.ids += n.persUid;
        } else {
          this.ids += ',' + n.persUid;
        }
      });
    },
    multidel() {
      this.delTableData();
    },

    // 编辑职员
    persEdit(index, row) {
      this.editNowItem = row.persUid;
      this.form1.persName = row.persName;
      this.dialogForm1Visible = true;
      this.depUid = row.depUid
    },
    editTableData() {
      let Vue = this;
      Vue.dialogForm1Visible = false;
      Vue.AxiosPost('editpersonnelData', {
        accbookUid: Vue.$store.state.accbookUid,
        persUid: Vue.editNowItem,
        persName: Vue.form1.persName,
        depUid: Vue.depUid,
        deptName: Vue.depName,
      },
        function(e) {
          if (e.code === '1') {
            Vue.getEmployee();
            Vue.Message('修改成功！', 'success');
            Vue.getAccountingList();//更新辅助核算
          } else {
            Vue.Message(e.msg, 'error');
          }
        });

    },
    // 编辑职员


    // 删除客户
    empDel(index, row) {
      this.ids = row.persUid;
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
      Vue.AxiosPost('delpersonData', {
        ids: Vue.ids
      }, function(e) {
        if (e.code === '1') {
          Vue.getEmployee();
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
}
</script>
<style lang="scss" scoped>
#employee {
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
