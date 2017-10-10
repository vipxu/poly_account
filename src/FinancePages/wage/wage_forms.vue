<!-- 工资表 -->
<template>
    <div id="WageForms">
        <!-- 头开始 -->
        <div class="WageForms-top">
            <div class="WageForms-top-left">
                <span class="fz4 WageForms-span">工资表</span>
                <div class="WageForms-periods">
                    <template>
                        <el-select v-model="aperioduid" placeholder="请依次匹配" size="small">
                            <el-option v-for="item in periodsList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </div>
                <div class="WageForms-upload">
                    <el-button size="small">刷新</el-button>
                </div>
            </div>
            <div class="WageForms-top-right">
                <a :href="'http://192.168.100.37:8080/juzhang/salaryYp/getSalaryExcelTemplate?ayearuid='+$store.state.ayearUid" class="fz4 uploadMb WageForms-span">下载工资模板</a>
                <el-upload class="upload-demo" action="http://192.168.100.37:8080/juzhang/salaryYp/saveYpExcel" :data="{aperioduid:'09da81ee812311e7bb6800163e08a430',
            					ayearuid:'734d48fd88dc11e7bb6800163e08a430'}" :show-file-list='false' :file-list="fileList" :on-success='getUploadDate'>
                    <el-button size="small" type="primary">导入</el-button>
                </el-upload>
                <el-button size="small" type="primary">生成凭证</el-button>
            </div>
        </div>
        <!-- 头结束 -->
        <!-- table开始 -->
        <div class="el-card--custom">
            <template>
                <el-table :data="WageFormsData" border height="600" stripe>
                    <el-table-column label="资产" header-align="center" align="center">
                        <template scope="scope">
                            {{ scope.row.a}}&nbsp;&nbsp;
                            <i class="el-icon-edit" @click="dialogTableVisible = true"></i>
                        </template>
                    </el-table-column>
                    <el-table-column label="行数" header-align="center">
                        <template scope="scope">
                            {{ scope.row.b}}
                        </template>
                    </el-table-column>
                    <el-table-column label="期末数" header-align="center">
                        <template scope="scope">
                            {{ scope.row.c}}
                        </template>
                    </el-table-column>
                    <el-table-column label="年初数" header-align="center" align="right">
                        <template scope="scope">
                            {{ scope.row.d}}
                        </template>
                    </el-table-column>
                    <el-table-column label="负债和所有者（或股东）权益" header-align="center" align="right">
                        <template scope="scope">
                            {{ scope.row.e}}&nbsp;&nbsp;
                            <i class="el-icon-edit" @click="dialogTableVisible = true"></i>
                        </template>
                    </el-table-column>
                    <el-table-column label="行次" width="80" header-align="center" align="center">
                        <template scope="scope">
                            {{scope.row.f}}
                        </template>
                    </el-table-column>
                    <el-table-column label="年初数" header-align="center" align="right">
                        <template scope="scope">
                            {{ scope.row.g}}
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <!-- table结束 -->
        <!--弹出层 -->
        <el-dialog title="未成功导入的数据" :visible.sync="dialogTableVisible">
            <el-table :data="messExData" border stripe>
                <el-table-column property="companyName" label="公司名称" width="300"></el-table-column>
                <el-table-column property="deptCode" label="部门编码" width="150"></el-table-column>
                <el-table-column property="deptName" label="部门名称" width="300"></el-table-column>
                <el-table-column property="f1" label="应付合计" width="150"></el-table-column>
                <el-table-column property="f2" label="应扣合计" width="150"></el-table-column>
                <el-table-column property="f3" label="实发合计" width="150"></el-table-column>
                <el-table-column property="f4" label="本月扣零" width="150"></el-table-column>
                <el-table-column property="f5" label="上月扣零" width="150"></el-table-column>
                <el-table-column property="f6" label="代扣税" width="150"></el-table-column>
                <el-table-column property="personName" label="职员名称" width="200"></el-table-column>
            </el-table>
        </el-dialog>
        <!-- 弹出层 -->
    </div>
</template>
<script>
export default {
    name: 'WageForms',
    data() {
        return {
            //上传文件
            fileList: [],
            //状态框
            dialogTableVisible: false,
            //会计期间uid
            aperioduid: '',
            //会计期间列表
            periodsList: [],
            //导入工资表匹配错误的数据
            messExData: [],
            //工资表数据
            WageFormsData: []
        }
    },
    mounted() {
        //获取会计期间
        this.getPeriodsCurrencysData();
        //根据会计期间查询工资信息报表
        this.getYpWaReport();
    },
    methods: {
        //文件上传成功的钩子
        getUploadDate(response, file, fileList) {
            if (response.code === '1') {
                this.dialogTableVisible = true;
                this.messExData = response.data.failedlist;
                console.log(this.messExData);
            } else if (response.code === '-1') {
                this.Message(response.msg, 'error');
            } else {
                this.Message(response.msg, 'error');
            }
        },
        //获取会计期间
        getPeriodsCurrencysData() {
            let Vue = this;
            Vue.AxiosPost('getPeriodsCurrencysList', {
                accbookUid: Vue.$store.state.accbookUid
            }, function(e) {
                if (e.code === '1') {
                    e.data.acctBookInfo.periods.forEach((n, i) => {
                        Vue.periodsList.push({
                            value: n.aperiodUid,
                            label: n.iyear + '年' + n.iperiod + '期'
                        });
                    });
                    //默认选中期间
                    Vue.aperioduid = Vue.periodsList[0].value
                } else if (e.code === '1006') {
                    Vue.periodsList = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //根据会计期间查询工资信息报表
        getYpWaReport() {
            console.log(111);        
            let Vue = this;
            Vue.AxiosPost('getYpWaReport', {
                aperioduid: "09da81ee812311e7bb6800163e08a430"
            }, function(e) {
                if (e.code === '1') {
                    console.log(111);
                    Vue.WageFormsData = [];
                    console.log(e);
                } else if (e.code === '1006') {
                    Vue.WageFormsData = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
    },
}
</script>
<style lang='scss'>
#WageForms .WageForms-top {
    width: 100%;
    height: 45px;
    color: #555;
    .WageForms-span {
        line-height: 30px;
        float: left;
    }
    .WageForms-periods {
        float: left;
    }
    .WageForms-upload {
        float: left;
    }
    .uploadMb {
        color: #555;
        text-decoration-line: none;
        padding-right: 20px;
        &:hover {
            text-decoration: underline;
            color: #0087be;
            cursor: pointer;
        }
    }
    .WageForms-top-left {
        .el-input__icon+.el-input__inner,
        .el-select .el-input__inner {
            padding-right: 0px;
        }
    }
}

.WageForms-periods {
    margin: 0 10px;
}

#WageForms {
    .WageForms-top .WageForms-top-right {
        padding-right: 20px;
        float: right;
        .el-button {
            width: 70px;
        }
    }
    .el-dialog--small {
        width: 800px;
    }
    .upload-demo {
        float: left;
        margin-right: 20px;
    } // .WageForms-dialog {
    //     padding: 10px 5px 20px 5px;
    //     ul li {
    //         span {
    //             line-height: 30px;
    //             display: block;
    //             float: left;
    //             width: 100px;
    //         }
    //         padding-bottom: 20px;
    //         list-style-type: none;
    //         font-size: 14px;
    //         text-align: -webkit-match-parent;
    //         color: #555;
    //     }
    // }
}




/* 弹出框css */
</style>