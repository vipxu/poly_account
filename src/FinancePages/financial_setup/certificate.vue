<template>
  <div id="certificate" class="el-card--custom">
    <el-row>
      <h3>凭证字</h3>
      <div class="btnBox">
        <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
      </div>
    </el-row>
    <div>
      <el-table :data="dsignList" border style="width: 100%">
        <el-table-column label="凭证字" align="center" prop="sign">
        </el-table-column>
        <el-table-column label="打印标题" align="center" prop="textName">
        </el-table-column>
        <el-table-column label="是否默认" align="center" prop="isdefault">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button type="text" size="small" class="el-icon-edit" @click="dsignEdit(scope.$index, scope.row)"></el-button>
            <el-button size="small" type="text" class="el-icon-close" @click.stop="absDel(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- //编辑凭证字 -->
    <el-dialog id="dialog" title="编辑凭证字" :visible.sync="dialogForm1Visible">
      <el-form :model="form1">
        <el-form-item label="凭证字" :label-width="formLabelWidth">
          <el-input v-model="form1.sign" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="打印标题" :label-width="formLabelWidth">
          <el-input v-model="form1.textName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否默认" :label-width="formLabelWidth">
          <el-input v-model="form1.isdefault" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editTableData">保 存</el-button>
        <el-button @click="dialogForm1Visible = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 新增凭证字 -->
    <el-dialog id="dialog" title="新增凭证字" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="凭证字" :label-width="formLabelWidth">
          <el-input v-model="form.sign" auto-complete="off" maxlength="1" placeholder="凭证字字符长度为一"></el-input>
        </el-form-item>
        <el-form-item label="打印标题" :label-width="formLabelWidth">
          <el-input v-model="form.textName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否默认" :label-width="formLabelWidth">
          <el-input v-model="form.isdefault" auto-complete="off" type="number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addcertificateData">保 存</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 新增凭证字 -->
  </div>
</template>
<script>
export default {
  name: 'certificate',
  mounted() {
    this.getVoucherWord();
  },
  methods: {
    getVoucherWord() {
      let Vue = this;
      Vue.AxiosPost('getVoucherWord', {
        accbookUid: Vue.$store.state.accbookUid
      }, function(e) {
        if (e.code === '1') {
          // console.log(e.data.digestResult)
          Vue.dsignList = e.data.dsignList;
        } else if (e.code === '1006') {
          Vue.dsignList = [];
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },

    //新增凭证字数据
    addcertificateData() {
      var Vue = this;
      Vue.AxiosPost('addcertificateData', {
        accbookUid: Vue.$store.state.accbookUid,
        sign: Vue.form.sign,
        textName: Vue.form.textName,
        exchangeRate: Vue.form.exchangeRate
      }, function(e) {
        if (e.code === '1') {
          Vue.dialogFormVisible = false;
          Vue.Message('保存成功！', 'success');
          Vue.getVoucherWord();
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //新增凭证字数据

    // 编辑凭证字
    dsignEdit(index, row) {
      this.editNowItem = row.dsignUid;
      this.form1.sign = row.sign;
      this.form1.textName = row.textName;
      this.form1.isdefault = row.isdefault;
      this.dialogForm1Visible = true;
    },
    editTableData() {
      let Vue = this;
      Vue.dialogForm1Visible = false;
      Vue.AxiosPost('editDsignData', {
        dsignUid: Vue.editNowItem,
        sign: Vue.form1.sign,
        textName: Vue.form1.textName,
        isdefault: Vue.form1.isdefault
      }, function(e) {
        if (e.code === '1') {
          Vue.getVoucherWord();
          Vue.Message('修改成功！', 'success');
        } else {
          Vue.Message(e.msg, 'error');
        }
      });

    },
    // 编辑凭证字

    // 删除凭证字
    absDel(index, row) {
      this.$confirm('此操作将删除该凭证字, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delTableData(row.dsignUid);
      }).catch(() => {
        this.Message('已取消删除', 'info');
      });
    },
    delTableData(id) {
      var Vue = this;
      Vue.AxiosPost('delcertificateData', {
        dsignUid: id
      }, function(e) {
        if (e.code === '1') {
          Vue.getVoucherWord();
          Vue.Message('删除成功！', 'success');
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    // 删除凭证字
  },
  link(route) {
    this.$router.push({ path: route });
  },
  data() {
    return {
      dsignList: [
        //   {
        //   dsignUid: '',
        //   textname: '',
        //   isdefault: ''
        // }
      ],
      dialogFormVisible: false,
      dialogForm1Visible: false,
      formLabelWidth: '100px',
      sign: '',
      textName: '',
      isdefault: '',
      form: { sign: '', textName: '', isdefault: '' },
      form1: { sign: '', textName: '', isdefault: '' }
    }
  },
}
</script>
<style lang="scss" scoped>
#certificate {
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


