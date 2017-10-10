<template>
    <div id="bankStatements" class="el-card--custom">
        <el-row>
            <el-col :span="4">
                <el-steps :space="80" direction="vertical" :active="step">
                    <el-step title="选择文件"></el-step>
                    <el-step title="匹配模板"></el-step>
                    <el-step title="查看凭证"></el-step>
                </el-steps>
            </el-col>
            <el-col :span="20">
                <template v-if="step === 1">
                    <div class="step-header">
                        <h3>步骤说明:</h3>
                        <br>
                        <p class="fz4">1. 下载
                            <a class="custom-color-primary" :href="bacsURL+'/voucherYp/getBankExcelTemplate?accbookuid='+$store.state.accbookUid">示例模板</a>
                        </p>
                        <p class="fz4">2. 上传Excel文件</p>
                        <br>
                        <el-upload class="upload" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" :action="bacsURL+'/voucherYp/readYpBankExcel'" :on-success="handleSuccess" :on-change="handleChange" :before-upload="handleBeforeUpload" :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件</div>
                        </el-upload>
                    </div>
                    <div class="step-footer">
                        <el-button type="primary" class="next" @click="nextstep">下一步</el-button>
                    </div>
                </template>
                <template v-if="step === 2">
                    <div class="step-header">
                        <el-table :data="fileListData.rowslist" border style="width: 100%; height: 100%;">
                            <el-table-column v-for="(item,index) in fileListData.titlelist" :key="index" :prop="item" :label="item" width="180">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="step-footer">
                        <el-button type="primary" class="prev" @click="prevstep">上一步</el-button>
                        <el-button type="primary" class="next" @click="nextstep">下一步</el-button>
                    </div>
                </template>
                <template v-if="step === 3">
                    <div class="step-header">

                    </div>
                    <div class="step-footer">
                        <el-button type="primary" class="prev" @click="prevstep">上一步</el-button>
                    </div>
                </template>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'bankstatements',
    data() {
        return {
            step: 1,

            //服务器地址
            bacsURL: axios.defaults.baseURL,
            //服务器地址

            //上传列表
            fileList: [],
            //上传列表

            //解析后的列表
            fileListData: {},
            //解析后的列表
        }
    },
    methods: {
        handleChange(file, fileList) {
            this.fileList = fileList.slice(-1);
        },
        handleSuccess(response, file, fileList) {
            this.fileListData = response.data.excel;
        },
        handleBeforeUpload(file) {
            if (file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                return true;
            } else {
                this.Message('只能上传xls/xlsx文件！', 'warning');
                return false;
            }
        },

        //上一页
        prevstep() {
            this.step--;
        },
        //上一页
        //下一页
        nextstep() {
            this.step++;
        }
        //下一页
    }
}
</script>

<style lang="scss" scoped>
#bankStatements {
    height: 466px!important;
    min-width: 800px;
    .el-row {
        height: 100%;
        .el-col-4 {
            height: 100%;
            border-right: solid 1px rgb(209, 221, 229);
            box-sizing: border-box;
        }
        .el-col-20 {
            height: 100%;
            padding-left: 15px;
            box-sizing: border-box;
            .step-header {
                height: 85%;
                p {
                    a {
                        margin: 0 3px;
                        &:hover {
                            cursor: pointer;
                            text-decoration: underline;
                        }
                    }
                }
                .upload {
                    width: 400px;
                }
            }
            .step-footer {
                padding-top: 15px;
                box-sizing: border-box;
                text-align: center;
                height: 15%;
            }
        }
    }
}
</style>
