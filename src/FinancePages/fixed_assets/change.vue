<!-- 固定资产变动 -->
<template>
    <div id="change">
        <!-- 头开始 -->
        <div class="change-top">
            <div class="change-top-left">
                <span class="fz4 change-span">固定资产变动</span>
            </div>
            <div class="change-top-right">
                <el-button type="primary" size="small" @click="getFaChangeCode()">新 增</el-button>
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
                            <el-button type="text" size="small" @click.native.prevent="delchange(scope.$index, reduce)">
                                <i class="el-icon-close"></i>
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="fixassetsCode" label="固定资产编号" width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="fixassetsName" label="固定资产名称" width="200" align="center">
                    </el-table-column>
                    <el-table-column prop="timeref" label="变动日期" width="200" align="center">
                    </el-table-column>
                    <el-table-column prop="fachangeItem" label="变动类型" width="200" align="center">
                    </el-table-column>
                    <el-table-column prop="newValue" label="变动前" width="200" align="center">
                    </el-table-column>
                    <el-table-column prop="oldValue" label="变动后" width="200" align="center">
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <!-- table结束 -->
        <!--新增弹出层 -->
        <el-dialog title="固定资产变动单" :visible.sync="addDialog" size="small" :close-on-click-modal="false">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="150px">
                <div class="selectWay">
                    <!-- <template>
                            <el-radio class="radio" v-model="addForm.fachangeItem" label="使用状态变动">使用状态变动</el-radio>
                            <el-radio class="radio" v-model="addForm.fachangeItem" label="部门变动">部门变动</el-radio>
                    </template> -->
                </div>
                <el-form-item label="变动单编号" prop="changeCode">
                    <p>
                        <span>00{{addForm.changeCode}}</span>
                        <span style="padding-left:100px;">变动日期</span> <span style="padding-left:12px;">{{new Date().getFullYear() + '-' + changeDate(new Date().getMonth() + 1) + '-' + changeDate(new Date().getDate())}}</span>
                    </p>
                </el-form-item>

                <el-form-item label="固定资产编号:" prop="fixassetsCode">
                    <el-input v-model="addForm.fixassetsCode" placeholder="固定资产编号" size="small"></el-input>
                </el-form-item>
                <el-form-item label="固定资产名称:" prop="fixassetsName">
                    <el-input v-model="addForm.fixassetsName" placeholder="固定资产名称" size="small"></el-input>
                </el-form-item>
                <el-form-item label="变动类别" prop="fachangeItem">
                    <el-radio-group v-model="addForm.fachangeItem">
                        <el-radio label="使用状态变动"></el-radio>
                        <el-radio label="部门变动"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="变动前使用部门:" prop="oldValue">
                    <el-input v-model="addForm.oldValue" placeholder="变动前使用部门" size="small"></el-input>
                </el-form-item>
                <el-form-item label="变动后使用部门:" prop="newValue">
                    <el-input v-model="addForm.newValue" placeholder="变动后使用部门" size="small"></el-input>
                </el-form-item>
                <el-form-item label="变动原因:" prop="fachangeReason">
                    <el-input type="textarea" v-model="addForm.fachangeReason" size="small"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitAddForm('addForm')" size="small">保存</el-button>
                <el-button @click="resetForm('addForm')" size="small">取消</el-button>
            </div>
        </el-dialog>
        <!--新增弹出层  -->

        <!--修改弹出层 -->
        <el-dialog title="修改" :visible.sync="modDialog" size="small" :close-on-click-modal="false">
            <el-form :model="modForm" :rules="rules" ref="modForm" label-width="100px">
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
                <el-button type="primary" @click="submitModForm('modForm')" size="small">保存</el-button>
                <el-button @click="resetForm('modForm')" size="small">取消</el-button>
            </div>
        </el-dialog>
        <!--修改弹出层  -->
    </div>
</template>
<script>
export default {
    name: 'change',
    data() {
        return {
            //table数据
            reduce: [],
            //table数据
            rules: {
                fixassetsCode: [
                    { required: true, message: '固定资产编号', trigger: 'blur' }
                ],
                fixassetsName: [
                    { required: true, message: '固定资产名称', trigger: 'blur' }
                ],
                oldValue: [
                    { required: true, message: '请填写变动前使用部门', trigger: 'blur' }
                ],
                newValue: [
                    { required: true, message: '请选择变动后使用部门', trigger: 'blur' }
                ],
                fachangeReason: [
                    { required: true, message: '请填写变动原因', trigger: 'blur' }
                ]
            },
            //新增弹出
            addDialog: false,
            //修改弹出
            modDialog: false,
            addForm: {
                accbookUid: this.$store.state.accbookUid,
                //变动单uid
                fachangeUid: "",
                //变动单据编码
                changeCode: "",
                //固定资产编号
                fixassetsCode: "",
                //固定资产名称
                fixassetsName: "",
                //变动类型
                fachangeItem: "",

                oldValue: "",

                newValue: "",
                //变动原因
                fachangeReason: ""
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
                cleanCost: '',
                //备注
                remarks: ''
            },
        }
    },
    mounted() {
        //查询固定资产变动列表
        this.getFaChangeList();
    },
    methods: {
        changeDate(num) {
            return num < 10 ? ('0' + num) : num;
        },
        //查询固定资产变动列表
        getFaChangeList() {
            let Vue = this;
            Vue.AxiosPost('getFaChangeList', {
                accbookUid: Vue.$store.state.accbookUid
            }, function(e) {
                if (e.code === '1') {
                    Vue.reduce = [];
                    Vue.reduce = e.data.ChangeList;
                } else if (e.code === '1006') {
                    Vue.reduce = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //查询固定资产变动单编码
        getFaChangeCode() {
            this.addDialog = true;
            let Vue = this;
            Vue.AxiosPost('getFaChangeCodeXgw', {
                accbookUid: Vue.$store.state.accbookUid
            }, function(e) {
                if (e.code === '1') {
                    Vue.addForm.changeCode = e.data.faChangeCode;
                    console.log(e)
                } else if (e.code === '1006') {
                    Vue.Message(e.msg, 'error');
                    
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //新增固定资产变动
        submitAddForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let Vue = this;
                    Vue.AxiosPost('addFaChangeXgw', Vue.addForm, function(e) {
                        if (e.code === '1') {
                            Vue.Message('添加成功', 'success');
                            Vue.addDialog = false;
                            Vue.getFaChangeList();
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
            this.modForm.cleanIncome = rows[index].cleanIncome + '';
            this.modForm.cleanCost = rows[index].cleanCost + '';
            this.modForm.remarks = rows[index].remarks;
        },
        submitModForm(formName) {
            console.log(this.modForm);
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
            this.modDialog = false;
            this.addDialog = false;
            this.$refs[formName].resetFields();
        },
        //删除类别
        delchange(index, rows) {
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
#change .change-top {
    width: 100%;
    height: 45px;
    color: #555;
}

#change .change-top .change-span {
    float: left;
    line-height: 28px;
}

#change .change-top .change-top-right {
    padding-right: 20px;
    float: right;
}

#change .el-dialog--small {
    width: 500px;
}

#change .el-dialog__body {
    padding: 20px 10px 0px 10px;
}

#change .selectWay {
    text-align: center;
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid #d7dcde;
}

#change .el-input--small {
    width: 215px;
}
</style>