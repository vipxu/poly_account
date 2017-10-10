<!-- 固定资产增减方式 -->
<template>
    <div id="addsub">
        <!-- 头开始 -->
        <div class="addsub-top">
            <div class="addsub-top-left">
                <span class="fz4 addsub-span">固定资产增减方式</span>
            </div>
            <div class="addsub-top-right">
                <el-button type="primary" size="small" @click="addDialog = true">新 增</el-button>
            </div>
        </div>
        <!-- 头结束 -->
        <!-- table开始 -->
        <div class="el-card--custom">
            <template>
                <el-table :data="FaOriginsList" border style="width: 100%">
                    <el-table-column fixed label="操作" width="100" align="center">
                        <template scope="scope">
                            <el-button type="text" size="small" @click.native.prevent="checkmod(scope.$index, FaOriginsList)">
                                <i class="el-icon-edit"></i>
                            </el-button>&nbsp;&nbsp;
                            <el-button type="text" size="small" @click.native.prevent="delOriginsList(scope.$index, FaOriginsList)">
                                <i class="el-icon-close"></i>
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="增减方式编号" width="200" align="center">
                        <template scope="scope">
                            <p v-text="scope.row.saddId==''?scope.row.sdecId:scope.row.saddId"></p>
                        </template>
                    </el-table-column>
                    <el-table-column label="增减方式名称" width="200" align="center">
                        <template scope="scope">
                            <p v-text="scope.row.faoriginsName"></p>
                        </template>
                    </el-table-column>
                    <el-table-column label="对应入账科目" width="200" align="center">
                        <template scope="scope">
                            <p v-text="scope.row.ccode"></p>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <!-- table结束 -->
        <!-- 页面结束 -->
        <!-- 页面结束 -->
        <!--新增弹出层 -->
        <el-dialog title="新增" :visible.sync="addDialog" size="small" :close-on-click-modal="false">
            <div class="dialog">
                <div class="selectWay">
                    <template>
                        <el-radio class="radio" v-model="addForm.faoriginsType" label="1">增加方式</el-radio>
                        <el-radio class="radio" v-model="addForm.faoriginsType" label="0">减少方式</el-radio>
                    </template>
                </div>
                <el-form :model="addForm" :rules="rules" ref="addForm" label-width="130px" v-show="addForm.faoriginsType==1?true:false">
                    <el-form-item label="增加方式编号：" prop="saddId">
                        <el-input v-model="addForm.saddId" placeholder="增加类别编号" size="small" type="number" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="增加方式名称：" prop="faoriginsName">
                        <el-input v-model="addForm.faoriginsName" placeholder="增加类别名称" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="对应入账科目：" prop="ccode">
                        <el-select v-model="addForm.ccode" placeholder="请选择" size="small" filterable popper-class="dropdownSelect">
                            <el-option v-for="item in $store.state.subjectList" :key="item.value" :label="item.label" :value="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-form :model="addForm" :rules="rules" ref="decForm" label-width="130px" v-show="addForm.faoriginsType==0?true:false">
                    <el-form-item label="减少方式编号：" prop="sdecId">
                        <el-input v-model="addForm.sdecId" placeholder="减少类别编号" size="small" type="number" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="减少方式名称：" prop="faoriginsName">
                        <el-input v-model="addForm.faoriginsName" placeholder="减少类别名称" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="对应入账科目：" prop="ccode">
                        <el-select v-model="addForm.ccode" placeholder="请选择" size="small" filterable popper-class="dropdownSelect">
                            <el-option v-for="item in $store.state.subjectList" :key="item.value" :label="item.label" :value="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addForm.faoriginsType==1?submitAddForm('addForm'):submitDecForm('decForm')" size="small">保存</el-button>
                <el-button @click="resetAddForm" size="small">取消</el-button>
            </div>
        </el-dialog>
        <!--新增弹出层 -->
        <!--修改弹出层 -->
        <el-dialog title="修改" :visible.sync="modDialog" size="small" :close-on-click-modal="false">
            <div class="dialog">
                <div class="selectWay">
                    <template>
                        <el-radio class="radio" v-model="modForm.faoriginsType" label="1" :disabled="modForm.faoriginsType==0?true:false">增加方式</el-radio>
                        <el-radio class="radio" v-model="modForm.faoriginsType" label="0" :disabled="modForm.faoriginsType==1?true:false">减少方式</el-radio>
                    </template>
                </div>
                <el-form :model="modForm" :rules="rules" ref="modaddForm" label-width="130px" v-show="modForm.faoriginsType==1?true:false">
                    <el-form-item label="增加方式编号：" prop="saddId">
                        <el-input v-model="modForm.saddId" placeholder="增加类别编号" size="small" type="number" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="增加方式名称：" prop="faoriginsName">
                        <el-input v-model="modForm.faoriginsName" placeholder="增加类别名称" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="对应入账科目：" prop="ccode" filterable popper-class="dropdownSelect">
                        <el-select v-model="modForm.ccode" placeholder="请选择" size="small">
                            <el-option v-for="item in $store.state.subjectList" :key="item.value" :label="item.label" :value="item.label">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-form :model="modForm" :rules="rules" ref="moddecForm" label-width="130px" v-show="modForm.faoriginsType==0?true:false">
                    <el-form-item label="减少方式编号：" prop="sdecId">
                        <el-input v-model="modForm.sdecId" placeholder="减少类别编号" size="small" type="number" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="减少方式名称：" prop="faoriginsName">
                        <el-input v-model="modForm.faoriginsName" placeholder="减少类别名称" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="对应入账科目：" prop="ccode" filterable popper-class="dropdownSelect">
                        <el-select v-model="modForm.ccode" placeholder="请选择" size="small">
                            <el-option v-for="item in $store.state.subjectList" :key="item.value" :label="item.selLabel" :value="item.selLabel">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addForm.faoriginsType==1?submitModForm('modaddForm'):submitModForm('moddecForm')" size="small">确定</el-button>
                <el-button @click="resetModForm" size="small">取消</el-button>
            </div>
        </el-dialog>
        <!--修改弹出层 -->

    </div>
</template>
<script>
export default {
    name: 'addsub',
    data() {
        var checksaddId = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('增加类别编号不能为空'));
            } else if (value.substring(0, 1) != '1') {
                return callback(new Error('输入1开头的数字'));
            } else {
                callback();
            }
        };
        var checksdecId = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('减少类别编号不能为空'));
            } else if (value.substring(0, 1) != '2') {
                return callback(new Error('输入2开头的数字'));
            } else {
                callback();
            }
        };
        var checkfaoriginsName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('类别名称不能为空'));
            } else {
                callback();
            }
        };
        return {
            //table数据
            FaOriginsList: [],
            //新增弹出
            addDialog: false,
            //修改弹出
            modDialog: false,
            //新增提交的参数
            addForm: {
                //增减方式类型1表示增加0表示减少
                faoriginsType: '1',
                accbookUid: this.$store.state.accbookUid,
                //增加方式编码
                saddId: '',
                //增加方式名称
                faoriginsName: '',
                //减少方式编码
                sdecId: '',
                //入账科目
                ccode: ''
            },
            //修改提价的数据
            modForm: {
                //增减方式唯一标识符
                faoriginsUid: '',
                //根据类别识别传的那个id
                sdecId: '',
                saddId: '',
                faoriginsName: '',
                ccode: '',
                //增减方式
                faoriginsType: ''
            },
            rules: {
                saddId: [
                    { required: true, validator: checksaddId, trigger: 'blur' },
                ],
                sdecId: [
                    { required: true, validator: checksdecId, trigger: 'blur' },
                ],
                faoriginsName: [
                    { required: true, validator: checkfaoriginsName, trigger: 'blur' },
                ],
                ccode: [
                    { required: true, message: '请选择入账科目', trigger: 'change' }
                ]
            },
            //修改弹出
            modForm: {

            },
        }
    },
    created() {
        this.getSubjectData();//生成科目树并更新科目数据
    },
    mounted() {
        this.getFaOriginsList();
    },
    methods: {
        //查询固定资产增减方式列表
        getFaOriginsList() {
            let Vue = this;
            Vue.AxiosPost('getFaOriginsList', {
                accbookUid: Vue.$store.state.accbookUid
            }, function(e) {
                if (e.code === '1') {
                    Vue.FaOriginsList = [];
                    e.data.OriginsList.forEach((n, i) => {
                        Vue.FaOriginsList.push({
                            //对应入账科目
                            ccode: n.ccode,
                            //增减方式名称
                            faoriginsName: n.faoriginsName,
                            //增减方式唯一标识符
                            faoriginsUid: n.faoriginsUid,
                            //增加方式编码
                            saddId: n.saddId,
                            //减少方式编码
                            sdecId: n.sdecId
                        })
                    });
                } else if (e.code === '1006') {
                    Vue.FaOriginsList = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },

        //新增固定资产增加方式
        submitAddForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let Vue = this;
                    Vue.AxiosPost('addFaOrigins', Vue.addForm, function(e) {
                        if (e.code === '1') {
                            Vue.Message('新增固定资产增加方式成功！', 'success');
                            Vue.addDialog = false;
                            Vue.$refs[formName].resetFields();
                            Vue.getFaOriginsList();
                        } else {
                            Vue.Message(e.msg, 'error');
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        //新增固定资产减少方式
        submitDecForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let Vue = this;
                    Vue.AxiosPost('addFaOriginsj', Vue.addForm, function(e) {
                        if (e.code === '1') {
                            Vue.Message('新增固定资产减少方式成功！', 'success');
                            Vue.addDialog = false;
                            Vue.$refs[formName].resetFields();
                            Vue.getFaOriginsList();
                        } else {
                            Vue.Message(e.msg, 'error');
                        }
                    })

                } else {
                    return false;
                }
            });
        },
        resetAddForm() {
            this.addDialog = false;
            //增减方式类型1表示增加0表示减少
            this.addForm.faoriginsType = this.addForm.faoriginsType;
            //增加方式编码
            this.addForm.saddId = '';
            //增加方式名称
            this.addForm.faoriginsName = '';
            //减少方式编码
            this.addForm.sdecId = '';
            //入账科目
            this.addForm.ccode = ''
        },
        //删除固定资产增减方式
        delOriginsList(index, rows) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let Vue = this;
                Vue.AxiosPost('deleteFaOrigins', {
                    faoriginsUid: rows[index].faoriginsUid,
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
        },
        //修改参数改变
        checkmod(index, rows) {
            this.modDialog = true;
            this.modForm.faoriginsUid = rows[index].faoriginsUid;
            this.modForm.sdecId = rows[index].sdecId;
            this.modForm.saddId = rows[index].saddId;
            this.modForm.faoriginsName = rows[index].faoriginsName;
            this.modForm.ccode = rows[index].ccode;
            //增减方式
            this.modForm.faoriginsType = rows[index].sdecId == '' ? '1' : '0';
        },
        submitModForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let Vue = this;
                    Vue.AxiosPost('updateFaOrigins', Vue.modForm, function(e) {
                        if (e.code === '1') {
                            Vue.Message('修改成功！', 'success');
                            Vue.modDialog = false;
                            Vue.getFaOriginsList();
                        } else {
                            Vue.Message(e.msg, 'error');
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        //取消
        resetModForm() {
            this.modDialog = false;
            // //增减方式类型1表示增加0表示减少
            // this.modForm.faoriginsType = this.modForm.faoriginsType;
            // //增加方式编码
            // this.modForm.saddId = '';
            // //增加方式名称
            // this.modForm.faoriginsName = '';
            // //减少方式编码
            // this.modForm.sdecId = '';
            // //入账科目
            // this.modForm.ccode = ''
        },
    }
}
</script>
<style>
#addsub .addsub-top {
    width: 100%;
    height: 45px;
    color: #555;
}

.addsub-span {
    float: left;
    line-height: 28px;
}

#addsub .addsub-top .addsub-top-right {
    padding-right: 20px;
    float: right;
}



/* 弹出框css */


/* 区间选择 */

#addsub .el-dialog--small {
    width: 400px;
}

#addsub .el-dialog__body {
    padding: 20px 10px 0px 10px;
}

#addsub .dialog .selectWay {
    text-align: center;
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid #d7dcde;
}

#addsub .el-input--small {
    width: 215px;
}



/* 下拉的类别列表 */

.dropdownSelect .el-scrollbar {
    width: 215px;
    overflow: hidden;
}
</style>