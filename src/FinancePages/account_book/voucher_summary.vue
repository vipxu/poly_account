<!-- 凭证汇总表 -->
<template>
    <div id="voucher_summary">
        <!-- 头开始 -->
        <div class="voucher_summary-top">
            <div class="voucher_summary-top-left">
                <span class="fz4 voucher_summary-span">凭证汇总表</span>
                <!-- 明细账期数 -->
                <div class="accout-voucher_summary">
                    <div class="ui-btn-menu" id="filter-menu" :class="periodstate==true? 'ui-btn-menu-cur' : ''" @click="pullDown()">
                        <div class="ui-btn menu-btn" v-cloak>
                            <span v-text="periodBegin"></span>
                            <span v-show="periodEndshow">至</span>
                            <span v-text="periodEnd" v-show="periodEndshow"></span>
                            <b></b>
                        </div>
                    </div>
                    <!-- 凭证汇总表多少期选择刷新数据 -->
                    <el-form :model="summaryForm" ref="summaryForm">
                        <div class="con" v-show="periodstate">
                            <ul>
                                <li class="day">
                                    <el-form-item label="汇总日期">
                                        <el-col :span="8">
                                            <el-form-item>
                                                <el-date-picker v-model="pickerOptionsBegin" type="date" placeholder="选择日期" style="width:105px;" size="small" popper-class="voucher_summary_day" :clearable="false" >
                                                </el-date-picker>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="3">至</el-col>
                                        <el-col :span="8">
                                            <el-form-item>
                                                <el-date-picker v-model="pickerOptionsEnd" type="date" placeholder="选择日期" style="width:105px;" size="small" popper-class="voucher_summary_day" :clearable="false">
                                                </el-date-picker>
                                            </el-form-item>
                                        </el-col>
                                    </el-form-item>
                                </li>
                                <li class="voucherword">
                                    <el-form-item label="凭证字" prop="dsignUid">
                                        <el-select v-model="summaryForm.dsignUid" size="small" style="width:65px;" placeholder="不限">
                                            <el-option v-for="item in voucherWordOptions" :key="item.value" :label="item.label" :value="item.value" size="small">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </li>
                                <li>
                                    <el-form-item label="凭证号">
                                        <el-col :span="8">
                                            <el-form-item prop="inoIdStart">
                                                <el-input v-model="summaryForm.inoIdStart" size="small" type='number' style="width:65px;" placeholder="凭证号"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="3">至</el-col>
                                        <el-col :span="8">
                                            <el-form-item prop="inoIdEnd">
                                                <el-input v-model="summaryForm.inoIdEnd" size="small" type='number' style="width:65px;" placeholder="凭证号"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-form-item>
                                </li>
                                <li>
                                    <el-form-item label="科目级次">
                                        <el-col :span="8">
                                            <el-form-item prop="subjectLevelStart">
                                                <el-input v-model="summaryForm.subjectLevelStart" size="small" placeholder="1~9" style="width:65px;" type='number' @blur="changeLelS(summaryForm.subjectLevelStart)"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="3">至</el-col>
                                        <el-col :span="8">
                                            <el-form-item prop="subjectLevelEnd">
                                                <el-input v-model="summaryForm.subjectLevelEnd" size="small" style="width:65px;" placeholder="1~9" type='number' @blur="changeLelE(summaryForm.subjectLevelEnd)"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-form-item>
                                </li>
                            </ul>
                            <el-form-item>
                                <div class="voucher_summary-top-right">
                                    <el-button size="small" @click="resetForm('summaryForm')">重置</el-button>
                                    <el-button type="primary" size="small" @click="submitForm('summaryForm')">确定</el-button>
                                </div>
                            </el-form-item>
                        </div>
                    </el-form>
                    <!-- 凭证汇总表多少期选择刷新数据 -->
                </div>
                <div class="voucher_summary-upload">
                    <el-button size="small" class="upload" @click="updatedTableDate()">刷新</el-button>
                </div>
                <p class="fz4 voucher_summary-span" style="padding-left:10px;">[凭证总张数：{{vouchTotal}}张，附件总张数：{{attachTotal}}张]</p>
            </div>
            <div class="voucher_summary-top-right">
                <el-button type="primary" size="small">打印</el-button>
                <el-button size="small">导出 </el-button>
            </div>
        </div>
        <!-- 头结束 -->
        <div class="el-card--custom">
            <template>
                <el-table :data="vouchTotalContent" border stripe height="600">
                    <el-table-column label="科目编码" header-align="center" align="left">
                        <template scope="scope">
                            <p class="aLinkStyle" v-text="scope.row.accountCode" @click="getCode(scope.row.accountCode,scope.row.accountName)"></p>
                        </template>
                    </el-table-column>
                    <el-table-column label="科目名称" header-align="center">
                        <template scope="scope">
                            <p v-text="scope.row.accountName"></p>
                        </template>
                    </el-table-column>
                    <el-table-column label="借方金额" header-align="center" align="right">
                        <template scope="scope">
                            <p v-text="scope.row.debitAmountLocal==0?'':moneyChange.outputmoney(scope.row.debitAmountLocal)"></p>
                        </template>
                    </el-table-column>
                    <el-table-column label="贷方金额" header-align="center" align="right">
                        <template scope="scope">
                            <p v-text="scope.row.creditAmountLocal==0?'':moneyChange.outputmoney(scope.row.creditAmountLocal)"></p>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <!-- table结束 -->
            <!-- 科目尾 -->
            <div class="voucher_summary-top-right">共{{vouchTotalContent.length}}条</div>
            <!-- 科目尾 -->
        </div>
    </div>
</template>
<script>
export default {
    name: 'voucher_summary',
    data() {
        return {

            //会计期间显示
            periodBegin: '',
            //会计期间期间显示

            //期间显示
            periodEnd: '',
            //期间显示

            //期间后半段是否显示
            periodEndshow: true,
            //期间后半段是否显示

            //会计时间
            pickerOptionsBegin: '',
            pickerOptionsEnd: '',
            //会计时间

            //会计期间列表
            periodsList: [],
            //会计期间列表

            //附件数
            attachTotal: '',

            //凭证数 
            vouchTotal: '',

            //明细账期数下拉框是否显示
            periodstate: false,

            // 凭证字列表
            voucherWordOptions: [],
            // 凭证字列表 

            //表格数据
            vouchTotalContent: [],
            //表格数据
            // 科目列表

            // 科目列表
            //table数据
            //table数据

            //from表单提交数据刷新页面显示
            summaryForm: {
                //UID
                acctBookUid: this.$store.state.accbookUid,
                //UID

                //会计时间
                dbillDateStartLong: '',
                dbillDateEndLong: '',
                //会计时间

                //凭证字UID
                dsignUid: '',
                //凭证字UID

                //凭证号
                inoIdStart: '',
                inoIdEnd: '',
                //凭证号

                //科目级次
                subjectLevelStart: '',
                subjectLevelEnd: '',
                //科目级次
            }
            //from表单提交数据刷新页面显示
        }
    },
    mounted() {
        this.getAcctBookPeriodAndCurrency()//获取凭证字
    },
    methods: {
        getCode(a, b) {
            //科目和名称
            let data = {
                Code: a,
                name: b
            }
            this.$store.commit('getSubjectVal', data);
            this.$router.push({ path: '4-2' });
        },
        //获取凭证字列表会计期间
        getAcctBookPeriodAndCurrency() {
            let Vue = this;
            Vue.AxiosPost('getAcctBookPeriodAndCurrency', {
                accbookUid: Vue.$store.state.accbookUid
            }, function(e) {               
                if (e.code === '1') {
                    e.data.acctBookInfo.dsigns.forEach((n, i) => {
                        Vue.voucherWordOptions.push({
                            value: n.dsignUid,
                            label: n.sign
                        });
                    });

                    e.data.acctBookInfo.periods.forEach((n, i) => {
                        Vue.periodsList.push({
                            iyear: n.iyear,
                            iperiod: n.iperiod,
                            startDay: n.startDay,
                            lastDay: n.lastDay
                        });
                    });
                    //凭证字默认选中第一个
                    Vue.defaultSelect();
                    Vue.submitForm('summaryForm');
                } else if (e.code === '1006') {
                    Vue.voucherWordOptions = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //获取凭证字列表

        //级次显示风格
        changeLelS(number) {
            if (parseFloat(number) < 1) {
                this.summaryForm.subjectLevelStart = 1;
            } else if (parseFloat(number) > 9) {
                this.summaryForm.subjectLevelStart = 9;
            }
        },
        changeLelE(number) {
            if (parseFloat(number) < 1) {
                this.summaryForm.subjectLevelEnd = 1;
            } else if (parseFloat(number) > 9) {
                this.summaryForm.subjectLevelEnd = 9;
            }
        },
        //级次显示风格
        //提交数据处理
        pullDown() {
            this.periodstate = !this.periodstate;
        },
        doSubmit() {
            this.summaryForm.dbillDateStartLong = Math.floor(new Date(this.pickerOptionsBegin).getTime());
            this.summaryForm.dbillDateEndLong = Math.floor(new Date(this.pickerOptionsEnd).getTime());
        },
        //凭证汇总表日期显示同步变化
        periodChange() {
            let a = new Date(Math.floor(new Date(this.pickerOptionsBegin).getTime()));
            let b = new Date(Math.floor(new Date(this.pickerOptionsEnd).getTime()));
            this.periodBegin = a.getFullYear() + '-' + this.changeDate(a.getMonth() + 1) + '-' + this.changeDate(a.getDate());
            this.periodEnd = b.getFullYear() + '-' + this.changeDate(b.getMonth() + 1) + '-' + this.changeDate(b.getDate());
            //选择期间不同是 显示期间段
            if (this.periodBegin === this.periodEnd) {
                this.periodEndshow = false;
            } else {
                this.periodEndshow = true;
            }
            // 选择期间不同是 显示期间段
        },
        //凭证汇总表日期显示同步变化
        //数字转换
        changeDate(num) {
            return num < 10 ? ('0' + num) : num;
        },

        //默认选中
        defaultSelect() {
            //凭证字默认选中第一个
            this.summaryForm.dsignUid = this.voucherWordOptions[0].value;
            this.periodBegin = this.periodsList[0].iyear + '-' + this.changeDate(this.periodsList[0].iperiod) + '-' + this.changeDate(this.periodsList[0].startDay);
            this.periodEnd = this.periodsList[0].iyear + '-' + this.changeDate(this.periodsList[0].iperiod) + '-' + this.changeDate(this.periodsList[0].lastDay);
            //会计时间
            this.pickerOptionsBegin = new Date(this.periodBegin);
            this.pickerOptionsEnd = new Date(this.periodEnd);
            //会计时间
        },
        //默认选中
        submitForm(formName) {
            this.periodstate = false;
            this.periodChange();
            this.doSubmit();
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.vouchTotalContent = [];
                    let Vue = this;
                    Vue.AxiosPost('getVouchTotalContent', Vue.summaryForm, function(e) {
                        if (e.code === '1') {
                            Vue.attachTotal = e.data.vouchTotalResult.attachTotal;
                            Vue.vouchTotal = e.data.vouchTotalResult.vouchTotal;
                            e.data.vouchTotalResult.vouchTotalContent.forEach((n, i) => {
                                Vue.vouchTotalContent.push({
                                    accountCode: n.accountCode,
                                    accountName: n.accountName,
                                    creditAmountLocal: n.creditAmountLocal,
                                    debitAmountLocal: n.debitAmountLocal
                                });
                            });
                        } else if (e.code === '1006') {
                            Vue.vouchTotalContent = [];
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
            this.defaultSelect();
            this.$refs[formName].resetFields();
        },
        //刷新按钮重新获取数据
        updatedTableDate() {
            let Vue = this;
            Vue.AxiosPost('getVouchTotalContent', Vue.summaryForm, function(e) {
                if (e.code === '1') {
                    Vue.vouchTotalContent = [];
                    Vue.attachTotal = e.data.vouchTotalResult.attachTotal;
                    Vue.vouchTotal = e.data.vouchTotalResult.vouchTotal;
                    e.data.vouchTotalResult.vouchTotalContent.forEach((n, i) => {
                        Vue.vouchTotalContent.push({
                            accountCode: n.accountCode,
                            accountName: n.accountName,
                            creditAmountLocal: n.creditAmountLocal,
                            debitAmountLocal: n.debitAmountLocal
                        });
                    });
                } else if (e.code === '1006') {
                    Vue.vouchTotalContent = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        }
    }
}
</script>
<style lang="scss">
#voucher_summary {
  .voucher_summary-top {
    color: #555;
    width: 100%;
    height: 45px;
    .voucher_summary-span, .accout-voucher_summary, .voucher_summary-upload {
      float: left;
    }
    .voucher_summary-span {
      line-height: 28px;
    }
    .accout-voucher_summary {
      margin: 0 10px;
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
  .voucher_summary-top .ui-btn-menu .menu-btn {
    width: 165px;
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
    font-size: 12px;
    line-height: 26px;
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
    right: 6px;
    top: 50%;
    margin-top: -3px;
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
  .voucher_summary-top-left .con {
    width: 400px;
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
      list-style-type: none;
      font-size: 14px;
      text-align: -webkit-match-parent;
      color: #555;
      .el-form-item__label {
        width: 80px;
        text-align: left;
      }
    }
    .el-input--small .el-input__inner {
      height: 30px;
      width: 105px;
    }
    .el-input__icon{
        width: 25px;
    }
    .el-input__icon + .el-input__inner {
      padding-right: 2px;
    }
    .day .voucher_summary_day {
      margin-top: 10px;
    }
    .voucherword {
      .el-input--small .el-input__inner {
        width: 65px;
      }
      .el-input__icon {
        right: 0px;
      }
      .el-select-dropdown__empty {
        padding: 5px 0;
      }
    }
  }
  .voucher_summary-top-right {
    padding-right: 20px;
    float: right;
    .el-button {
      width: 70px;
    }
  }
}
</style>