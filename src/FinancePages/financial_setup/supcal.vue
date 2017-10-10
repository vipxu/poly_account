<template>
  <div id="supcal" class="el-card--custom">
    <el-row>
      <h3>辅助核算</h3>
    </el-row>
    <ul class="after">
      <li v-for="(item,index) in lidata" :key="index" @click="link(item.link)">
        <span :class="item.icon"></span>
        <p class="fz4 custom-color-primary" v-text="item.txt"></p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'supcal',
  data() {
    return {
      lidata: [{
        icon: 'png-supcal-1',
        link: '10-1',
        txt: "客户"
      }, {
        icon: 'png-supcal-2',
        link: '10-2',
        txt: "供应商"
      }, {
        icon: 'png-supcal-3',
        link: '10-3',
        txt: "职员"
      }, {
        icon: 'png-supcal-4',
        link: '10-4',
        txt: "项目"
      }, {
        icon: 'png-supcal-5',
        link: '10-5',
        txt: "部门"
      }, {
        icon: 'png-supcal-6',
        link: '10-6',
        txt: "存货"
      }, {
        icon: 'png-supcal-7',
        link: '10-7',
        txt: "投资单位"
      }, {
        icon: 'png-supcal-8',
        link: '10-8',
        txt: "被投资单位"
      }, {
        icon: 'png-supcal-9',
        link: '10-9',
        txt: "资金账户"
      }],
    }
  },
  methods: {
    open() {
      this.$prompt('请输入名称', '新增分类', {
        cancelButtonText: '关闭',
        confirmButtonText: '保存'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '名称: ' + value
        });
      }).catch(() => {
        
      });
    },
    link(route) {
      this.$router.push({ path: route });
    }
  }
}
</script>
<style lang="scss" scoped>
#supcal {
  .el-row {
    margin-bottom: 15px;
  }
  min-width: 1000px;
  ul {
    border-top: 1px dashed rgb(209, 221, 229);
    border-left: 1px dashed rgb(209, 221, 229);
    li {
      display: block;
      float: left;
      width: 25%;
      text-align: center;
      padding: 60px 0;
      background-color: rgb(255, 255, 255);
      border-right: 1px dashed rgb(209, 221, 229);
      border-bottom: 1px dashed rgb(209, 221, 229);
      box-sizing: border-box;
      &:hover {
        cursor: pointer;
        background-color: rgb(244, 244, 244);
      }
      span {
        display: inline-block;
        width: 60px;
        height: 60px;
      }
    }
  }
}
</style>
