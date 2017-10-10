<!-- 固定资产类别 -->
<template>
    <div id="category">
        <!-- 头开始 -->
        <div class="category-top">
            <div class="category-top-left">
                <span class="fz4 category-span">固定资产类别</span>
            </div>
            <div class="category-top-right">
                <el-button type="primary" size="small" @click="addDialog = true">新 增</el-button>
            </div>
        </div>
        <!-- 头结束 -->
        <!-- table开始 -->
        <div class="el-card--custom">
            <template>
                <el-table :data="FatypesList" border style="width: 100%">
                    <el-table-column fixed label="操作" width="100" align="center">
                        <template scope="scope">
                            <el-button type="text" size="small" @click.native.prevent="checkmod(scope.$index, FatypesList)">
                                <i class="el-icon-edit"></i>
                            </el-button>&nbsp;&nbsp;
                            <el-button type="text" size="small" @click.native.prevent="delCategory(scope.$index, FatypesList)">
                                <i class="el-icon-close"></i>
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="assettypesCode" label="类别编号" width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="assettypesName" label="类别名称" width="200" align="center">
                    </el-table-column>
                    <el-table-column label="计提属性" header-align="center" align="center" width="200">
                        <template scope="scope">
                            <p v-text="scope.row.withdrawing===0?'不计提':'正常计提'"></p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="depreciationMethod" label="折旧方法" width="200" align="center">
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <!-- table结束 -->
        <!-- 页面结束 -->
        <!-- 页面结束 -->
        <!--新增弹出层 -->
        <el-dialog title="新增" :visible.sync="addDialog" size="small" :close-on-click-modal="false">
            <el-form :model="styleForm" :rules="rules" ref="styleForm" label-width="100px" >
                <el-form-item label="类别编号：" prop="assettypesCode">
                    <el-input v-model="styleForm.assettypesCode" placeholder="类别编号" size="small" type="number"></el-input>
                </el-form-item>
                <el-form-item label="类别名称：" prop="assettypesName">
                    <el-input v-model="styleForm.assettypesName" placeholder="类别名称" size="small"></el-input>
                </el-form-item>
                <el-form-item label="计提属性：" prop="withdrawing">
                    <el-select v-model="styleForm.withdrawing" placeholder="正常计提" size="small">
                        <el-option v-for="item in withdrawings" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="折旧方法：" prop="depreciationMethod">
                    <el-select v-model="styleForm.depreciationMethod" placeholder="折旧方法" size="small">
                        <el-option v-for="item in depreciationMethods" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitAddForm('styleForm')" size="small">保存</el-button>
                    <el-button @click="resetForm('styleForm')" size="small">取消</el-button>
            </div>
        </el-dialog>
        <!--新增弹出层  -->

        <!--修改弹出层 -->
        <el-dialog title="修改" :visible.sync="modDialog" size="small" :close-on-click-modal="false">
            <el-form :model="modForm" :rules="rules" ref="modForm" label-width="100px" >
                <el-form-item label="类别编号：" prop="assettypesCode">
                    <el-input v-model="modForm.assettypesCode" placeholder="类别编号" size="small" type="number"></el-input>
                </el-form-item>
                <el-form-item label="类别名称：" prop="assettypesName">
                    <el-input v-model="modForm.assettypesName" placeholder="类别名称" size="small"></el-input>
                </el-form-item>
                <el-form-item label="计提属性：" prop="withdrawing">
                    <el-select v-model="modForm.withdrawing" placeholder="正常计提" size="small" popper-class="down">
                        <el-option v-for="item in withdrawings" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="折旧方法：" prop="deprmethodUid">
                    <el-select v-model="modForm.deprmethodUid" placeholder="折旧方法" size="small" popper-class="down">
                        <el-option v-for="item in depreciationMethods" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
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
    name: 'category',
    data() {
        return {
            styleForm: {
                //编号
                assettypesCode: '',
                //名称
                assettypesName: '',
                //计提属性
                withdrawing: '',
                //折旧方法
                depreciationMethod: '',
            },
            rules: {
                assettypesCode: [
                    { required: true, message: '请输入类别编号', trigger: 'blur' },
                ],
                assettypesName: [
                    { required: true, message: '请输入类别名称', trigger: 'blur' }
                ],
                withdrawing: [
                    { required: true, message: '请选择计提属性', trigger: 'change' }
                ],
                depreciationMethod: [
                    { required: true, message: '请选择折旧方法', trigger: 'change' }
                ],
                deprmethodUid: [
                    { required: true, message: '请选择折旧方法', trigger: 'change' }
                ]
            },

            //table数据
            FatypesList: [],
            //table数据
            //集体树
            withdrawings: [{
                value: '0',
                label: '不计提'
            },
            {
                value: '1',
                label: '正常计提'
            }],
            //折旧方法树
            depreciationMethods: [],
            //新增弹出
            addDialog: false,
            addForm: {
                accbookUid: this.$store.state.accbookUid,
                assettypesCode: '',
                assettypesName: "",
                withdrawing: '',
                deprmethodUid: "",
            },
            //修改弹出
            modDialog: false,
            modForm: {
                //类别id
                assettypesUid: '',
                //类别编码
                assettypesCode: '',
                //类别名称
                assettypesName: "",
                //计提属性 0：不计提 1计提
                withdrawing: '',
                //折旧id
                deprmethodUid: ""
            },

        }
    },
    mounted() {
        this.getFatypesList();
        this.getFaMethodList();
    },
    methods: {
        //查询固定资产类别
        getFatypesList() {
            let Vue = this;
            Vue.AxiosPost('getFatypesList', {
                accbookUid: Vue.$store.state.accbookUid
            }, function(e) {
                if (e.code === '1') {
                    Vue.FatypesList = [];
                    e.data.fatypesList.forEach((n, i) => {
                        Vue.FatypesList.push({
                            //类别id
                            assettypesUid: n.assettypesUid,
                            //列类别编码
                            assettypesCode: n.assettypesCode,
                            //类别名称
                            assettypesName: n.assettypesName,
                            //计算属性
                            withdrawing: n.withdrawing,
                            //折旧id
                            deprmethodUid: n.deprmethodUid,
                            //折旧方法
                            depreciationMethod: n.depreciationMethod
                        })
                    });
                } else if (e.code === '1006') {
                    Vue.FatypesList = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //查询折旧方法
        getFaMethodList() {
            let Vue = this;
            Vue.AxiosPost('getFaMethodList', {
                accbookUid: Vue.$store.state.accbookUid,
            }, function(e) {
                if (e.code === '1') {
                    e.data.fatypesList.forEach((n, i) => {
                        Vue.depreciationMethods.push({
                            value: n.deprmethodUid,
                            label: n.depreciationMethod
                        });
                    });
                } else if (e.code === '1006') {
                    Vue.depreciationMethods = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //增加类别
        addCategory() {
            //更新添加类别参数
            this.addForm.assettypesCode = this.styleForm.assettypesCode;
            this.addForm.assettypesName = this.styleForm.assettypesName;
            this.addForm.withdrawing = this.styleForm.withdrawing;
            this.addForm.deprmethodUid = this.styleForm.depreciationMethod;
        },
        submitAddForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //更新参数
                    this.addCategory();
                    let Vue = this;
                    Vue.AxiosPost('getAddFatypes', Vue.addForm, function(e) {
                        if (e.code === '1') {
                            Vue.Message('添加成功', 'success');
                            Vue.addDialog = false;
                            Vue.$refs[formName].resetFields();
                            Vue.getFatypesList();
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
            console.log(rows);
            this.modForm.assettypesUid = rows[index].assettypesUid;
            this.modForm.assettypesCode = rows[index].assettypesCode+'';
            this.modForm.assettypesName = rows[index].assettypesName;
            //类型要判断，不然不能识别修改
            this.modForm.withdrawing = rows[index].withdrawing + '';
            this.modForm.deprmethodUid = rows[index].deprmethodUid;
        },
        submitModForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let Vue = this;
                    Vue.AxiosPost('getUpdateFatypes', Vue.modForm, function(e) {
                        if (e.code === '1') {
                            Vue.Message('修改成功！', 'success');
                            Vue.modDialog = false;

                            Vue.getFatypesList();
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
        delCategory(index, rows) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let Vue = this;
                Vue.AxiosPost('getDeleteFatypes', {
                    assettypesUid: rows[index].assettypesUid,
                }, function(e) {
                    if (e.code === '1') {
                        Vue.Message('删除成功！', 'success');
                        rows.splice(index, 1);
                    } else {
                        Vue.Message("该类别已被固定资产使用无法删除", 'error');
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
#category .category-top {
    width: 100%;
    height: 45px;
    color: #555;
}

.category-span {
    float: left;
    line-height: 28px;
}

#category .category-top .category-top-right {
    padding-right: 20px;
    float: right;
}


/* 弹出框css */


/* 区间选择 */

#category .el-dialog--small {
    width: 400px;
}

#category .el-dialog__body {
    padding: 20px 10px 0px 10px;
}

#category .el-input--small {
    width: 215px;
}
</style>