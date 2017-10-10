<!-- 总账 -->
<template>
    <div id="general">
        <!-- 头开始 -->
        <div class="general-top">
            <div class="general-top-left">
                <span class="fz4 general-span">总账</span>
                <!-- 明细账期数 -->
                <div class="accout-general">
                    <div class="ui-btn-menu " :class="periodstate==true? 'ui-btn-menu-cur' : ''" @click="pullDown()">
                        <div class="ui-btn menu-btn" v-cloak>
                            <span>{{periodBegin}}</span>
                            <span v-show="periodEndshow">至</span>
                            <span v-show="periodEndshow">{{periodEnd}}</span>
                            <b></b>
                        </div>
                    </div>
                    <!--明细账多少期选择刷新数据 -->
                    <el-form :model="generalForm" ref="generalForm">
                        <div class="con" v-show="periodstate">
                            <ul>
                                <li>
                                    <span>会计期间：</span>
                                    <template>
                                        <el-select v-model="generalForm.accountantBegin" placeholder="2017年1期" size="small">
                                            <el-option v-for="item in periodsList" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                    <span>至</span>
                                    <template>
                                        <el-select v-model="generalForm.accountantEnd" placeholder="2017年1期" size="small">
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
                                    <el-autocomplete size="small" class="inline-input" v-model="generalForm.subjectBegin" :fetch-suggestions="subjectSearch" placeholder="请输入起始科目" @select="subjectSelect1"></el-autocomplete>
                                </li>
                                <li class="subject">
                                    <span>结束科目：</span>
                                    <el-autocomplete size="small" class="inline-input" v-model="generalForm.subjectEnd" :fetch-suggestions="subjectSearch" placeholder="请输入起始科目" @select="subjectSelect2"></el-autocomplete>
                                </li>
                                <li>
                                    <span>科目级次：</span>
                                    <el-input v-model="generalForm.subjectRankBegin" size="small" style="width:65px;" type="number" min="1" max="9" placeholder="1~9" @blur="changeLelS(generalForm.subjectRankBegin)"></el-input>
                                    <span style="margin-left:45px;">至</span>
                                    <el-input v-model="generalForm.subjectRankEnd" size="small" style="width:65px;" type="number" min="1" max="9" placeholder="1~9" @blur="changeLelE(generalForm.subjectRankEnd)"></el-input>
                                </li>
                                <li>
                                    <span style="padding-right:28px;">币别：</span>
                                    <template>
                                        <el-select v-model="generalForm.Currency" placeholder="请选币别" size="small" @change="curstyle">
                                            <el-option v-for="item in currencysList" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </li>
                                <li>
                                    <el-checkbox label="显示辅助核算" name="type" v-model="generalForm.showAuxiliary"></el-checkbox>
                                </li>
                                <li>
                                    <el-checkbox label="余额为0不显示" name="type" v-model="generalForm.showBalNotZero"></el-checkbox>
                                </li>
                                <li>
                                    <el-checkbox label="无发生额且余额为0不显示" name="type" v-model="generalForm.showBalAndActualNotZero"></el-checkbox>
                                </li>
                                <li>
                                    <el-checkbox label="无发生额不显示本期合计、本年累计" name="type" v-model="generalForm.notShowTotalWhenNotActual"></el-checkbox>
                                </li>
                            </ul>
                            <div class="general-top-right">
                                <el-button size="small" @click="resetForm()">重置</el-button>
                                <el-button type="primary" size="small" @click="submitForm()">确定</el-button>
                            </div>
                        </div>
                    </el-form>
                    <!--明细账多少期选择刷新数据 -->
                </div>
                <div class="general-upload">
                    <el-button size="small" @click="updatedTableDate()">刷新</el-button>
                </div>
            </div>
            <div class="general-top-right">
                <el-button type="primary" size="small">打印</el-button>
                <el-button size="small">导出 </el-button>
            </div>
        </div>
        <!-- 头结束 -->
        <div class="general-context el-card--custom">
            <!-- table开始 -->
            <template>
                <el-table :data="generalData" border stripe height="600" v-show="styleshow===1" >
                    <el-table-column label="科目编号" width="180" header-align="center">
                        <template scope="scope">
                            <p class="aLinkStyle" v-text="scope.row.accountCode" @click="getCode(scope.row.accountCode,submitAccountForm.periodStart,submitAccountForm.periodEnd,scope.row.accountName)"></p>
                        </template>
                    </el-table-column>
                    <el-table-column label="科目名称" width="200" header-align="center">
                        <template scope="scope">
                            <p v-text="scope.row.accountName"></p>
                        </template>
                    </el-table-column>

                    <el-table-column label="期间" header-align="center" align="center">
                        <template scope="scope">
                            <p v-for="(item, index) in scope.row.totalAccountContent" :key="item.yearPeriod" v-text="item.yearPeriod"></p>
                        </template>
                    </el-table-column>

                    <el-table-column label="摘要" header-align="center" align="center">
                        <template scope="scope">
                            <p v-for="(item, index) in scope.row.totalAccountContent" :key="item.voucherRemark" v-text="item.voucherRemark"></p>
                        </template>
                    </el-table-column>
                    <el-table-column label="借方" header-align="center" align="right">
                        <template scope="scope">
                            <p v-for="(item, index) in scope.row.totalAccountContent" :key="item.debitAmountLocal" v-text="item.debitAmountLocal==0?'':moneyChange.outputmoney(item.debitAmountLocal)"></p>
                        </template>
                    </el-table-column>
                    <el-table-column label="贷方" header-align="center" align="right">
                        <template scope="scope">
                            <p v-for="(item, index) in scope.row.totalAccountContent" :key="item.creditAmountLocald" v-text="item.creditAmountLocal==0?'':moneyChange.outputmoney(item.creditAmountLocal)"></p>
                        </template>
                    </el-table-column>
                    <el-table-column label="方向" header-align="center" align="center">
                        <template scope="scope">
                            <p v-for="(item, index) in scope.row.totalAccountContent" :key="item.subjectDirection" v-text="item.subjectDirection"></p>
                        </template>
                    </el-table-column>
                    <el-table-column label="余额" header-align="center" align="right">
                        <template scope="scope">
                            <p v-for="(item, index) in scope.row.totalAccountContent" :key="item.balanceLocal" v-text="item.balanceLocal==0?'':moneyChange.outputmoney(item.balanceLocal)"></p>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 外币的时候显示 -->
                <el-table :data="generalData" border height="600" stripe v-show="styleshow===0">
                    <el-table-column label="科目编号" width="180" header-align="center">
                        <template scope="scope">
                             <p class="aLinkStyle" v-text="scope.row.accountCode" @click="getCode(scope.row.accountCode,submitAccountForm.periodStart,submitAccountForm.periodEnd,scope.row.accountName)"></p>
                        </template>
                    </el-table-column>
                    <el-table-column label="科目名称" width="200" header-align="center">
                        <template scope="scope">
                            <p v-cloak>{{ scope.row.accountName}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="期间" header-align="center" align="center">
                        <template scope="scope">
                            <p v-for="(item, index) in scope.row.totalAccountContent" :key="item.yearPeriod" v-cloak>{{item.yearPeriod}}</p>
                        </template>
                    </el-table-column>

                    <el-table-column label="摘要" header-align="center" align="center">
                        <template scope="scope">
                            <p v-for="(item, index) in scope.row.totalAccountContent" :key="item.voucherRemark" v-cloak>{{item.voucherRemark}}</p>
                        </template>
                    </el-table-column>

                    <el-table-column label="借方金额" header-align="center">
                        <el-table-column label="原币" header-align="center" align="right">
                            <template scope="scope">
                                <p v-for="(item, index) in scope.row.totalAccountContent" :key="item.debitAmountForeign" v-text="item.debitAmountForeign==0?'':moneyChange.outputmoney(item.debitAmountForeign)"></p>
                            </template>
                        </el-table-column>
                        <el-table-column label="本位币" header-align="center" align="right">
                            <template scope="scope">
                                <p v-for="(item, index) in scope.row.totalAccountContent" :key="item.debitAmountLocal" v-text="item.debitAmountLocal==0?'':moneyChange.outputmoney(item.debitAmountLocal)"></p>
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="贷方方金额" header-align="center">
                        <el-table-column label="原币" header-align="center" align="right">
                            <template scope="scope">
                                <p v-for="(item, index) in scope.row.totalAccountContent" :key="item.creditAmountForeign" v-text="item.creditAmountForeign==0?'':moneyChange.outputmoney(item.creditAmountForeign)"></p>
                            </template>
                        </el-table-column>
                        <el-table-column label="本位币" header-align="center" align="right">
                            <template scope="scope">
                                <p v-for="(item, index) in scope.row.totalAccountContent" :key="item.creditAmountLocald" v-text="item.creditAmountLocal==0?'':moneyChange.outputmoney(item.creditAmountLocal)"></p>
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="金额" header-align="center">
                        <el-table-column label="方向" header-align="center" align="center">
                            <template scope="scope">
                                <p v-for="(item, index) in scope.row.totalAccountContent" :key="item.subjectDirection" v-cloak>{{item.subjectDirection}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column label="原币" header-align="center" align="right">
                            <template scope="scope">
                                <p v-for="(item, index) in scope.row.totalAccountContent" :key="item.balanceForeign" v-text="item.balanceForeign==0?'':moneyChange.outputmoney(item.balanceForeign)"></p>
                            </template>
                        </el-table-column>
                        <el-table-column label="本位币" header-align="center" align="right">
                            <template scope="scope">
                                <p v-for="(item, index) in scope.row.totalAccountContent" :key="item.balanceLocal" v-text="item.balanceLocal==0?'':moneyChange.outputmoney(item.balanceLocal)"></p>
                            </template>
                        </el-table-column>
                    </el-table-column>
                </el-table>
                <!-- 外币的时候显示 -->
            </template>
            <!-- table结束 -->
            <!-- 科目尾 -->
            <div class="general-top-right">共{{generalData.length}}条</div>
            <!-- 科目尾 -->
        </div>

        <!-- 左边部分table结束 -->

    </div>
</template>
<script>
export default {
    name: 'general',
    data() {
        return {
            //页面风格显示
            styleshow: undefined,
            //页面风格显示

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
            generalForm: {
                //会计开始时间
                accountantBegin: '',
                accountantEnd: '',
                //至结束时间
                accountantEnd: '',
                //科目
                subjectBegin: '',
                subjectEnd: '',
                //科目

                //科目级次
                subjectRankBegin: '1',
                subjectRankEnd: '1',
                //科目级次

                //币别uid
                Currency: '',
                //币别uid

                //币别类型
                currencystyle: '',
                //币别类型

                //显示辅助核算
                showAuxiliary: false,
                //显示辅助核算

                //显示余额不为0
                showBalNotZero: false,
                //显示余额不为0

                //无发生额且余额为0不显示
                showBalAndActualNotZero: false,
                //无发生额且余额为0不显示

                //无发生额不显示本期合计、本年合计
                notShowTotalWhenNotActual: false
                //无发生额不显示本期合计、本年合计
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
            generalData: [],
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
            this.$router.push({ path: '4-2' });
        },
        //级次显示风格
        changeLelS(number) {
            if (parseFloat(number) < 1) {
                this.generalForm.subjectRankBegin = '1';
            } else if (parseFloat(number) > 9) {
                this.generalForm.subjectRankBegin = '9';
            }
        },
        changeLelE(number) {
            if (parseFloat(number) < 1) {
                this.generalForm.subjectRankEnd = '1';
            } else if (parseFloat(number) > 9) {
                this.generalForm.subjectRankEnd = '9';
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
                    Vue.currencysList.splice(1, 1);
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
        //获取会计期间币别数据

        //提交数据处理
        doSubmit() {
            //期间
            this.submitAccountForm.periodStart = this.generalForm.accountantBegin,
                this.submitAccountForm.periodEnd = this.generalForm.accountantEnd,
                //期间
                //科目传编码过去
                this.submitAccountForm.subjectCodeStart = this.subcodeStart,
                this.submitAccountForm.subjectCodeEnd = this.subcodeEnd,
                //科目传编码过去
                //级别
                this.submitAccountForm.subjectLevelStart = this.generalForm.subjectRankBegin,
                this.submitAccountForm.subjectLevelEnd = this.generalForm.subjectRankEnd,
                //级别
                //币别
                this.submitAccountForm.currency = this.generalForm.Currency,
                //币别
                //辅助核算
                this.submitAccountForm.showAuxiliary = this.generalForm.showAuxiliary,
                this.submitAccountForm.showBalNotZero = this.generalForm.showBalNotZero,
                this.submitAccountForm.showBalAndActualNotZero = this.generalForm.showBalAndActualNotZero,
                this.submitAccountForm.notShowTotalWhenNotActual = this.generalForm.notShowTotalWhenNotActual
            //辅助核算
        },
        //提交数据处理

        //币别类型选择
        curstyle(data) {
            this.currencysList.forEach((n, i) => {
                if (n.value === data) {
                    this.generalForm.currencystyle = n.currencystyle;
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
            this.generalForm.accountantBegin = per[0].value;
            this.generalForm.accountantEnd = per[0].value;
            this.periodBegin = per[0].label;
            //默认选中币别最后一期
            this.generalForm.Currency = cur[0].value;
            //默认选中表格显示方式,要在dom操作变化之后才执行
            this.$nextTick(() => {
                this.styleshow = cur[0].currencystyle;
            });
        },
        //默认选中

        //这里是期间显示多少期，上面同步变化
        //this.generalForm.accountantBegin拿的是aperiodUid
        periodChange() {
            let a = this.periodsList;
            a.forEach((n, i) => {
                if (this.generalForm.accountantBegin === n.value) {
                    this.periodBegin = n.label;
                };
                if (this.generalForm.accountantEnd === n.value) {
                    this.periodEnd = n.label;
                };
                //选择期间不同是 显示期间段
                if (this.generalForm.accountantBegin === this.generalForm.accountantEnd) {
                    this.periodEndshow = false;
                } else {
                    this.periodEndshow = true;
                }
                //选择期间不同是 显示期间段

            });
        },
        //这里是期间显示多少期，上面同步变化
        pullDown() {
            this.periodstate = !this.periodstate;
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
        subjectSelect1(item) {
            //这里把code存起来传到后台去
            this.subcodeStart = item.code;
        },
        subjectSelect2(item) {
            //这里把code存起来传到后台去
            this.subcodeEnd = item.code;
        },
        //科目选择

        //表格数据重置  这里重置是先前默认的不重置，其他的要清空。
        resetForm() {
            //会计期间，币别，显示辅助核算默认
            this.defaultSelect();
            //科目
            this.generalForm.subjectBegin = '',
                this.generalForm.subjectEnd = '',
                //科目
                //科目级别
                this.generalForm.subjectRankBegin = '',
                this.generalForm.subjectRankEnd = '',
                //科目级别
                //多项选择
                this.generalForm.showAuxiliary = true,

                this.generalForm.showBalNotZero = false,
                this.generalForm.showBalAndActualNotZero = false,
                this.generalForm.notShowTotalWhenNotActual = false
        },
        //表格数据重置

        //提交表单
        submitForm() {
            //弹窗关闭
            this.periodstate = false;
            //期数数据提交改变页面的期数显示
            this.periodChange();
            //期数数据提交改变页面的期数显示
            this.doSubmit();
            // table数据显示风格布局
            this.styleshow = this.generalForm.currencystyle;
            //提交数据
            if (parseFloat(this.submitAccountForm.periodStart) > parseFloat(this.submitAccountForm.periodEnd)) {
                this.Message('起始科目不能大于结束科目', 'error');
            }
            else if (parseFloat(this.submitAccountForm.subjectLevelStart) > parseFloat(this.submitAccountForm.subjectLevelEnd)) {
                this.Message('起始科目级次不能大于结束科目级次', 'error');
            } else {
                let Vue = this;
                Vue.AxiosPost('getTotalAcctContent', this.submitAccountForm, function(e) {
                    if (e.code === '1') {
                        Vue.generalData = [];
                        e.data.totalAccountResult.forEach((n, i) => {
                            Vue.generalData.push({
                                accountCode: n.accountCode,
                                accountName: n.accountName,
                                totalAccountContent: n.totalAccountContent
                            });
                        })
                    } else if (e.code === '1006') {
                        Vue.generalData = [];
                    } else {
                        Vue.Message(e.msg, 'error');
                    }
                });
            }
        },
        //提交表单
        //刷新按钮重新获取数据
        updatedTableDate() {
            let Vue = this;
            Vue.AxiosPost('getTotalAcctContent', Vue.submitAccountForm, function(e) {
                if (e.code === '1') {
                    Vue.generalData = [];
                    e.data.totalAccountResult.forEach((n, i) => {
                        Vue.generalData.push({
                            accountCode: n.accountCode,
                            accountName: n.accountName,
                            totalAccountContent: n.totalAccountContent
                        });
                    });
                } else if (e.code === '1006') {
                    Vue.itemizedData = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
    },

}
</script>
<style lang='scss'>
/* 数据渲染是的闪烁问题 */

#general .general-top {
    color: #555;
    width: 100%;
    height: 45px;
    .general-span {
        line-height: 28px;
        float: left;
    }
    .accout-general,
    .general-upload {
        float: left;
    }
    .accout-general {
        margin: 0 10px;
    }
}





/* 明细账选择菜单卡片效果 公共样式*/

.ui-btn-menu {
    vertical-align: middle;
    zoom: 1;
    z-index: 3;
}

.ui-btn-menu-cur .menu-btn {
    &:active,
    &:hover {
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





/* hover之后三角到过来 */

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





/* 明细账选择菜单卡片效果 公共样式*/

#general {
    .general-top .general-top-left {
        .con {
            width: 360px;
            padding: 15px;
            position: absolute;
            top: 27px;
            left: 38px;
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
        .el-input__icon+.el-input__inner,
        .el-select .el-input__inner {
            padding-right: 0px;
        }
    }
    .general-top-right {
        display: block;
        padding-right: 20px;
        float: right;
        font-size: 13px;
        .el-button {
            width: 70px;
        }
    }
    .general-context {
        .el-table .cell {
            padding-left: 0px;
            padding-right: 0px;
            p {
                line-height: 30px;
                height: 30px;
                &:nth-last-child(1) {
                    border: none;
                }
                padding-right: 8px;
                padding-left: 8px;
                border-bottom: 1px solid rgb(223, 232, 236);
            }
        }
    }
}
</style>