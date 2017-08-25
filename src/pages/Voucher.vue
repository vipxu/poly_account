<template>
    <div id="page_Voucher">
        <el-row class="el-card--custom">
            <el-row>
                <!--left-->
                <div class="fl">
                    <el-button type="primary">保存并新增</el-button>
                    <el-button>保存</el-button>
                    <el-dropdown trigger="click" menu-align="start">
                        <el-button>更多
                            <i class="el-icon-caret-bottom el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>保存为凭证模板</el-dropdown-item>
                            <el-dropdown-item>从模板生成凭证</el-dropdown-item>
                            <el-dropdown-item>选项</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <!--left end-->
                <!--right-->
                <div class="fr">
                    <div class="hotkeys">
                        <img src="/static/img/vchKeyBoard.png" height="368" width="394">
                    </div>
                    <div class="btn-group fl">
                        <el-button size="small" type="primary" icon="caret-left"></el-button>
                        <el-button size="small" type="primary" icon="caret-right"></el-button>
                    </div>
                </div>
                <!--right end-->
            </el-row>
            <el-row>
                <el-row class="voucher_top fz5">
                    <!--unit-1-->
                    <div class="fl">
                        <span>凭证字</span>
                        <el-select v-model="voucherWordValue" size="small" style="width:65px;">
                            <el-option v-for="item in voucherWordOptions" :key="item.value" :label="item.label" :value="item.value" size="small">
                            </el-option>
                        </el-select>
                        <el-input v-model="voucherNumberValue" size="small" style="width:65px;"></el-input>&nbsp;
                        <span>号</span>
                    </div>
                    <!--unit-1 end-->
                    <!--unit-2-->
                    <div class="fl" style="margin-left: 20px;">
                        <span>日期</span>
                        <el-date-picker v-model="pickerOptionsValue" type="date" placeholder="选择日期" :picker-options="pickerOptions" style="width:120px;" size="small">
                        </el-date-picker>
                    </div>
                    <!--unit-2 end-->
                    <!--unit-3-->
                    <div class="title_wrap fl" style="margin: -12px 0 0 70px">
                        <div class="voucher_title">记账凭证</div>
                        <div class="voucher_date fz4">
                            <span>2017</span>年第
                            <span>1</span>期
                        </div>
                    </div>
                    <!--unit-3 end-->
                    <!--unit-4-->
                    <div class="fr">
                        <span>附单据</span>
                        <el-input size="small" placeholder="0" style="width:50px;"></el-input>&nbsp;
                        <span>张</span>
                    </div>
                    <!--unit-4 end-->
                </el-row>
                <Voucher-table @dialogSubShow="dialogSubVisible = true" @dialogAbsShow="dialogAbsVisible = true"></Voucher-table>
                <el-row class="voucher_bottom">
                    <div class="fz4">
                        制单人：
                        <span>测试员</span>
                    </div>
                    <div style="text-align: right;">
                        <el-button type="primary">保存并新增</el-button>
                        <el-button>保存</el-button>
                    </div>
                </el-row>
            </el-row>
        </el-row>
    
        <!--摘要对话框-->
        <el-dialog title="凭证摘要库" :visible.sync="dialogAbsVisible" :close-on-click-modal="false" size="tiny">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 3}" resize="none" placeholder="请输入摘要内容" v-model="dialogAbsData.textarea">
            </el-input>
    
            <el-row style="margin: 10px 5px 10px 0;">
                <div class="fr">
                    <el-button size="small">取消</el-button>
                    <el-button size="small" type="primary">保存</el-button>
                </div>
            </el-row>
            <template>
                <el-table :data="dialogAbsData.tableData" show-overflow-tooltip border height="320">
                    <el-table-column label="操作" width="100">
                        <template scope="scope">
                            <el-button type="text" size="small">
                                编辑
                            </el-button>
                            <el-button type="text" size="small">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="digestText" label="摘要内容">
                    </el-table-column>
                </el-table>
            </template>
        </el-dialog>
        <!--摘要对话框-->
    
        <!--科目对话框-->
        <el-dialog title="选择科目" :visible.sync="dialogSubVisible" :close-on-click-modal="false" size="tiny">
            <template>
                <el-tabs active-name="1" type="border-card">
                    <el-tab-pane v-for="(item, index) in dialogSubData" :key="index" :label="item.text" :name="item.name">
                        <el-tree :data="treeData[index]" :props="defaultProps"></el-tree>
                    </el-tab-pane>
                </el-tabs>
            </template>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogSubVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogSubVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        <!--科目对话框结束-->
    </div>
</template>

<script>
import Voucher_table from '@/components/Voucher_table'

export default {
    name: 'voucher',
    components: {
        'Voucher-table': Voucher_table
    },
    data() {
        return {
            //日期
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            pickerOptionsValue: '',
            //日期
            // 凭证字
            voucherWordOptions: [{
                value: '1',
                label: '记'
            }, {
                value: '2',
                label: '转'
            }],
            voucherWordValue: '1',
            voucherNumberValue: '1',
            // 凭证字
            //摘要库对话框
            dialogAbsVisible: false,
            dialogAbsData: {
                textarea: '',
                tableData: []
            },
            //摘要库对话框
            //科目对话框
            dialogSubVisible: false,
            dialogSubData: [
                {
                    name: '1',
                    text: '资产'
                }, {
                    name: '2',
                    text: '负债'
                }, {
                    name: '3',
                    text: '共同'
                }, {
                    name: '4',
                    text: '权益'
                }, {
                    name: '5',
                    text: '成本'
                }, {
                    name: '6',
                    text: '损益'
                }
            ],
            //科目对话框
            //树形控件
            treeData: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
            //树形控件
        }
    },
    created() {
        this.getTableData();
        this.getTreeData();
    },
    methods: {
        //获取摘要库数据
        getTableData(){
            let Vue = this;
            Vue.AxiosPost('getAbstractList',{
                accbookUid: '78242e7a80ce11e7bb6800163e08a430'
            },function(e){
                console.log(e);
                if (e.code === '1') {
                    Vue.dialogAbsData.tableData = e.data.digestResult;
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //获取摘要库数据
        //获取科目列表数据
        getTreeData() {
            let Vue = this;
            function count(a) {
                var childData = [];
                for (var i = 0, l = a.length; i < l; i++) {
                    childData[i] = {};
                    childData[i].label = a[i].accountCode + ' ' + a[i].accountName;
                    if (a[i].lowerLevel.length > 0) {
                        childData[i].children = count(a[i].lowerLevel);
                    }
                }
                return childData;
            }
            Vue.AxiosPost('getSubjectList', {
                accbookUid: '78242e7a80ce11e7bb6800163e08a430'
            }, function (e) {
                if (e.code === '1') {
                    for (var i = 0, l = e.data.acctTits.length; i < l; i++) {
                        Vue.treeData[i] = count(e.data.acctTits[i].subList);
                    }
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        }
        //获取科目列表数据
    }
}
</script>
<style>
#page_Voucher .el-card--custom {
    width: 1130px;
    padding: 40px;
    position: relative;
}

#page_Voucher .fl {
    float: left;
}

#page_Voucher .fr {
    float: right;
}

#page_Voucher .el-row .hotkeys {
    position: relative;
    float: left;
    width: 30px;
    height: 30px;
    margin-right: 15px;
    background: url(/static/img/ico-shortcut-key.gif) center no-repeat;
}

#page_Voucher .el-row .hotkeys>img {
    display: none;
}

#page_Voucher .el-row .hotkeys:hover>img {
    position: absolute;
    right: 0;
    top: 30px;
    display: block;
    z-index: 1;
}

#page_Voucher .el-row .voucher_top {
    margin: 18px 0 10px 0;
    padding-top: 10px;
}

#page_Voucher .el-row .voucher_top input {
    line-height: 31px;
}

#page_Voucher .el-row .voucher_top>div>span,
#page_Voucher .el-row .voucher_top .title_wrap {
    line-height: 30px;
    vertical-align: middle;
}

#page_Voucher .el-row .voucher_top .title_wrap {
    margin: -10px 0 0 60px;
}

#page_Voucher .el-row .voucher_top .voucher_title {
    display: inline;
    margin-right: 18px;
    text-align: center;
    font-size: 28px;
}

#page_Voucher .el-row .voucher_top .voucher_date {
    display: inline-block;
}

#page_Voucher .el-row .voucher_bottom {
    margin-top: 10px;
}

#page_Voucher .el-dialog {
    min-width: 600px;
}

#page_Voucher .el-dialog .el-tabs__content .el-tree {
    height: 360px;
    overflow: auto;
}

#page_Voucher .el-dialog .el-tabs--border-card {
    box-shadow: none;
}
</style>
