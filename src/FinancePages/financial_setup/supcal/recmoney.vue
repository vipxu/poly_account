<template>
  <div id="recmoney" class="el-card--custom">
    <el-row>
      <el-button-group>
        <el-button @click="link('10-1')">客户</el-button>
        <el-button @click="link('10-2')">供应商</el-button>
        <el-button @click="link('10-3')">职员</el-button>
        <el-button @click="link('10-4')">项目</el-button>
        <el-button @click="link('10-5')">部门</el-button>
        <el-button @click="link('10-6')">存货</el-button>
        <el-button @click="link('10-7')">投资单位</el-button>
        <el-button type="primary" @click="link('10-8')">被投资单位</el-button>
        <el-button @click="link('10-9')">资金账户</el-button>
      </el-button-group>
      <div class="btnBox">
        <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
        <el-button type="primary" @click="multidel">批量删除</el-button>
      </div>
    </el-row>
    <div>
      <el-table :data="ieeallList" border style="width: 100%" @select="tableSelect" @select-all="tableSelectAll">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column header-align="center" align="left" prop="investeeCode" label="编码">
        </el-table-column>
        <el-table-column header-align="center" align="left" prop="investeeName" label="名称">
        </el-table-column>
        <el-table-column align="center" prop="abbr" label="简称">
        </el-table-column>
        <el-table-column align="center" prop="investeeType" label="性质">
        </el-table-column>
        <el-table-column align="center" prop="addressBusiness" label="主要经营地">
        </el-table-column>
        <el-table-column align="center" prop="addressRegister" label="注册地">
        </el-table-column>
        <el-table-column align="center" prop="businessProperty" label="业务性质">
        </el-table-column>
        <el-table-column align="center" prop="holdingrate" label="持股比例">
        </el-table-column>
        <el-table-column align="center" prop="gainingMethod" label="取得方式">
        </el-table-column>
        <el-table-column align="center" prop="scope.row.bendfalg" label="状态">
          <template scope="scope">
            <el-button type="info" size="mini" align="right" v-model="scope.row.bendfalg" v-show="scope.row.bendfalg===0?true:false" @click="changeInvesteeSta(scope.$index, scope.row)">已启用</el-button>
            <el-button size="mini" align="right" v-model="scope.row.bendfalg" v-show="scope.row.bendfalg===1?true:false" @click="changeInvesteeSta(scope.$index, scope.row)">已禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button class="el-icon-edit" type="text" size="small" @click="recEdit(scope.$index, scope.row)"></el-button>
            <el-button class="el-icon-close" size="small" type="text" @click.stop="recDel(scope.$index, scope.row)"></el-button>
          </template>
        </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增被投资单位数据 -->
    <el-dialog id="dialog" title="新增被投资单位" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="单位编码" :label-width="formLabelWidth">
          <el-input v-model="form.investeeCode" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="单位名称" :label-width="formLabelWidth">
          <el-input v-model="form.investeeName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="简称" :label-width="formLabelWidth">
          <el-input v-model="form.abbr" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性质" :label-width="formLabelWidth">
          <el-input v-model="form.investeeType" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="主要经营地" :label-width="formLabelWidth">
          <el-input v-model="form.addressBusiness" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="注册地" :label-width="formLabelWidth">
          <el-input v-model="form.addressRegister" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="业务性质" :label-width="formLabelWidth">
          <el-input v-model="form.businessProperty" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="持股比例" :label-width="formLabelWidth">
          <el-input v-model="form.holdingrate" auto-complete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item label="取得方式" :label-width="formLabelWidth">
          <el-input v-model="form.gainingMethod" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addInvesteeData">保 存</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 新增被投资单位数据 -->

    <!-- 编辑被投资单位数据 -->
    <el-dialog id="dialog" title="编辑被投资单位" :visible.sync="dialogForm1Visible">
      <el-form :model="form1">
        <el-form-item label="单位名称" :label-width="formLabelWidth">
          <el-input v-model="form1.investeeName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="简称" :label-width="formLabelWidth">
          <el-input v-model="form1.abbr" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性质" :label-width="formLabelWidth">
          <el-input v-model="form1.investeeType" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="主要经营地" :label-width="formLabelWidth">
          <el-input v-model="form1.addressBusiness" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="注册地" :label-width="formLabelWidth">
          <el-input v-model="form1.addressRegister" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="业务性质" :label-width="formLabelWidth">
          <el-input v-model="form1.businessProperty" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="持股比例" :label-width="formLabelWidth">
          <el-input v-model="form1.holdingrate" auto-complete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item label="取得方式" :label-width="formLabelWidth">
          <el-input v-model="form1.gainingMethod" auto-complete="off" required="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editTableData">保 存</el-button>
        <el-button @click="dialogForm1Visible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 编辑被投资单位数据 -->
  </div>
</template>

<script>
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
export default {
  name: 'recmoney',
  data() {
    return {
      ids: '',
      disabled: '',
      ieeallList: [
        //   {
        //   dsignUid: '',
        //   textname: '',
        //   isdefault: ''
        // }
      ],
      dialogFormVisible: false,
      dialogForm1Visible: false,
      formLabelWidth: '100px',
      investeeCode: '',
      investeeName: '',
      abbr: '',
      investeeType: '',
      addressBusiness: '',
      addressRegister: '',
      businessProperty: '',
      holdingrate: '',
      gainingMethod: '',
      bendfalg: '',
      form: { investeeCode: '', investeeName: '', abbr: '', investeeType: '', addressBusiness: '', addressRegister: '', businessProperty: '', holdingrate: '', gainingMethod: '' },
      form1: { investeeCode: '', investeeName: '', abbr: '', investeeType: '', addressBusiness: '', addressRegister: '', businessProperty: '', holdingrate: '', gainingMethod: '' }
    }
  },
  mounted() {
    this.getIeeallList();
    this.getInvesteeCode()
  },
  methods: {
    getIeeallList() {
      let Vue = this;
      Vue.AxiosPost('getIeeallList', {
        bookid: Vue.$store.state.accbookUid
      }, function(e) {
        if (e.code === '1') {
          Vue.ieeallList = e.data.ieeallList;
        } else if (e.code === '1006') {
          Vue.ieeallList = [];
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    link(route) {
      this.$router.push({ path: route });
    },

    // 改变数据状态
    changeInvesteeSta(index, row) {
      this.editNowItem = row.investeeUid;
      var Vue = this;
      Vue.AxiosPost('changeInvesteeSta', {
        uid: this.editNowItem,
      }, function(e) {
        if (e.code === '1') {
          Vue.Message('被投资单位状态修改成功！', 'success');
          Vue.getIeeallList();
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //改变数据状态
    // 获取code
    getInvesteeCode() {
      let Vue = this;
      Vue.AxiosPost('getInvesteeCode', {
      }, function(e) {
        if (e.code === '1') {
          Vue.form.investeeCode = e.data.code
        } else if (e.code === '1006') {
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //新增被投资单位数据
    addInvesteeData() {
      var Vue = this;
      Vue.AxiosPost('addInvesteeData', {
        accbookUid: Vue.$store.state.accbookUid,
        investeeCode: Vue.form.investeeCode,
        investeeName: Vue.form.investeeName,
        abbr: Vue.form.abbr,
        investeeType: Vue.form.investeeType,
        holdingrate: Vue.form.holdingrate,
        addressBusiness: Vue.form.addressBusiness,
        addressRegister: Vue.form.addressRegister,
        businessProperty: Vue.form.businessProperty,
        gainingMethod: Vue.form.gainingMethod
      }, function(e) {
        if (e.code === '1') {
          Vue.Message('保存成功！', 'success');
          Vue.dialogFormVisible = false;
          Vue.getIeeallList();
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
    },
    //新增被投资单位数据

    // 删除存货
    tableSelect(selection, row) {
      this.ids = '';
      selection.forEach((n, i) => {
        if (i === 0) {
          this.ids += n.investeeUid;
        } else {
          this.ids += ',' + n.investeeUid;
        }
      });
    },
    tableSelectAll(selection) {
      this.ids = '';
      selection.forEach((n, i) => {
        if (i === 0) {
          this.ids += n.investeeUid;
        } else {
          this.ids += ',' + n.investeeUid;
        }
      });
    },
    multidel() {
      this.delTableData();
    },

    // 删除被投资单位
    recDel(index, row) {
      this.ids = row.investeeUid;
      this.$confirm('此操作将删除该被投资人, 是否继续?', '提示', {
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
      Vue.AxiosPost('delinvesteeData', {
        ids: Vue.ids
      }, function(e) {
        if (e.code === '1') {
          Vue.getIeeallList();
          Vue.Message('删除成功！', 'success');
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });
      Vue.ids = [];
    },
    // 删除被投资单位

    // 编辑被投资单位
    recEdit(index, row) {
      this.editNowItem = row.investeeUid;
      this.form1.investeeName = row.investeeName;
      this.form1.abbr = row.abbr;
      this.form1.investeeType = row.investeeType;
      this.form1.addressBusiness = row.addressBusiness;
      this.form1.addressRegister = row.addressRegister;
      this.form1.businessProperty = row.businessProperty;
      this.form1.holdingrate = row.holdingrate;
      this.form1.gainingMethod = row.gainingMethod;
      this.dialogForm1Visible = true;
    },
    editTableData() {
      let Vue = this;
      Vue.dialogForm1Visible = false;
      Vue.AxiosPost('editRecData', {
        accbookUid: Vue.$store.state.accbookUid,
        investeeUid: Vue.editNowItem,
        investeeName: Vue.form1.investeeName,
        abbr: Vue.form1.abbr,
        investeeType: Vue.form1.investeeType,
        addressBusiness: Vue.form1.addressBusiness,
        addressRegister: Vue.form1.addressRegister,
        businessProperty: Vue.form1.businessProperty,
        holdingrate: Vue.form1.holdingrate,
        gainingMethod: Vue.form1.gainingMethod,
      }, function(e) {
        if (e.code === '1') {
          Vue.getIeeallList();
          Vue.Message('修改成功！', 'success');
          Vue.getAccountingList();//更新辅助核算
        } else {
          Vue.Message(e.msg, 'error');
        }
      });

    },
    // 编辑被投资单位
  }

}
</script>
<style lang="scss" scoped>
#recmoney {
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
