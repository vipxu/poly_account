<template>
    <div id="VoucherList">
        <el-row>
            <div class="vl-top-left">
                <span class="fz4 vl-span">查凭证</span>
                <popover content-width="400" :popover.sync="popshow">
                    <template slot="text">
                        <span v-text="periodBegin"></span>
                        <span v-show="periodEndshow">至</span>
                        <span v-show="periodEndshow" v-text="periodEnd"></span>
                    </template>
                    <template slot="content">
                        <el-form id="vlform" :model="vlform" label-width="70px">
                            <el-form-item label="会计期间">
                                <el-col :span="10">
                                    <el-select v-model="vlform.accountantBegin" size="small">
                                        <el-option v-for="item in periodsList" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col class="line" :span="2">至</el-col>
                                <el-col :span="10">
                                    <el-select v-model="vlform.accountantEnd" size="small">
                                        <el-option v-for="item in periodsList" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col class="line" :span="2">
                                    <i class="el-icon-time"></i>
                                </el-col>
                            </el-form-item>
                            <el-form-item>
                                <div class="btnBox">
                                    <el-button size="small" @click="resetForm()">重置</el-button>
                                    <el-button type="primary" size="small" @click="submitForm()">确定</el-button>
                                </div>
                            </el-form-item>
                        </el-form>
                    </template>
                </popover>
            </div>
            <div class="vl-top-right">
                <el-button type="primary">新增</el-button>
                <el-button>打印</el-button>
                <el-button>导出</el-button>
                <el-button>审核</el-button>
                <el-dropdown menu-align="start" @command="vlCommand">
                    <el-button>更多
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="1">反审核</el-dropdown-item>
                        <el-dropdown-item command="2">整理</el-dropdown-item>
                        <el-dropdown-item command="3">插入</el-dropdown-item>
                        <el-dropdown-item command="4">导入</el-dropdown-item>
                        <el-dropdown-item command="5">批量删除</el-dropdown-item>
                        <el-dropdown-item command="6">列表打印</el-dropdown-item>
                        <el-dropdown-item command="7">按导入模板格式导出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-row>
        <div class="el-card--custom">
            <el-table id="voucherTableData" :data="voucherTableData" border height="600" stripe style="width: 100%">
                <el-table-column type="selection" align="center" width="55">
                </el-table-column>
                <el-table-column prop="voucherDate" label="日期" align="center" width="130">
                </el-table-column>
                <el-table-column prop="voucherNumber" align="center" label="凭证字号" width="100">
                </el-table-column>
                <el-table-column label="摘要" header-align="center" min-width="200">
                    <template scope="scope">
                        <p v-for="(item,index) in scope.row.voucherRows" :key="index" v-text="item.voucherRemark"></p>
                    </template>
                </el-table-column>
                <el-table-column label="科目" header-align="center" min-width="300">
                    <template scope="scope">
                        <p v-for="(item,index) in scope.row.voucherRows" :key="index" v-text="item.subjectName"></p>
                    </template>
                </el-table-column>
                <el-table-column label="借方金额" header-align="center" align="right" width="150">
                    <template scope="scope">
                        <p v-for="(item,index) in scope.row.voucherRows" :key="index" v-text="item.debitAmount === 0 ? '' : moneyChange.outputmoney(item.debitAmount)"></p>
                    </template>
                </el-table-column>
                <el-table-column label="贷方金额" header-align="center" align="right" width="150">
                    <template scope="scope">
                        <p v-for="(item,index) in scope.row.voucherRows" :key="index" v-text="item.creditAmount === 0 ? '' : moneyChange.outputmoney(item.creditAmount)"></p>
                    </template>
                </el-table-column>
                <el-table-column prop="billPerson" label="制单人" align="center" width="120">
                </el-table-column>
                <el-table-column prop="checkPerson" label="审核人" align="center" width="120">
                </el-table-column>
                <el-table-column prop="" label="操作" fixed align="center" width="100">
                    <template scope="scope">
                        <el-button class="el-icon-edit" @click.native.prevent="editRow(scope.$index,scope.row)" type="text" size="small"></el-button>
                        <el-button class="el-icon-close" @click.native.prevent="deleteRow(scope.$index,scope.row)" type="text" size="small"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import pop from '@/components/popover'

export default {
    name: 'voucherlist',
    components: {
        'popover': pop
    },
    data() {
        return {
            voucherTableData: [],

            vlform: {
                accountantBegin: '',
                accountantEnd: ''
            },

            //会计期间列表
            periodsList: [],
            //会计期间列表

            //期间后半段是否显示
            periodEndshow: false,
            //期间后半段是否显示

            //期间显示
            periodBegin: '',
            //期间显示

            //期间显示
            periodEnd: '',
            //期间显示

            //pop下拉出现
            popshow: false
            //pop下拉出现
        }
    },
    mounted() {
        this.getPeriodsCurrencysData();
    },
    methods: {
        //获取会计期间数据
        getPeriodsCurrencysData() {
            let Vue = this;
            Vue.AxiosPost('getAcctBookPeriodAndCurrency', {
                accbookUid: Vue.$store.state.accbookUid
            }, function(e) {
                if (e.code === '1') {
                    let per = e.data.acctBookInfo.periods;
                    per.forEach((n, i) => {
                        Vue.periodsList.push({
                            value: n.yearPeriod + '',
                            label: n.iyear + '年' + n.iperiod + '期',
                            year: n.iyear,
                            period: n.iperiod
                        });
                    });
                    Vue.vlform.accountantBegin = Vue.periodsList[0].value;
                    Vue.vlform.accountantEnd = Vue.periodsList[0].value;
                    Vue.periodBegin = Vue.periodsList[0].label;
                    Vue.submitForm();
                } else if (e.code === '1006') {
                    Vue.periodsList = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //获取会计期间数据

        vlCommand(command) {
            switch (command) {
                case 1:

                    break;
                case 2:

                    break;
                case 3:

                    break;
                case 4:

                    break;
                case 5:

                    break;
                case 6:

                    break;
                case 7:

                    break;

                default:
                    break;
            }
        },

        periodChange() {
            let ys = '',
                ye = '',
                ps = '',
                pe = '';
            this.periodsList.forEach((n, i) => {
                if (this.vlform.accountantBegin === n.value) {
                    this.periodBegin = n.label;
                    ys = n.year;
                    ps = n.period;
                };
                if (this.vlform.accountantEnd === n.value) {
                    this.periodEnd = n.label;
                    ye = n.year;
                    pe = n.period;
                };
            });
            if (parseInt(ys) > parseInt(ye)) {
                this.Message('起始期间不能大于结束期间', 'warning');
                return false;
            } else if (parseInt(ps) > parseInt(pe)) {
                this.Message('起始期间不能大于结束期间', 'warning');
                return false;
            } else {
                //选择期间不同是 显示期间段
                if (this.vlform.accountantBegin === this.vlform.accountantEnd) {
                    this.periodEndshow = false;
                } else {
                    this.periodEndshow = true;
                }
                //选择期间不同是 显示期间段
                return true;
            }
        },

        //获取凭证列表
        getVoucherList() {
            let Vue = this;
            Vue.AxiosPost('getVoucherList', {
                acctBookUid: Vue.$store.state.accbookUid,
                periodStart: Vue.vlform.accountantBegin,
                periodEnd: Vue.vlform.accountantEnd
            }, function(e) {
                if (e.code === '1') {
                    Vue.voucherTableData = e.data.accvouchList;
                } else if (e.code === '1006') {
                    Vue.voucherTableData = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //获取凭证列表
        submitForm() {
            if (this.periodChange()) {
                this.popshow = false;
                this.getVoucherList();
            };
        },
        resetForm() {
            this.vlform.accountantBegin = this.periodsList[0].value;
            this.vlform.accountantEnd = this.periodsList[0].value;
            this.periodBegin = this.periodsList[0].label;
        },

        editRow(index, row) {
            this.$store.state.voucherUid = row.voucherUID;
            this.$router.push({ path: '1-3' });
        },
        deleteRow(index, row) {

        }
    }
}
</script>

<style lang="scss" scoped>
#VoucherList {
    .el-row {
        line-height: 36px;
        margin-bottom: 15px;
        .vl-top-left {
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
    #voucherTableData {
        tbody {
            tr {
                td {
                    .cell {
                        p {
                            line-height: 30px;
                            height: 30px;
                            margin: 0 -8px;
                            padding: 0 8px;
                            &:not(:last-child) {
                                border-bottom: 1px solid rgb(223, 232, 236);
                            }
                        }
                    }
                }
            }
        }
    }
    #vlform {
        width: 380px;
        .el-form-item {
            margin-bottom: 10px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .line {
            text-align: center;
        }
        .btnBox {
            float: right;
        }
    }
}
</style>

