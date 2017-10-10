<template>
  <div id="department" class="el-card--custom">
    <el-row>
      <el-button-group>
        <el-button @click="link('10-1')">客户</el-button>
        <el-button @click="link('10-2')">供应商</el-button>
        <el-button @click="link('10-3')">职员</el-button>
        <el-button @click="link('10-4')">项目</el-button>
        <el-button type="primary" @click="link('10-5')">部门</el-button>
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
      <el-table :data="depallList" border style="width: 100%" @select="tableSelect" @select-all="tableSelectAll">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column header-align="center" align="left" prop="depCode" label="编码">
        </el-table-column>
        <el-table-column header-align="center" align="left" prop="depName" label="名称">
        </el-table-column>
        <el-table-column align="center" prop="costAccount" label="费用科目">
        </el-table-column>
        <el-table-column align="center" prop="scope.row.bendfalg" label="状态">
          <template scope="scope">
            <el-button type="info" size="mini" align="right" v-model="scope.row.bendfalg" v-show="scope.row.bendfalg===1?true:false" @click="changeDepSta(scope.$index, scope.row)">已启用</el-button>
            <el-button size="mini" align="right" v-model="scope.row.bendfalg" v-show="scope.row.bendfalg===0?true:false" @click="changeDepSta(scope.$index, scope.row)">已禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button class="el-icon-edit" type="text" size="small" @click="depEdit(scope.$index, scope.row)"></el-button>
            <el-button class="el-icon-close" size="small" type="text" @click.stop="depDel(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增部门 -->
    <el-dialog id="dialog" title="新增部门" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="部门编码" :label-width="formLabelWidth">
          <el-input v-model="form.depCode" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="部门名称" :label-width="formLabelWidth">
          <el-input v-model="form.depName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="费用科目" :label-width="formLabelWidth">
          <!-- <el-select v-model="accountName" placeholder="请选择">
                              <el-option v-for="(item,index) in accountingSubjectList" :key="item.value" :label="item.label" :value="item.value">
                              </el-option>
                            </el-select> -->
          <el-select v-model="value" filterable placeholder="请选择">
            <el-option v-for="item in accountingSubjectList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="adddepartmentData">保 存</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 新增部门 -->

    <!-- 编辑部门 -->
    <el-dialog id="dialog" title="编辑部门" :visible.sync="dialogForm1Visible">
      <el-form :model="form1">
        <el-form-item label="部门名称" :label-width="formLabelWidth">
          <el-input v-model="form1.depName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="费用科目" :label-width="formLabelWidth">
          <el-select v-model="form1.costAccount" filterable placeholder="请选择">
            <el-option v-for="item in accountingSubjectList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门属性" :label-width="formLabelWidth">
          <el-input v-model="form1.depProp" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form1.depPhone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form1.depNote" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="成立日期" :label-width="formLabelWidth">
          <!-- <el-input v-model="form1.depBegindate" auto-complete="off" type="date"></el-input> -->
          <el-date-picker type="date" placeholder="选择日期" v-model="form1.depBegindate" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="撤销日期" :label-width="formLabelWidth">
          <!-- <el-input v-model="form1.depEnddate" auto-complete="off" type="date"></el-input> -->
          <el-date-picker type="date" placeholder="选择日期" v-model="form1.depEnddate" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="部门类型" :label-width="formLabelWidth">
          <el-input v-model="form1.depType" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editTableData">保 存</el-button>
        <el-button @click="dialogForm1Visible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 编辑部门 -->
  </div>
</template>

<script>
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
export default {
  name: 'department',
  data() {
    return {
      ids: '',
      disabled: true,
      depallList: [
        //   {
        //   dsignUid: '',
        //   textname: '',
        //   isdefault: ''
        // }
      ],
      accountingSubjectList: [],
      value: '',
      bendfalg: '',
      accountUid: '',
      dialogFormVisible: false,
      dialogForm1Visible: false,
      formLabelWidth: '100px',
      depCode: '',
      depName: '',
      costAccount: '',
      depProp: '',
      depPhone: '',
      depNote: '',
      depBegindate: '',
      depEnddate: '',
      depType: '',
      costAccount: '',
      form: { depCode: '', depName: '', costAccount: '' },
      form1: { depCode: '', depName: '', costAccount: '', depProp: '', depPhone: '', depNote: '', depBegindate: '', depEnddate: '', depType: '' },
    }
  },
  mounted() {
    this.getAccount('损益类')
    this.getDepartment();
    this.getDepartmentCode()
  },
  methods: {
    getDepartment() {
      let Vue = this;
      Vue.AxiosPost('getDepartment', {
        bookid: Vue.$store.state.accbookUid
      }, function(e) {
        if (e.code === '1') {
          Vue.depallList = e.data.depallList;
        } else if (e.code === '1006') {
          Vue.depallList = [];
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    link(route) {
      this.$router.push({ path: route });
    },

    // 改变数据状态
    changeDepSta(index, row) {
      this.editNowItem = row.depUid;
      var Vue = this;
      Vue.AxiosPost('changeDepSta', {
        uid: this.editNowItem,
      }, function(e) {
        if (e.code === '1') {
          Vue.Message('部门状态修改成功！', 'success');
          Vue.getDepartment();
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //改变数据状态

    // 获取code
    getDepartmentCode() {
      let Vue = this;
      Vue.AxiosPost('getDepartmentCode', {
      }, function(e) {
        if (e.code === '1') {
          Vue.form.depCode = e.data.code
        } else if (e.code === '1006') {
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    // 获取费用科目
    getAccount(name) {
      let Vue = this;
      Vue.AxiosPost('getAccount', {
        accbookUid: Vue.$store.state.accbookUid,
        accountClass: name
      }, function(e) {
        if (e.code === '1') {
          e.data.accountingSubjectList.forEach((n, i) => {
            Vue.accountingSubjectList.push({
              value: n.accountName,
              label: n.accountName,
              name: n.accountName
            })
          })

        } else if (e.code === '1006') {

        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //新增部门数据
    adddepartmentData() {
      var Vue = this;
      Vue.AxiosPost('adddepartmentData', {
        accbookUid: Vue.$store.state.accbookUid,
        depCode: Vue.form.depCode,
        depName: Vue.form.depName,
        costAccount: Vue.value,
      }, function(e) {
        if (e.code === '1') {
          Vue.dialogFormVisible = false;
          Vue.Message('保存成功！', 'success');

          Vue.getDepartment();
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //新增部门数据

    // 删除部门
    tableSelect(selection, row) {
      this.ids = '';
      selection.forEach((n, i) => {
        if (i === 0) {
          this.ids += n.depUid;
        } else {
          this.ids += ',' + n.depUid;
        }
      });
    },
    tableSelectAll(selection) {
      this.ids = '';
      selection.forEach((n, i) => {
        if (i === 0) {
          this.ids += n.depUid;
        } else {
          this.ids += ',' + n.depUid;
        }
      });
    },
    multidel() {
      this.delTableData();
    },

    depDel(index, row) {
      this.ids = row.depUid;
      this.$confirm('此操作将删除该部门, 是否继续?', '提示', {
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
      Vue.AxiosPost('deldepartmentData', {
        ids: Vue.ids
      }, function(e) {
        if (e.code === '1') {
          Vue.getDepartment();
          Vue.Message('删除成功！', 'success');
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
      Vue.ids = [];
    },
    // 删除客户
    // 编辑部门
    depEdit(index, row) {
      this.editNowItem = row.depUid;
      this.form1.depName = row.depName;
      this.form1.costAccount = row.costAccount;
      this.form1.depProp = row.depProp;
      this.form1.depPhone = row.depPhone;
      this.form1.depNote = row.depNote;
      this.form1.depBegindate = row.depBegindate;
      this.form1.depEnddate = row.depEnddate;
      this.form1.depType = row.depType;
      this.dialogForm1Visible = true;
    },
    editTableData() {
      let Vue = this;
      Vue.dialogForm1Visible = false;
      Vue.AxiosPost('editdepartmentData', {
        depUid: Vue.editNowItem,
        accbookUid: Vue.$store.state.accbookUid,
        depName: Vue.form1.depName,
        costAccount: Vue.form1.costAccount,
        depProp: Vue.form1.depProp,
        depPhone: Vue.form1.depPhone,
        depNote: Vue.form1.depNote,
        depBegindate: Vue.form1.depBegindate,
        depEnddate: Vue.form1.depEnddate,
        depType: Vue.form1.depType,
      }, function(e) {
        if (e.code === '1') {
          Vue.getDepartment();
          Vue.Message('修改成功！', 'success');
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });

    },
    // 编辑部门
  }
}
</script>
<style lang="scss" scoped>
#department {
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
