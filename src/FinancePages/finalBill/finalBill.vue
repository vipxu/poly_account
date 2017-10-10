<!-- 期末结账-->
<template>
    <div id="finalBill">
        <el-row>
            <div class="vl-top-left">
                <span class="fz4 vl-span">2017年第6期共录入凭证 4 张，财务初始余额试算平衡</span>
            </div>
            <div class="vl-top-right">
                <el-button size="small">重新测算</el-button>
                <el-button type="primary" size="small">生成凭证</el-button>
                <el-button type="primary" size="small"  @click="finallBillDialog=true">结账</el-button>
            </div>
        </el-row>
        <div class="centent">
        </div>
        <el-dialog title="系统提示" :visible.sync="finallBillDialog" size="small" :close-on-click-modal="false">
            <div class="dialog">
                <span><i class="el-icon-warning" style="color:#f7b34d"></i>&nbsp;&nbsp;&nbsp;请确认要结账到</span>
                <el-select v-model="aperioduid" placeholder="请选择" size="small">
                    <el-option v-for="item in periodsList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary"  size="small" @click="finallBill()">确定</el-button>
                <el-button size="small" @click="finallBillDialog=false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'finalBill',
    data() {
        return {
            //新增弹出
            finallBillDialog: false,
             //会计期间uid
            aperioduid: '',
            //默期
            periodsList: [],
            //会计期间列表
            periodsLists: [],
            //会计期间列表
        }
    },
    mounted() {
        this.getPeriodsCurrencysData() ;
    },
    methods: {
        //获取会计期间
        getPeriodsCurrencysData() {
            let Vue = this;
            Vue.AxiosPost('getPeriodsCurrencysList', {
                accbookUid: Vue.$store.state.accbookUid
            }, function(e) {
                if (e.code === '1') {
                    e.data.acctBookInfo.periods.forEach((n, i) => {
                        Vue.periodsLists.push({
                            value: n.aperiodUid,
                            label: n.iyear + '年' + (n.iperiod+1) + '期'
                        });
                    });
                    Vue.periodsList.push({
                        value:Vue.periodsLists[0].value,
                        label:Vue.periodsLists[0].label
                    })
                    Vue.aperioduid=Vue.periodsList[0].value;
                } else if (e.code === '1006') {
                    Vue.periodsLists = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        finallBill(){
            let Vue = this;
            console.log(this.$store.state.accbookUid);
            Vue.AxiosPost('checkoutAcctBook', {
                acctBookUid: Vue.$store.state.accbookUid
                }, function(e) {
                if (e.code === '1') {
                    console.log(e);
                    Vue.Message('结账成功', 'success');
                    Vue.finallBillDialog=false;
                }else {
                    Vue.Message(e.msg, 'error');
                }
            });
            
        }
    }
}
</script>
<style lang='scss'>
#finalBill {
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
    .el-dialog--small {
        width: 400px;
    }
    .el-dialog__body {
        padding: 20px 10px 0px 10px;
         
    }
}
</style>