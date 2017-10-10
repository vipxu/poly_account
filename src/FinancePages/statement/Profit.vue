<!-- 利润表 -->
<template>
    <div id="profit">
        <!-- 头开始 -->
        <el-row>
            <div class="vl-top-left">
                <span class="fz5">利润表</span>
                <template>
                    <el-select v-model="month"  size="small" class="forms">
                        <el-option v-for="item in monthly" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </template>
                <template>
                    <el-select v-model="periodUid" size="small" @change="selectPer()">
                        <el-option v-for="item in periodsList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </template>
                <el-button size="small">刷新</el-button>
                <!-- <template>
                    <el-checkbox v-model="checked" class="profit-check">显示本月数、本年累计数</el-checkbox>
                </template> -->
            </div>
            <div class="vl-top-right">
                <el-button type="primary" size="small">打印</el-button>
                <el-button size="small">导出 </el-button>
            </div>
        </el-row>
        <!-- 头结束 -->
        <!-- table开始 stripe带白马线-->
        <div class="profit-context">
            <table class="profit-table" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <td style="width:40%">项目</td>
                        <td style="width:10%">行次</td>
                        <td style="width:25%">本月金额</td>
                        <td style="width:25%">本年累计金额</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTableVisible = true">一、营业收入</el-button>
                        </td>
                        <td style="text-align: center;">1</td>
                        <td style="text-align: right;">-66666.22</td>
                        <td style="text-align: right;">454.00</td>
                    </tr>
                    <tr>
                        <td style="padding-left:33px;">
                            <el-button type="text" @click="dialogTableVisible = true">减：营业成本</el-button>
                        </td>
                        <td style="text-align: center;">2</td>
                        <td style="text-align: right;">-66666.22</td>
                        <td style="text-align: right;">454.00</td>
                    </tr>
                    <tr>
                        <td style="padding-left:60px;">
                            <el-button type="text" @click="dialogTableVisible = true">税金及附加</el-button>
                        </td>
                        <td style="text-align: center;">3</td>
                        <td style="text-align: right;">-66666.22</td>
                        <td style="text-align: right;">454.00</td>
                    </tr>
                    <tr>
                        <td style="padding-left:60px;">
                            <el-button type="text" @click="dialogTableVisible = true">销售费用</el-button>
                        </td>
                        <td style="text-align: center;">4</td>
                        <td style="text-align: right;">-66666.22</td>
                        <td style="text-align: right;">454.00</td>
                    </tr>
                    <tr>
                        <td style="padding-left:60px;">
                            <el-button type="text" @click="dialogTableVisible = true">管理费用</el-button>
                        </td>
                        <td style="text-align: center;">5</td>
                        <td style="text-align: right;">-66666.22</td>
                        <td style="text-align: right;">454.00</td>
                    </tr>
                    <tr>
                        <td style="padding-left:60px;">
                            <el-button type="text" @click="dialogTableVisible = true">财务费用</el-button>
                        </td>
                        <td style="text-align: center;">6</td>
                        <td style="text-align: right;">-66666.22</td>
                        <td style="text-align: right;">454.00</td>
                    </tr>
                    <tr>
                        <td style="padding-left:60px;">
                            <el-button type="text" @click="dialogTableVisible = true">资产减值损失</el-button>
                        </td>
                        <td style="text-align: center;">7</td>
                        <td style="text-align: right;">-66666.22</td>
                        <td style="text-align: right;">454.00</td>
                    </tr>
                    <tr>
                        <td style="padding-left:33px;">
                            <el-button type="text" @click="dialogTableVisible = true"> 加：投资收益（损失以“-”号填列）</el-button>
                        </td>
                        <td style="text-align: center;">8</td>
                        <td style="text-align: right;">-66666.22</td>
                        <td style="text-align: right;">454.00</td>
                    </tr>
                    <tr>
                        <td style="padding-left:60px;">
                            <el-button type="text" @click="dialogTableVisible = true"> 公允价值变动收益（损失以“-”号填列  公允价值变动收益</el-button>
                        </td>
                        <td style="text-align: center;">9</td>
                        <td style="text-align: right;">-66666.22</td>
                        <td style="text-align: right;">454.00</td>
                    </tr>
                    <tr>
                        <td>二、营业利润（亏损以“-”号填列）</td>
                        <td style="text-align: center;">10</td>
                        <td style="text-align: right;">-66666.22</td>
                        <td style="text-align: right;">454.00</td>
                    </tr>
                    <tr>
                        <td style="padding-left:33px;">
                            <el-button type="text" @click="dialogTableVisible = true">加：营业外收入</el-button>               
                        </td>
                        <td style="text-align: center;">11</td>
                        <td style="text-align: right;">-66666.22</td>
                        <td style="text-align: right;">454.00</td>
                    </tr>
                    <tr>
                        <td style="padding-left:33px;">
                            <el-button type="text" @click="dialogTableVisible = true">减：营业外支出</el-button>         
                        </td>
                        <td style="text-align: center;">12</td>
                        <td style="text-align: right;">-66666.22</td>
                        <td style="text-align: right;">454.00</td>
                    </tr>
                    <tr>
                        <td>三、利润总额（亏损以“-”号填列）</td>
                        <td style="text-align: center;">13</td>
                        <td style="text-align: right;">-66666.22</td>
                        <td style="text-align: right;">454.00</td>
                    </tr>
                    <tr>
                        <td style="padding-left:33px;">
                            <el-button type="text" @click="dialogTableVisible = true">减：所得税</el-button>
                        </td>
                        <td style="text-align: center;">14</td>
                        <td style="text-align: right;">-66666.22</td>
                        <td style="text-align: right;">454.00</td>
                    </tr>
                    <tr>
                        <td>四、净利润（净亏损以“-”号填列）</td>
                        <td style="text-align: center;">15</td>
                        <td style="text-align: right;">-66666.22</td>
                        <td style="text-align: right;">454.00</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="8" style="text-align: right;">
                            1-32 共32条
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <!-- table结束 -->

        <!-- 编辑公式-减，营业成本弹出层 -->
        <el-dialog title="编辑公式-减:营业成本" :visible.sync="dialogTableVisible" size="small" top="20%" :close-on-click-modal="false">
            <div class="profit-dialog">
                <span>科目</span>
                <!-- 搜索科目 -->
                <el-autocomplete size="small" v-model="sub.text" :fetch-suggestions="subjectSearch" placeholder="请输入选择科目" @select="subjectSelect"></el-autocomplete>
                <el-button type="primary" size="small" @click="addSubjectEx()">添加</el-button>
            </div>
            <!-- 编辑的表格 -->
            <el-table :data="dialogData" border height="200" :summary-method="getSummaries" show-summary style="width: 100%; margin-top: 20px">
                <el-table-column prop="project" label="项目" header-align="center">
                </el-table-column>
                <el-table-column prop="operator" label="运算方式" header-align="center" align="center" width="100">
                </el-table-column>
                <el-table-column prop="current" label="本月金额" align="right" header-align="center">
                </el-table-column>
                <el-table-column prop="next" label="本年累计金额" align="right" header-align="center">
                </el-table-column>
                <el-table-column label="操作" width="120" header-align="center" align="center">
                    <template scope="scope">
                        <el-button @click.native.prevent="deleteRow(scope.$index, dialogData)" type="text" size="small">
                            <i class="el-icon-close"></i>
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
            <!-- 编辑的表格 -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="saveFormula()" size="small">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑公式-减，营业成本弹出层 -->
    </div>
</template>
<script>
export default {
    name: 'profit',
    data() {
        return {
            //月报与季报
            monthly: [{
                value: '月报',
                label: '月报'
            }, {
                value: '季报',
                label: '季报'
            }],
            month:'月报',
            //选择
            checked: true,
            //会计期间
            periodsList: [],
            //会计期间uid
            periodUid: '',
            //会计年度
            year:'',
            //期间
            period:'',
            //表格数据
            sheetData: [],
            //弹出默认
            dialogTableVisible: false,
            //弹出层对应的公式uid
            reportUid:'',
            //弹出table数据
            dialogData: [],
            //弹出层 科目搜索
            sub : {
                text:'',
                code:''
            },     
        }
    },
    created() {
        this.getSubjectData();//生成科目树并更新科目数据
    },
    mounted() {
        this.getPeriodsCurrencysData();//会计期间数据
    },
    methods: {
        //会计期间
        getPeriodsCurrencysData() {
            let Vue = this;
            Vue.AxiosPost('getPeriodsCurrencysList', {
                accbookUid: Vue.$store.state.accbookUid
            }, function(e) {
                if (e.code === '1') {
                    e.data.acctBookInfo.periods.forEach((n, i) => {
                        Vue.periodsList.push({
                            year:n.iyear,//会计期间年
                            period:n.iperiod,//会计期间
                            value: n.aperiodUid,
                            label: n.iyear + '年' + n.iperiod + '期'
                        });
                    });
                    //默认会计期间
                    Vue.periodUid = Vue.periodsList[0].value;
                    Vue.year = Vue.periodsList[0].year;
                    Vue.period=Vue.periodsList[0].period;
                    Vue.getReportForm();
                } else if (e.code === '1006') {
                    Vue.periodsList = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //根据选择的会计期间 取出对应的年度与期间,得到不同期间的资产负载表数据
        selectPer(){
            this.periodsList.forEach((n,i)=>{
                if(this.periodUid===n.value){
                    this.period=n.period;
                    this.year=n.year;
                }
            });
            this.getReportForm();      
        },
        //得到资产负债表或利润表信息
        getReportForm() {        
            let Vue = this;
            Vue.AxiosPost('getReportForm', {
                acctBookUid: Vue.$store.state.accbookUid,
                year: Vue.year,
                period: Vue.period,
                reportName: "ZCFZ"
            }, function(e) {
                if (e.code === '1') {
                    Vue.sheetData=[];
                    e.data.reportFormListResult.forEach((n, i) => {
                        Vue.sheetData.push({
                            formula: n.formula,
                            location: n.location,
                            monthSum: n.monthSum,
                            reportUid: n.reportUid,
                            yearSum: n.yearSum
                        })
                    })
                } else if (e.code === '1006') {
                    Vue.sheetData=[];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //弹出对应的编辑公式层,解析公式,公式uid
        dialogTable(str,reportUid) {
            //弹出框打开
            this.dialogTableVisible = true;
            //公式uid
            this.reportUid=reportUid;
            //处理公式
            if(str!='0'){
                let data = []
                let str1 = str.substr(1);
                let str2 = str1.split(')');
                for (var i = str2.length - 2; i >= 0; i--) {
                    var formulas = {};
                    formulas.location = str2[i].substr(0, 1) + "," + str2[i].split('(')[1].split(',')[0] + "," + str2[i].split('(')[1].split(',')[1];//运算符，科目，取数规则
                    formulas.formula1 = 'YE(\'PE\',' + str2[i].split('(')[1].split(',')[0] + ',' + str2[i].split('(')[1].split(',')[1] + ')';//期末数
                    formulas.formula2 = 'YE(\'YB\',' + str2[i].split('(')[1].split(',')[0] + ',' + str2[i].split('(')[1].split(',')[1] + ')';//年初数
                    data.push(formulas);
                };
                //请求公式计算结果
                let Vue = this;
                Vue.AxiosPost('getFormulaSum', {
                    acctBookUid: Vue.$store.state.accbookUid,
                    year: Vue.year,
                    period: Vue.period,
                    formulas: JSON.stringify(data)
                }, function(e) {
                    if (e.code === '1') {
                        Vue.dialogData=[];
                        e.data.formulaSums.forEach((n, i) => {
                            let loc = n.location.split(',');
                            let data = {
                                monthSum: n.formula1,//期末数
                                yearSum: n.formula2,//年初数
                                sub: loc[1].replace(/'|"/g, ""),//科目编码
                                yf: loc[0].replace(/'|"/g, ""),//运算方式
                                qs: loc[2].replace(/'|"/g, "")//取数规则
                            }
                            //科目变成带文字的科目
                            Vue.$store.state.subjectAllList.forEach((n, i) => { 
                                if (n.code == data.sub) {
                                    data.subVal = n.value;
                                }
                            });
                            //dc,cr,dr变成文字
                            if (data.qs === 'DC') {
                                data.fetch = '余额';
                            } else if (data.qs === 'DR') {
                                data.fetch = '借方余额';
                            } else {
                                data.fetch = '贷方余额';
                            }
                            Vue.dialogData.push(data);
                        })
                    } else {
                        Vue.Message(e.msg, 'error');
                    }
                });
            }
        },
        //科目搜索
        subjectSearch(queryString, callback) {
            let sub = this.$store.state.subjectAllList;
            let results = queryString ? sub.filter(this.subjectFilter(queryString)) : sub;
            callback(results);
        },
        subjectFilter(queryString) {
            return (res) => {
                return (res.value.indexOf(queryString.toLowerCase()) === 0);
            };
        },
        //科目搜索
        //科目选择
        subjectSelect(item) {
            this.sub.code = item.code;
        },
        //添加一条规则
        addSubjectEx() {
            let data1 = []
            data1.push({
                location: this.operator + "," +"'"+this.sub.code +"'"+ "," + this.fetchVal,
                formula1: 'YE(\'PE\',' +"'"+this.sub.code +"'"+ ',' + this.fetchVal + ')',
                formula2: 'YE(\'YB\',' +"'"+this.sub.code +"'"+ ',' + this.fetchVal + ')'
            });
            //请求公式计算结果
            let Vue = this;
            Vue.AxiosPost('getFormulaSum', {
                acctBookUid: Vue.$store.state.accbookUid,
                year: Vue.year,
                period: Vue.period,
                formulas: JSON.stringify(data1)
            }, function(e) {
                if (e.code === '1') {
                    //重置添加数据
                    Vue.sub.text='';
                    Vue.operator="+";
                    Vue.fetchVal="'DC'";
                    e.data.formulaSums.forEach((n, i) => {
                        let loc = n.location.split(',');
                        let data = {
                            monthSum: n.formula1,//期末数
                            yearSum: n.formula2,//年初数
                            sub: loc[1].replace(/'|"/g, ""),//科目编码
                            yf: loc[0].replace(/'|"/g, ""),//运算方式
                            qs: loc[2].replace(/'|"/g, "")//取数规则
                        }
                        //科目变成带文字的科目
                        Vue.$store.state.subjectAllList.forEach((n, i) => {
                            if (n.code == data.sub) {
                                data.subVal = n.value;
                            }
                        });
                        //dc,cr,dr变成文字
                        if (data.qs === 'DC') {
                            data.fetch = '余额';
                        } else if (data.qs === 'DR') {
                            data.fetch = '借方余额';
                        } else {
                            data.fetch = '贷方余额';
                        }
                        Vue.dialogData.push(data);
                    })
                }else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        // 弹出层自动计算
        getSummaries() {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '总价';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[index] += '';
                } else {
                    sums[index] = '';
                }
            });
            return sums;
        },
        //移除当前行
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        //保存公式
        saveFormula(){
            this.dialogTableVisible = false;
            console.log(this.dialogData);
            let Formula="0";
            this.dialogData.forEach((n,i)=>{
                Formula+=n.yf+'YE'+'('+'"'+n.sub+'"'+','+'"'+n.qs+'"'+')';
            })
            console.log(Formula);
            let Vue = this;
            Vue.AxiosPost('setReportFormula', {
                reportUid: Vue.reportUid,
                formula:Formula
            }, function(e) {
                if (e.code === '1') {
                    Vue.getReportForm();
                   Vue.Message(e.msg, 'success'); 
                }                  
                 else {
                    Vue.Message(e.msg, 'error');
                }
            });
                 
        }
    }
}
</script>
<style lang='scss'>
#profit {
    .el-row {
        line-height: 36px;
        margin-bottom: 15px;
        .vl-top-left {
            // 月报 
            .forms {
                width: 90px;
                height: 30px;
            } //期间
            .preiod {
                width: 140px;
                height: 30px;
            }
            .profit-check {
                margin-left: 25px;
                .el-checkbox__inner {
                    width: 15px;
                    height: 15px;
                }
                .el-checkbox__inner::after {
                    box-sizing: content-box;
                    content: "";
                    border: 2px solid #fff;
                    border-left: 0;
                    border-top: 0;
                    height: 6px;
                    left: 4px;
                }
                .el-checkbox__label {
                    font-size: 12px;
                    padding-left: 5px;
                }
            }
            float: left;
            .vl-span {
                float: left;
                margin-right: 10px;
            }
        }
        .vl-top-right {
            float: right;
        }
    }
    .profit-table {
        background-color: #fff;
        color: #555;
        font-family: tahoma, arial, 宋体;
        font-size: 12px;
        border-collapse: collapse;
        /*相邻边被合并;separate: 边框独立*/
        border: none;
        width: 100%;
        /* td 内容太多，想自动换行 */
        table-layout: fixed;
        tbody tr {
            &:nth-child(odd) {
                background-color: #fff;
            }
            &:nth-child(even) {
                background-color: #f8f8f8;
            }
            &:hover {
                background-color: rgb(254, 238, 150);
            }
        }
        thead {
            background-color: #eee;
            tr td {
                font-weight: bold;
                text-align: center;
            }
        }
        td {
            font-weight: 400;
            overflow: hidden;
            white-space: pre;
            height: 34px;
            padding: 0 5px;
            border: solid #CCC 1px;
            /* td 内容太多，想自动换行 */
            word-wrap: break-word;
            button span {
                color: #555;
                cursor: pointer;
                outline: none;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
    .el-dialog--small {
        width: 800px;
    }
    .sheet-dialog {
        padding: 10px 5px 20px 5px;
        .operator-box {
            padding-left: 5px;
            padding-right: 5px;
        }
        .operator {
            width: 70px;
            height: 30px;
        }
        .fetch {
            width: 140px;
            height: 30px;
        }
    }
}

</style>