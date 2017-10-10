<template>
  <el-table :data="data" border style="width: 100%" :row-style="showTr" stripe>
    <el-table-column :label="columns[0].text" width="115">
      <template scope="scope">
        <span v-show="spaceIconShow(0)" v-for="(space, levelIndex) in scope.row._level" class="ms-tree-space" :key="space"></span>
        <el-button type="text" size="mini" v-if="toggleIconShow(0,scope.row)" @click="toggle(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-arrow-right" aria-hidden="true"></i>
          <i v-if="scope.row._expanded" class="el-icon-arrow-down" aria-hidden="true"></i>
        </el-button>
        <span class="aLinkStyle" v-text="scope.row[columns[0].dataIndex]" @click="getCode(scope.row[columns[0].dataIndex],periodData.periodStart,periodData.periodEnd,scope.row[columns[1].dataIndex])"></span>
      </template>
    </el-table-column>
    <el-table-column :label="columns[1].text" width="205">
      <template scope="scope">
        <span v-text="scope.row[columns[1].dataIndex]"></span>
      </template>
    </el-table-column>
    <el-table-column label="期初余额" header-align="center" width="420">
      <el-table-column :label="columns[2].text" header-align="center" align="right" width="105">
        <template scope="scope">
          <p v-text="scope.row[columns[2].dataIndex]=='0'?'':moneyChange.outputmoney(scope.row[columns[2].dataIndex])"></p>
        </template>
      </el-table-column>
      <el-table-column :label="columns[3].text" header-align="center" align="right" width="105">
        <template scope="scope">
          <p v-text="scope.row[columns[3].dataIndex]=='0'?'':moneyChange.outputmoney(scope.row[columns[3].dataIndex])"></p>
        </template>
      </el-table-column>
      <el-table-column :label="columns[4].text" header-align="center" align="right" width="105">
        <template scope="scope">
          <p v-text="scope.row[columns[4].dataIndex]=='0'?'':moneyChange.outputmoney(scope.row[columns[4].dataIndex])"></p>
        </template>
      </el-table-column>
      <el-table-column :label="columns[5].text" header-align="center" align="right" width="105">
        <template scope="scope">
          <p v-text="scope.row[columns[5].dataIndex]=='0'?'':moneyChange.outputmoney(scope.row[columns[5].dataIndex])"></p>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column label="本期发生额" header-align="center" width="420">
      <el-table-column :label="columns[6].text" header-align="center" align="right" width="105">
        <template scope="scope">
          <p v-text="scope.row[columns[6].dataIndex]=='0'?'':moneyChange.outputmoney(scope.row[columns[6].dataIndex])"></p>
        </template>
      </el-table-column>
      <el-table-column :label="columns[7].text" header-align="center" align="right" width="105">
        <template scope="scope">
          <p v-text="scope.row[columns[7].dataIndex]=='0'?'':moneyChange.outputmoney(scope.row[columns[7].dataIndex])"></p>
        </template>
      </el-table-column>
      <el-table-column :label="columns[8].text" header-align="center" align="right" width="105">
        <template scope="scope">
          <p v-text="scope.row[columns[8].dataIndex]=='0'?'':moneyChange.outputmoney(scope.row[columns[8].dataIndex])"></p>
        </template>
      </el-table-column>
      <el-table-column :label="columns[9].text" header-align="center" align="right" width="105">
        <template scope="scope">
          <p v-text="scope.row[columns[9].dataIndex]=='0'?'':moneyChange.outputmoney(scope.row[columns[9].dataIndex])"></p>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column label="本年累计发生额" header-align="center" width="420">
      <el-table-column :label="columns[10].text" header-align="center" align="right" width="105">
        <template scope="scope">
          <p v-text="scope.row[columns[10].dataIndex]=='0'?'':moneyChange.outputmoney(scope.row[columns[10].dataIndex])"></p>
        </template>
      </el-table-column>
      <el-table-column :label="columns[11].text" header-align="center" align="right" width="105">
        <template scope="scope">
          <p v-text="scope.row[columns[11].dataIndex]=='0'?'':moneyChange.outputmoney(scope.row[columns[11].dataIndex])"></p>
        </template>
      </el-table-column>
      <el-table-column :label="columns[12].text" header-align="center" align="right" width="105">
        <template scope="scope">
          <p v-text="scope.row[columns[12].dataIndex]=='0'?'':moneyChange.outputmoney(scope.row[columns[12].dataIndex])"></p>
        </template>
      </el-table-column>
      <el-table-column :label="columns[13].text" header-align="center" align="right" width="105">
        <template scope="scope">
          <p v-text="scope.row[columns[13].dataIndex]=='0'?'':moneyChange.outputmoney(scope.row[columns[13].dataIndex])"></p>
        </template>
      </el-table-column>
    </el-table-column>
    <el-table-column label="期末余额" header-align="center" width="420">
      <el-table-column :label="columns[14].text" header-align="center" align="right" width="105">
        <template scope="scope">
          <p v-text="scope.row[columns[14].dataIndex]=='0'?'':moneyChange.outputmoney(scope.row[columns[14].dataIndex])"></p>
        </template>
      </el-table-column>
      <el-table-column :label="columns[15].text" header-align="center" align="right" width="105">
        <template scope="scope">
          <p v-text="scope.row[columns[15].dataIndex]=='0'?'':moneyChange.outputmoney(scope.row[columns[15].dataIndex])"></p>
        </template>
      </el-table-column>
      <el-table-column :label="columns[16].text" header-align="center" align="right" width="105">
        <template scope="scope">
          <p v-text="scope.row[columns[16].dataIndex]=='0'?'':moneyChange.outputmoney(scope.row[columns[16].dataIndex])"></p>
        </template>
      </el-table-column>
      <el-table-column :label="columns[17].text" header-align="center" align="right" width="105">
        <template scope="scope">
          <p v-text="scope.row[columns[17].dataIndex]=='0'?'':moneyChange.outputmoney(scope.row[columns[17].dataIndex])"></p>
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>
</template>
<script>
import Utils from '@/assets/js/dataTranslate.js'
export default {
  name: 'tree-grid',
  props: {
    //接收父组建传过来的会计期间
    periodData:{},
    // 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
    treeStructure: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    // 这是相应的字段展示
    columns: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 这是数据源
    dataSource: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 这个作用是根据自己需求来的，比如在操作中涉及相关按钮编辑，删除等，需要向服务端发送请求，则可以把url传过来
    requestUrl: {
      type: String,
      default: function() {
        return ''
      }
    },
    // 这个是是否展示操作列
    treeType: {
      type: String,
      default: function() {
        return 'normal'
      }
    },
    // 是否默认展开所有树
    defaultExpandAll: {
      type: Boolean,
      default: function() {
        return false
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    // 格式化数据源
    data: function() {
      let me = this
      if (me.treeStructure) {
        let data = Utils.treeToArray(me.dataSource, null, null, me.defaultExpandAll)
        // console.log(data)
        return data
      }
      return me.dataSource
    }
  },
  methods: {
    //跳转
    getCode(a, b, c, d) {
      //会计期间
      this.$store.state.itemizedForm.accountantBegin = b;
      this.$store.state.itemizedForm.accountantEnd = c;
      //科目和名称
      let data = {
        Code: a,
        name: d
      }
      this.$store.commit('getSubjectVal', data);
      this.$router.push({ path: '4-2' });
    },
    // 显示行
    showTr: function(row, index) {
      let show = (row._parent ? (row._parent._expanded && row._parent._show) : true)
      row._show = show
      return show ? '' : 'display:none;'
    },
    // 展开下级
    toggle: function(trIndex) {
      let me = this
      let record = me.data[trIndex]
      record._expanded = !record._expanded
    },
    // 显示层级关系的空格和图标
    spaceIconShow(index) {
      let me = this
      if (me.treeStructure && index === 0) {
        return true
      }
      return false
    },
    // 点击展开和关闭的时候，图标的切换
    toggleIconShow(index, record) {
      let me = this
      if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
        return true
      }
      return false
    }
  }
}
</script>
<style scoped>
.ms-tree-space {
  position: relative;
  top: 1px;
  display: inline-block;
  font-family: 'Glyphicons Halflings';
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  width: 18px;
  height: 14px;
}

.ms-tree-space::before {
  content: ""
}

table td {
  line-height: 26px;
}
</style>