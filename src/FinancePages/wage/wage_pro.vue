<!-- 工资项目 -->
<template>
    <div id="wagePro">
        <div class="wagePro-top">
            <el-input placeholder="请输入工资项目名称" v-model="waitemName" size="small" class="add-input"></el-input>
            <div class="add-btn">
                <el-button type="primary" size="small" @click="addSalaryItem()">新增</el-button>
            </div>
        </div>
        <div class="wagePro-content">
            <template>
                <el-table :data="tableData" stripe border style="width: 100%">
                    <el-table-column type="index" width="50">
                    </el-table-column>
                    <el-table-column property="waitemName" label="工资项目" width="300" align="center">
                    </el-table-column>
                    <el-table-column label="状态" width="120" align="center">
                        <template scope="scope">
                            <el-button :class="{ 'startUse': scope.row.bendfalg==0?true:false, 'stopUse':scope.row.bendfalg==1?true:false}" size="small" @click="changeState(scope.$index,tableData)" v-text="scope.row.bendfalg==0?'已启用':'未启用'" :disabled="scope.row.bdelete==0?true:false"></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100" align="center">
                        <template scope="scope">
                            <el-button type="text" size="small" v-show="scope.row.bdelete==0?false:true"  @click.native.prevent="delIndexWage(scope.$index, tableData)">
                                <i class="el-icon-close"></i>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    name: 'change',
    data() {
        return {
            //新增工资名称
            waitemName: '',
            //启用状态
            tableData: []

        }
    },
    mounted() {
        this.selectSalaryItem();
    },
    methods: {
        //根据会计年度查询所有的工资项目
        selectSalaryItem() {
            let Vue = this;
            Vue.AxiosPost('selectYpSalaryItem', {
                ayearuid: this.$store.state.ayearUid,
            }, function(e) {
                if (e.code === '1') {
                    e.data.queryList.forEach((n, i) => {
                        Vue.tableData.push({
                            waitemName: n.waitemName,//名字
                            waitemUid: n.waitemUid,//uid
                            bendfalg: n.bendfalg,//是否停用
                            bdelete:n.bdelete//是否能删除
                        })
                    })
                    Vue.tableData = e.data.queryList;
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //新增工资项目信息
        addSalaryItem() {
            let Vue = this;
            Vue.AxiosPost('addYpSalaryItem', {
                ayearUid: this.$store.state.ayearUid,
                waitemName: Vue.waitemName
            }, function(e) {
                if (e.code === '1') {
                    Vue.Message('添加工资项目成功！', 'success');
                    Vue.waitemName='';
                    Vue.selectSalaryItem();
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //改变启用状态
        changeState(index, rows) {
            let Vue = this;
            //停用工资项目
            if (rows[index].bendfalg == 0) {
                Vue.AxiosPost('updateYpSalaryItemTy', {
                    uid: rows[index].waitemUid,
                }, function(e) {
                    if (e.code === '1') {
                        Vue.Message('停用工资项目成功', 'success');
                        Vue.selectSalaryItem();
                    } else {
                        Vue.Message(e.msg, 'error');
                    }
                });
            } else {
                //启用工资项目
                Vue.AxiosPost('updateYpSalaryItemQy', {
                    uid: rows[index].waitemUid,
                }, function(e) {
                    if (e.code === '1') {
                        Vue.Message('启用工资项目成功', 'success');
                        Vue.selectSalaryItem();
                    } else {
                        Vue.Message(e.msg, 'error');
                    }
                });
            }
        },
        //删除工资
        delIndexWage(index, rows) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let Vue = this;
                Vue.AxiosPost('deleteYpSalaryItem', {
                    uid: rows[index].waitemUid,
                }, function(e) {
                    if (e.code === '1') {
                        Vue.Message('删除成功！', 'success');
                        Vue.selectSalaryItem();
                    } else {
                        Vue.Message(e.msg, 'error');
                    }
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    }
}
</script>
<style lang='scss'>
#wagePro {
    .wagePro-top {
        color: #555;
        width: 100%;
        height: 45px;
        .add-input {
            width: 250px;
            margin-right: 20px;
            float: left;
        }
        .add-btn {
            float: left;
        }
    }
    .wagePro-content .cell {
        .startUse {
            color: #fff;
            border: none;
            background-color: rgb(51, 159, 203);
            &:hover {
                background: rgb(51, 159, 203);
                border: none;
                color: #fff;
            }
        }
        .stopUse {
            color: #fff;
            border: none;
            background-color: #aaa;
            &:hover {
                background: #aaa;
                border: none;
                color: #fff;
            }
        }
    }
}
</style>