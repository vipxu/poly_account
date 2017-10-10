<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  font-family: "Microsoft YaHei", monospace, helvetica, arial, sans-serif;
}

html,
body {
  min-width: 800px;
  min-height: 600px;
  width: 100vw;
  height: 100vh;
}

.after:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.before:before {
  content: "";
  display: table;
}

[v-cloak] {
  display: none;
}

//动画
.refreshfade-enter-active,
.refreshfade-leave-active {
  transition: opacity 1s;
}

.refreshfade-enter,
.refreshfade-leave-to {
  opacity: 0;
}

.changefade-enter-active,
.changefade-leave-active {
  transition: opacity .2s;
}

.changefade-enter,
.changefade-leave-to {
  opacity: 0;
}

//动画
//主标题
.fz1 {
  font-size: 20px;
}

//标题
.fz2 {
  font-size: 18px;
}

//小标题
.fz3 {
  font-size: 16px;
}

//正文
.fz4 {
  font-size: 14px;
}

//正文（小）
.fz5 {
  font-size: 13px;
}

//辅助文字
.fz6 {
  font-size: 12px;
}

$primary: rgb(0, 135, 190);
$primary-dark: rgb(0, 120, 165);
//主题背景色
.custom-primary {
  background-color: $primary;
}

//主题边框色
.custom-border-primary {
  border-color: $primary;
}

//主题字体色
.custom-color-primary {
  color: $primary;
}

//自定义卡片
.el-card--custom {
  background-color: rgb(255, 255, 255);
  padding: 24px;
  border: 1px solid rgb(209, 221, 229);
  color: rgb(31, 49, 61);
}

//自定义按钮
.el-button+.el-button {
  margin-left: 0;
}

table {
  .el-button+.el-button {
    margin-left: 10px;
  }
}

//自定义树形控件
.treeBox {
  border: 1px solid rgb(209, 221, 229);
}

.el-tree {
  float: left;
  min-width: 100%;
  @extend .fz5;
  .el-tree-node__label {
    padding-right: 10px;
  }
  .el-tree-node {
    >.el-tree-node__children {
      overflow: visible;
    }
  }
}

.el-autocomplete-suggestion li:active {
  background-color: $primary;
  color: rgb(255, 255, 255);
}

//自定义表格
.el-table {
  border-right: 0;
  border-bottom: 0;
  tbody {
    @extend .fz5;
  }
  .cell,
  th>div {
    padding: 0 8px;
  }
}

//自定义对话框中的表单
.el-dialog {
  .el-form {
    width: 440px;
    .el-select {
      width: 100%;
    }
  }
}
//表格中a连接的样式
.aLinkStyle:hover{
  text-decoration: underline;
  cursor: pointer;
}
</style>

