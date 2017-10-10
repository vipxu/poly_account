<template>
  <div id="Finance">
    <!-- Header -->
    <div id="Header" class="custom-border-primary">
      <Logo></Logo>
    </div>
    <!-- Header end -->
    <!-- Menu -->
    <div id="Menu" class="custom-primary">
      <el-menu :default-active="$route.params.page" class="el-menu-vertical-demo el-menu--custom" unique-opened collapse router>
        <el-submenu v-for="(menuitem, menuindex) in menuList" :key="menuindex" :index="menuitem.name">
          <template slot="title">
            <i :class="menuitem.icon"></i>
            <span slot="title">{{menuitem.text}}</span>
          </template>
          <el-menu-item-group v-for="(groupitem, groupindex) in menuitem.childGroup" :key="groupindex">
            <el-menu-item v-for="(item, index) in groupitem" @click="addTab(item,index)" :key="index" :index="index">{{item.text}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <!-- Menu end -->
    <!-- Content -->
    <div id="Content">
      <el-tabs class="el-tab--custom" v-model="editableTabsValue" type="card" @tab-remove="removeTab">
        <el-tab-pane class="before after" v-for="(item, index) in editableTabs" :closable="index === 0 ? false : true" :key="index" :label="item.title" :name="item.name">
          <transition :name="transitionName">
            <router-view v-if="item.refreshValue" :name="item.menu"></router-view>
          </transition>
        </el-tab-pane>
        <el-tab-pane disabled :name="'0'">
          <template slot="label">
            <el-dropdown trigger="click" menu-align="start" @command="handleCommand">
              <el-button>
                <i class="el-icon-caret-bottom"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="1">关闭全部页面</el-dropdown-item>
                <el-dropdown-item :command="2">关闭当前页面</el-dropdown-item>
                <el-dropdown-item :command="3">刷新当前页面</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- Content end -->
    <link rel="stylesheet" :href="require('@/assets/css/Finance.scss')">
    <link rel="stylesheet" :href="require('@/assets/css/icon.css')">
  </div>
</template>

<script>
import Logo from '@/components/Logo'
import Menu from '@/assets/js/menu.js'

export default {
  name: 'finance',
  components: {
    'Logo': Logo
  },
  data() {
    return {
      //动画
      transitionName: 'refreshfade',
      //动画结束
      // 标签页
      editableTabsValue: '1',
      editableTabs: [{
        title: '首页',
        name: '1',
        menu: 'home',
        refreshValue: true
      }],
      tabIndex: 1,
      // 标签页结束
      //菜单
      menuList: Menu.data
      //菜单结束
    }
  },
  mounted() {
    document.title = '聚账-财务管理系统';
    this.routerUpdate();
  },
  methods: {
    //刷新
    refresh() {
      this.editableTabs.forEach((tab, index) => {
        if (tab.name === this.editableTabsValue) {
          tab.refreshValue = false;
          this.$nextTick(() => {
            tab.refreshValue = true;
          });
        }
      });
    },
    //刷新结束
    //标签页
    addTab(item, index) {
      let tabs = this.editableTabs;
      if (!item.state) {
        let newTabName = ++this.tabIndex + '';
        tabs.push({
          title: item.text,
          name: newTabName,
          menu: index,
          refreshValue: true
        });
        this.editableTabsValue = newTabName;
        item.state = true;
      } else {
        tabs.forEach((tab, tabindex) => {
          if (tab.menu === index) {
            this.editableTabsValue = tab.name;
          }
        });
      }
    },
    removeTab(targetName) {
      this.transitionName = '';
      let tabs = this.editableTabs,
        activeName = this.editableTabsValue,
        removeIndex;
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          removeIndex = index;
          this.menuList.forEach((item, index) => {
            item.childGroup.forEach((item, index) => {
              if (item[tab.menu]) {
                item[tab.menu].state = false;
              }
            });
          });
          if (activeName === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        }
      });
      this.editableTabs.splice(removeIndex, 1);
      this.editableTabsValue = activeName;
      this.$nextTick(() => {
        this.transitionName = 'refreshfade';
      });
    },
    changeTab() {
      this.editableTabs.forEach((tab, index) => {
        if (tab.name === this.editableTabsValue) {
          this.$router.push({ path: tab.menu });
        }
      });
    },
    handleCommand(command) {
      switch (command) {
        case 1:
          this.editableTabs = [this.editableTabs[0]];
          this.menuList.forEach((item, index) => {
            item.childGroup.forEach((item, index) => {
              for (var key in item) {
                item[key].state = false;
              }
            });
          });
          this.editableTabsValue = '1';
          break;
        case 2:
          if (this.editableTabsValue !== '1') {
            this.removeTab(this.editableTabsValue);
          }
          break;
        case 3:
          this.refresh();
          break;
        default:
          break;
      }
    },
    //标签页结束
    //路由
    routerUpdate() {
      //匹配路由打开对应页签
      if (this.routerCheck()) {
        let findpage = true;
        this.menuList.forEach((item, index) => {
          item.childGroup.forEach((item, index) => {
            if (item[this.$route.params.page]) {
              this.addTab(item[this.$route.params.page], this.$route.params.page);
              findpage = false;
            };
          });
        });
        if (findpage) {
          this.$store.state.publicPage.forEach((item, index) => {
            if (item[this.$route.params.page]) {
              this.addTab(item[this.$route.params.page], this.$route.params.page);
            }
          });
        }
      }
    },
    routerCheck() {
      if (!this.$route.params.page || this.$route.params.page === 'home') {
        this.editableTabsValue = '1';
        return false;
      } else if (this.$route.params.page === '1-3') {
        if (this.$store.state.voucherUid === '') {
          this.$router.push({ path: '1-1' });
        }
        return true;
      } else {
        return true;
      }
    }
    //路由结束
  },
  watch: {
    "$route": "routerUpdate",
    "editableTabsValue": "changeTab"
  }
}
</script>
