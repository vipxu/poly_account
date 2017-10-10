<!-- 固定资产卡片减少 -->
<template>
    <div id="decrease">
        <!-- 头开始 -->
        <div class="decrease-top">
            <div class="decrease-top-left">
                <span class="fz4 decrease-span">固定资产卡片减少</span>
            </div>
            <div class="decrease-top-right">
                <el-button type="primary" size="small" @click="addDialog = true">新 增</el-button>
            </div>
        </div>
        <!-- 头结束 -->
        <!-- table开始 -->
        <div class="el-card--custom">
            <template>
                <el-table :data="reduce" border style="width: 100%" height="400">
                    <el-table-column fixed label="操作" width="100" align="center">
                        <template scope="scope">
                            <el-button type="text" size="small" @click.native.prevent="checkmod(scope.$index, reduce)">
                                <i class="el-icon-edit"></i>
                            </el-button>&nbsp;&nbsp;
                            <el-button type="text" size="small" @click.native.prevent="deldecrease(scope.$index, reduce)">
                                <i class="el-icon-close"></i>
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="fixassetsCode" label="资产编号" width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="fixassetsName" label="资产名称" width="200" align="center">
                    </el-table-column>
                    <el-table-column prop="reduceWay" label="减少方式" width="200" align="center">
                    </el-table-column>
                    <el-table-column prop="cleanIncome" label="清理收入" width="200" align="center">
                    </el-table-column>
                    <el-table-column prop="cleanCost" label="清理费用" width="200" align="center">
                    </el-table-column>
                    <el-table-column prop="remarks" label="备注" width="200" align="center">
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <!-- table结束 -->
        <!-- 页面结束 -->
        <!-- 页面结束 -->
        <!--新增弹出层 -->
        <el-dialog title="新增" :visible.sync="addDialog" size="small" :close-on-click-modal="false">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="100px" >
                <el-form-item label="资产编号：" prop="fixassetsCode">
                    <el-input v-model="addForm.fixassetsCode" placeholder="资产编号" size="small" type="number"></el-input>
                </el-form-item>
                <el-form-item label="资产名称：" prop="fixassetsName">
                    <el-input v-model="addForm.fixassetsName" placeholder="资产名称" size="small"></el-input>
                </el-form-item>
                <el-form-item label="减少方式：" prop="reduceWay">
                    <el-input v-model="addForm.reduceWay" placeholder="减少方式" size="small"></el-input>
                </el-form-item>
                <el-form-item label="清理收入：" prop="cleanIncome">
                    <el-input v-model="addForm.cleanIncome" placeholder="清理收入" size="small" type="number"></el-input>
                </el-form-item>
                <el-form-item label="清理费用：" prop="cleanCost">
                    <el-input v-model="addForm.cleanCost" placeholder="清理费用" size="small" type="number"></el-input>
                </el-form-item>
                <el-form-item label="备注：" prop="remarks">
                    <el-input type="textarea" v-model="addForm.remarks" size="small"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary"  @click="submitAddForm('addForm')" size="small">保存</el-button>
                <el-button  @click="resetForm('addForm')" size="small">取消</el-button>
            </div>
        </el-dialog>
        <!--新增弹出层  -->

        <!--修改弹出层 -->
        <el-dialog title="修改" :visible.sync="modDialog" size="small" :close-on-click-modal="false">
            <el-form :model="modForm" :rules="rules" ref="modForm" label-width="100px" >
                <el-form-item label="资产编号：" prop="fixassetsCode">
                    <el-input v-model="modForm.fixassetsCode" placeholder="资产编号" size="small" type="number"></el-input>
                </el-form-item>
                <el-form-item label="资产名称：" prop="fixassetsName">
                    <el-input v-model="modForm.fixassetsName" placeholder="资产名称" size="small"></el-input>
                </el-form-item>
                <el-form-item label="减少方式：" prop="reduceWay">
                    <el-input v-model="modForm.reduceWay" placeholder="减少方式" size="small"></el-input>
                </el-form-item>
                <el-form-item label="清理收入：" prop="cleanIncome">
                    <el-input v-model="modForm.cleanIncome" placeholder="清理收入" size="small" type="number"></el-input>
                </el-form-item>
                <el-form-item label="清理费用：" prop="cleanCost">
                    <el-input v-model="modForm.cleanCost" placeholder="清理费用" size="small" type="number"></el-input>
                </el-form-item>
                <el-form-item label="备注：" prop="remarks">
                    <el-input type="textarea" v-model="modForm.remarks" size="small"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary"  @click="submitModForm('modForm')" size="small">保存</el-button>
                <el-button  @click="resetForm('modForm')" size="small">取消</el-button>
            </div>
        </el-dialog>
        <!--修改弹出层  -->
    </div>
</template>
<script>
export default {
    name: 'decrease',
    data() {
        return {
            //table数据
            reduce: [],
            //table数据
            rules: {
                fixassetsCode: [
                    { required: true, message: '固定资产编码不能为空', trigger: 'blur' },
                ],
                fixassetsName: [
                    { required: true, message: '固定资产名称不能为空', trigger: 'blur' }
                ],
                reduceWay: [
                    { required: true, message: '减少方式不能为空', trigger: 'blur' }
                ],
                cleanIncome: [
                    { required: true, message: '清理收入不能为空', trigger: 'blur' }
                ],
                cleanCost: [
                    { required: true, message: '清理费用不能为空', trigger: 'blur' }
                ],
                remarks: [
                    { required: true, message: '请书写备注', trigger: 'blur' }
                ]
            },
            //新增弹出
            addDialog: false,
            //修改弹出
            modDialog: false,
            addForm: {
                accbookUid:this.$store.state.accbookUid,
                //固定资产编码
                fixassetsCode: '',
                //固定资产名称
                fixassetsName: '',
                //减少方式
                reduceWay: '',
                //清理收入
                cleanIncome: '',
                //清理费用
                cleanCost:'',
                //备注
                remarks:''
            },
            modForm: {
                //修改唯一标识符
                faReduceUid: '',
                //固定资产编码
                fixassetsCode: '',
                //固定资产名称
                fixassetsName: '',
                //减少方式
                reduceWay: '',
                //清理收入
                cleanIncome: '',
                //清理费用
                cleanCost:'',
                //备注
                remarks:''
            },
        }
    },
    mounted() {
        //查询固定资产减少列表
        this.getReduceList();
    },
    methods: {
        //查询固定资产减少列表
        getReduceList() {
            let Vue = this;
            Vue.AxiosPost('getFaReduceListXgw', {
                accbookUid: Vue.$store.state.accbookUid
            }, function(e) {
                if (e.code === '1') {
                    Vue.reduce = [];
                    Vue.reduce=e.data.reduce;                       
                } else if (e.code === '1006') {
                    Vue.reduce = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        submitAddForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let Vue = this;
                    Vue.AxiosPost('addFaReduceXgw', Vue.addForm, function(e) {
                        if (e.code === '1') {
                            Vue.Message('添加成功', 'success');
                            Vue.addDialog = false;
                            Vue.$refs[formName].resetFields();
                            Vue.getReduceList();
                        } else {
                            Vue.Message(e.msg, 'error');
                        }
                    });
                    Vue.addDialog = false;
                } else {
                    return false;
                }
            });
        },
        //修改类别
        checkmod(index, rows) {
            this.modDialog = true;
            this.modForm.faReduceUid = rows[index].faReduceUid;
            this.modForm.fixassetsCode = rows[index].fixassetsCode;
            this.modForm.fixassetsName = rows[index].fixassetsName;
            this.modForm.reduceWay = rows[index].reduceWay;
            this.modForm.cleanIncome = rows[index].cleanIncome+'';
            this.modForm.cleanCost = rows[index].cleanCost+'';
            this.modForm.remarks = rows[index].remarks;
        },
        submitModForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let Vue = this;                  
                    Vue.AxiosPost('updateFaReduceXgw', Vue.modForm, function(e) {
                        if (e.code === '1') {
                            Vue.Message('修改成功！', 'success');
                            Vue.modDialog = false;
                            Vue.getReduceList();
                        } else {
                            Vue.Message(e.msg, 'error');
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.modDialog=false;
            this.addDialog = false;
            this.$refs[formName].resetFields();
        },
        //删除类别
        deldecrease(index, rows) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let Vue = this;
                Vue.AxiosPost('deleteFaReduceXgw', {
                    faReduceUid: rows[index].faReduceUid,
                }, function(e) {
                    if (e.code === '1') {
                        Vue.Message('删除成功！', 'success');
                        rows.splice(index, 1);
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
<style>
#decrease .decrease-top {
    width: 100%;
    height: 45px;
    color: #555;
}

#decrease .decrease-top .decrease-span {
    float: left;
    line-height: 28px;
}

#decrease .decrease-top .decrease-top-right {
    padding-right: 20px;
    float: right;
}

#decrease .el-dialog--small {
    width: 400px;
}

#decrease .el-dialog__body {
    padding: 20px 10px 0px 10px;
}

#decrease .el-input--small {
    width: 215px;
}
</style>