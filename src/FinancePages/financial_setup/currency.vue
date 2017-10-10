
<template>
  <div id="currency" class="el-card--custom">
    <el-row>
      <h3>币别</h3>
      <div class="btnBox">
        <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
      </div>
    </el-row>
    <div>
      <el-table :data="currencyList" border style="width: 100%" resizable>
        <el-table-column label="编码" align="center" prop="currencyCode">
        </el-table-column>
        <el-table-column label="名称" align="center" prop="currencyName">
        </el-table-column>
        <el-table-column label="汇率" align="center" prop="exchangeRate">
        </el-table-column>
        <el-table-column label="是否本位币" align="center" prop="homeCurrency">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button class="el-icon-edit" type="text" size="small" @click="curEdit(scope.$index, scope.row)">
            </el-button>
            <el-button class="el-icon-close" size="small" type="text" @click.stop="curDel(scope.$index, scope.row)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- //编辑币别 -->
    <el-dialog id="dialog" title="编辑币别" :visible.sync="dialogForm1Visible">
      <el-form :model="form1">
        <el-form-item label="编码" :label-width="formLabelWidth">
          <el-input v-model="form1.currencyCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="币别" :label-width="formLabelWidth">
          <el-input v-model="form1.currencyName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="汇率" :label-width="formLabelWidth">
          <el-input v-model="form1.exchangeRate" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editTableData">保 存</el-button>
        <el-button @click="dialogForm1Visible = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- //新增币别 -->
    <el-dialog id="dialog" title="新增币别" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="编码" :label-width="formLabelWidth">
          <el-input v-model="form.currencyCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="币别" :label-width="formLabelWidth">
          <el-input v-model="form.currencyName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="汇率" :label-width="formLabelWidth">
          <el-input v-model="form.exchangeRate" auto-complete="off" type="number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addCurrencyData">保 存</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'currency',
  mounted() {
    this.getCurrency();
  },
  methods: {
    // 获取币别列表
    getCurrency() {
      let Vue = this;
      Vue.AxiosPost('getCurrency', {
        accbookUid: Vue.$store.state.accbookUid
      }, function(e) {
        if (e.code === '1') {
          // console.log(e.data.digestResult)
          Vue.currencyList = e.data.currencyList;
        } else if (e.code === '1006') {
          Vue.currencyList = [];
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    // 获取币别列表


    //新增币别数据
    addCurrencyData() {
      let Vue = this;
      Vue.AxiosPost('addCurrencyData', {
        accbookUid: Vue.$store.state.accbookUid,
        currencyCode: Vue.form.currencyCode,
        currencyName: Vue.form.currencyName,
        exchangeRate: Vue.form.exchangeRate
      }, function(e) {
        if (e.code === '1') {
          Vue.dialogFormVisible = false;
          Vue.Message('保存成功！', 'success');
          Vue.getCurrency();
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //新增币别数据

    // 删除币别
    curDel(index, row) {
      this.$confirm('此操作将删除该币别, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delTableData(row.currencyUid);
      }).catch(() => {
        this.Message('已取消删除', 'info');
      });
    },
    delTableData(id) {
      let Vue = this;
      Vue.AxiosPost('delCurrencyData', {
        currencyUid: id
      }, function(e) {
        if (e.code === '1') {
          Vue.getCurrency();
          Vue.Message('删除成功！', 'success');
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    // 删除币别

    // 编辑币别
    curEdit(index, row) {
      this.editNowItem = row.currencyUid;
      this.form1.currencyCode = row.currencyCode;
      this.form1.currencyName = row.currencyName;
      this.form1.exchangeRate = row.exchangeRate;
      this.dialogForm1Visible = true;
    },
    editTableData() {
      let Vue = this;
      Vue.dialogForm1Visible = false;
      Vue.AxiosPost('editCurrencyData', {
        currencyUid: Vue.editNowItem,
        currencyCode: Vue.form1.currencyCode,
        currencyName: Vue.form1.currencyName,
        exchangeRate: Vue.form1.exchangeRate
      }, function(e) {
        if (e.code === '1') {
          Vue.getCurrency();
          Vue.Message('修改成功！', 'success');
        } else {
          Vue.Message(e.msg, 'error');
        }
      });

    },
    // 编辑币别

  },
  data() {
    return {
      currencyList: [
        //   {
        //   dsignUid: '',
        //   textname: '',
        //   isdefault: ''
        // }
      ],
      editNowItem: '',
      dialogFormVisible: false,
      dialogForm1Visible: false,
      formLabelWidth: '100px',
      currencyCode: '',
      currencyName: '',
      exchangeRate: '',
      homeCurrency: '',
      form: { currencyCode: '', currencyName: '', exchangeRate: '', homeCurrency: '' },
      form1: { currencyCode: '', currencyName: '', exchangeRate: '', homeCurrency: '' }
    }
  },
}
</script>

<style lang="scss" scoped>
#currency {
  .el-row {
    margin-bottom: 15px;
    line-height: 36px;
    h3 {
      float: left;
    }
    .btnBox {
      float: right;
    }
  }
}
</style>

