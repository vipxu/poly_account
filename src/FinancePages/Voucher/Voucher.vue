<template>
    <div id="Voucher" v-voucherKD>
        <el-row class="el-card--custom">
            <el-row>
                <!-- left -->
                <div class="fl">
                    <template v-if="voucherSave.show">
                        <el-button type="primary" @click="addClick">新增</el-button>
                        <el-button @click="saveClick(false)">保存</el-button>
                        <el-button>打印</el-button>
                        <el-button>审核</el-button>
                        <el-button>复制</el-button>
                        <el-button>删除</el-button>
                        <el-dropdown menu-align="start" @command="modCommand">
                            <el-button>更多
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="1">保存为凭证模板</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                    <template v-else>
                        <el-button type="primary" @click="saveClick(true)">保存并新增</el-button>
                        <el-button @click="saveClick(false)">保存</el-button>
                        <el-dropdown menu-align="start" @command="modCommand">
                            <el-button>更多
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="1">保存为凭证模板</el-dropdown-item>
                                <el-dropdown-item command="2">从模板生成凭证</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </div>
                <!-- left end -->
                <!-- right -->
                <div class="fr">
                    <div class="hotkeys fl" :style="'background: url('+ img.hotKeys +') center no-repeat;'">
                        <img :src="img.hotKeysContent" height="368" width="394">
                    </div>
                    <div class="fl">
                        <el-button size="small" type="primary" icon="caret-left" :disabled="prev"></el-button>
                        <el-button size="small" type="primary" icon="caret-right" :disabled="next"></el-button>
                    </div>
                </div>
                <!-- right end -->
            </el-row>
            <el-row>
                <el-row class="voucher_top fz5">
                    <!-- unit-1 -->
                    <div class="fl">
                        <span>凭证字</span>
                        <el-select v-model="voucherWordValue" size="mini" style="width:65px;" placeholder="" @change="voucherWordValueChange">
                            <el-option v-for="item in voucherWordOptions" :key="item.value" :label="item.label" :value="item.value" size="small">
                            </el-option>
                        </el-select>
                        &nbsp;
                        <span v-text="voucherNumberValue"></span>
                        <span>号</span>
                    </div>
                    <!-- unit-1 end -->
                    <!-- unit-2 -->
                    <div class="fl" style="margin-left: 20px;">
                        <span>日期</span>
                        <el-date-picker v-model="pickerOptionsValue" size="mini" type="date" :editable="false" :clearable="false" placeholder="选择日期" :default-value="pickerOptionsValue" :picker-options="pickerOptions" style="width:120px;">
                        </el-date-picker>
                    </div>
                    <!-- unit-2 end -->
                    <!-- unit-3 -->
                    <div class="title_wrap fl">
                        <div class="voucher_title">记账凭证</div>
                        <div class="voucher_date fz4">
                            <span v-text="voucherHeadInfo.iyear"></span>年第
                            <span v-text="voucherHeadInfo.iperiod"></span>期
                        </div>
                    </div>
                    <!-- unit-3 end -->
                    <!-- unit-4 -->
                    <div class="fr">
                        <span>附单据</span>
                        <el-input size="mini" style="width:50px;" v-model="billNum"></el-input>&nbsp;
                        <span>张</span>
                    </div>
                    <!--unit-4 end-->
                </el-row>
                <!-- 子组件 -->
                <Voucher-table @dialogAbsShow="dialogAbsShow" @dialogSubShow="dialogSubShow" @dialogAuxShow="dialogAuxShow" @addtr="addtr" @deltr="deltr" @auxCheck="auxCheck" @prevInput="prevInput" @nextInput="nextInput" @getNowEditindex="getNowEditindex" @subClear="subClear" @getBalance="getBalance" :childData="childData" :abstractData="dialogAbsData.tableData" :dialogAuxData="dialogAuxData">
                </Voucher-table>
                <!-- 子组件 end -->
                <el-row class="voucher_bottom">
                    <div class="fz5 after" style="margin-bottom: 10px;">
                        <div class="fl">制单人：
                            <span v-text="producer"></span>
                        </div>
                        <template v-if="voucherSave.show">
                            <div class="fr" style="margin-left: 15px;">最后修改时间：
                                <span class="fz6" v-text="pubts"></span>
                            </div>
                            <div class="fr">录入时间：
                                <span class="fz6" v-text="timeref"></span>
                            </div>
                        </template>
                    </div>
                    <div v-if="voucherSave.show" style="text-align: right;">
                        <el-button ref="save" type="primary" @click="saveClick(false)">保存</el-button>
                        <el-button>打印</el-button>
                    </div>
                    <div v-else style="text-align: right;">
                        <el-button ref="saveAndAdd" type="primary" @click="saveClick(true)">保存并新增</el-button>
                        <el-button @click="saveClick(false)">保存</el-button>
                    </div>
                </el-row>
            </el-row>
        </el-row>

        <!-- 摘要对话框 -->
        <el-dialog title="凭证摘要库" :visible.sync="dialogAbsVisible" :close-on-click-modal="false" size="tiny">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 3}" :maxlength="100" resize="none" placeholder="请输入摘要内容" v-model="dialogAbsData.textarea">
            </el-input>
            <el-row style="margin: 10px 5px 10px 0;">
                <div class="fr">
                    <el-button size="small" @click="absReset">重置</el-button>
                    <el-button v-if="dialogAbsData.edit" size="small" type="primary" @click="absSave">保存</el-button>
                    <el-button v-else size="small" type="primary" @click="absSave">新增</el-button>
                </div>
            </el-row>
            <el-table id="absTable" :data="dialogAbsData.tableData" v-loading="dialogAbsData.loading" element-loading-text="加载中" ref="absTable" @current-change="AbsCurrentChange" highlight-current-row stripe border height="320">
                <el-table-column label="操作" width="100" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small" @click.stop="absEdit(scope.$index, scope.row)" icon="edit">
                        </el-button>
                        <el-button type="text" size="small" @click.stop="absDel(scope.$index, scope.row)" icon="close">
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="digestText" label="摘要内容" header-align="center">
                </el-table-column>
            </el-table>
        </el-dialog>
        <!-- 摘要对话框 -->

        <!-- 科目对话框 -->
        <el-dialog title="选择科目" :visible.sync="dialogSubVisible" :close-on-click-modal="false" size="tiny">
            <template>
                <el-tabs v-loading="dialogSubLoading" active-name="1" type="border-card">
                    <el-tab-pane v-for="(item, index) in dialogSubData" :key="index" :label="item.text" :name="item.name" element-loading-text="加载中">
                        <div class="treeBox">
                            <el-tree :data="$store.state.subjectTreeData[index]" :props="defaultProps" @node-click="treeNodeClick" :highlight-current="true"></el-tree>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </template>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogSubVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogSubEnter">确定</el-button>
            </div>
        </el-dialog>
        <!-- 科目对话框结束 -->

        <!-- 辅助核算对话框 -->
        <el-dialog title="辅助核算" size="tiny" :visible.sync="dialogAuxVisible" :close-on-click-modal="false" @open="dialogAuxOpen" @close="dialogAuxClose">
            <el-form id="auxForm" :model="dialogAuxForm" ref="AuxForm" label-position="right" label-width="120px">
                <el-form-item v-for="(n, i) in dialogAuxData" :key="i" :label="n.name" :prop="i+''" :rules="[{ required: true, message: '辅助核算项目不能为空！',trigger: 'change'}]">
                    <el-select v-model="n.value" filterable default-first-option size="small" placeholder="请选择" @change="dialogAuxChange" v-auxInputEven="{index:i}">
                        <el-option v-for="item in n.options" :key="item.value" :label="item.code + ' ' + item.name" :value="item.uid"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAuxReset">重置</el-button>
                <el-button ref="auxEenter" type="primary" @click="dialogAuxEnter" v-auxEenterEven>确定</el-button>
            </div>
        </el-dialog>
        <!-- 辅助核算对话框结束 -->

        <!-- 新增凭证模板 -->
        <el-dialog title="新增模板" size="tiny" :visible.sync="dialogModVisible" :close-on-click-modal="false">
            <el-form label-width="120px" :model="modFormData" ref="ModForm">
                <el-form-item :prop="'subject'" label="模板类别" :rules="[{ required: true, message: '请选择模板类别！',trigger: 'change'}]">
                    <el-select v-model="modFormData.subject" placeholder="请选择">
                        <el-option v-for="item in modFormData.subjectOptions" :key="item.doctemCgUid" :label="item.doctemtype" :value="item.doctemCgUid">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :prop="'name'" label="模板名称" :rules="[{ required: true, message: '请填写模板名称', trigger: 'blur'}]">
                    <el-input v-model="modFormData.name"></el-input>
                </el-form-item>
                <el-form-item label="保存金额">
                    <el-checkbox v-model="modFormData.saveMoney"></el-checkbox>
                </el-form-item>
                <el-form-item label="保存辅助核算" v-if="saveAuxShow">
                    <el-checkbox v-model="modFormData.saveAux"></el-checkbox>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogModVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogModEnter">确定</el-button>
            </span>
        </el-dialog>
        <!-- 新增凭证模板 -->

        <!-- 凭证模板列表 -->
        <el-dialog title="选择模板" size="tiny" :visible.sync="dialogModListVisible" :close-on-click-modal="false">
            <el-table id="modListTable" :data="dialogModListData.tableData" v-loading="dialogModListData.loading" element-loading-text="加载中" ref="modListTable" @current-change="modListCurrentChange" highlight-current-row stripe border height="400">
                <el-table-column label="操作" width="50" align="center">
                    <template scope="scope">
                        <el-button type="text" size="small" @click.stop="modListDel(scope.$index, scope.row)" icon="close">
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="doctemType" label="类别" align="center" width="120">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="doctemName" label="名称" header-align="center">
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogModListVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogModListEnter">确定</el-button>
            </span>
        </el-dialog>
        <!-- 凭证模板列表 -->
    </div>
</template>

<script>
import Voucher_table from '@/components/Voucher_table'

export default {
    name: 'voucher',
    components: {
        'Voucher-table': Voucher_table
    },
    directives: {
        //全局keydown
        voucherKD: {
            unbind: function(vnode) {
                $(document).off();
            },
            inserted: function(el, binding, vnode) {
                let Vue = vnode.context;
                $(document).on('keydown', function(e) {
                    if (Vue.$route.params.page === '1-1') {
                        if (e.keyCode === 83 && e.ctrlKey) {
                            e.preventDefault();
                            Vue.saveClick(false);
                        } else if (e.keyCode === 123) {
                            e.preventDefault();
                            Vue.saveClick(true);
                        }
                    }
                });
            }
        },
        //
        auxInputEven: {
            unbind: function(el) {
                $(el).off();
            },
            inserted: function(el, binding, vnode) {
                let Vue = vnode.context;
                $(el).on('click', function(e) {
                    Vue.nowAux = el;
                }).find('input').on('keydown', function(e) {
                    if ((e.keyCode === 13 && e.shiftKey) || (e.keyCode === 9 && e.shiftKey)) {
                        e.preventDefault();
                        Vue.auxPrevInput(el);
                    } else if ((e.keyCode === 13 && !e.shiftKey) || (e.keyCode === 9 && !e.shiftKey)) {
                        e.preventDefault();
                        Vue.auxKeDown = true;
                        Vue.auxNextInput(Vue.nowAux);
                    }
                }).on('focus', function(e) {
                    Vue.nowAux = el;
                });
            }
        },
        //
        auxEenterEven: {
            unbind: function(el) {
                $(el).off();
            },
            inserted: function(el, binding, vnode) {
                $(el).on('keydown', function(e) {
                    let Vue = vnode.context;
                    if ((e.keyCode === 13 && e.shiftKey) || (e.keyCode === 9 && e.shiftKey)) {
                        e.preventDefault();
                    } else if ((e.keyCode === 13 && !e.shiftKey) || (e.keyCode === 9 && !e.shiftKey)) {
                        e.preventDefault();
                        $(el).click();
                    }
                });
            }
        }
    },
    data() {
        return {
            //图片资源
            img: {
                hotKeysContent: require('@/assets/img/vchKeyBoard.jpg'),
                hotKeys: require('@/assets/img/keyboard.png')
            },
            //图片资源
            //保存用的临时id
            vouchSaveId: '',
            //保存用的临时id
            //禁用 上一张 下一张
            prev: true,
            next: true,
            //禁用 上一张 下一张
            //是否已保存
            voucherSave: {
                show: false
            },
            //是否已保存
            //制单员
            producer: '测试员',
            //制单员
            //单据数
            billNum: '0',
            //单据数
            //日期
            pickerOptions: {},
            pickerOptionsValue: '',
            //日期
            //凭证头信息
            voucherHeadInfo: {
                aperiodUid: '',
                imonth: '',
                iperiod: '',
                iyear: ''
            },
            //凭证头信息
            // 凭证字
            voucherWordOptions: [],
            voucherWordValue: '',
            voucherNumberValue: '',
            // 凭证字

            //摘要库对话框
            dialogAbsVisible: false,
            dialogAbsData: {
                save: true,
                loading: true,
                edit: false,
                editid: '',
                textarea: '',
                tableData: []
            },
            //摘要库对话框

            //科目对话框
            dialogSubVisible: false,
            dialogSubLoading: true,
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

            //辅助核算对话框
            dialogAuxVisible: false,
            dialogAuxData: [],
            //辅助核算对话框

            //新增模板对话框
            dialogModVisible: false,
            modFormData: {
                subject: '',
                subjectOptions: [],
                name: '',
                saveMoney: false,
                saveAux: false
            },
            modVouchView: [],
            saveAuxShow: false,
            //新增模板对话框

            //模板列表
            dialogModListVisible: false,
            dialogModListData: {
                loading: true,
                tableData: []
            },
            modNowvouchView: [],//当前选择模板
            //模板列表

            //当前编辑的科目或摘要
            nowEditindex: '',
            //当前编辑的科目或摘要

            //当前focus的辅助核算
            nowAux: '',
            //当前focus的辅助核算

            //是否点击确认
            auxKeDown: false,
            //是否点击确认

            //树形控件
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            treeNowData: {},
            //树形控件

            //childData
            childData: {
                trData: [{
                    abstract: {
                        show: false,
                        val: ''
                    },
                    subject: {
                        show: false,
                        id: '',
                        val: '',
                        auxData: [],//辅助核算数据
                        DeCr_direction: '',//借贷方向
                        balance_show: false,
                        balance_val: '',
                        realBalance: ''//真实的余额
                    },
                    quantity: {
                        show: false,
                        num_val: '',//数量
                        price_val: '',//单价
                        cmeasure: ''//单位
                    },
                    currency: {
                        show: false,
                        exchangeRate: '',//汇率
                        original: '',//原币
                        homeCurrency: '',//是否默认币种
                        currencyValue: '',//币种
                        currencyOptions: []//币种选项
                    },
                    DeCr: {
                        state: true,//true是借，false是贷
                        show: false,
                        De_val: '',
                        Cr_val: ''
                    },
                    isaux: false//是否有除外币和数量外的辅助核算项
                }, {
                    abstract: {
                        show: false,
                        val: ''
                    },
                    subject: {
                        show: false,
                        id: '',
                        val: '',
                        auxData: [],
                        DeCr_direction: '',
                        balance_show: false,
                        balance_val: '',
                        realBalance: ''
                    },
                    quantity: {
                        show: false,
                        num_val: '',
                        price_val: '',
                        cmeasure: ''
                    },
                    currency: {
                        show: false,
                        exchangeRate: '',
                        original: '',
                        homeCurrency: '',
                        currencyValue: '',
                        currencyOptions: []
                    },
                    DeCr: {
                        state: true,
                        show: false,
                        De_val: '',
                        Cr_val: ''
                    },
                    isaux: false
                }, {
                    abstract: {
                        show: false,
                        val: ''
                    },
                    subject: {
                        show: false,
                        id: '',
                        val: '',
                        auxData: [],
                        DeCr_direction: '',
                        balance_show: false,
                        balance_val: '',
                        realBalance: ''
                    },
                    quantity: {
                        show: false,
                        num_val: '',
                        price_val: '',
                        cmeasure: ''
                    },
                    currency: {
                        show: false,
                        exchangeRate: '',
                        original: '',
                        homeCurrency: '',
                        currencyValue: '',
                        currencyOptions: []
                    },
                    DeCr: {
                        state: true,
                        show: false,
                        De_val: '',
                        Cr_val: ''
                    },
                    isaux: false
                }],
                DeCr_Total: {
                    allTotal: '',
                    De: '',
                    Cr: ''
                },
                quantity: false,
                currency: false,
            },
            //childData

            //保存后的数据
            pubts: '',//最后修改时间
            timeref: '',//录入时间
            //保存后的数据
        }
    },
    computed: {
        dialogAuxForm: function() {
            let form = {};
            this.dialogAuxData.forEach((n, i) => {
                form[i + ''] = n.value;
            });
            return form;
        },
    },
    created() {
        this.getVoucherHeadInfo();//获取凭证头信息
        this.getAbsTableData();//获取摘要信息
        this.getModClassList();//获取凭证模板类别列表
        this.getModList();//获取凭证模板列表
        this.getAccountingList();//更新辅助核算
        this.getSubjectData(function(Vue) {
            Vue.dialogSubLoading = false;
        });//生成科目树并更新科目数据
        this.vouchSaveId = this.randomString(10);
    },
    methods: {
        //模板下拉菜单点击
        modCommand(command) {
            this.saveAuxShow = false;
            switch (command) {
                case '1':
                    {
                        let vouchView = [],
                            nullLength = true;
                        this.childData.trData.forEach((item, index) => {
                            let nowitem = this.deleteEl($.extend(true, {}, item));
                            nowitem.subject.balance_val = '';//清空科目余额数据
                            nowitem.subject.balance_show = false;//科目余额默认隐藏
                            nowitem.subject.auxData.forEach((n, i) => {
                                n.options = [];
                            });
                            nowitem.currency.currencyOptions = [];//清空外币select
                            vouchView.push(nowitem);
                            if (nowitem.subject.auxData.length !== 0) {
                                this.saveAuxShow = true;
                            }
                        });
                        for (let i = 0, l = vouchView.length; i < l; i++) {
                            //去掉末尾空行
                            let last = vouchView.length - 1;
                            if (vouchView[last].abstract.val === '' && vouchView[last].subject.id === '') {
                                vouchView.pop();
                            }
                        }
                        if (vouchView.length > 0) {
                            if (this.modCheck(vouchView)) {
                                let nowModVouchView = [];
                                for (let i = 0, l = vouchView.length; i < l; i++) {
                                    if (vouchView[i].abstract.val !== '' && vouchView[i].subject.id !== '') {
                                        nowModVouchView.push(vouchView[i]);
                                    }
                                }
                                this.modVouchView = nowModVouchView;
                                this.dialogModVisible = true;
                            }
                        } else {
                            this.Message('请添加至少一条有效分录！', 'warning');
                        }
                    }
                    break;
                case '2':
                    this.dialogModListVisible = true;
                    break;
                default:
                    break;
            }
        },
        //模板下拉菜单点击

        //检测模板格式
        modCheck(vouchView) {
            for (let i = 0, l = vouchView.length; i < l; i++) {
                let item = this.childData.trData[i],
                    localMoney = vouchView[i].DeCr.state ? (vouchView[i].DeCr.De_val === '' ? 0 : vouchView[i].DeCr.De_val) : (vouchView[i].DeCr.Cr_val === '' ? 0 : vouchView[i].DeCr.Cr_val);
                if (vouchView[i].abstract.val !== '' || vouchView[i].subject.id !== '' || localMoney !== 0) {
                    if (vouchView[i].abstract.val === '') {
                        this.Message('请填写第' + (i + 1) + '条分录的摘要！', 'warning');
                        $(item.abstract.el).find('input').focus();
                        return false;
                    } else if (vouchView[i].subject.id === '') {
                        this.Message('请选择第' + (i + 1) + '条分录的会计科目！', 'warning');
                        $(item.subject.el).find('input').focus();
                        return false;
                    } else if (vouchView[i].quantity.show && vouchView[i].currency.show) {
                        if (vouchView[i].quantity.num_val === '') {
                            this.Message('请填写第' + (i + 1) + '条分录的数量！', 'warning');
                            $(item.quantity.num_el).find('input').focus();
                            return false;
                        } else if (vouchView[i].currency.exchangeRate === '') {
                            this.Message('请填写第' + (i + 1) + '条分录的汇率！', 'warning');
                            $(item.currency.ce_el).find('input').focus();
                            return false;
                        } else {
                            if (i === (l - 1)) {
                                return true;
                            }
                        }
                    } else if (vouchView[i].quantity.show) {
                        if (vouchView[i].quantity.num_val === '') {
                            this.Message('请填写第' + (i + 1) + '条分录的数量！', 'warning');
                            $(item.quantity.num_el).find('input').focus();
                            return false;
                        } else {
                            if (i === (l - 1)) {
                                return true;
                            }
                        }
                    } else if (vouchView[i].currency.show) {
                        if (vouchView[i].currency.exchangeRate === '') {
                            this.Message('请填写第' + (i + 1) + '条分录的汇率！', 'warning');
                            $(item.currency.ce_el).find('input').focus();
                            return false;
                        } else {
                            if (i === (l - 1)) {
                                return true;
                            }
                        }
                    } else {
                        if (i === (l - 1)) {
                            return true;
                        }
                    }
                }
            }
        },
        //检测模板格式
        //新增模板确认点击
        dialogModEnter() {
            this.$refs.ModForm.validate((valid) => {
                if (valid) {
                    let VouchView = [];
                    this.modVouchView.forEach((n, i) => {
                        VouchView.push($.extend(true, {}, n));
                    });
                    VouchView.forEach((n, i) => {
                        if (!this.modFormData.saveMoney) {
                            //不保存金额
                            if (n.DeCr.state) {
                                n.DeCr.De_val = '0';
                                n.DeCr.Cr_val = '';
                            } else {
                                n.DeCr.De_val = '';
                                n.DeCr.Cr_val = '0';
                            }
                        }
                        if (!this.modFormData.saveAux) {
                            //不保存辅助核算
                            n.subject.auxData.forEach((n, i) => {
                                n.value = '';
                            });
                        }
                    });
                    this.saveNewVoucherMod({
                        accbookUid: this.$store.state.accbookUid,
                        dsignUid: this.voucherWordValue,
                        doctemName: this.modFormData.name,
                        doctemCgUid: this.modFormData.subject,
                        vouchView: JSON.stringify(VouchView)
                    });
                    this.dialogModVisible = false;
                } else {
                    return false;
                }
            });
        },
        //新增模板确认点击

        //保存凭证模板
        saveNewVoucherMod(data) {
            let Vue = this;
            Vue.AxiosPost('saveNewVoucherMod', data, function(e) {
                if (e.code === '1') {
                    Vue.getModList();
                    Vue.dialogModVisible = false;
                    Vue.Message('保存成功', 'success');
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //保存凭证模板

        //获取凭证模板类别列表
        getModClassList() {
            let Vue = this;
            Vue.AxiosPost('getModClassList', {
                accbookUid: Vue.$store.state.accbookUid
            }, function(e) {
                if (e.code === '1') {
                    Vue.modFormData.subjectOptions = e.data.templateType;
                    Vue.modFormData.subject = e.data.templateType[0].doctemCgUid;
                } else if (e.code === '1006') {
                    Vue.modFormData.subjectOptions = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //获取凭证模板类别列表

        //凭证模板列表确定点击
        dialogModListEnter() {
            this.childData.trData = [];
            this.$nextTick(() => {
                this.modNowvouchView.forEach((n, i) => {
                    this.childData.trData.push($.extend(true, {}, n));
                    this.getBalance(n);
                    for (let j = 0, l = this.$store.state.subjectList.length; j < l; j++) {
                        //遍历科目列表
                        let n1 = this.$store.state.subjectList[j];
                        if (n1.id === this.childData.trData[i].subject.id) {
                            this.auxCheck_load(this.childData.trData[i], n1);
                            return false;
                        }
                    }
                });
                while (this.childData.trData.length < 3) {
                    this.addtr();
                }
            });
            this.dialogModListVisible = false;
        },
        //凭证模板列表确定点击

        //凭证模板选择
        modListCurrentChange(data) {
            this.modNowvouchView = data.vouchView;
        },
        //凭证模板选择

        //删除凭证模板
        modListDel(index, row) {
            this.$confirm('此操作将删除该条模板, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delModListData(row.doctemName, row.doctemCgUid);
            }).catch(() => {

            });
        },
        //删除凭证模板

        //删除模板数据
        delModListData(name, uid) {
            let Vue = this;
            Vue.AxiosPost('delModListData', {
                accbookUid: Vue.$store.state.accbookUid,
                doctemCgUid: uid,
                doctemName: name
            }, function(e) {
                if (e.code === '1') {
                    Vue.getModList();
                    Vue.Message('删除成功！', 'success');
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //删除模板数据

        //获取凭证模板列表
        getModList() {
            let Vue = this;
            Vue.AxiosPost('getModList', {
                acctBookUid: Vue.$store.state.accbookUid
            }, function(e) {
                Vue.dialogModListData.loading = false;
                if (e.code === '1') {
                    Vue.dialogModListData.tableData = e.data.templateList;
                } else if (e.code === '1006') {
                    Vue.dialogModListData.tableData = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //获取凭证模板列表

        //获取当前编辑行的index
        getNowEditindex(a) {
            this.nowEditindex = a;
        },
        //获取当前编辑行的index

        //添加行
        addtr(n) {
            let tr = {
                abstract: {
                    show: false,
                    val: ''
                },
                subject: {
                    show: false,
                    id: '',
                    val: '',
                    auxData: [],//辅助核算数据
                    DeCr_direction: '',//借贷方向
                    balance_show: false,
                    balance_val: '',
                    realBalance: ''//真实的余额
                },
                quantity: {
                    show: false,
                    num_val: '',//数量
                    price_val: '',//单价
                    cmeasure: ''//单位
                },
                currency: {
                    show: false,
                    exchangeRate: '',//汇率
                    original: '',//原币
                    homeCurrency: '',//是否默认币种
                    currencyValue: '',//币种
                    currencyOptions: []//币种选项
                },
                DeCr: {
                    state: true,//true是借，false是贷
                    show: false,
                    De_val: '',
                    Cr_val: ''
                },
                isaux: false//是否有除外币和数量外的辅助核算项
            };
            n ? this.childData.trData.splice(n + 1, 0, tr) : this.childData.trData.push(tr);
        },
        //添加行
        //删除行
        deltr(n) {
            if (this.childData.trData.length <= 2) {
                this.Message("至少保留2条分录！", 'warning');
            } else {
                this.childData.trData.splice(n, 1);
            }
        },
        //删除行
        //凭证字改变
        voucherWordValueChange(e) {
            this.voucherWordOptions.forEach((item, index) => {
                if (item.value === e) {
                    this.voucherNumberValue = item.noId;
                }
            });
        },
        //凭证字改变
        //摘要弹出
        dialogAbsShow(index) {
            if (!this.dialogAbsData.loading) {
                this.getAbsTableData();
            }
            this.dialogAbsVisible = true;
            this.nowEditindex = index;
        },
        //摘要弹出
        //摘要选择
        AbsCurrentChange(data) {
            if (this.nowEditindex !== '' && data) {
                let item = this.childData.trData[this.nowEditindex];
                item.abstract.val = data.digestText;
                this.dialogAbsVisible = false;
                this.$nextTick(() => {
                    this.$refs.absTable.setCurrentRow();
                    item.subject.show = true;
                });
            }
        },
        //摘要选择
        //点击摘要保存
        absSave() {
            if (this.dialogAbsData.edit && this.dialogAbsData.save) {
                this.dialogAbsData.save = false;
                this.editTableData(this.dialogAbsData.editid, this.dialogAbsData.textarea);
            } else if (!this.dialogAbsData.edit && this.dialogAbsData.save) {
                if (this.dialogAbsData.textarea !== '') {
                    this.dialogAbsData.save = false;
                    this.addTableData();
                } else {
                    this.Message('请输入摘要内容！', 'warning');
                }
            }
        },
        //点击摘要保存
        //清空textarea
        absReset() {
            this.dialogAbsData.textarea = '';
            this.dialogAbsData.edit = false;
        },
        //清空textarea
        //编辑摘要
        absEdit(index, row) {
            this.dialogAbsData.edit = true;
            this.dialogAbsData.editid = row.digestUid;
            this.dialogAbsData.textarea = row.digestText;
        },
        //编辑摘要
        //删除摘要
        absDel(index, row) {
            this.$confirm('此操作将删除该条摘要, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (this.dialogAbsData.edit && this.dialogAbsData.editid === row.digestUid) {
                    this.absReset();
                }
                this.delTableData(row.digestUid);
            }).catch(() => {

            });
        },
        //删除摘要
        //获取摘要库数据
        getAbsTableData() {
            let Vue = this;
            Vue.AxiosPost('getAbstractList', {
                accbookUid: Vue.$store.state.accbookUid
            }, function(e) {
                setTimeout(() => {
                    Vue.dialogAbsData.loading = false;
                    if (e.code === '1') {
                        Vue.dialogAbsData.tableData = e.data.digestResult;
                    } else if (e.code === '1006') {
                        Vue.dialogAbsData.tableData = [];
                    } else {
                        Vue.Message(e.msg, 'error');
                    }
                }, 200);
            });
        },
        //获取摘要库数据
        //新增摘要库数据
        addTableData() {
            let Vue = this;
            Vue.AxiosPost('addAbstractData', {
                accbookUid: Vue.$store.state.accbookUid,
                digestText: Vue.dialogAbsData.textarea
            }, function(e) {
                if (e.code === '1') {
                    Vue.getAbsTableData();
                    Vue.absReset();
                    Vue.Message('保存成功！', 'success');
                    Vue.dialogAbsData.save = true;
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //新增摘要库数据
        //编辑摘要库数据
        editTableData(id, txt) {
            let Vue = this;
            Vue.AxiosPost('editAbstractData', {
                digestUid: id,
                digestText: txt
            }, function(e) {
                if (e.code === '1') {
                    Vue.getAbsTableData();
                    Vue.absReset();
                    Vue.Message('修改成功！', 'success');
                    Vue.dialogAbsData.edit = false;
                    Vue.dialogAbsData.save = true;
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //编辑摘要库数据
        //删除摘要库数据
        delTableData(id) {
            let Vue = this;
            Vue.AxiosPost('delAbstractData', {
                digestUid: id
            }, function(e) {
                if (e.code === '1') {
                    Vue.getAbsTableData();
                    Vue.Message('删除成功！', 'success');
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //删除摘要库数据

        //科目弹出
        dialogSubShow(index) {
            if (!this.dialogSubLoading) {
                this.getSubjectData(function(Vue) {
                    Vue.dialogSubLoading = false;
                });
            }
            this.dialogSubVisible = true;
            this.nowEditindex = index;
        },
        //科目弹出
        //科目选择
        treeNodeClick(data) {
            this.treeNowData = data.children ? {} : data;
        },
        //科目选择
        //科目确认点击
        dialogSubEnter() {
            this.dialogSubVisible = false;
            if (this.treeNowData.value !== '' && this.nowEditindex !== '') {
                let item = this.childData.trData[this.nowEditindex],
                    data = this.treeNowData;
                item.subject.val = data.value;
                item.subject.id = data.id;
                switch (data.accountProperty) {
                    case '借':
                        item.subject.DeCr_direction = true;
                        break;
                    case '贷':
                        item.subject.DeCr_direction = false;
                        break;
                    default:
                        break;
                }
                this.auxCheck([item, data]);
                this.$nextTick(() => {
                    if (!item.isaux) {
                        this.getBalance(item);
                        this.nextInput(item.subject.el);
                    } else {
                        setTimeout(() => {
                            this.dialogAuxShow(item.subject.auxData);
                        }, 300);
                    }
                });
            }
        },
        //科目确认点击
        //清空科目数据
        subClear(item) {
            this.nowAux = '';
            item.subject = {
                show: false,
                id: '',
                val: '',
                el: item.subject.el,
                auxData: [],
                DeCr_direction: '',
                balance_show: false,
                balance_val: '',
                realBalance: ''//真实的余额
            };
            item.isaux = false;
            item.currency = {
                show: false,
                exchangeRate: '',
                original: '',
                homeCurrency: '',
                currencyValue: '',
                currencyOptions: []
            };
            item.quantity = {
                show: false,
                num_val: '',
                price_val: '',
                cmeasure: ''
            };
        },
        //清空科目数据
        //辅助核算弹出
        dialogAuxShow(data) {
            this.dialogAuxData = data;
            this.$nextTick(() => {
                this.dialogAuxVisible = true;
            });
        },
        dialogAuxOpen() {
            let Vue = this;
            this.$nextTick(() => {
                setTimeout(() => {
                    let check = true;
                    $(Vue.$refs.AuxForm.$el).find('input').each(function() {
                        let me = $(this);
                        if (me.val() === '') {
                            me.focus();
                            check = false;
                            return check;
                        }
                    });
                    if (check) {
                        $(Vue.$refs.AuxForm.$el).find('input').eq(0).focus();
                    }
                }, 300);
            });
        },
        //辅助核算弹出
        //辅助核算关闭
        dialogAuxClose() {
            let item = this.childData.trData[this.nowEditindex];
            if (item.subject.auxData.length === 0) {
                $(item.subject.el).find('input').focus();
            } else {
                this.$refs.AuxForm.validate((valid) => {
                    if (valid) {
                        this.$nextTick(() => {
                            this.nextInput(item.subject.el);
                        });
                    } else {
                        this.subClear(item);
                        this.$nextTick(() => {
                            $(item.subject.el).find('input').focus();
                        });
                    }
                });
            }
        },
        //辅助核算关闭
        //辅助核算重置
        dialogAuxReset() {
            let item = this.childData.trData[this.nowEditindex];
            this.subClear(item);
            this.$nextTick(() => {
                this.dialogAuxVisible = false;
            });
        },
        //辅助核算重置
        //辅助核算确认点击
        dialogAuxEnter() {
            let item = this.childData.trData[this.nowEditindex];
            this.$refs.AuxForm.validate((valid) => {
                if (valid) {
                    this.dialogAuxVisible = false;
                    this.getBalance(item);
                    this.$nextTick(() => {
                        this.nextInput(item.subject.el);
                    });
                } else {
                    return false;
                }
            });
        },
        //辅助核算确认点击
        //辅助核算选择
        dialogAuxChange() {
            if (this.auxKeDown) {
                this.auxKeDown = false;
            } else {
                this.auxNext();
            }
        },
        auxNext() {
            let check = true;
            this.$nextTick(() => {
                $(this.$refs.AuxForm.$el).find('input').each(function() {
                    let me = $(this);
                    if (me.val() === '') {
                        me.focus();
                        check = false;
                        return check;
                    }
                });
                if (check) {
                    this.auxNextInput(this.nowAux);
                }
            });
        },
        //辅助核算选择
        //获取会计科目余额
        getBalance(item) {
            let Vue = this,
                data = {
                    periodUid: Vue.voucherHeadInfo.aperiodUid,//会计期间id
                    accountUid: item.subject.id,//会计科目id
                };
            if (item.currency.show) {
                data.currencyUid = item.currency.currencyValue;
            }
            item.subject.auxData.forEach((n, i) => {
                switch (n.name) {
                    case '客户':
                        data.uid = n.value;
                        break;
                    case '职员':
                        data.uid = n.value;
                        break;
                    case '部门':
                        data.uid = n.value;
                        break;
                    case '存货':
                        data.uid = n.value;
                        break;
                    case '供应商':
                        data.uid = n.value;
                        break;
                    case '项目':
                        data.uid = n.value;
                        break;
                    case '被投资单位':
                        data.uid = n.value;
                        break;
                    case '投资单位':
                        data.uid = n.value;
                        break;
                    case '资金账户':
                        data.uid = n.value;
                        break;
                    default:
                        data.uid = n.value;
                        break;
                }
            });
            Vue.AxiosPost('getBalance', data, function(e) {
                if (e.code === '1') {
                    item.subject.balance_show = true;
                    item.subject.balance_val = e.data.balanceResult.balance;
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //获取会计科目余额
        //检测辅助核算
        auxCheck(a) {
            let item = a[0],
                data = a[1];
            item.isaux = false;
            item.subject.auxData = [];
            this.dialogAuxData = [];
            if (data.assist[0] === 1) {
                item.subject.auxData.push({
                    name: '职员',
                    value: '',
                    options: this.$store.state.assistAList.personnels
                });
            }
            if (data.assist[1] === 1) {
                item.subject.auxData.push({
                    name: '客户',
                    value: '',
                    options: this.$store.state.assistAList.customers
                });
            }
            if (data.assist[2] === 1) {
                item.subject.auxData.push({
                    name: '供应商',
                    value: '',
                    options: this.$store.state.assistAList.vendors
                });
            }
            if (data.assist[3] === 1) {
                item.subject.auxData.push({
                    name: '部门',
                    value: '',
                    options: this.$store.state.assistAList.departments
                });
            }
            if (data.assist[4] === 1) {
                item.subject.auxData.push({
                    name: '项目',
                    value: '',
                    options: this.$store.state.assistAList.auxitems
                });
            }
            if (data.assist[7] === 1) {
                item.subject.auxData.push({
                    name: '存货',
                    value: '',
                    options: this.$store.state.assistAList.inventorys
                });
            }
            if (data.assist[8] === 1) {
                this.$store.state.assistAList.customclasss.forEach((i) => {
                    if (item.subject.customClassUid === i.uid) {
                        item.subject.auxData.push({
                            name: i.name,
                            value: '',
                            options: i.customs
                        });
                    }
                });
            }
            if (data.assist[9] === 1) {
                item.subject.auxData.push({
                    name: '投资单位',
                    value: '',
                    options: this.$store.state.assistAList.investors
                });
            }
            if (data.assist[10] === 1) {
                item.subject.auxData.push({
                    name: '被投资单位',
                    value: '',
                    options: this.$store.state.assistAList.investees
                });
            }
            if (data.assist[11] === 1) {
                item.subject.auxData.push({
                    name: '资金账户',
                    value: '',
                    options: this.$store.state.assistAList.bankAccounts
                });
            }
            //是否有其他辅助核算

            if (item.subject.auxData.length > 0) {
                item.isaux = true;
            }

            //是否有外币核算
            if (data.assist[5] === 1) {
                this.childData.currency = true;
                item.currency.show = true;
                let Options = [];
                data.currencyUidList.forEach((i) => {
                    this.$store.state.assistAList.currencys.forEach((j) => {
                        if (i === j.currencyUid) {
                            Options.push({
                                value: i,
                                label: j.currencyCode,
                                exchangeRate: j.exchangeRate + '',
                                homeCurrency: j.homeCurrency
                            });
                        }
                    });
                });
                item.currency.currencyOptions = Options;
                if (item.currency.currencyOptions.length > 0) {
                    item.currency.currencyValue = data.currencyUidList[0];
                    item.currency.exchangeRate = item.currency.currencyOptions[0].exchangeRate;
                    item.currency.homeCurrency = item.currency.currencyOptions[0].homeCurrency;
                }
            }
            //是否有外币核算

            //是否有数量核算
            if (data.assist[6] === 1) {
                this.childData.quantity = true;
                item.quantity.show = true;
                item.quantity.cmeasure = data.cmeasure ? '(' + data.cmeasure + ')' : '';
            }
            //是否有数量核算
        },
        auxCheck_load(item, data) {
            if (item.isaux) {
                item.subject.auxData.forEach((n, i) => {
                    switch (n.name) {
                        case '客户':
                            n.options = this.$store.state.assistAList.customers;
                            break;
                        case '职员':
                            n.options = this.$store.state.assistAList.personnels;
                            break;
                        case '部门':
                            n.options = this.$store.state.assistAList.departments;
                            break;
                        case '存货':
                            n.options = this.$store.state.assistAList.inventorys;
                            break;
                        case '供应商':
                            n.options = this.$store.state.assistAList.vendors;
                            break;
                        case '项目':
                            n.options = this.$store.state.assistAList.auxitems;
                            break;
                        case '被投资单位':
                            n.options = this.$store.state.assistAList.investees;
                            break;
                        case '投资单位':
                            n.options = this.$store.state.assistAList.investors;
                            break;
                        case '资金账户':
                            n.options = this.$store.state.assistAList.bankAccounts;
                            break;
                        default:
                            this.$store.state.assistAList.customclasss.forEach((i) => {
                                if (n.value === i.uid) {
                                    n.options = i.customs;
                                }
                            });
                            break;
                    }
                });
            }
            //是否有外币核算
            if (data.assist[5] === 1) {
                this.childData.currency = true;
                item.currency.show = true;
                let Options = [];
                data.currencyUidList.forEach((i) => {
                    this.$store.state.assistAList.currencys.forEach((j) => {
                        if (i === j.currencyUid) {
                            Options.push({
                                value: i,
                                label: j.currencyCode,
                                exchangeRate: j.exchangeRate + '',
                                homeCurrency: j.homeCurrency
                            });
                        }
                    });
                });
                item.currency.currencyOptions = Options;
            }
            //是否有外币核算

            //是否有数量核算
            if (data.assist[6] === 1) {
                this.childData.quantity = true;
                item.quantity.show = true;
                item.quantity.cmeasure = data.cmeasure ? '(' + data.cmeasure + ')' : '';
            }
            //是否有数量核算
        },
        //检测辅助核算

        //获取新凭证头消息
        getVoucherHeadInfo() {
            let Vue = this;
            Vue.AxiosPost('getVoucherHeadInfo', {
                accbookUid: Vue.$store.state.accbookUid
            }, function(e) {
                let data = e.data.newAcctVouchResult;
                if (e.code === '1') {
                    let ap = data.defaultAcctPeriod;
                    Vue.voucherHeadInfo.aperiodUid = ap.aperiodUid;
                    Vue.voucherHeadInfo.imonth = ap.imonth;
                    Vue.voucherHeadInfo.iperiod = ap.iperiod;
                    Vue.voucherHeadInfo.iyear = ap.iyear;
                    Vue.pickerOptionsValue = new Date(data.defaultDbillDate).getTime();
                    Vue.pickerOptions = {
                        //设置可选日期范围
                        disabledDate(time) {
                            let firstDay,
                                lastDay,
                                date = new Date(data.defaultDbillDate);
                            firstDay = date.setDate(1);
                            lastDay = new Date(new Date(date.getFullYear(), (date.getMonth() + 1), 1) - (1000 * 60 * 60 * 24)).getTime();
                            return time.getTime() < firstDay || time.getTime() > lastDay;
                        }
                    };
                    Vue.voucherWordOptions[0] = {
                        value: data.dsignUid,
                        label: data.defaultAccsign,
                        noId: data.defaultInoId
                    };
                    Vue.voucherWordValue = data.dsignUid;
                    Vue.voucherNumberValue = data.defaultInoId;
                    Vue.getVoucherWordOptions(ap.iyear, ap.iperiod);
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //获取新凭证头消息
        //获取凭证字列表
        getVoucherWordOptions(year, period) {
            let Vue = this;
            Vue.AxiosPost('getVoucherWordOptions', {
                accbookUid: Vue.$store.state.accbookUid,
                iyear: year,
                iperiod: period
            }, function(e) {
                if (e.code === '1') {
                    for (let i = 0, l = e.data.dsignList.length; i < l; i++) {
                        let dl = e.data.dsignList[i];
                        Vue.voucherWordOptions[i] = {
                            value: dl.dsignUid,
                            label: dl.sign,
                            noId: dl.inoId
                        };
                        if (dl.isdefault === 1) {
                            Vue.voucherWordValue = dl.dsignUid;
                            Vue.voucherNumberValue = dl.inoId;
                        }
                    }
                } else if (e.code === '1006') {
                    Vue.voucherWordOptions = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //获取凭证字列表

        //新增点击
        addClick() {
            //清空保存的数据
            this.voucherSave.show = false;
            this.$store.state.voucherUid = '';
            this.pubts = '';
            this.timeref = '';
            //清空保存的数据

            this.getVoucherHeadInfo();//获取凭证头信息
            this.getAbsTableData();//获取摘要信息
            this.childData.trData = [];
            this.$nextTick(() => {
                for (let i = 0; i < 3; i++) {
                    this.addtr();
                }
            });
        },
        //新增点击
        //保存点击
        saveClick(add) {
            let accvouchs = [],
                checkAux = true;
            this.childData.trData.forEach((item, index) => {
                let data = {
                    accountUid: item.subject.id,
                    cdigest: item.abstract.val,
                    isDebit: item.DeCr.state,
                    localMoney: item.DeCr.state ? (item.DeCr.De_val === '' ? 0 : item.DeCr.De_val) : (item.DeCr.Cr_val === '' ? 0 : item.DeCr.Cr_val),
                };

                if (item.currency.show) {
                    data.currencyUid = item.currency.currencyValue;
                    data.foreignMoney = item.currency.original;
                }
                if (item.quantity.show) {
                    data.creditAmount = item.quantity.num_val;
                }
                for (let i = 0, l = item.subject.auxData.length; i < l; i++) {
                    let n = item.subject.auxData[i];
                    if (n.value === '') {
                        //检测没有保存辅助核算的模板
                        this.Message('请选择第' + (i + 1) + '条分录的辅助核算！', 'warning');
                        this.nowEditindex = index;
                        this.dialogAuxData = item.subject.auxData;
                        this.dialogAuxVisible = true;
                        checkAux = false;
                        return checkAux;
                    } else {
                        switch (n.name) {
                            case '客户':
                                data.uid = n.value;
                                break;
                            case '职员':
                                data.uid = n.value;
                                break;
                            case '部门':
                                data.uid = n.value;
                                break;
                            case '存货':
                                data.uid = n.value;
                                break;
                            case '供应商':
                                data.uid = n.value;
                                break;
                            case '项目':
                                data.uid = n.value;
                                break;
                            case '被投资单位':
                                data.uid = n.value;
                                break;
                            case '投资单位':
                                data.uid = n.value;
                                break;
                            case '资金账户':
                                data.uid = n.value;
                                break;
                            default:
                                data.uid = n.value;
                                break;
                        }
                    }
                }
                if (checkAux) {
                    let nowitem = $.extend(true, {}, item);
                    nowitem = this.deleteEl(nowitem);//删除保存起来的dom对象
                    nowitem.subject.balance_val = '';//清空科目余额数据
                    nowitem.subject.balance_show = false;//科目余额默认隐藏
                    nowitem.subject.auxData.forEach((n, i) => {
                        n.options = [];
                    });
                    nowitem.currency.currencyOptions = [];//清空外币select
                    data.cdefine1 = JSON.stringify(nowitem);
                    accvouchs.push(data);
                } else {
                    return checkAux;
                }
            });
            if (checkAux) {
                for (let i = 0, l = accvouchs.length; i < l; i++) {
                    let last = accvouchs.length - 1;
                    if (accvouchs[last].cdigest === '' && accvouchs[last].accountUid === '' && accvouchs[last].localMoney === 0) {
                        accvouchs.pop();
                    }
                }
                if (accvouchs.length > 0) {
                    if (this.saveCheck(accvouchs)) {
                        let nowAccvouchs = []
                        for (let i = 0, l = accvouchs.length; i < l; i++) {
                            if (accvouchs[i].cdigest !== '' && accvouchs[i].accountUid !== '' && accvouchs[i].localMoney !== 0) {
                                nowAccvouchs.push(accvouchs[i]);
                            }
                        }
                        this.saveVoucher(nowAccvouchs, add);
                    };
                } else {
                    this.Message('请添加至少2条有效分录！', 'warning');
                }
            }
        },
        //保存点击
        //删除保存起来的dom对象
        deleteEl(nowitem) {
            delete nowitem.abstract.el;
            delete nowitem.subject.el;
            delete nowitem.DeCr.De_el;
            delete nowitem.DeCr.Cr_el;
            delete nowitem.quantity.num_el;
            delete nowitem.quantity.price_el;
            delete nowitem.currency.sel_el;
            delete nowitem.currency.ce_el;
            delete nowitem.currency.co_el;
            return nowitem;
        },
        //删除保存起来的dom对象
        //检查数据
        saveCheck(data) {
            if (this.childData.DeCr_Total.allTotal === '') {
                this.Message('录入借贷不平，不能保存凭证！', 'warning');
            } else {
                for (let i = 0, l = data.length; i < l; i++) {
                    let item = this.childData.trData[i];
                    if (data[i].cdigest !== '' || data[i].accountUid !== '' || data[i].localMoney !== 0) {
                        if (data[i].cdigest === '') {
                            this.Message('请填写第' + (i + 1) + '条分录的摘要！', 'warning');
                            $(item.abstract.el).find('input').focus();
                            return false;
                        } else if (data[i].accountUid === '') {
                            this.Message('请选择第' + (i + 1) + '条分录的会计科目！', 'warning');
                            $(item.subject.el).find('input').focus();
                            return false;
                        } else if (data[i].creditAmount !== undefined && data[i].foreignMoney !== undefined) {
                            if (data[i].creditAmount === '') {
                                this.Message('请填写第' + (i + 1) + '条分录的数量！', 'warning');
                                $(item.quantity.num_el).find('input').focus();
                                return false;
                            } else if (item.quantity.price_val === '') {
                                this.Message('请填写第' + (i + 1) + '条分录的单价！', 'warning');
                                $(item.quantity.price_el).find('input').focus();
                                return false;
                            } else if (item.currency.exchangeRate === '') {
                                this.Message('请填写第' + (i + 1) + '条分录的汇率！', 'warning');
                                $(item.currency.ce_el).find('input').focus();
                                return false;
                            } else if (data[i].foreignMoney === '' && item.currency.homeCurrency !== 1) {
                                this.Message('请填写第' + (i + 1) + '条分录的原币金额！', 'warning');
                                $(item.currency.co_el).find('input').focus();
                                return false;
                            } else if (data[i].localMoney === 0) {
                                this.Message('请填写第' + (i + 1) + '条分录的借贷金额！', 'warning');
                                data[i].isDebit ? $(item.DeCr.De_el).find('input').focus() : $(item.DeCr.Cr_el).find('input').focus();
                                return false;
                            } else {
                                if (i === (l - 1)) {
                                    return true;
                                }
                            }
                        } else if (data[i].creditAmount !== undefined) {
                            if (data[i].creditAmount === '') {
                                this.Message('请填写第' + (i + 1) + '条分录的数量！', 'warning');
                                $(item.quantity.num_el).find('input').focus();
                                return false;
                            } else if (item.quantity.price_val === '') {
                                this.Message('请填写第' + (i + 1) + '条分录的单价！', 'warning');
                                $(item.quantity.price_el).find('input').focus();
                                return false;
                            } else if (data[i].localMoney === 0) {
                                this.Message('请填写第' + (i + 1) + '条分录的借贷金额！', 'warning');
                                data[i].isDebit ? $(item.DeCr.De_el).find('input').focus() : $(item.DeCr.Cr_el).find('input').focus();
                                return false;
                            } else {
                                if (i === (l - 1)) {
                                    return true;
                                }
                            }
                        } else if (data[i].foreignMoney !== undefined) {
                            if (item.currency.exchangeRate === '') {
                                this.Message('请填写第' + (i + 1) + '条分录的汇率！', 'warning');
                                $(item.currency.ce_el).find('input').focus();
                                return false;
                            } else if (data[i].foreignMoney === '' && item.currency.homeCurrency !== 1) {
                                this.Message('请填写第' + (i + 1) + '条分录的原币金额！', 'warning');
                                $(item.currency.co_el).find('input').focus();
                                return false;
                            } else if (data[i].localMoney === 0) {
                                this.Message('请填写第' + (i + 1) + '条分录的借贷金额！', 'warning');
                                data[i].isDebit ? $(item.DeCr.De_el).find('input').focus() : $(item.DeCr.Cr_el).find('input').focus();
                                return false;
                            } else {
                                if (i === (l - 1)) {
                                    return true;
                                }
                            }
                        } else if (data[i].localMoney === 0) {
                            this.Message('请填写第' + (i + 1) + '条分录的借贷金额！', 'warning');
                            data[i].isDebit ? $(item.DeCr.De_el).find('input').focus() : $(item.DeCr.Cr_el).find('input').focus();
                            return false;
                        } else {
                            if (i === (l - 1)) {
                                return true;
                            }
                        }
                    }
                }
            }
        },
        //检查数据
        //保存凭证
        saveVoucher(accvouchs, add) {
            let Vue = this,
                data = {
                    periodUid: Vue.voucherHeadInfo.aperiodUid,//会计期间ID
                    dsignUid: Vue.voucherWordValue,//凭证字ID
                    dbillDate: new Date(Vue.pickerOptionsValue).getTime(),//制单日期
                    accbill: Vue.producer,//制单人
                    idoccount: parseInt(Vue.billNum),//附单据数
                    accvouchs: JSON.stringify(accvouchs),
                    attachments: '[]',
                    vouchSaveId: Vue.vouchSaveId
                };
            if (Vue.voucherSave.show) {
                data.vouchUid = this.$store.state.voucherUid;
            }
            Vue.AxiosPost('saveVoucher', data, function(e) {
                Vue.vouchSaveId = Vue.randomString(10);
                if (e.code === '1') {
                    if (!Vue.voucherSave.show) {
                        if (add) {
                            //保存并新增
                            Vue.Message('保存成功！', 'success');
                            Vue.addClick();//新增
                        } else {
                            //保存
                            Vue.voucherSave.show = true;
                            Vue.Message('保存成功！', 'success');
                            Vue.childData.trData = [];
                            Vue.$nextTick(() => {
                                e.data.newAccvouch.accVouchs.forEach((n, i) => {
                                    if (n.cdefine1 && n.cdefine1 !== '') {
                                        Vue.childData.trData.push(n.cdefine1);
                                        Vue.getBalance(n.cdefine1);
                                        for (let j = 0, l = Vue.$store.state.subjectList.length; j < l; j++) {
                                            //遍历科目列表
                                            let n1 = Vue.$store.state.subjectList[j];
                                            if (n1.id === Vue.childData.trData[i].subject.id) {
                                                Vue.auxCheck_load(Vue.childData.trData[i], n1);
                                                return false;
                                            }
                                        }
                                    }
                                });
                                while (Vue.childData.trData.length < 3) {
                                    Vue.addtr();
                                }
                            });
                        }
                    } else {
                        Vue.Message('修改成功！', 'success');
                        Vue.childData.trData = [];
                        Vue.$nextTick(() => {
                            e.data.newAccvouch.accVouchs.forEach((n, i) => {
                                if (n.cdefine1 && n.cdefine1 !== '') {
                                    Vue.childData.trData.push(n.cdefine1);
                                    Vue.getBalance(n.cdefine1);
                                    for (let j = 0, l = Vue.$store.state.subjectList.length; j < l; j++) {
                                        //遍历科目列表
                                        let n1 = Vue.$store.state.subjectList[j];
                                        if (n1.id === Vue.childData.trData[i].subject.id) {
                                            Vue.auxCheck_load(Vue.childData.trData[i], n1);
                                            return false;
                                        }
                                    }
                                }
                            });
                            while (Vue.childData.trData.length < 3) {
                                Vue.addtr();
                            }
                        });
                    }
                    Vue.$store.state.voucherUid = e.data.newAccvouch.vouchUid;
                    Vue.pubts = Vue.timestampToDate(e.data.newAccvouch.pubts.time);
                    Vue.timeref = Vue.timestampToDate(e.data.newAccvouch.timeref.time);
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //保存凭证

        //生成随机字符串
        randomString(len) {
            len = len || 32;
            let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
                maxPos = $chars.length,
                str = '';
            for (let i = 0; i < len; i++) {
                str += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return str;
        },
        //生成随机字符串

        //时间戳转日期
        timestampToDate(timestamp) {
            let date = new Date(timestamp);
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        },
        //时间戳转日期

        //选择下一个input框
        nextInput(el) {
            this.PrevOrNext(el, 'Voucher_table', false);
        },
        //选择下一个input框
        //选择上一个input框
        prevInput(el) {
            this.PrevOrNext(el, 'Voucher_table', true);
        },
        //选择上一个input框
        //辅助核算选择下一个input框
        auxNextInput(el) {
            this.PrevOrNext(el, 'auxForm', false);
        },
        //辅助核算选择下一个input框
        //辅助核算选择上一个input框
        auxPrevInput(el) {
            this.PrevOrNext(el, 'auxForm', true);
        },
        //辅助核算选择上一个input框
        //上一个或下一个input框
        PrevOrNext(el, domid, pn) {
            this.$nextTick(() => {
                let nowinput = $(el).find('input'),
                    allinput = $('#' + domid + ' input').not(':disabled');
                let idx = allinput.index(nowinput);
                if (pn) {
                    if (idx > 0) {
                        allinput.eq(idx - 1).focus();
                    }
                } else {
                    if (idx < allinput.length - 1) {
                        allinput.eq(idx + 1).focus();
                    } else if (idx === allinput.length - 1) {
                        if (domid === 'Voucher_table') {
                            this.addtr();
                            this.nextInput(el);
                        } else if (domid === 'auxForm') {
                            $(this.$refs.auxEenter.$el).focus();
                        }
                    }
                }
            });
        }
        //上一个或下一个input框
    }
}
</script>
<style lang="scss">
#Voucher {
    .el-dialog {
        width: 600px;
        .el-tabs__content .treeBox {
            height: 360px;
            width: 100%;
            overflow: auto;
            .el-tree {
                border: none;
            }
        }
        .el-tabs--border-card {
            box-shadow: none;
        }
        #absTable {
            .el-table__row {
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
}
</style>

<style lang="scss" scoped>
#Voucher {
    .el-card--custom {
        width: 1186px;
        padding: 28px;
        position: relative;
    }

    .fl {
        float: left;
    }

    .fr {
        float: right;
    }

    .el-row {
        .hotkeys {
            position: relative;
            width: 30px;
            height: 30px;
            margin-right: 15px;
            >img {
                display: none;
            }
            &:hover>img {
                position: absolute;
                right: 0;
                top: 30px;
                display: block;
                z-index: 1;
            }
        }

        .voucher_top {
            margin: 10px 0 10px 0;
            padding-top: 10px;
            input {
                line-height: 30px;
            }

            >div>span,
            .title_wrap {
                line-height: 22px;
                vertical-align: middle;
            }

            .title_wrap {
                position: absolute;
                left: 506px;
                top: 0;
            }

            .voucher_title {
                display: inline;
                margin-right: 15px;
                text-align: center;
                font-size: 28px;
            }

            .voucher_date {
                display: inline-block;
            }
        }

        .voucher_bottom {
            margin-top: 10px;
        }
    }
}
</style>
