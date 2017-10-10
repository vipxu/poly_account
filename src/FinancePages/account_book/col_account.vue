<!--金额数量总账 -->
<template>
    <div id="colAccount">
        <!-- 头开始 -->
        <div class="colAccount-top">
                <div class="colAccount-top-left">
                    <span class="fz4 colAccount-span">多栏账</span>
                    <!-- 明细账期数 -->
                    <div class="accout-colAccount">
                        <div class="ui-btn-menu " :class="periodstate==true? 'ui-btn-menu-cur' : ''" @click="pullDown()">
                            <div class="ui-btn menu-btn" v-cloak>
                                <span>{{periodBegin}}</span>
                                <span v-show="periodEndshow">至</span>
                                <span v-show="periodEndshow">{{periodEnd}}</span>
                                <b></b>
                            </div>
                        </div>
                        <!--明细账多少期选择刷新数据 -->
                        <el-form :model="colAccountForm" ref="colAccountForm">
                            <div class="con" v-show="periodstate">
                                <ul>
                                    <li>
                                        <span>会计期间：</span>
                                        <template>
                                            <el-select v-model="colAccountForm.accountantBegin" placeholder="2017年1期" size="small">
                                                <el-option v-for="item in periodsList" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </template>
                                        <span>至</span>
                                        <template>
                                            <el-select v-model="colAccountForm.accountantEnd" placeholder="2017年1期" size="small">
                                                <el-option v-for="item in periodsList" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </template>
                                        <span>
                                            <i class="el-icon-time"></i>
                                        </span>
                                    </li>
                                    <li class="subject">
                                        <span>会计科目：</span>
                                        <el-autocomplete size="small" class="inline-input" v-model="colAccountForm.subjectEnd" :fetch-suggestions="subjectSearch" placeholder="请输入起始科目" @select="subjectSelect2"></el-autocomplete>
                                    </li>
                                    <li>
                                        <span style="padding-right:28px;">币别：</span>
                                        <template>
                                            <el-select v-model="colAccountForm.Currency" placeholder="请选币别" size="small">
                                                <el-option v-for="item in currencysList" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </template>
                                    </li>
                                    <li>
                                        <template>
                                            <el-radio-group v-model="colAccountForm.radio">
                                                <el-radio :label="3">只显示下级科目</el-radio>
                                                <el-radio :label="6">只显示最明细科目</el-radio>
                                            </el-radio-group>
                                        </template>
                                    </li>
                                    <li>
                                        <el-checkbox label="显示明细栏余额" name="type" v-model="colAccountForm.showAuxiliary"></el-checkbox>
                                    </li>
                                    
                                    <li>
                                        <el-checkbox label="无发生额且余额为0不显示" name="type" v-model="colAccountForm.showBalAndActualNotZero"></el-checkbox>
                                    </li>
                                    
                                </ul>
                                <div class="colAccount-top-right">
                                    <el-button size="small" @click="resetForm()">重置</el-button>
                                    <el-button type="primary" size="small" @click="submitForm()">确定</el-button>
                                </div>
                            </div>
                        </el-form>
                        <!--明细账多少期选择刷新数据 -->
                    </div>
                    <div class="colAccount-upload">
                        <el-button size="small" >刷新</el-button>
                    </div>
                </div>
                <div class="colAccount-top-right">
                    <el-button type="primary" size="small">打印</el-button>
                    <el-button size="small">导出 </el-button>
                </div>         
        </div>
        <!-- 头结束 -->

        <div class="colAccount-context el-card--custom">
        <!-- table开始 -->
        <template>
    <el-table :data="colAccountData" border stripe height="300">
        <el-table-column label="日期" header-align="center">
            <template scope="scope">
                <a href="#">{{ scope.row.code}}</a>
            </template>
        </el-table-column>

        <el-table-column label="凭证字" width="200" header-align="center">
            <template scope="scope">
                {{ scope.row.name }}
            </template>
        </el-table-column>

        <el-table-column label="摘要" header-align="center">
            <template scope="scope">
                {{ scope.row.danwei }}
            </template>
        </el-table-column>
        <el-table-column label="借方" header-align="center">
            <template scope="scope">
                {{ scope.row.danwei }}
            </template>
        </el-table-column>
        <el-table-column label="贷方" header-align="center">
            <template scope="scope">
                {{ scope.row.danwei }}
            </template>
        </el-table-column>
        <el-table-column label="方向" header-align="center">
            <template scope="scope">
                {{ scope.row.danwei }}
            </template>
        </el-table-column>
        <el-table-column label="余额" header-align="center">
            <template scope="scope">
                {{ scope.row.danwei }}
            </template>
        </el-table-column>

        

    </el-table>
</template>
        <!-- table结束 -->
            <!-- 科目尾 -->
        <div class="colAccount-top-right">1-8&nbsp;共8条</div>
            <!-- 科目尾 -->
        </div>
           
        <!-- 左边部分table结束 -->

    </div>
</template>
<script>
export default {
    name: 'colAccount',
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

            //币别列表
            currencysList: [],
            //币别列表

            //科目code
            subcodeEnd: '',
            //科目code

            //明细账期数下拉框是否显示
            periodstate: false,

            //form表单的初始数据
            colAccountForm: {
                //会计开始时间
                accountantBegin: '',
                accountantEnd: '',
                //至结束时间
                accountantEnd: '',
                //会计科目
                subjectEnd: '',
                //会计科目

                //单选按钮
                radio: 3,
                //单选按钮

                //币别
                Currency: '',
                //币别

                //显示辅助核算
                showAuxiliary: false,
                //显示辅助核算

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
                //期间
                periodStart: '',
                periodEnd: '',
                //期间

                //科目
                subjectCodeEnd: '',
                //科目

                //币别
                currency: '',
                //币别
                //辅助核算
                showAuxiliary: '',

                showBalAndActualNotZero: '',

                //辅助核算
            },
            //form表单提交数据

            //总账表格数据
            colAccountData: [{
                code: '10001',
                name: '其他货币资金',
                danwei: '1',
                fx: '借',
                a: 200333,
                b: 22,
                c: 300
            }]
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
                            value: n.currencyCode,
                            label: n.currencyName
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
        //获取会计期间币别数据

        //提交数据处理
        doSubmit() {
            //期间
            this.submitAccountForm.periodStart = this.colAccountForm.accountantBegin,
                this.submitAccountForm.periodEnd = this.colAccountForm.accountantEnd,
                //期间
                //科目传编码过去
                this.submitAccountForm.subjectCodeEnd = this.subcodeEnd,
                //科目传编码过去
                //币别
                this.submitAccountForm.currency = this.colAccountForm.Currency,
                //币别
                //辅助核算
                this.submitAccountForm.showAuxiliary = this.colAccountForm.showAuxiliary,

                this.submitAccountForm.showBalAndActualNotZero = this.colAccountForm.showBalAndActualNotZero
            //辅助核算
        },
        //提交数据处理

        //默认选中
        defaultSelect() {
            //这里会计期间不能用状态管理，状态异步，数据可能不没有获取到就要渲染页面
            let per = this.periodsList;
            //这里会计期间不能用状态管理，状态异步，数据可能不没有获取到就要渲染页面
            let cur = this.currencysList;
            //默认选中会计期间最后一期
            this.colAccountForm.accountantBegin = per[0].value;
            this.colAccountForm.accountantEnd = per[0].value;
            this.periodBegin = per[0].label;
            //默认选中币别最后一期
            this.colAccountForm.Currency = cur[0].value;
        },
        //默认选中

        //这里是期间显示多少期，上面同步变化
        //this.colAccountForm.accountantBegin拿的是aperiodUid
        periodChange() {
            let a = this.periodsList;
            a.forEach((n, i) => {
                if (this.colAccountForm.accountantBegin === n.value) {
                    this.periodBegin = n.label;
                };
                if (this.colAccountForm.accountantEnd === n.value) {
                    this.periodEnd = n.label;
                };
                //选择期间不同是 显示期间段
                if (this.colAccountForm.accountantBegin === this.colAccountForm.accountantEnd) {
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
            let sub = this.$store.state.subjectList;
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
            //会计开始时间
            this.colAccountForm.accountantBegin = '',
                this.colAccountForm.accountantEnd = '',
                //至结束时间
                this.colAccountForm.accountantEnd = '',
                //科目
                this.colAccountForm.subjectEnd = '',
                //科目

                //币别
                this.colAccountForm.Currency = '',
                //复选选择列表重置
                this.colAccountForm.showAuxiliary = false,

                this.colAccountForm.showBalAndActualNotZero = false

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
            // 提交数据
            let Vue = this;
            let data = this.submitAccountForm;
            //提交数据
            console.log(data);
            Vue.AxiosPost('getDetailAcctCodeList', data, function(e) {
                if (e.code === '1') {
                    console.log(e);
                } else if (e.code === '1006') {
                    Vue.Message(e.msg, 'error');
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //提交表单
    },
}
</script>
<style>
/* 数据渲染是的闪烁问题 */

[v-cloak] {
    display: none
}


/* 数据渲染是的闪烁问题 */

#colAccount .colAccount-top {
    color: #555;
    width: 100%;
    height: 45px;
}

.colAccount-span,
.accout-colAccount,
.colAccount-upload {
    float: left;
}

.colAccount-span {
    line-height: 28px;
}

.accout-colAccount{
    margin: 0 10px;
}

/* 明细账选择菜单卡片效果 公共样式*/

.ui-btn-menu {
    vertical-align: middle;
    zoom: 1;
    z-index: 3;
}

.ui-btn-menu-cur .menu-btn:active,
.ui-btn-menu-cur .menu-btn:hover {
    padding-bottom: 1px;
    background: #fff!important;
    border-bottom: none;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: none;
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

.colAccount-top-left .con {
    width: 360px;
    padding: 15px;
    position: absolute;
    top: 27px;
    left: 52px;
    border: 1px solid #c1c1c1;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .15);
    background-color: #fff;
    z-index: 2;
}


/* 区间选择 */

.colAccount-top-left .con ul li {
    padding-bottom: 20px;
    list-style-type: none;
    font-size: 14px;
    text-align: -webkit-match-parent;
    color: #555;
}

#colAccount .colAccount-top-left .con .el-input--small .el-input__inner {
    height: 30px;
    width: 112px;
}

.colAccount-top-left .con .el-input__icon {
    right: -4px;
}


/* 科目那个input */

#colAccount .colAccount-top-left .con ul .subject .el-input__inner {
    width: 246px;
}


/* 科目那个input */


/* hover之后自动追加.ui-btn-menu-cur */


/* 明细账选择菜单卡片效果 */

#colAccount .colAccount-top  .colAccount-top-left .el-input__icon+.el-input__inner {
    padding-right: 0px;
}

#colAccount .colAccount-top .colAccount-top-left .el-select .el-input__inner {
    padding-right: 0px;
}


/* 右边按钮部分 */

.colAccount-top-right {
    display: block;
    padding-right: 20px;
    float: right;
    font-size: 13px;
}

.colAccount-top-right .el-button {
    width: 70px;
}


/* 右边按钮部分 */


/* 区间选择 */
</style>