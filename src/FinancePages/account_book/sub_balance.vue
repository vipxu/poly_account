<!-- 科目余额表 -->
<template>
    <div id="sub">
        <!-- 头开始 -->
        <div class="sub-top">
            <div class="sub-top-left">
                <!-- 下拉选择填写框显示 -->
                <span class="fz4 sub-span">科目余额表</span>
                <!-- 科目余额表期数下拉 -->
                <div class="accout-sub">
                    <div class="ui-btn-menu " :class="periodstate==true? 'ui-btn-menu-cur' : ''" @click="pullDown()">
                        <div class="ui-btn menu-btn" v-cloak>
                            <span>{{periodBegin}}</span>
                            <span v-show="periodEndshow">至</span>
                            <span v-show="periodEndshow">{{periodEnd}}</span>
                            <b></b>
                        </div>
                    </div>
                    <!--科目余额多少期选择刷新数据 -->
                    <el-form :model="subForm" ref="subForm">
                        <div class="con" v-show="periodstate">
                            <ul>
                                <li>
                                    <span>会计期间：</span>
                                    <template>
                                        <el-select v-model="subForm.accountantBegin" placeholder="2017年1期" size="small">
                                            <el-option v-for="item in periodsList" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                    <span>至</span>
                                    <template>
                                        <el-select v-model="subForm.accountantEnd" placeholder="2017年1期" size="small">
                                            <el-option v-for="item in periodsList" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                    <span>
                                        <i class="el-icon-time"></i>
                                    </span>
                                </li>
                                <li class="subject">
                                    <span>起始科目：</span>
                                    <el-autocomplete size="small" class="inline-input" v-model="subForm.subjectBegin" :fetch-suggestions="subjectSearch" placeholder="请输入起始科目" @select="subjectSelect1"></el-autocomplete>

                                </li>
                                <li class="subject">
                                    <span>结束科目：</span>
                                    <el-autocomplete size="small" class="inline-input" v-model="subForm.subjectEnd" :fetch-suggestions="subjectSearch" placeholder="请输入起始科目" @select="subjectSelect2"></el-autocomplete>
                                </li>
                                <li>
                                    <span>科目级次：</span>
                                    <el-input v-model="subForm.subjectRankBegin" size="small" style="width:65px;" type="number" min="1" max="9" placeholder="1~9" @blur="changeLelS(subForm.subjectRankBegin)"></el-input>
                                    <span style="margin-left:45px;">至</span>
                                    <el-input v-model="subForm.subjectRankEnd" size="small" style="width:65px;" type="number" min="1" max="9" placeholder="1~9" @blur="changeLelE(subForm.subjectRankEnd)"></el-input>
                                </li>
                                <li>
                                    <span style="padding-right:28px;">币别：</span>
                                    <template>
                                        <el-select v-model="subForm.Currency" placeholder="请选币别" size="small" @change="curstyle">
                                            <el-option v-for="item in currencysList" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </li>
                                <li>
                                    <el-checkbox label="显示辅助核算" name="type" v-model="subForm.showAuxiliary"></el-checkbox>
                                </li>
                                <li>
                                    <el-checkbox label="余额为0不显示" name="type" v-model="subForm.showBalNotZero"></el-checkbox>
                                </li>
                                <li>
                                    <el-checkbox label="无发生额且余额为0不显示" name="type" v-model="subForm.showBalAndActualNotZero"></el-checkbox>
                                </li>
                            </ul>
                            <div class="sub-top-right">
                                <el-button size="small" @click="resetForm()">重置</el-button>
                                <el-button type="primary" size="small" @click="submitForm()">确定</el-button>
                            </div>
                        </div>
                    </el-form>
                    <!--科目余额多少期选择刷新数据 -->
                </div>
                <!-- 科目余额表期数下拉 -->
                <!-- 展开所有级次 -->
                <!-- <div class="expandAll">
                    <el-switch v-model="expandAll" on-text="" off-text="" @change="a">
                    </el-switch>
                </div>
                <span class="fz4 sub-span">展开所有级次</span> -->
                
                <!-- 展开所有级次 -->
                <div class="sub-upload">
                    <el-button size="small" @click="updatedTableDate()">刷新</el-button>
                </div>
            </div>
            <div class="sub-top-right">
                <el-button type="primary" size="small">打印</el-button>
                <el-button size="small">导出 </el-button>
            </div>
        </div>
        <!-- 头结束 -->
        <!-- table开始 -->
        <div class="el-card--custom">
            <template>
                <treegrid :columns="standard" :tree-structure="true" :data-source="tableData" v-show="styleshow===1" :defaultExpandAll="expandAll" :periodData='submitAccountForm'></treegrid>
                <morestyle :columns="morestyle" :tree-structure="true" :data-source="tableData" v-show="styleshow===0" :periodData='submitAccountForm'></morestyle>
            </template>
        </div>
        <!-- table结束 -->
    </div>
</template>
<script>
import TreeGrid from '@/components/Tree_grid'
import MoreStyle from '@/components/sub_tree'
export default {
    name: 'sub',
    components: {
        'treegrid': TreeGrid,
        'morestyle':MoreStyle
    },
    data() {
        return {
            //是否展开所有级次
            expandAll:false,
            //标准模式
            standard: [
                {
                    text: '科目编码',
                    dataIndex: 'accountCode'
                },
                {
                    text: '科目名称',
                    dataIndex: 'accountName'
                },
                {
                    text: '借方',
                    dataIndex: 'beginCr'
                },
                {
                    text: '贷方',
                    dataIndex: 'beginCrF'
                },
                {
                    text: '借方',
                    dataIndex: 'dr'
                },
                {
                    text: '贷方',
                    dataIndex: 'cr'
                },
                {
                    text: '借方',
                    dataIndex: 'yearDr'
                },
                {
                    text: '贷方',
                    dataIndex: 'yearCr'
                },
                {
                    text: '借方',
                    dataIndex: 'endDr'
                },
                {
                    text: '贷方',
                    dataIndex: 'endCr'
                }
            ],
            //有外币模式
            morestyle: [
                {
                    text: '科目编码',
                    dataIndex: 'accountCode'
                },
                {
                    text: '科目名称',
                    dataIndex: 'accountName'
                },
                //期初
                {
                    text: '借方(原币)',
                    dataIndex: 'beginDrF'
                },
                {
                    text: '借方(本位币)',
                    dataIndex: 'beginDr'
                },
                {
                    text: '贷方(原币)',
                    dataIndex: 'beginCrF'
                },
                {
                    text: '贷方(本位币)',
                    dataIndex: 'beginCr'
                },
                //本期
                {
                    text: '借方(原币)',
                    dataIndex: 'drF'
                },
                {
                    text: '借方(本位币)',
                    dataIndex: 'dr'
                },
                {
                    text: '贷方(原币)',
                    dataIndex: 'crF'
                },
                {
                    text: '贷方(本位币)',
                    dataIndex: 'cr'
                },
                //本年
                {
                    text: '借方(原币)',
                    dataIndex: 'yearDrF'
                },
                {
                    text: '借方(本位币)',
                    dataIndex: 'yearDr'
                },
                {
                    text: '贷方(原币)',
                    dataIndex: 'yearCrF'
                },
                {
                    text: '贷方(本位币)',
                    dataIndex: 'yearCr'
                },
                //期末
                {
                    text: '借方(原币)',
                    dataIndex: 'endDrF'
                },
                {
                    text: '借方(本位币)',
                    dataIndex: 'endDr'
                },
                {
                    text: '贷方(原币)',
                    dataIndex: 'endCrF'
                },
                {
                    text: '贷方(本位币)',
                    dataIndex: 'endCr'
                }
            ],
            //风格显示
            styleshow: undefined,
            //风格显示
            //期间显示
            periodBegin: '',
            //期间显示
            //期间显示
            periodEnd: '',
            //期间显示
            //期间后半段是否显示
            periodEndshow: false,
            //期间后半段是否显示

            //会计期间列表
            periodsList: [],
            //会计期间列表

            //币别列表
            currencysList: [],
            //币别列表

            //科目code
            subcodeStart: '',
            subcodeEnd: '',
            //科目code

            //明细账期数下拉框是否显示
            periodstate: false,

            //form表单的初始数据
            subForm: {
                //会计开始时间
                accountantBegin: '',
                //至结束时间
                accountantEnd: '',
                //科目
                subjectBegin: '',
                subjectEnd: '',
                //科目
                //科目级别
                subjectRankBegin: '',
                subjectRankEnd: '',
                //科目级别

                //币别
                Currency: '',
                //币别

                //币别类型
                currencystyle: '',
                //币别类型

                //多项选择
                //显示辅助核算
                showAuxiliary: false,
                //显示辅助核算

                //显示余额不为0
                showBalNotZero: false,
                //显示余额不为0

                //显示余额与发生额都不为0
                showBalAndActualNotZero: false,
                //显示余额与发生额都不为0
            },
            //form表单的初始数据
            //form表单提交数据
            submitAccountForm: {
                periodStart:'',
                periodEnd:'',
                //UID
                acctBookUid: this.$store.state.accbookUid,
                //UID
            },
            //form表单提交数据
            //余额表格数据
            tableData: [],
            //余额表格数据
        }
        //return结束
    },
    //data结束
    created() {
        this.getSubjectData();//生成科目树并更新科目数据
        // this.getPeriodsCurrencysList();//从状态管理会计期间币种
    },
    mounted() {
        this.getPeriodsCurrencysData();//会计期间数据
    },
    methods: {
        //级次显示风格
        changeLelS(number) {
            if (parseFloat(number) < 1) {
                this.subForm.subjectRankBegin = '1';
            } else if (parseFloat(number) > 9) {
                this.subForm.subjectRankBegin = '9';
            }
        },
        changeLelE(number) {
            if (parseFloat(number) < 1) {
                this.subForm.subjectRankEnd= '1';
            } else if (parseFloat(number) > 9) {
                this.subForm.subjectRankEnd = '9';
            }
        },
        //级次显示风格

        //点击出现下拉选择
        pullDown() {
            this.periodstate = !this.periodstate;
        },
        //点击出现下拉选择

        //这里要重新获取数据,获取会计期间数据
        getPeriodsCurrencysData() {
            let Vue = this;
            Vue.AxiosPost('getPeriodsCurrencysList', {
                accbookUid: Vue.$store.state.accbookUid
            }, function(e) {
                if (e.code === '1') {
                    let per = [];
                    let cur = [];
                    per = e.data.acctBookInfo.periods;
                    cur = e.data.acctBookInfo.currencys;
                    per.forEach((n, i) => {
                        Vue.periodsList.push({
                            value: n.yearPeriod + '',
                            label: n.iyear + '年' + n.iperiod + '期'
                        });
                    });
                    cur.forEach((n, i) => {
                        Vue.currencysList.push({
                            value: n.currencyUid,
                            label: n.currencyName,
                            currencystyle: n.homeCurrency
                        });
                    });
                    Vue.currencysList.splice(1,1);
                    Vue.defaultSelect();
                    Vue.submitForm();
                } else if (e.code === '1006') {
                    Vue.periodsList = [];
                    Vue.currencysList = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //提交数据处理

        //币别类型选择
        curstyle(data) {
            this.currencysList.forEach((n, i) => {
                if (n.value === data) {
                    this.subForm.currencystyle = n.currencystyle;
                }
            });
        },
        //币别类型选择

        //默认选中
        defaultSelect() {
            //这里会计期间不能用状态管理，状态异步，数据可能不没有获取到就要渲染页面
            let per = this.periodsList;
            //这里会计期间不能用状态管理，状态异步，数据可能不没有获取到就要渲染页面
            let cur = this.currencysList;
            //默认选中会计期间最后一期
            this.subForm.accountantBegin = per[0].value;
            this.subForm.accountantEnd = per[0].value;

            this.periodBegin = per[0].label;

            //默认选中币别最后一期
            this.subForm.Currency = cur[0].value;
            //默认选中表格显示方式,要在dom操作变化之后才执行
            this.$nextTick(() => {
                this.styleshow = cur[0].currencystyle;
            });
        },
        //默认选中

        //这里是期间显示多少期，上面同步变化
        periodChange() {
            let a = this.periodsList;
            a.forEach((n, i) => {
                //this.subForm.accountantBegin拿的是aperiodUid
                if (this.subForm.accountantBegin === n.value) {
                    this.periodBegin = n.label;
                };
                if (this.subForm.accountantEnd === n.value) {
                    this.periodEnd = n.label;
                };
                //选择期间不同是 显示期间段
                if (this.subForm.accountantBegin === this.subForm.accountantEnd) {
                    this.periodEndshow = false;
                } else {
                    this.periodEndshow = true;
                }
                // 选择期间不同是 显示期间段
            });
        },
        //这里是期间显示多少期，上面同步变化
        doSubmit() {
            //期间
            this.submitAccountForm.periodStart = this.subForm.accountantBegin,
            this.submitAccountForm.periodEnd = this.subForm.accountantEnd,
            //期间
            //科目传编码过去
            this.submitAccountForm.subjectCodeStart = this.subcodeStart,
            this.submitAccountForm.subjectCodeEnd = this.subcodeEnd,
            //科目传编码过去
            //级别
            this.submitAccountForm.subjectLevelStart = this.subForm.subjectRankBegin,
            this.submitAccountForm.subjectLevelEnd = this.subForm.subjectRankEnd,
            //级别
            //币别
            this.submitAccountForm.currency = this.subForm.Currency,
            //币别
            //辅助核算
            this.submitAccountForm.showAuxiliary = this.subForm.showAuxiliary,
            this.submitAccountForm.showBalNotZero = this.subForm.showBalNotZero,
            this.submitAccountForm.showBalAndActualNotZero = this.subForm.showBalAndActualNotZero
            //辅助核算
        },
        //提交数据处理

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
        subjectSelect1(item) {
            //这里把code存起来传到后台去
            this.subcodeStart = item.code;
        },
        subjectSelect2(item) {
            //这里把code存起来传到后台去
            this.subcodeEnd = item.code;
        },
        //科目选择

        //刷新table数据
        updatedTableDate() {
            // 明细账科目树
            this.tableData=[];
            let Vue = this;
            Vue.AxiosPost('getBalanceTotalContent', Vue.submitAccountForm, function(e) {
                if (e.code === '1') {
                    Vue.tableData = Vue.count(e.data.balanceTotalResult);
                } else if (e.code === '1006') {
                    Vue.tableData = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //刷新table数据

        //科目余额循环
        count(a) {
            let subData = [];
            for (let i = 0, l = a.length; i < l; i++) {
                subData[i] = {
                    //科目编码
                    accountCode: a[i].accountCode,
                    //科目名称
                    accountName: a[i].accountName,
                    //期初余额贷方（本位币）
                    beginCr: a[i].beginCr,
                    //期初余额贷方（原币）
                    beginCrF: a[i].beginCrF,
                    //期初余额借方（本位币）
                    beginDr: a[i].beginDr,
                    //期初余额借方（原币）
                    beginDrF: a[i].beginDrF,
                    //本期累计发生额贷方（本位币）
                    cr: a[i].cr,
                    //本期累计发生额贷方（原币）
                    crF: a[i].crF,
                    //本期累计发生额借方（本位币）
                    dr: a[i].dr,
                    //本期累计发生额借方（原币）
                    drF: a[i].drF,
                    //期末余额贷方（本位币）
                    endCr: a[i].endCr,
                    //期末余额贷方（原币）
                    endCrF: a[i].endCrF,
                    //期末余额借方（本位币）
                    endDr: a[i].endDr,
                    //期末余额借方（原币）
                    endDrF: a[i].endDrF,
                    //本年累计发生额贷方（本位币）
                    yearCr: a[i].yearCr,
                    //本年累计发生额贷方（原币）
                    yearCrF: a[i].yearCrF,
                    //本年累计发生额借方（本位币）
                    yearDr: a[i].yearDr,
                    //本年累计发生额借方（原币）
                    yearDrF: a[i].yearDrF
                };
                if (a[i].lowerLevel.length !== 0) {
                    subData[i].children = this.count(a[i].lowerLevel);
                }
            }
            return subData;
        },
        //科目余额数组循环

        //提交表单获取科目树，明细账内容
        submitForm() {
            //弹窗关闭
            this.periodstate = false;
            //期数数据提交改变页面的期数显示
            this.periodChange();
            //期数数据提交改变页面的期数显示
            this.doSubmit();
            // table数据显示风格布局
            this.styleshow = this.subForm.currencystyle;
            // table数据显示风格布局
            //明细账科目树
            if (parseFloat(this.submitAccountForm.periodStart) > parseFloat(this.submitAccountForm.periodEnd)) {
                this.Message('起始会计期间不能大于结束会计期间', 'error');
            }
            else if (parseFloat(this.submitAccountForm.subjectLevelStart) > parseFloat(this.submitAccountForm.subjectLevelEnd)) {
                this.Message('起始科目级次不能大于结束科目级次', 'error');
            } else {
                let Vue = this;
                Vue.AxiosPost('getBalanceTotalContent', Vue.submitAccountForm, function(e) {
                    if (e.code === '1') {
                        Vue.tableData=[];
                        Vue.tableData = Vue.count(e.data.balanceTotalResult);                     
                    } else if (e.code === '1006') {
                        Vue.tableData = [];
                    } else {
                        Vue.Message(e.msg, 'error');
                    }
                });
            }
        },
        //提交表单获取科目树，明细账内容
        //表格数据重置  这里重置是先前默认的不重置，其他的要清空。
        resetForm() {
            this.defaultSelect();
            this.subForm.subjectBegin = '',
                this.subForm.subjectEnd = '',
                //科目
                //科目级别
                this.subForm.subjectRankBegin = '',
                this.subForm.subjectRankEnd = '',
                //科目级别
                //多项选择
                this.subForm.showAuxiliary = false,
                this.subForm.showBalNotZero = false,
                this.subForm.showBalAndActualNotZero = false
        }
        //表格数据重置
    },
}
</script>

<style lang='scss'>
#sub {
  .sub-top {
    color: #555;
    width: 100%;
    height: 45px;
    .sub-span, .accout-sub, .expandAll, .sub-upload {
      float: left;
    }
    .sub-span {
      line-height: 28px;
    }
    .accout-sub {
      margin: 0 18px 0 10px;
    }
    .expandAll {
      line-height: 28px;
      margin-right: 15px;
    }
    .sub-upload{
        margin-left: 10px;
    }
  }
  .ui-btn-menu {
    vertical-align: middle;
    zoom: 1;
    z-index: 3;
  }
  .ui-btn-menu-cur .menu-btn {
    &:active, &:hover {
      padding-bottom: 1px;
      background: #fff !important;
      border-bottom: none;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      box-shadow: none;
    }
  }
  .ui-btn-menu .menu-btn {
    position: relative;
    margin-right: 0;
    padding-right: 20px;
    z-index: 3;
  }
  .ui-btn-menu-cur .ui-btn {
    border-bottom: 1px solid #fff;
    background-color: #fff;
  }
  .ui-btn {
    display: inline-block;
    padding: 0 6px;
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    border: 1px solid rgb(191, 207, 217);
    border-radius: 2px;
    background: #fff;
    color: #555;
    vertical-align: middle;
    cursor: pointer;
  }
  .ui-btn-menu .menu-btn b {
    font-size: 0;
    position: absolute;
    right: 4px;
    top: 50%;
    margin-top: -2px;
    border-width: 6px;
    border-color: #bfcfd9 #fff #fff;
    border-style: solid;
    height: 0;
    overflow: hidden;
    -webkit-transition: -webkit-transform 150ms ease-in;
    transition: -webkit-transform 150ms ease-in;
    transition: transform 150ms ease-in;
    transition: transform 150ms ease-in, -webkit-transform 150ms ease-in;
  }
  .ui-btn-menu-cur .menu-btn b {
    -moz-transform: rotate(180deg);
    -moz-transform-origin: 50% 30%;
    -webkit-transform: rotate(180deg);
    -webkit-transform-origin: 50% 30%;
    -o-transform: rotate(180deg);
    -o-transform-origin: 50% 20%;
    transform: rotate(180deg);
    transform-origin: 50% 30%;
    filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
  }
  .sub-top-left .con {
    width: 340px;
    padding: 15px;
    position: absolute;
    top: 27px;
    left: 80px;
    border: 1px solid #c1c1c1;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    background-color: #fff;
    z-index: 2;
    ul li {
      padding-bottom: 20px;
      list-style-type: none;
      font-size: 14px;
      text-align: -webkit-match-parent;
      color: #555;
    }
    .el-input--small .el-input__inner {
      height: 30px;
      width: 112px;
    }
    .el-input__icon {
      right: -4px;
    }
    ul .subject .el-input__inner {
      width: 246px;
    }
  }
  .sub-top {
    .sub-top-left {
      .el-input__icon + .el-input__inner, .el-select .el-input__inner {
        padding-right: 0px;
      }
    }
    .sub-top-right {
      padding-right: 20px;
      float: right;
      .el-button {
        width: 60px;
      }
    }
  }
}
</style>