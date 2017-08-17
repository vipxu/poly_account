<template>
  <div id="app">
    <!--Header-->
    <div id="Header" class="custom-border-primary">
      <div class="logo">
        <img src="./assets/img/logo.png" />
      </div>
    </div>
    <!--Header end-->
    <!--Menu-->
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
    <!--Menu end-->
    <!--Content-->
    <div id="Content">
      <el-tabs class="el-tab--custom" v-model="editableTabsValue" type="card" @tab-remove="removeTab">
        <el-tab-pane class="before after" v-for="(item, index) in editableTabs" :closable="index === 0 ? false : true" :key="index" :label="item.title" :name="item.name">
          <transition :name="transitionName" mode="in-out">
            <router-view v-if="item.refreshValue" :name="item.menu" keep-alive></router-view>
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
    <!--Content end-->
  </div>
</template>

<script>
export default {
  name: 'app',
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
      menuList: [
        {
          name: '1',
          text: '凭证',
          icon: 'el-icon--custom png2 png2-1',
          childGroup: [{
            '1-1': {
              text: '录凭证'
            }, '1-2': {
              text: '原始凭证'
            }, '1-3': {
              text: '查凭证'
            }, '1-4': {
              text: '导入凭证'
            }
          }]
        }, {
          name: '2',
          text: '账簿',
          icon: 'el-icon--custom png2 png2-2',
          childGroup: [{
            '2-1': {
              text: '总账'
            }, '2-2': {
              text: '明细账'
            }, '2-3': {
              text: '凭证汇总表'
            }, '2-4': {
              text: '科目余额表'
            }, '2-5': {
              text: '多栏账'
            }
          }, {
            '2-6': {
              text: '核算项目余额表'
            }, '2-7': {
              text: '核算项目明细账'
            }, '2-8': {
              text: '金额数量总账'
            }, '2-9': {
              text: '金额数量细账'
            }
          }]
        }, {
          name: '3',
          text: '报表',
          icon: 'el-icon--custom png2 png2-3',
          childGroup: [{
            '3-1': {
              text: '资产负债表'
            }, '3-2': {
              text: '利润表'
            }, '3-3': {
              text: '现金流量表'
            }, '3-4': {
              text: '主要应交税金明细表'
            }, '3-5': {
              text: '增值税申报表(一般)'
            }
          }, {
            '3-6': {
              text: '增值税申报表(个人)'
            }, '3-7': {
              text: '增值税申报表'
            }, '3-8': {
              text: '所得税季报'
            }, '3-9': {
              text: '自查清单'
            }
          }]
        }, {
          name: '4',
          text: '工资管理',
          icon: 'el-icon--custom png2 png2-4',
          childGroup: [{
            '4-1': {
              text: '工资项目'
            }, '4-2': {
              text: '个税设置'
            }, '4-3': {
              text: '工资表'
            }, '4-4': {
              text: '工资汇总表'
            }
          }]
        }, {
          name: '5',
          text: '固定资产管理',
          icon: 'el-icon--custom png2 png2-5',
          childGroup: [{
            '5-1': {
              text: '固定资产类别'
            }, '5-2': {
              text: '增减方式设置'
            }, '5-3': {
              text: '固定资产卡片'
            }, '5-4': {
              text: '固定资产卡片减少'
            }, '5-5': {
              text: '固定资产变动'
            }, '5-6': {
              text: '计提折旧'
            }
          }]
        }, {
          name: '6',
          text: '财务设置',
          icon: 'el-icon--custom png2 png2-6',
          childGroup: [{
            '6-1': {
              text: '凭证字'
            }, '6-2': {
              text: '科目'
            }, '6-3': {
              text: '币别'
            }, '6-4': {
              text: '基础数据'
            }, '6-5': {
              text: '辅助核算'
            }, '6-6': {
              text: '录入期初余额'
            }
          }, {
            '6-7': {
              text: '期末结账'
            }, '6-8': {
              text: '凭证规格'
            }, '6-9': {
              text: '凭证模板'
            }, '6-10': {
              text: '套打模板'
            }, '6-11': {
              text: '操作日志'
            }
          }]
        }
      ]
      //菜单结束
    }
  },
  mounted() {
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
    //刷新
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
              for(var key in item){
                item[key].state = false;
              }
            });
          });
          this.editableTabsValue = '1';
          break;
        case 2:
          this.removeTab(this.editableTabsValue);
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
      if (!this.$route.params.page || this.$route.params.page === 'home') {
        this.editableTabsValue = '1';
      } else {
        this.menuList.forEach((item, index) => {
          item.childGroup.forEach((item, index) => {
            if (item[this.$route.params.page]) {
              this.addTab(item[this.$route.params.page], this.$route.params.page);
            };
          });
        });
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
