<!-- 明细账element框架形 -->
<template>
    <div id="itemized">
        <!-- 头开始 -->
        <div class="itemized-top">
            <div class="itemized-top-context">
                <div class="itemized-top-left">
                    <span class="fz4 itemized-span">明细账</span>
                    <!-- 明细账期数 -->
                    <div class="accout-itemized">
                        <div class="ui-btn-menu " :class="periodstate==true? 'ui-btn-menu-cur' : ''" @click="pullDown()">
                            <div class="ui-btn menu-btn" v-cloak>
                                <span>{{periodBegin}}</span>
                                <span v-show="periodEndshow">至</span>
                                <span v-show="periodEndshow">{{periodEnd}}</span>
                                <b></b>
                            </div>
                        </div>
                        <!--明细账多少期选择刷新数据 -->
                        <el-form :model="itemizedForm" ref="itemizedForm">
                            <div class="con" v-show="periodstate">
                                <ul>
                                    <li>
                                        <span>会计期间：</span>
                                        <template>
                                            <el-select v-model="$store.state.itemizedForm.accountantBegin" placeholder="2017年1期" size="small">
                                                <el-option v-for="item in periodsList" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </template>
                                        <span>至</span>
                                        <template>
                                            <el-select v-model="$store.state.itemizedForm.accountantEnd" placeholder="2017年1期" size="small">
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
                                        <el-autocomplete size="small" class="inline-input" v-model="itemizedForm.subjectBegin" :fetch-suggestions="subjectSearch" placeholder="请输入起始科目" @select="subjectSelect1"></el-autocomplete>
                                    </li>
                                    <li class="subject">
                                        <span>结束科目：</span>
                                        <el-autocomplete size="small" class="inline-input" v-model="itemizedForm.subjectEnd" :fetch-suggestions="subjectSearch" placeholder="请输入起始科目" @select="subjectSelect2"></el-autocomplete>
                                    </li>
                                    <li>
                                        <span>科目级次：</span>
                                        <el-input v-model="itemizedForm.subjectRankBegin" size="small" style="width:65px;" type="number" min="1" max="9" placeholder="1~9" @blur="changeLelS(itemizedForm.subjectRankBegin)"></el-input>
                                        <span style="margin-left:45px;">至</span>
                                        <el-input v-model="itemizedForm.subjectRankEnd" size="small" style="width:65px;" type="number" min="1" max="9" placeholder="1~9" @blur="changeLelE(itemizedForm.subjectRankEnd)"></el-input>
                                    </li>
                                    <li>
                                        <span style="padding-right:28px;">币别：</span>
                                        <template>
                                            <el-select v-model="itemizedForm.Currency" placeholder="请选币别" size="small" @change="curstyle">
                                                <el-option v-for="item in currencysList" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </template>
                                    </li>
                                    <li>
                                        <el-checkbox label="显示辅助核算" name="type" v-model="itemizedForm.showAuxiliary"></el-checkbox>
                                    </li>
                                    <li>
                                        <el-checkbox label="只显示最明细科目" name="type" v-model="itemizedForm.showDetail"></el-checkbox>
                                    </li>
                                    <li>
                                        <el-checkbox label="显示现金银行存款对方科目" name="type" v-model="itemizedForm.showBankOpposte"></el-checkbox>
                                    </li>
                                    <li>
                                        <el-checkbox label="余额为0不显示" name="type" v-model="itemizedForm.showBalNotZero"></el-checkbox>
                                    </li>
                                    <li>
                                        <el-checkbox label="无发生额且余额为0不显示" name="type" v-model="itemizedForm.showBalAndActualNotZero"></el-checkbox>
                                    </li>
                                    <li>
                                        <el-checkbox label="无发生额不显示本期合计、本年累计" name="type" v-model="itemizedForm.notShowTotalWhenNotActual"></el-checkbox>
                                    </li>
                                </ul>
                                <div class="itemized-top-right">
                                    <el-button size="small" @click="resetForm()">重置</el-button>
                                    <el-button type="primary" size="small" @click="submitForm()">确定</el-button>
                                </div>
                            </div>
                        </el-form>
                        <!--明细账多少期选择刷新数据 -->
                    </div>
                    <div class="itemized-upload">
                        <el-button size="small" @click="updatedTableDate()">刷新</el-button>
                    </div>
                </div>
                <div class="itemized-top-right">
                    <el-button type="primary" size="small">打印</el-button>
                    <el-button size="small">连续打印</el-button>
                    <el-button size="small">导出 </el-button>
                </div>
            </div>
        </div>
        <!-- 头结束 -->
        <el-row :gutter="20">
            <el-col :span="18">
                <div class="itemized-context el-card--custom">
                    <!-- 科目头 -->
                    <div class="l-layout-header" v-cloak>科目：{{subjecttext}}</div>
                    <!-- 科目头 -->
                    <!-- table开始 -->
                    <template>
                        <!-- 本位币显示风格 -->
                        <el-table :data="itemizedData" border height="600" stripe v-show="styleshow===1">
                            <el-table-column label="日期" header-align="center" align="center">
                                <template scope="scope">
                                    <p v-text="scope.row.voucherDate"></p>
                                </template>
                            </el-table-column>
                            <el-table-column label="凭证字号" header-align="center">
                                <template scope="scope">
                                    <p class="aLinkStyle" v-text="scope.row.voucherNumber" @click="getCode(scope.row.voucherUID)"></p>
                                </template>
                            </el-table-column>
                            <el-table-column label="摘要" header-align="center">
                                <template scope="scope">
                                    <p v-text="scope.row.voucherRemark"></p>
                                </template>
                            </el-table-column>
                            <el-table-column label="借方" header-align="center" align="right">
                                <template scope="scope">
                                    <p v-text="scope.row.debitAmountLocal==0?'':moneyChange.outputmoney(scope.row.debitAmountLocal)"></p>
                                </template>
                            </el-table-column>
                            <el-table-column label="贷方" header-align="center" align="right">
                                <template scope="scope">
                                    <p v-text="scope.row.creditAmountLocal==0?'':moneyChange.outputmoney(scope.row.creditAmountLocal)"></p>
                                </template>
                            </el-table-column>
                            <el-table-column label="方向" width="80" header-align="center" align="center">
                                <template scope="scope">
                                    <p v-text="scope.row.subjectDirection"></p>
                                </template>
                            </el-table-column>
                            <el-table-column label="余额" header-align="center" align="right">
                                <template scope="scope">
                                    <p v-text="scope.row.balanceLocal==0?'':moneyChange.outputmoney(scope.row.balanceLocal)"></p>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- 本位币显示风格 -->
                        <!-- 外币的时候显示 -->
                        <el-table :data="itemizedData" border height="600" stripe v-show="styleshow===0" >
                            <el-table-column label="日期" header-align="center" align="center">
                                <template scope="scope">
                                    <p v-text="scope.row.voucherDate"></p>
                                </template>
                            </el-table-column>
                            <el-table-column label="凭证字号" header-align="center">
                                <template scope="scope">
                                    <p class="aLinkStyle" v-text="scope.row.voucherNumber" @click="getCode(scope.row.voucherUID)"></p>
                                </template>
                            </el-table-column>
                            <el-table-column label="摘要" header-align="center">
                                <template scope="scope">
                                    <p v-text="scope.row.voucherRemark"></p>
                                </template>
                            </el-table-column>
                            <el-table-column label="币别" header-align="center">
                                <template scope="scope">
                                    <p v-text="scope.row.currency"></p>
                                </template>
                            </el-table-column>
                            <el-table-column label="借方金额" header-align="center">
                                <el-table-column label="原币" header-align="center" align="right">
                                    <template scope="scope">
                                        <p v-text="scope.row.debitAmountForeign==0?'':moneyChange.outputmoney(scope.row.debitAmountForeign)"></p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="本位币" header-align="center" align="right">
                                    <template scope="scope">
                                        <p v-text="scope.row.debitAmountLocal==0?'':moneyChange.outputmoney(scope.row.debitAmountLocal)"></p>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column label="贷方方金额" header-align="center">
                                <el-table-column label="原币" header-align="center" align="right">
                                    <template scope="scope">
                                        <p>{{scope.row.creditAmountForeign}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="本位币" header-align="center" align="right">
                                    <template scope="scope">
                                        <p v-text="scope.row.creditAmountLocal==0?'':moneyChange.outputmoney(scope.row.creditAmountLocal)"></p>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column label="金额" header-align="center">
                                <el-table-column label="方向" header-align="center" align="center">
                                    <template scope="scope">
                                        <p v-text="scope.row.subjectDirection"></p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="原币" header-align="center" align="right">
                                    <template scope="scope">
                                        <p v-text="scope.row.balanceForeign==0?'':moneyChange.outputmoney(scope.row.balanceForeign)"></p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="本位币" header-align="center" align="right">
                                    <template scope="scope">
                                        <p v-text="scope.row.balanceLocal==0?'':moneyChange.outputmoney(scope.row.balanceLocal)"></p>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                        </el-table>
                        <!-- 外币的时候显示 -->
                        <!-- 所有币别显示 -->
                        <el-table :data="itemizedData" border height="600" stripe v-show="styleshow===2" >
                            <el-table-column label="日期" header-align="center" align="center">
                                <template scope="scope">
                                    <p v-text="scope.row.voucherDate"></p>
                                </template>
                            </el-table-column>
                            <el-table-column label="凭证字号" header-align="center">
                                <template scope="scope">
                                    <p class="aLinkStyle" v-text="scope.row.voucherNumber" @click="getCode(scope.row.voucherUID)"></p>
                                </template>
                            </el-table-column>
                            <el-table-column label="摘要" header-align="center">
                                <template scope="scope">
                                    <p v-text="scope.row.voucherRemark"></p>
                                </template>
                            </el-table-column>

                            <el-table-column label="币别" header-align="center">
                                <template scope="scope">
                                    <p v-text="scope.row.currency"></p>
                                </template>
                            </el-table-column>
                            <el-table-column label="借方金额" header-align="center">
                                <el-table-column label="原币" header-align="center" align="right">
                                    <template scope="scope">
                                        <p v-text="scope.row.debitAmountForeign==0?'':moneyChange.outputmoney(scope.row.debitAmountForeign)"></p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="本位币" header-align="center" align="right">
                                    <template scope="scope">
                                        <p v-text="scope.row.debitAmountLocal==0?'':moneyChange.outputmoney(scope.row.debitAmountLocal)"></p>
                                    </template>
                                </el-table-column>
                            </el-table-column>

                            <el-table-column label="贷方方金额" header-align="center">
                                <el-table-column label="原币" header-align="center" align="right">
                                    <template scope="scope">
                                        <p v-text="scope.row.creditAmountForeign==0?'':moneyChange.outputmoney(scope.row.creditAmountForeign)"></p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="本位币" header-align="center" align="right">
                                    <template scope="scope">
                                        <p v-text="scope.row.creditAmountLocal==0?'':moneyChange.outputmoney(scope.row.creditAmountLocal)"></p>
                                    </template>
                                </el-table-column>
                            </el-table-column>

                            <el-table-column label="金额" header-align="center">
                                <el-table-column label="方向" header-align="center" align="right">
                                    <template scope="scope">
                                        <p v-text="scope.row.subjectDirection==0?'':moneyChange.outputmoney(scope.row.subjectDirection)"></p>
                                    </template>
                                </el-table-column>
                                <el-table-column label="本位币" header-align="center" align="right">
                                    <template scope="scope">
                                        <p v-text="scope.row.balanceLocal==0?'':moneyChange.outputmoney(scope.row.balanceLocal)"></p>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                        </el-table>
                        <!-- 所有币别显示 -->
                    </template>
                    <!-- table结束 -->
                    <!-- 科目尾 -->
                    <div class="itemized-top-right">共{{itemizedData.length}}条</div>
                    <!-- 科目尾 -->
                </div>
            </el-col>
            <el-col :span="6">
                <!-- 右边部分快捷切换开始 -->
                <div class="subject-shortcut el-card--custom">
                    <div class="l-layout-header">
                        <i class="el-icon-d-arrow-right"></i>&nbsp;&nbsp;快速切换</div>
                    <div class="shortcut-div">
                        <!-- 科目搜索 -->
                        <el-autocomplete class="inline-input" v-model="itemizedSearchVal" icon="search" :trigger-on-focus="false" :fetch-suggestions="itemizedSearch" placeholder="请输入起始科目" @select="itemizedSelect" popper-class="subdown"></el-autocomplete>
                        <!-- 科目搜索 -->
                    </div>
                    <div class="subject-div">
                        <el-tree :data="Treedata" :props="defaultProps" @node-click="handleNodeClick" highlight-current ref="tree"></el-tree>
                    </div>
                </div>
                <!-- 右边部分快捷切换结束 -->
            </el-col>
        </el-row>
        <!-- 左边部分table结束 -->

    </div>
</template>
<script>
export default {
    name: 'itemized',
    data() {
        return {
            //科目字 
            subjecttext: '',
            //科目字

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
            itemizedForm: {
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
                showAuxiliary: true,
                //显示辅助核算
                //显示明细科目
                showDetail: false,
                //显示明细科目
                //显示现金银行存款对方科目
                showBankOpposte: false,
                //显示现金银行存款对方科目
                //显示余额不为0
                showBalNotZero: false,
                //显示余额不为0
                //显示余额与发生额都不为0
                showBalAndActualNotZero: false,
                //显示余额与发生额都不为0
                //无发生额不显示本期合计、本年合计
                notShowTotalWhenNotActual: false
                //无发生额不显示本期合计、本年合计
            },
            //form表单的初始数据

            //form表单提交数据
            submitAccountForm: {
                subjectCode: '',
                //UID
                acctBookUid: this.$store.state.accbookUid,
                //UID
                //期间
                periodStart: '',
                periodEnd: '',
                //期间
                //科目编码
                subjectCode: '',
                //科目
                subjectCodeStart: '',
                subjectCodeEnd: '',
                //科目

                //级别
                subjectLevelStart: '',
                subjectLevelEnd: '',
                //级别
                //币别
                currency: '',
                //币别
                //辅助核算
                showAuxiliary: '',
                showDetail: '',
                showBankOpposte: '',
                showBalNotZero: '',
                showBalAndActualNotZero: '',
                notShowTotalWhenNotActual: ''
                //辅助核算
            },
            //form表单提交数据

            //明细账表格数据
            itemizedData: [],
            //明细账表格数据

            //明显帐搜素列表
            itemizedSearchVal: '',
            //明显帐搜素列表
            //科目树列表
            //树搜素列表
            itemizedSearchList: [],
            //树搜素列表
            Treedata: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
        //return结束
    },
    //data结束
    created() {
        this.getSubjectData();//生成科目树并更新科目数据
    },
    updated() {
        //dom更新了从总账切换过来期间要同步变化
        this.periodChange();
    },
    mounted() {
        this.getPeriodsCurrencysData();//会计期间数据
    },
    watch: {
        "$route": function(to, from) {
            if (to.params.page === '4-2') {
                if(this.$store.state.subjectVal.Code != ''){
                    this.submitForm();
                }              
            }
        }
    },
    methods: {
        getCode(a) {
            //跳转
            this.$store.state.voucherUid = a;
            this.$router.push({ path: '1-3' });
        },
        //级次显示风格
        changeLelS(number) {
            if (parseFloat(number) < 1) {
                this.itemizedForm.subjectRankBegin = '1';
            } else if (parseFloat(number) > 9) {
                this.itemizedForm.subjectRankBegin = '9';
            }
        },
        changeLelE(number) {
            if (parseFloat(number) < 1) {
                this.itemizedForm.subjectRankEnd = '1';
            } else if (parseFloat(number) > 9) {
                this.itemizedForm.subjectRankEnd = '9';
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
                    this.itemizedForm.currencystyle = n.currencystyle;
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
            if (this.$store.state.itemizedForm.accountantBegin === '') {
                this.$store.state.itemizedForm.accountantBegin = per[0].value
            } else {
                this.$store.state.itemizedForm.accountantBegin = this.$store.state.itemizedForm.accountantBegin
            }
            if (this.$store.state.itemizedForm.accountantEnd === '') {
                this.$store.state.itemizedForm.accountantEnd = per[0].value
            } else {
                this.$store.state.itemizedForm.accountantEnd = this.$store.state.itemizedForm.accountantEnd
            }
            this.periodBegin = per[0].label;
            //默认选中币别最后一期
            this.itemizedForm.Currency = cur[0].value;
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
                //this.itemizedForm.accountantBegin拿的是aperiodUid
                if (this.$store.state.itemizedForm.accountantBegin === n.value) {
                    this.periodBegin = n.label;
                };
                if (this.$store.state.itemizedForm.accountantEnd === n.value) {
                    this.periodEnd = n.label;
                };
                //选择期间不同是 显示期间段
                if (this.$store.state.itemizedForm.accountantBegin === this.$store.state.itemizedForm.accountantEnd) {
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
            this.submitAccountForm.periodStart = this.$store.state.itemizedForm.accountantBegin,
            this.submitAccountForm.periodEnd = this.$store.state.itemizedForm.accountantEnd,
            //期间
            //科目传编码过去
            this.submitAccountForm.subjectCodeStart = this.subcodeStart,
            this.submitAccountForm.subjectCodeEnd = this.subcodeEnd,
            //科目传编码过去
            //级别
            this.submitAccountForm.subjectLevelStart = this.itemizedForm.subjectRankBegin,
            this.submitAccountForm.subjectLevelEnd = this.itemizedForm.subjectRankEnd,
            //级别
            //币别
            this.submitAccountForm.currency = this.itemizedForm.Currency,
            //币别
            //辅助核算
            this.submitAccountForm.showAuxiliary = this.itemizedForm.showAuxiliary,
            this.submitAccountForm.showDetail = this.itemizedForm.showDetail,
            this.submitAccountForm.showBankOpposte = this.itemizedForm.showBankOpposte,
            this.submitAccountForm.showBalNotZero = this.itemizedForm.showBalNotZero,
            this.submitAccountForm.showBalAndActualNotZero = this.itemizedForm.showBalAndActualNotZero,
            this.submitAccountForm.notShowTotalWhenNotActual = this.itemizedForm.notShowTotalWhenNotActual
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

        //tree树点击的某个节点获取的数据
        handleNodeClick(data) {
            this.submitAccountForm.subjectCode = data.code;
            //上面文字显示
            this.subjecttext = data.label;
            // 明细账科目树
            let Vue = this;
            Vue.AxiosPost('getDetailAcctContent', Vue.submitAccountForm, function(e) {
                if (e.code === '1') {
                    Vue.itemizedData = e.data.detailAccountResult;
                } else if (e.code === '1006') {
                    Vue.itemizedData = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //tree树点击的某个节点获取的数据，明细账科目树
        updatedTableDate() {          
            let Vue = this;
            Vue.AxiosPost('getDetailAcctContent', Vue.submitAccountForm, function(e) {
                if (e.code === '1') {
                    Vue.itemizedData = e.data.detailAccountResult;
                } else if (e.code === '1006') {
                    Vue.itemizedData = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //明显帐搜索
        itemizedSearch(queryString, callback) {
            let sub = this.itemizedSearchList.reverse();
            let results = queryString ? sub.filter(this.subjectFilter(queryString)) : sub;
            results.forEach((n, i) => {
                n.value = n.label;
            });
            callback(results);
        },
        subjectFilter(queryString) {
            return (res) => {
                return (res.label.indexOf(queryString.toLowerCase()) === 0);
            };
        },
        //明显帐搜索

        //明显帐选择搜索
        itemizedSelect(data) {
            this.submitAccountForm.subjectCode = data.code;
            //上面文字显示
            this.subjecttext = data.label;
            // 明细账科目树
            let Vue = this;
            Vue.AxiosPost('getDetailAcctContent', Vue.submitAccountForm, function(e) {
                if (e.code === '1') {
                    Vue.itemizedData = e.data.detailAccountResult;
                } else if (e.code === '1006') {
                    Vue.itemizedData = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //明显帐选择搜索

        //树数组循环
        count(a) {
            let subData = [];
            for (let i = 0, l = a.length; i < l; i++) {
                subData[i] = {
                    code: a[i].accountCode,
                    label: a[i].accountCode + ' ' + a[i].accountName
                };
                if (a[i].lowerLevel.length !== 0) {
                    subData[i].children = this.count(a[i].lowerLevel);
                }
                this.itemizedSearchList.push(subData[i]);
            }
            return subData;
        },
        //树数组循环

        //提交表单获取科目树，明细账内容
        submitForm() {
            //弹窗关闭
            this.periodstate = false;
            //期数数据提交改变页面的期数显示
            this.periodChange();
            //期数数据提交改变页面的期数显示
            this.doSubmit();
            // table数据显示风格布局
            this.styleshow = this.itemizedForm.currencystyle;
            // table数据显示风格布局
            //明细账科目树
            if (parseFloat(this.submitAccountForm.periodStart) > parseFloat(this.submitAccountForm.periodEnd)) {
                this.periodEndshow = false;
                this.Message('起始会计期间不能大于结束会计期间', 'error');
            }
            else if (parseFloat(this.submitAccountForm.subjectLevelStart) > parseFloat(this.submitAccountForm.subjectLevelEnd)) {
                this.Message('起始科目级次不能大于结束科目级次', 'error');
            } else {
                let Vue = this;
                Vue.AxiosPost('getDetailAcctCodeList', Vue.submitAccountForm, function(e) {
                    if (e.code === '1') {
                        //查询科目制空才不会渲染2次
                        Vue.itemizedSearchList = [];
                        //查询科目制空才不会渲染2次
                        Vue.Treedata = Vue.count(e.data.detailAcctCodeList);
                        //科目树第一条设置为默认数据
                        // 表头是显现1101 库存科目
                        if(Vue.$store.state.subjectVal.Code!=undefined){
                            Vue.submitAccountForm.subjectCode=Vue.$store.state.subjectVal.Code;
                            Vue.subjecttext = Vue.$store.state.subjectVal.Code + Vue.$store.state.subjectVal.name
                        }else{
                            Vue.submitAccountForm.subjectCode = e.data.detailAcctCodeList[0].accountCode;
                            Vue.subjecttext = e.data.detailAcctCodeList[0].accountCode + e.data.detailAcctCodeList[0].accountName;
                        }                                            
                        // 明细账科目树
                        if (Vue.submitAccountForm.subjectCode == '') {
                            //提示科目编码不能为空
                            Vue.Message('科目编码不能为空', 'error');
                        } else {
                            Vue.AxiosPost('getDetailAcctContent', Vue.submitAccountForm, function(e) {
                                if (e.code === '1') {
                                    Vue.itemizedData = e.data.detailAccountResult;
                                } else if (e.code === '1006') {
                                    Vue.itemizedData = [];
                                } else {
                                    Vue.Message(e.msg, 'error');
                                }
                            });
                        }
                    } else if (e.code === '1006') {
                        Vue.itemizedData = [];
                        Vue.Treedata = [];
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
            this.$store.state.subjectBegin = '',
            this.$store.state.subjectEnd = '',
            //科目
            //科目级别
            this.itemizedForm.subjectRankBegin = '',
            this.itemizedForm.subjectRankEnd = '',
            //科目级别
            //多项选择
            this.itemizedForm.showDetail = false,
            this.itemizedForm.showBankOpposte = false,
            this.itemizedForm.showBalNotZero = false,
            this.itemizedForm.showBalAndActualNotZero = false,
            this.itemizedForm.notShowTotalWhenNotActual = false
        }
        //表格数据重置
    }
}
</script>

<style lang='scss'>
#itemized .itemized-top {
    color: #555;
    width: 100%;
    height: 45px;
    .itemized-span {
        line-height: 28px;
        float: left;
    }
    .accout-itemized,
    .itemized-upload {
        float: left;
    }
    .accout-itemized {
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

#itemized {
    .itemized-top-left .con {
        width: 360px;
        padding: 15px;
        position: absolute;
        top: 27px;
        left: 52px;
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
    .itemized-top .itemized-top-left {
        .el-input__icon+.el-input__inner,
        .el-select .el-input__inner {
            padding-right: 0px;
        }
    }
    .itemized-top-right {
        display: block;
        padding-right: 20px;
        float: right;
        font-size: 13px;
        .el-button {
            width: 70px;
        }
    }
    .l-layout-header {
        cursor: default;
        padding-bottom: 10px;
        font-size: 15px;
        height: 24px;
        line-height: 24px;
        font-weight: 400;
        padding-left: 10px;
        overflow: hidden;
    }
    .subject-shortcut {
        height: 634px;
        .shortcut-div {
            height: 40px;
            padding-left: 15px;
            line-height: 40px;
            background-color: rgb(238, 242, 246);
            .el-input__inner {
                height: 32px;
            }
        }
        .subject-div {
            background-color: #fff;
        }
        input {
            font-size: 13px;
        }
    }
    .subdown ul li,
    .subject-shortcut .subject-div {
        font-size: 13px;
    }
}
</style>