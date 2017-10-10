<!--金额数量总账 -->
<template>
    <div id="sumGeneral">
        <!-- 头开始 -->
        <div class="sumGeneral-top">
            <div class="sumGeneral-top-left">
                <span class="fz4 sumGeneral-span">金额数量总账</span>
                <!-- 明细账期数 -->
                <div class="accout-sumGeneral">
                    <div class="ui-btn-menu " :class="periodstate==true? 'ui-btn-menu-cur' : ''" @click="pullDown()">
                        <div class="ui-btn menu-btn" v-cloak>
                            <span>{{periodBegin}}</span>
                            <span v-show="periodEndshow">至</span>
                            <span v-show="periodEndshow">{{periodEnd}}</span>
                            <b></b>
                        </div>
                    </div>
                    <!--明细账多少期选择刷新数据 -->
                    <el-form :model="sumGeneralForm" ref="sumGeneralForm">
                        <div class="con" v-show="periodstate">
                            <ul>
                                <li>
                                    <span>会计期间：</span>
                                    <template>
                                        <el-select v-model="sumGeneralForm.accountantBegin" placeholder="2017年1期" size="small">
                                            <el-option v-for="item in periodsList" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                    <span>至</span>
                                    <template>
                                        <el-select v-model="sumGeneralForm.accountantEnd" placeholder="2017年1期" size="small">
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
                                    <el-autocomplete size="small" class="inline-input" v-model="sumGeneralForm.subjectBegin" :fetch-suggestions="subjectSearch" placeholder="请输入起始科目" @select="subjectSelect1"></el-autocomplete>
                                </li>
                                <li class="subject">
                                    <span>结束科目：</span>
                                    <el-autocomplete size="small" class="inline-input" v-model="sumGeneralForm.subjectEnd" :fetch-suggestions="subjectSearch" placeholder="请输入起始科目" @select="subjectSelect2"></el-autocomplete>
                                </li>
                                <li>
                                    <span>科目级别：</span>
                                    <el-input v-model="sumGeneralForm.subjectRankBegin" size="small" style="width:65px;" type="number" min="1" max="9" placeholder="1~9" @blur="changeLelS(sumGeneralForm.subjectRankBegin)"></el-input>
                                    <span style="margin-left:45px;">至</span>
                                    <el-input v-model="sumGeneralForm.subjectRankEnd" size="small" style="width:65px;" type="number" min="1" max="9" placeholder="1~9" @blur="changeLelE(sumGeneralForm.subjectRankEnd)"></el-input>
                                </li>
                                <li>
                                    <span>数量显示小数位数：</span>
                                    <el-input v-model="sumGeneralForm.sumDecimal" size="small" style="width:65px;" type="number" min="1" max="9" placeholder="1~9"></el-input>
                                </li>
                                <li>
                                    <span>单价显示小数位数：</span>
                                    <el-input v-model="sumGeneralForm.priDecimal" size="small" style="width:65px;" type="number" min="1" max="9" placeholder="1~9"></el-input>
                                </li>
                                <li>
                                    <el-checkbox label="显示辅助核算" name="type" v-model="sumGeneralForm.showAuxiliary"></el-checkbox>
                                </li>
                                <li>
                                    <el-checkbox label="余额为0不显示" name="type" v-model="sumGeneralForm.showBalNotZero"></el-checkbox>
                                </li>
                                <li>
                                    <el-checkbox label="无发生额且余额为0不显示" name="type" v-model="sumGeneralForm.showBalAndActualNotZero"></el-checkbox>
                                </li>
                            </ul>
                            <div class="sumGeneral-top-right">
                                <el-button size="small" @click="resetForm()">重置</el-button>
                                <el-button type="primary" size="small" @click="submitForm()">确定</el-button>
                            </div>
                        </div>
                    </el-form>
                    <!--明细账多少期选择刷新数据 -->
                </div>
                <div class="sumGeneral-upload">
                    <el-button size="small">刷新</el-button>
                </div>
            </div>
            <div class="sumGeneral-top-right">
                <el-button type="primary" size="small">打印</el-button>
                <el-button size="small">连续打印</el-button>
                <el-button size="small">导出 </el-button>
            </div>
        </div>
        <!-- 头结束 -->

        <div class="sumGeneral-context el-card--custom">
        <!-- table开始 -->
        <template>
            <el-table :data="sumGeneralData" border stripe height="600">
                <el-table-column label="科目编号"  header-align="center"  width="105" >
                    <template scope="scope">
                        <p class="aLinkStyle" v-text="scope.row.accountCode" @click="getCode(scope.row.accountCode,submitAccountForm.periodStart,submitAccountForm.periodEnd,scope.row.accountName)"></p>
                    </template>
                </el-table-column>
                <el-table-column label="科目名称" width="200" header-align="center" >
                    <template scope="scope">
                        <p v-text="scope.row.accountName"></p>
                    </template>
                </el-table-column>
                <el-table-column label="单位"  header-align="center" >
                    <template scope="scope">
                        <p v-text="scope.row.unit"></p>
                    </template>
                </el-table-column>

               <el-table-column label="期初余额" header-align="center">
                    <el-table-column label="方向"  header-align="center" align="right">
                        <template scope="scope">
                           <p v-text="scope.row.beginProperty"></p>
                        </template>
                    </el-table-column>
                    <el-table-column label="数量"  header-align="center" align="right">
                        <template scope="scope">
                           <p v-text="scope.row.beginNum==0?'':scope.row.beginNum"></p>
                        </template>
                    </el-table-column>
                    <el-table-column label="单价"  header-align="center" align="right">
                        <template scope="scope">
                            <p v-text="scope.row.beginUnitPrice==0?'':scope.row.beginUnitPrice"></p>
                        </template>
                    </el-table-column>
                    <el-table-column label="金额"  header-align="center" align="right">
                        <template scope="scope">
                            <p v-text="scope.row.beginPrice==0?'':moneyChange.outputmoney(scope.row.beginPrice)"></p>
                        </template>
                    </el-table-column>
                </el-table-column>

                <el-table-column label="本期借方" header-align="center">
                    <el-table-column label="数量"  header-align="center" align="right">
                        <template scope="scope">
                            <p v-text="scope.row.presentPeriodDebitNum==0?'':scope.row.presentPeriodDebitNum"></p>
                        </template>
                    </el-table-column>
                    <el-table-column label="金额"  header-align="center" align="right">
                        <template scope="scope">
                            <p v-text="scope.row.presentPeriodDebitPrice==0?'':moneyChange.outputmoney(scope.row.presentPeriodDebitPrice)"></p>
                        </template>
                    </el-table-column>
                </el-table-column>

                <el-table-column label="本期贷方" header-align="center">
                    <el-table-column label="数量"  header-align="center" align="right">
                        <template scope="scope">
                            <p v-text="scope.row.presentPeriodCreditNum==0?'':scope.row.presentPeriodCreditNum"></p>
                        </template>
                    </el-table-column>
                    <el-table-column label="金额"  header-align="center" align="right">
                        <template scope="scope">
                            <p v-text="scope.row.presentPeriodCreditPrice==0?'':moneyChange.outputmoney(scope.row.presentPeriodCreditPrice)"></p>
                        </template>
                    </el-table-column>
                </el-table-column>

                <el-table-column label="本年累计借方" header-align="center">
                    <el-table-column label="数量"  header-align="center" align="right">
                        <template scope="scope">
                            <p v-text="scope.row.presentYearDebitNum==0?'':scope.row.presentYearDebitNum"></p>
                        </template>
                    </el-table-column>
                    <el-table-column label="金额"  header-align="center" align="right">
                        <template scope="scope">
                            <p v-text="scope.row.presentYearDebitPrice==0?'':moneyChange.outputmoney(scope.row.presentYearDebitPrice)"></p>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column label="本年累计贷方" header-align="center">
                    <el-table-column label="数量"  header-align="center" align="right">
                        <template scope="scope">
                           <p v-text="scope.row.presentYearCreditNum==0?'':scope.row.presentYearCreditNum"></p>
                        </template>
                    </el-table-column>
                    <el-table-column label="金额"  header-align="center" align="right">
                        <template scope="scope">
                            <p v-text="scope.row.presentYearCreditPrice==0?'':moneyChange.outputmoney(scope.row.presentYearCreditPrice)"></p>
                        </template>
                    </el-table-column>
                </el-table-column>

                <el-table-column label="期末余额" header-align="center">
                    <el-table-column label="方向"  header-align="center" align="right">
                        <template scope="scope">
                           <p v-text="scope.row.endProperty"></p>
                        </template>
                    </el-table-column>
                    <el-table-column label="数量"  header-align="center" align="right">
                        <template scope="scope">
                           <p v-text="scope.row.endNum==0?'':scope.row.endNum"></p>
                        </template>
                    </el-table-column>
                    <el-table-column label="单价"  header-align="center" align="right">
                        <template scope="scope">
                            <p v-text="scope.row.endUnitPrice==0?'':scope.row.endUnitPrice"></p>
                        </template>
                    </el-table-column>
                    <el-table-column label="金额"  header-align="center" align="right">
                        <template scope="scope">
                            <p v-text="scope.row.endPrice==0?'':moneyChange.outputmoney(scope.row.endPrice)"></p>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
        </template>
        <!-- table结束 -->
        <!-- 科目尾 -->
        <div class="sumGeneral-top-right">共&nbsp;{{sumGeneralData.length}}&nbsp;条</div>
        <!-- 科目尾 -->
        </div>         
        <!-- 左边部分table结束 -->
    </div>
</template>
<script>
export default {
    name: 'sumGeneral',
    data() {
        return {
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


            //科目code
            subcodeStart: '',
            subcodeEnd: '',
            //科目code

            //明细账期数下拉框是否显示
            periodstate: false,

            //form表单的初始数据
            sumGeneralForm: {
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

                //数量显示小数位
                sumDecimal: '2',
                //数量显示小数位

                //单价显示小数位
                priDecimal: '2',
                //单价显示小数位

                //显示辅助核算
                showAuxiliary: true,
                //显示辅助核算

                //显示余额不为0
                showBalNotZero: false,
                //显示余额不为0

                //无发生额且余额为0不显示
                showBalAndActualNotZero: false,
                //无发生额且余额为0不显示
            },
            //form表单的初始数据

            //form表单提交数据
            submitAccountForm: {
                //UID
                acctBookUid: this.$store.state.accbookUid,
                //UID
            },
            //form表单提交数据

            //总账表格数据
            sumGeneralData:[] 
            //总账表格数据
        }
    },
    created() {
        this.getSubjectData();//生成科目树并更新科目数据
    },
    mounted() {
        this.getPeriodsCurrencysData()//会计期间币别数据
    },
    methods: {
        getCode(a, b, c, d) {
            //会计期间
            this.$store.state.itemizedForm.accountantBegin = b;
            this.$store.state.itemizedForm.accountantEnd = c;
            //科目和名称
            let data = {
                Code: a,
                name: d
            }
            this.$store.commit('getSubjectVal', data);
            this.$router.push({ path: '4-9' });
        },
        //级次显示风格
        changeLelS(number) {
            if (parseFloat(number) < 1) {
                this.sumGeneralForm.subjectRankBegin = '1';
            } else if (parseFloat(number) > 9) {
                this.sumGeneralForm.subjectRankBegin = '9';
            }
        },
        changeLelE(number) {
            if (parseFloat(number) < 1) {
                this.sumGeneralForm.subjectRankEnd = '1';
            } else if (parseFloat(number) > 9) {
                this.sumGeneralForm.subjectRankEnd = '9';
            }
        },
        //级次显示风格
        //获取会计期间币别数据
        getPeriodsCurrencysData() {
            let Vue = this;
            Vue.AxiosPost('getPeriodsCurrencysList', {
                accbookUid: Vue.$store.state.accbookUid
            }, function(e) {
                if (e.code === '1') {
                    let per = [];
                    per = e.data.acctBookInfo.periods;
                    per.forEach((n, i) => {
                        Vue.periodsList.push({
                            value: n.yearPeriod + '',
                            label: n.iyear + '年' + n.iperiod + '期'
                        });
                    });
                    Vue.defaultSelect();
                    Vue.submitForm();
                } else if (e.code === '1006') {
                    Vue.periodsList = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //获取会计期间币别数据
        //下拉
        pullDown() {
            this.periodstate = !this.periodstate;
        },
        //默认选中
        defaultSelect() {
            //这里会计期间不能用状态管理，状态异步，数据可能不没有获取到就要渲染页面
            let per = this.periodsList;
            //这里会计期间不能用状态管理，状态异步，数据可能不没有获取到就要渲染页面
            let cur = this.currencysList;
            //默认选中会计期间最后一期
            this.sumGeneralForm.accountantBegin = per[0].value;
            this.sumGeneralForm.accountantEnd = per[0].value;
            this.periodBegin = per[0].label;
        },
        //默认选中

        //这里是期间显示多少期，上面同步变化
        //this.sumGeneralForm.accountantBegin拿的是aperiodUid
        periodChange() {
            let a = this.periodsList;
            a.forEach((n, i) => {
                if (this.sumGeneralForm.accountantBegin === n.value) {
                    this.periodBegin = n.label;
                };
                if (this.sumGeneralForm.accountantEnd === n.value) {
                    this.periodEnd = n.label;
                };
                //选择期间不同是 显示期间段
                if (this.sumGeneralForm.accountantBegin === this.sumGeneralForm.accountantEnd) {
                    this.periodEndshow = false;
                } else {
                    this.periodEndshow = true;
                }
                //选择期间不同是 显示期间段

            });
        },
        //这里是期间显示多少期，上面同步变化

        //提交数据处理
        doSubmit() {
            //期间
            this.submitAccountForm.periodStart = this.sumGeneralForm.accountantBegin,
            this.submitAccountForm.periodEnd = this.sumGeneralForm.accountantEnd,
            //期间
            //科目传编码过去
            this.submitAccountForm.subjectCodeStart = this.subcodeStart,
            this.submitAccountForm.subjectCodeEnd = this.subcodeEnd,
            //科目传编码过去
            //数量显示小数位
            this.submitAccountForm.numberFigures=this.sumGeneralForm.sumDecimal,
            //数量显示小数位

            //单价显示小数位
            this.submitAccountForm.unitPriceFigures=this.sumGeneralForm.sumDecimal,
            //单价显示小数位

            //级别
            this.submitAccountForm.subjectLevelStart = this.sumGeneralForm.subjectRankBegin,
            this.submitAccountForm.subjectLevelEnd = this.sumGeneralForm.subjectRankEnd,
            //级别
            
            //辅助核算
            this.submitAccountForm.showAuxiliary = this.sumGeneralForm.showAuxiliary,
            this.submitAccountForm.showBalNotZero = this.sumGeneralForm.showBalNotZero,
            this.submitAccountForm.showBalAndActualNotZero = this.sumGeneralForm.showBalAndActualNotZero
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

        //重置form数据
        resetForm() {
            this.defaultSelect();
            //科目
            this.sumGeneralForm.subjectBegin = '',
            this.sumGeneralForm.subjectEnd = '',
            //科目
            //科目级别
            this.sumGeneralForm.subjectRankBegin = '',
            this.sumGeneralForm.subjectRankEnd = '',
            //科目级别
            //复选选择列表重置
            this.sumGeneralForm.showAuxiliary = true,
            this.sumGeneralForm.showBalNotZero = false,
            this.sumGeneralForm.showBalAndActualNotZero = false
        },
        //重置form数据

        //提交表单
        submitForm() {
            //弹窗关闭
            this.periodstate = false;
            //期数数据提交改变页面的期数显示
            this.periodChange();
            //期数数据提交改变页面的期数显示
            this.doSubmit();
            if (parseFloat(this.submitAccountForm.periodStart) > parseFloat(this.submitAccountForm.periodEnd)) {
                this.periodEndshow = false;
                this.Message('起始会计期间不能大于结束会计期间', 'error');
            }
            else if (parseFloat(this.submitAccountForm.subjectLevelStart) > parseFloat(this.submitAccountForm.subjectLevelEnd)) {
                this.Message('起始科目级次不能大于结束科目级次', 'error');
            } else {
                let Vue = this;
                Vue.AxiosPost('getNumVouchTotal', Vue.submitAccountForm, function(e) {
                    if (e.code === '1') {
                        Vue.sumGeneralData=e.data.totalAccountResult;
                    } else if (e.code === '1006') {
                        Vue.sumGeneralData = [];
                    } else {
                        Vue.Message(e.msg, 'error');
                    }
                });
            }

        }
        //提交表单
    },
}
</script>
<style lang='scss'>
#sumGeneral {
  .sumGeneral-top {
    color: #555;
    width: 100%;
    height: 45px;
    .sumGeneral-span, .accout-sumGeneral, .sumGeneral-upload {
      float: left;
    }
    .sumGeneral-span {
      line-height: 28px;
    }
    .accout-sumGeneral {
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
  .sumGeneral-top-left .con {
    width: 360px;
    padding: 15px;
    position: absolute;
    top: 27px;
    left: 94px;
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
  }
}

#sumGeneral {
  .sumGeneral-top-left .con .el-input__icon {
  right: -4px;
}
  .sumGeneral-top-left .con ul .subject .el-input__inner {
    width: 246px;
  }
  .sumGeneral-top .sumGeneral-top-left {
    .el-input__icon + .el-input__inner, .el-select .el-input__inner {
      padding-right: 0px;
    }
  }
  .sumGeneral-top-right {
    display: block;
    padding-right: 20px;
    float: right;
    font-size: 13px;
    .el-button {
      width: 70px;
    }
  }
}

</style>