<!-- 核算项目明细账 -->
<template>
    <div id="proItemized">
        <!-- 头开始 -->
        <div class="proItemized-top">
            <div class="proItemized-top-left">
                <span class="fz4 proItemized-span">核算项目明细账</span>
                <!-- 核算项目明细账期数 -->
                <div class="accout-proItemized">
                    <div class="ui-btn-menu " :class="periodstate==true? 'ui-btn-menu-cur' : ''" @click="pullDown()">
                        <div class="ui-btn menu-btn" v-cloak>
                            <span>{{periodBegin}}</span>
                            <span v-show="periodEndshow">至</span>
                            <span v-show="periodEndshow">{{periodEnd}}</span>
                            <b></b>
                        </div>
                    </div>
                    <!--明细账多少期选择刷新数据 -->
                    <el-form :model="proItemizedForm" ref="proItemizedForm">
                        <div class="con" v-show="periodstate">
                            <ul>
                                <li>
                                    <span>会计期间：</span>
                                    <template>
                                        <el-select v-model="proItemizedForm.accountantBegin" placeholder="2017年1期" size="small">
                                            <el-option v-for="item in periodsList" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                    <span>至</span>
                                    <template>
                                        <el-select v-model="proItemizedForm.accountantEnd" placeholder="2017年1期" size="small">
                                            <el-option v-for="item in periodsList" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                    <span>
                                        <i class="el-icon-time"></i>
                                    </span>
                                </li>
                                <li class="subject">
                                    <span>辅助项目：</span>
                                    <el-autocomplete size="small" class="inline-input" v-model="proItemizedForm.subjectBegin" :fetch-suggestions="assistSearch" placeholder="请输入起始科目" @select="assistSelect"></el-autocomplete>
                                </li>
                                <li class="subject">
                                    <span style="padding-right:28px;">科目：</span>
                                    <el-autocomplete size="small" class="inline-input" v-model="proItemizedForm.subjectEnd" :fetch-suggestions="subjectSearch" placeholder="请输入起始科目" @select="subjectSelect"></el-autocomplete>
                                </li>
                                <li>
                                    <span>科目级次：</span>
                                    <el-input v-model="proItemizedForm.subjectRankBegin" size="small" style="width:65px;" type="number" min="1" max="9" placeholder="1~9" @blur="changeLelS(proItemizedForm.subjectRankBegin)"></el-input>
                                    <span style="margin-left:45px;">至</span>
                                    <el-input v-model="proItemizedForm.subjectRankEnd" size="small" style="width:65px;" type="number" min="1" max="9" placeholder="1~9" @blur="changeLelE(proItemizedForm.subjectRankEnd)"></el-input>
                                </li>
                                <li>
                                    <span style="padding-right:28px;">币别：</span>
                                    <template>
                                        <el-select v-model="proItemizedForm.Currency" placeholder="请选币别" size="small" @change="curstyle">
                                            <el-option v-for="item in currencysList" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </li>
                                <li>
                                    <el-checkbox label="显示科目" name="type" v-model="proItemizedForm.showAuxiliary"></el-checkbox>
                                </li>
                                <li>
                                    <el-checkbox label="余额为0不显示" name="type" v-model="proItemizedForm.showBalNotZero"></el-checkbox>
                                </li>
                                <li>
                                    <el-checkbox label="无发生额且余额为0不显示" name="type" v-model="proItemizedForm.showBalAndActualNotZero"></el-checkbox>
                                </li>
                            </ul>
                            <div class="proItemized-top-right">
                                <el-button size="small" @click="resetForm()">重置</el-button>
                                <el-button type="primary" size="small" @click="submitForm()">确定</el-button>
                            </div>
                        </div>
                    </el-form>
                    <!--明细账多少期选择刷新数据 -->
                </div>
                <!-- 核算项目明细账期数 -->
                <!-- 辅助类别 -->
                <span class="fz4 proItemized-span">辅助类型</span>
                <div class="assist-type">
                    <template>
                        <el-select v-model="assistVal" placeholder="请选择" size="small" @change="selectAssistItems()">
                            <el-option v-for="item in assistTypes" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </div>
                <!-- 辅助类别 -->
                <div class="proItemized-upload" style="margin-left:10px;">
                    <el-button size="small" @click="updatedTableDate()">查询</el-button>
                </div>
            </div>
            <div class="proItemized-top-right">
                <el-button type="primary" size="small">打印</el-button>
                <el-button size="small">导出 </el-button>
            </div>
        </div>
        <!-- 头结束 -->
        <el-row :gutter="20">
            <el-col :span="18">
                <div class="proItemized-context el-card--custom">
                    <!-- 科目头 -->
                    <div class="l-layout-header" v-cloak>科目：{{subjecttext}}</div>
                    <!-- 科目头 -->
                    <!-- table开始 -->
                    <template>
                        <!-- 本位币显示风格 -->
                        <el-table :data="proItemizedData" border height="600" stripe v-show="styleshow===1">
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
                        <el-table :data="proItemizedData" border height="600" stripe v-show="styleshow===0">
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
                        <el-table :data="proItemizedData" border height="600" stripe v-show="styleshow===2">
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
                    <div class="proItemized-top-right">共&nbsp;{{proItemizedData.length}}&nbsp;条</div>
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
                        <el-autocomplete class="inline-input" v-model="proItemizedSearchVal" icon="search" :trigger-on-focus="false" :fetch-suggestions="proItemizedSearch" placeholder="请输入起始科目" @select="proItemizedSelect"  popper-class="subdown"></el-autocomplete>
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
    name: 'proItemized',
    data() {
        return {
            //加载
            // tableDateLoading:true,
            //科目字 
            subjecttext: '',
            //科目字

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

            //辅助类型
            assistTypes: [],
            assistVal: '',
            //辅助类型

            //明细账期数下拉框是否显示
            periodstate: false,

            //form表单的初始数据
            proItemizedForm: {
                //会计开始时间
                accountantBegin: '',
                accountantEnd: '',
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
                //币别类型
                currencystyle: '',
                //币别类型

                //多项选择
                //显示辅助核算
                showAuxiliary: true,
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
                //UID
                acctBookUid: this.$store.state.accbookUid,
                //UID
            },

            //form表单提交数据

            //明细账表格数据
            proItemizedData: [],
            //明细账表格数据

            //明显帐搜素列表
            proItemizedSearchVal: '',
            //明显帐搜素列表

            //科目树列表
            //树搜素列表
            proItemizedSearchList: [],
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
    mounted() {
        this.getAcctBookPeriodAndCurrency();//有币别，会计期间，辅助核算项目
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
                this.proItemizedForm.subjectRankBegin = '1';
            } else if (parseFloat(number) > 9) {
                this.proItemizedForm.subjectRankBegin = '9';
            }
        },
        changeLelE(number) {
            if (parseFloat(number) < 1) {
                this.proItemizedForm.subjectRankEnd = '1';
            } else if (parseFloat(number) > 9) {
                this.proItemizedForm.subjectRankEnd = '9';
            }
        },
        //级次显示风格
        //账簿全局接接口，有币别，会计期间，辅助核算项目
        getAcctBookPeriodAndCurrency() {
            let Vue = this;
            Vue.AxiosPost('getAcctBookPeriodAndCurrency', {
                accbookUid: Vue.$store.state.accbookUid
            }, function(e) {
                if (e.code === '1') {
                    //会计期间
                    e.data.acctBookInfo.periods.forEach((n, i) => {
                        Vue.periodsList.push({
                            value: n.yearPeriod + '',
                            label: n.iyear + '年' + n.iperiod + '期'
                        });
                    });
                    //币别
                    e.data.acctBookInfo.currencys.forEach((n, i) => {
                        Vue.currencysList.push({
                            value: n.currencyUid,
                            label: n.currencyName,
                            currencystyle: n.homeCurrency
                        });
                    });
                    //辅助类别
                    e.data.acctBookInfo.assistTypes.forEach((n, i) => {
                        Vue.assistTypes.push({
                            value: n.assistTypeUid,
                            label: n.assistTypeName,
                            assistItems: n.assistItems
                        });
                    });
                    //凭证字默认选中第一个
                    Vue.defaultSelect();
                    Vue.submitForm();
                } else if (e.code === '1006') {
                    Vue.assistTypes = [];
                    Vue.periodsList = [];
                    Vue.currencysList = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //币别类型选择
        curstyle(data) {
            this.currencysList.forEach((n, i) => {
                if (n.value === data) {
                    this.proItemizedForm.currencystyle = n.currencystyle;
                }
            });
        },
        //币别类型选择
        //默认选中
        defaultSelect() {
            //默认选中会计期间最后一期
            this.proItemizedForm.accountantBegin = this.periodsList[0].value;
            this.proItemizedForm.accountantEnd = this.periodsList[0].value;
            this.periodBegin = this.periodsList[0].label;
            //默认选中币别最后一期
            this.proItemizedForm.Currency = this.currencysList[0].value;
            //辅助类别默认选中
            this.assistVal = this.assistTypes[0].value;
            //默认选中表格显示方式,要在dom操作变化之后才执行
            this.$nextTick(() => {
                this.styleshow = this.currencysList[0].currencystyle;
            });
        },
        //默认选中


        //这里是期间显示多少期，上面同步变化
        periodChange() {
            let a = this.periodsList;
            a.forEach((n, i) => {
                //this.proItemizedForm.accountantBegin拿的是aperiodUid
                if (this.proItemizedForm.accountantBegin === n.value) {
                    this.periodBegin = n.label;
                };
                if (this.proItemizedForm.accountantEnd === n.value) {
                    this.periodEnd = n.label;
                };
                //选择期间不同是 显示期间段
                if (this.proItemizedForm.accountantBegin === this.proItemizedForm.accountantEnd) {
                    this.periodEndshow = false;
                } else {
                    this.periodEndshow = true;
                }
                // 选择期间不同是 显示期间段
            });
        },
        //通过选择不同的辅助类型生成不同的辅助项目核算列表
        selectAssistItems() {
            this.assistItem = [];
            this.assistTypes.forEach((n, i) => {
                if (this.assistVal === n.value) {
                    this.assistItem = n.assistItems;
                }
            });
        },

        //辅助核算搜索
        assistSearch(queryString, callback) {
            let sub = this.assistItem;
            let results = queryString ? sub.filter(this.createFilter(queryString)) : sub;
            results.forEach((n, i) => {
                n.value = n.itemName;
            })
            callback(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
            };
        },
        //辅助核算搜索
        //辅助项目内别Uid
        assistSelect(item) {
            this.subcodeStart = item.itemCode;
        },
        //辅助项目内别Uid

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
            this.subcodeEnd = item.code;
        },
        //科目选择

        //点击出现下拉选择
        pullDown() {
            this.periodstate = !this.periodstate;
        },
        //点击出现下拉选择


        //这里是期间显示多少期，上面同步变化
        doSubmit() {
            //辅助核算类别UId
            this.submitAccountForm.assistTypeUid = this.assistVal,
            //期间
            this.submitAccountForm.periodStart = this.proItemizedForm.accountantBegin,
            this.submitAccountForm.periodEnd = this.proItemizedForm.accountantEnd,
            //期间
            //辅助核算编码
            this.submitAccountForm.assistCode = this.subcodeStart,
            //科目编码
            this.submitAccountForm.subjectCode = this.subcodeEnd,
            //级别
            this.submitAccountForm.subjectLevelStart = this.proItemizedForm.subjectRankBegin,
            this.submitAccountForm.subjectLevelEnd = this.proItemizedForm.subjectRankEnd,
            //级别
            //币别
            this.submitAccountForm.currency = this.proItemizedForm.Currency,
            //币别
            //辅助核算
            this.submitAccountForm.showSubject = this.proItemizedForm.showAuxiliary,
            this.submitAccountForm.showBalNotZero = this.proItemizedForm.showBalNotZero,
            this.submitAccountForm.showBalAndActualNotZero = this.proItemizedForm.showBalAndActualNotZero
            //辅助核算
        },
        //提交数据处理
        //科目搜索
        subjectSearch(queryString, callback) {
            let sub = this.$store.state.subjectList;
            let results = queryString ? sub.filter(this.subjectFilter(queryString)) : sub;
            results.forEach((n, i) => {
                n.value = n.selLabel;
            });
            callback(results);
        },
        subjectFilter(queryString) {
            return (res) => {
                return (res.selLabel.indexOf(queryString.toLowerCase()) === 0);
            };
        },
        //科目搜索

        //明显帐搜索
        proItemizedSearch(queryString, callback) {
            let sub = this.proItemizedSearchList;
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

        
        //树数组循环
        count(a) {
            let subData = [];
            for (let i = 0, l = a.length; i < l; i++) {
                subData[i] = {
                    label: a[i].assistCode + ' ' + a[i].assistName,
                    code: a[i].assistCode
                };
                if (a[i].accountInfo) {
                    subData[i].children = this.count(a[i].accountInfo);
                } else {
                    this.proItemizedSearchList.push(subData[i]);
                }
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
            this.styleshow = this.proItemizedForm.currencystyle;
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
                Vue.AxiosPost('getAssistDetailCode', Vue.submitAccountForm, function(e) {
                    if (e.code === '1') {
                        //查询科目制空才不会渲染2次
                        Vue.proItemizedSearchList = [];
                        //查询科目制空才不会渲染2次
                        Vue.Treedata = Vue.count(e.data.assistDetailCodes);
                        //默认
                        Vue.submitAccountForm.assistCode = e.data.assistDetailCodes[0].assistCode;
                        Vue.subjecttext = e.data.assistDetailCodes[0].assistCode + e.data.assistDetailCodes[0].assistName;
                            Vue.AxiosPost('getAssistDetailContent', Vue.submitAccountForm, function(e) {
                                if (e.code === '1') {
                                    Vue.proItemizedData = e.data.assistDetailContent;
                                } else if (e.code === '1006') {
                                    Vue.itemizedData = [];
                                } else {
                                    Vue.Message(e.msg, 'error');
                                }
                            });
                    } else if (e.code === '1006') {
                        Vue.itemizedData = [];
                        Vue.Treedata = [];
                    } else {
                        Vue.Message(e.msg, 'error');
                    }
                });
            }
        },
        //tree树点击的某个节点获取的数据
        handleNodeClick(data) {
            this.submitAccountForm.assistCode = data.code;
            //上面文字显示
            this.subjecttext = data.label;
            // 明细账科目树
            let Vue = this;
            Vue.AxiosPost('getAssistDetailContent', Vue.submitAccountForm, function(e) {
                if (e.code === '1') {
                    
                    Vue.proItemizedData = e.data.assistDetailContent;
                } else if (e.code === '1006') {
                    Vue.itemizedData = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //tree树点击的某个节点获取的数据
        //明显帐选择
        proItemizedSelect(data) {
            this.submitAccountForm.assistCode = data.code;
            //上面文字显示
            this.subjecttext = data.label;
            // 明细账科目树
            let Vue = this;
            Vue.AxiosPost('getAssistDetailContent', Vue.submitAccountForm, function(e) {
                if (e.code === '1') {
                    Vue.proItemizedData = e.data.assistDetailContent;
                } else if (e.code === '1006') {
                    Vue.itemizedData = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //明显帐选择
        //查询
        updatedTableDate() {
            this.submitForm();
        },

        //提交表单获取科目树，明细账内容
        //表格数据重置
        resetForm() {
            this.defaultSelect();
            //科目
            this.proItemizedForm.subjectBegin = '',
            this.proItemizedForm.subjectEnd = '',
            //科目
            //科目级别
            this.proItemizedForm.subjectRankBegin = '',
            this.proItemizedForm.subjectRankEnd = '',
            //科目级别
            //多项选择
            this.proItemizedForm.showAuxiliary = false,
            this.proItemizedForm.showBalNotZero = false,
            this.proItemizedForm.showBalAndActualNotZero = false
        },
        //表格数据重置

    },

}
</script>
<style lang='scss'>
#proItemized .proItemized-top {
    color: #555;
    width: 100%;
    height: 45px;
    .proItemized-span {
        float: left;
    }
}

.assist-type {
    float: left;
}

#proItemized {
    .proItemized-top {
        .accout-proItemized,
        .proItemized-upload {
            float: left;
        }
        .proItemized-span {
            line-height: 28px;
        }
        .assist-type,
        .accout-proItemized {
            margin: 0 10px;
        }
    }
    .proItemized-top-left .assist-type .el-input--small .el-input__inner {
        height: 28px;
        border-radius: 0px;
        width: 100px;
    }
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
    .proItemized-top-left .con {
        width: 360px;
        padding: 15px;
        position: absolute;
        top: 27px;
        left: 108px;
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

.proItemized-top-left .con .el-input__icon {
    right: -4px;
}


/* 科目那个input */

#proItemized {
    .proItemized-top-left .con ul .subject .el-input__inner {
        width: 246px;
    }
    .proItemized-top .proItemized-top-left {
        .el-input__icon+.el-input__inner,
        .el-select .el-input__inner {
            padding-right: 0px;
        }
    }
    .proItemized-top-right {
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
            height: 100%;
        }
    }
}
</style>