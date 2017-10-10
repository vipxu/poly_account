<!-- 卡片 -->
<template>
    <div id="card">
        <!-- 头开始 -->
        <div class="card-top">
            <div class="card-top-context">
                <div class="card-top-left">
                    <span class="fz4 card-span">固定资产卡片</span>
                    <!-- 明细账期数 -->
                    <div class="accout-card">
                        <div class="ui-btn-menu " :class="periodstate==true? 'ui-btn-menu-cur' : ''" @click="pullDown()">
                            <div class="ui-btn menu-btn" v-cloak>
                                <span>过 滤</span>
                                <b></b>
                            </div>
                        </div>
                        <!--过滤 -->
                        <el-form :model="cardForm" ref="cardForm">
                            <div class="con" v-show="periodstate">
                                <el-input v-model="cardParameter.ttext" placeholder="请输入内容" size="small" class="input-size1"></el-input>
                                <div class="card-top-right search">
                                    <el-button type="primary" size="small" @click="queryFiltering()">确定</el-button>
                                </div>
                            </div>
                        </el-form>
                        <!--过滤 -->
                    </div>
                    <div class="card-upload">
                        <el-button size="small" @click="updatedTableDate()">刷新</el-button>
                    </div>
                    <p class="fz4 card-span" style="padding-left:10px;">{{cardtxt}}</p>
                </div>
                <div class="card-top-right">
                    <el-button type="primary" size="small" @click="addDialog = true">新增</el-button>
                    <el-button size="small">批量删除</el-button>
                    <el-button size="small">导入</el-button>
                    <el-button size="small">导出 </el-button>
                    <el-button type="primary" size="small">生成凭证 </el-button>
                </div>
            </div>
        </div>
        <!-- 头结束 -->
        <el-row :gutter="20">
            <el-col :span="20">
                <div class="card-context el-card--custom">
                    <!-- table开始 -->
                    <el-table ref="multipleTable" :data="cardData" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="45" align="center">
                        </el-table-column>
                        <el-table-column fixed label="操作" width="100" align="center">
                            <template scope="scope">
                                <el-button type="text" size="small">
                                    <i class="el-icon-edit"></i>
                                </el-button>&nbsp;&nbsp;
                                <el-button type="text" size="small" @click.native.prevent="delCategory(scope.$index, cardData)">
                                    <i class="el-icon-close"></i>
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="编号" width="105" align="center">
                            <template scope="scope">{{ scope.row.fixassetsCode }}</template>
                        </el-table-column>
                        <el-table-column label="名称" width="155" header-align="center">
                            <template scope="scope">{{ scope.row.fixassetsName }}</template>
                        </el-table-column>
                        <el-table-column label="类别" width="85" align="center">
                            <template scope="scope">{{ scope.row.assettypesName }}</template>
                        </el-table-column>
                        <el-table-column label="部门" width="85" align="center">
                            <template scope="scope">{{ scope.row.depName }}</template>
                        </el-table-column>
                        <el-table-column label="原值" width="85" align="right" header-align="center">
                            <template scope="scope">{{ scope.row.originalMoney }}</template>
                        </el-table-column>
                        <el-table-column label="期初累计折旧" width="105" header-align="center">
                            <template scope="scope">{{ scope.row.mbDepr }}</template>
                        </el-table-column>
                        <el-table-column label="月折旧" width="85" align="right" header-align="center">
                            <template scope="scope">{{ scope.row.deprecitionMonth }}</template>
                        </el-table-column>
                        <el-table-column label="预期使用期限" width="105" align="center">
                            <template scope="scope">{{ scope.row.fusePeriod }}</template>
                        </el-table-column>
                        <el-table-column label="已使用期" width="85" align="center">
                            <template scope="scope">{{ scope.row.usedmonths }}</template>
                        </el-table-column>
                        <el-table-column label="残值" width="85" header-align="center" align="right">
                            <template scope="scope">{{ scope.row.salvage }}</template>
                        </el-table-column>
                        <el-table-column label="残值率%" width="85" align="right" header-align="center">
                            <template scope="scope">{{ scope.row.salvagerate }}</template>
                        </el-table-column>
                        <el-table-column label="减值准备" width="85" align="right" header-align="center">
                            <template scope="scope">{{ scope.row.impairmentprovision }}</template>
                        </el-table-column>
                        <el-table-column label="期初净值" width="85" align="right" header-align="center">
                            <template scope="scope">{{ scope.row.mbNetvalue }}</template>
                        </el-table-column>
                        <!-- <el-table-column label="期末净值" width="85" align="right" header-align="center">
                            <template scope="scope">{{ scope.row.date }}</template>
                        </el-table-column> -->
                        <el-table-column label="折旧方法" width="85" align="center">
                            <template scope="scope">{{ scope.row.deprecitionMethod }}</template>
                        </el-table-column>
                        <el-table-column label="状态" width="85" align="center">
                            <template scope="scope">{{ scope.row.status }}</template>
                        </el-table-column>
                        <el-table-column label="清理期间" width="85" align="center">
                            <template scope="scope">{{ scope.row.clearanceDate}}</template>
                        </el-table-column>
                        <el-table-column label="购入凭证" width="125" align="center">
                            <template scope="scope">{{ scope.row.purchaseVouchers }}</template>
                        </el-table-column>
                        <el-table-column label="清理凭证" width="125" align="center">
                            <template scope="scope">{{ scope.row.liquidateVouchers}}</template>
                        </el-table-column>
                    </el-table>
                    <!-- table结束 -->
                    <!-- 科目尾 -->
                    <div class="card-top-right">共8条</div>
                    <!-- 科目尾 -->
                </div>
            </el-col>
            <el-col :span="4">
                <!-- 右边部分快捷切换开始 -->
                <div class="subject-shortcut el-card--custom">
                    <div class="l-layout-header">资产类别</div>
                    <div class="subject-div">
                        <el-tree :data="FatypesList" :props="FdefaultProps" @node-click="getTypesUid" default-expand-all></el-tree>
                    </div>
                    <div class="l-layout-header">部门</div>
                    <div class="subject-div">
                        <el-tree :data="departments" :props="DdefaultProps" @node-click="getdepUid" default-expand-all></el-tree>
                    </div>
                </div>
                <!-- 右边部分快捷切换结束 -->
            </el-col>
        </el-row>
        <!-- 左边部分table结束 -->
        <!--新增弹出层 -->
        <el-dialog title="新增" :visible.sync="addDialog" size="small" :close-on-click-modal="false">
            <el-form :model="addForm" ref="addForm" :rules="rules" label-width="130px">
                <div class="assets-wrap">
                    <ul class="mod-form-rows">
                        <li class="base-info-wrap">
                            <ul class="after">
                                <li class="row-item">
                                    <el-form-item label="资产编号" prop="fixassetsCode">
                                        <el-input placeholder="资产编号" size="small"  auto-complete="off" class="input-size2" v-model="addForm.fixassetsCode"></el-input>
                                    </el-form-item>
                                </li>
                                <li class="row-item special">
                                    <el-form-item label="资产名称" prop="fixassetsName">
                                        <el-input placeholder="资产名称" size="small" class="input-size2" v-model="addForm.fixassetsName"></el-input>
                                    </el-form-item>
                                </li>
                                <li class="row-item">
                                    <el-form-item label="资产类别" prop="assettypesUid">
                                        <el-select v-model="addForm.assettypesUid" placeholder="请选择" size="small" class="select2">
                                            <el-option v-for="item in FatypesList2" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </li>
                                <li class="row-item special">
                                    <el-form-item label="录入期间" prop="copyData">
                                        <el-input placeholder="录入期间" size="small" class="input-size2" v-model="copyData" :disabled="true"></el-input>
                                    </el-form-item>
                                </li>
                                <li class="row-item">
                                    <el-form-item label="使用部门" prop="depUid">
                                        <el-select v-model="addForm.depUid" placeholder="请选择" size="small" class="select2" filterable popper-class="dropdownSelect">
                                            <el-option v-for="item in departments2" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </li>
                                <li class="startData">                                   
                                    <el-form-item label="开始使用日期" prop="dstartdate">
                                        <el-date-picker v-model="addForm.dstartdate" type="date" placeholder="选择日期" style="width:140px;" size="small" popper-class="voucher_summary_day" :clearable="false" >
                                        </el-date-picker>
                                    </el-form-item>
                                </li>
                                <li>
                                    <div class="num">数量：1</div>
                                </li>
                                <li class="row-item">
                                    <el-form-item label="清理期间">
                                        <el-input placeholder="清理期间" size="small" class="input-size2" :disabled="true"></el-input>
                                    </el-form-item>
                                </li>
                            </ul>
                        </li>
                        <li class="depreciation-info-wrap">
                            <h3 class="row-item-tit">折旧方式</h3>
                            <ul class="after">
                                <li class="row-item">
                                    <el-form-item label="折旧方法" prop="deprecitionMethod">
                                        <el-select v-model="addForm.deprecitionMethod" placeholder="请选择" size="small" class="select1" @change="selectDeMe()">
                                            <el-option v-for="item in depreciationMethods" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </li>
                                <li class="row-item special">
                                    <el-form-item label="预计使用期限" prop="fusePeriod">
                                        <el-input placeholder="预计使用期限" size="small" class="select1" type="number" v-model="addForm.fusePeriod" @change="writeFusePeriod()"></el-input>
                                    </el-form-item>
                                </li>
                                <li class="row-item">
                                    <el-form-item label="固定资产科目" prop="accountFixUid">
                                        <el-select v-model="addForm.accountFixUid" placeholder="请选择" size="small" class="select2" filterable popper-class="dropdownSelect">
                                            <el-option v-for="item in $store.state.subjectList" :key="item.value" :label="item.selLabel" :value="item.selLabel">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </li>
                                <li class="row-item">
                                    <el-form-item label="累计折旧科目" prop="accountDeprUid">
                                        <el-select v-model="addForm.accountDeprUid" placeholder="请选择" size="small" class="select2" filterable popper-class="dropdownSelect">
                                            <el-option v-for="item in $store.state.subjectList" :key="item.value" :label="item.selLabel" :value="item.selLabel">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </li>
                                <li class="row-item">
                                    <el-form-item label="折旧费用科目" prop="accountDeprexpenseUid">
                                        <el-select v-model="addForm.accountDeprexpenseUid" placeholder="请选择" size="small" class="select2" filterable popper-class="dropdownSelect">
                                            <el-option v-for="item in $store.state.subjectList" :key="item.value" :label="item.selLabel" :value="item.selLabel">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </li>
                                <li class="row-item">
                                    <el-form-item label="税金科目" prop="accountTaxUid">
                                        <el-select v-model="addForm.accountTaxUid" placeholder="请选择" size="small" class="select2" filterable popper-class="dropdownSelect">
                                            <el-option v-for="item in $store.state.subjectList" :key="item.value" :label="item.selLabel" :value="item.selLabel">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </li>
                                <li class="row-item">
                                    <el-form-item label="资产购入科目" prop="accountPurchaseUid">
                                        <el-select v-model="addForm.accountPurchaseUid" placeholder="请选择" size="small" class="select2" filterable popper-class="dropdownSelect">
                                            <el-option v-for="item in $store.state.subjectList" :key="item.value" :label="item.selLabel" :value="item.selLabel">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </li>
                                <li class="row-item">
                                    <el-form-item label="资产清理科目" prop="accountLiquidateUid">
                                        <el-select v-model="addForm.accountLiquidateUid" placeholder="请选择" size="small" class="select2" filterable popper-class="dropdownSelect">
                                            <el-option v-for="item in $store.state.subjectList" :key="item.value" :label="item.selLabel" :value="item.selLabel">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </li>
                            </ul>
                        </li>
                        <li class="value-info-wrap">
                            <h3 class="row-item-tit">原值、净值、累计折旧</h3>
                            <ul class="row-wrap after">
                                <li class="row-item">
                                    <el-form-item label="原值" prop="originalMoney">
                                        <el-input placeholder="原值" v-model="addForm.originalMoney" size="small"  auto-complete="off" class="input-size3" type="number" @change="writeOriginalMoney()"></el-input>
                                    </el-form-item>
                                </li>
                                <li class="row-item special">
                                    <el-form-item label="税额" prop='tax'>
                                        <el-input placeholder="税额" v-model="addForm.tax" size="small"  auto-complete="off" class="input-size3" type="number"></el-input>
                                    </el-form-item>
                                </li>
                                <li class="row-item">
                                    <el-form-item label="残值率" prop="salvagerate">
                                        
                                        <el-input placeholder="残值率" v-model="addForm.salvagerate" size="small"  auto-complete="off" class="input-size3" @change="writeSalvagerate()" type="number"></el-input>
                                        <span>%</span>
                                    </el-form-item>
                                </li>
                                <li class="row-item special">
                                    <el-form-item label="预计残值" prop="salvage">
                                        <el-input placeholder="预计残值" v-model="addForm.salvage" size="small"  auto-complete="off" class="input-size3" :disabled="true"></el-input>
                                    </el-form-item>
                                </li>
                                <li class="row-item">
                                    <el-form-item label="减值准备" prop="impairmentprovision">
                                        <el-input placeholder="减值准备" v-model="addForm.impairmentprovision" size="small" type="number" auto-complete="off" class="input-size3" @change="writeImpairmentprovision()"></el-input>
                                    </el-form-item>
                                </li>
                                <li class="row-item special">
                                    <el-form-item label="已折旧期间" prop="usedmonths">
                                        <el-input placeholder="已折旧期间" v-model="addForm.usedmonths" size="small" type="number"  auto-complete="off" class="input-size3" @change="writeUsedmonths()"></el-input>
                                    </el-form-item>
                                </li>
                                <li class="row-item">
                                    <el-form-item label="期初累计折旧" prop="mbDepr">
                                        <el-input placeholder="期初累计折旧" v-model="addForm.mbDepr" size="small"  auto-complete="off" class="input-size3" :disabled="true"></el-input>
                                    </el-form-item>
                                </li>
                                <li class="row-item special">
                                    <el-form-item label="期初净值" prop="mbNetvalue">
                                         <el-input placeholder="期初净值" v-model="addForm.mbNetvalue" size="small"  auto-complete="off" class="input-size3" :disabled="true"></el-input>
                                    </el-form-item>
                                </li>
                                <li class="row-item">
                                    <el-form-item label="月折旧" prop="deprecitionMonth">
                                        <el-input placeholder="月折旧" v-model="addForm.deprecitionMonth" size="small"  auto-complete="off" class="input-size3" :disabled="true"></el-input>
                                    </el-form-item>
                                </li>
                                <li class="row-item">
                                    <el-form-item label="工作总量" prop="canwork">
                                        <el-input placeholder="工作总量" v-model="addForm.canwork" size="small" type="number"  auto-complete="off" class="input-size3"></el-input>
                                    </el-form-item>
                                </li>
                            </ul>
                        </li>
                        <li class="special">
                            <el-form-item label="备注" prop="remarks">
                                <el-input type="textarea" v-model="addForm.remarks"></el-input>
                            </el-form-item>
                        </li>
                    </ul>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="submitAddForm('addForm')">保存并新增</el-button>
                <el-button size="small">保存</el-button>
            </div>
        </el-dialog>
        <!--新增弹出层 -->

    </div>
</template>
<script>
export default {
    name: 'card',
    data() {
        return {
            //卡片字 
            cardtxt:'',
            //卡片字

            //折旧方法列表
            depreciationMethods:[],
            //会计期间
            periodsList:[],
            //卡片数据
            cardData: [],
            //部门
            departments: [{
                label:'全部',
                children:[]
            }],
            DdefaultProps: {
                children: 'children',
                label: 'label'
            },
            //固定资产类别
            FatypesList: [{
                label:'全部',
                children:[]
            }],
            FdefaultProps: {
                children: 'children',
                label: 'label'
            },
            //部门2
            departments2:[],
            //固定资产类别2
            FatypesList2:[],
            //明细账期数下拉框是否显示
            periodstate: false,
            //过滤查询
            cardForm: {},
            //过滤
            withdrawings: [{
                value: '0',
                label: '不计提'
            },
            {
                value: '1',
                label: '正常计提'
            }],
            withdrawing: '',

            input: '',
            //操作全删
            multipleSelection: [],
            //新增弹出
            addDialog: false,
            //录入期间
            copyData:'',
            //新增提交数据
            addForm: {
                accbookUid: this.$store.state.accbookUid,
                //固定资产编码
                fixassetsCode:'',
                //固定资产名称
                fixassetsName:'',
                //开始期间
                dstartdate:'',
                //固定资产类别uid
                assettypesUid:'',
                //部门Uid
                depUid:'',
                //录入日期2017-08-25
                accountDate:'',
                //折旧方法
                deprecitionMethod:'平均年限法',
                //预计使用期限
                fusePeriod:'0',
                //固定资产科目唯一标识码
                accountFixUid:'',
                //累计折旧科目唯一标识码
                accountDeprUid:'',
                //折旧费用科目唯一标识码
                accountDeprexpenseUid:'',
                //税金科目唯一标识码
                accountTaxUid:'',
                //资产购入科目唯一标识码
                accountPurchaseUid:'',
                //资产清理科目唯一标识码
                accountLiquidateUid:'',
                //原值
                originalMoney:'0',
                //残值率
                salvagerate:'0',
                //减值准备
                impairmentprovision:'0',
                //期初累计折旧
                mbDepr:'0',
                //月折旧
                deprecitionMonth:'0',
                //税额
                tax:'0',
                //预计残值
                salvage:'0',
                //已折旧期间
                usedmonths:'0',
                //期初净值
                mbNetvalue:'0',
                //备注
                remarks:'',
                //工作总量
                canwork:''                  
            },
            //请求卡片参数
            cardParameter:{
                accbookUid: this.$store.state.accbookUid,
                assettypesUid: '',
                depUid: '',
                ttext:''
            },
            //表单数据过滤
            rules: {
                fixassetsCode: [
                    { required: true, message: '请输入资产编码', trigger: 'blur' },
                ],
                fixassetsName: [
                    { required: true, message: '请输入资产名称', trigger: 'blur' }
                ],
                assettypesUid: [
                    { required: true, message: '请选择选择资产类别', trigger: 'change' }
                ],
                depUid: [
                    { required: true, message: '请选择使用部门', trigger: 'change' }
                ],
                dstartdate: [
                     { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                fusePeriod: [
                    {  required: true, message: '请输入预计使用期限', trigger: 'blur' }
                ],
                accountFixUid: [
                     { required: true, message: '请选择固定资产科目', trigger: 'change' }
                ],
                accountDeprUid: [
                     { required: true, message: '请选择累计折旧科目', trigger: 'change' }
                ],
                accountDeprexpenseUid: [
                     { required: true, message: '请选择折旧费用科目', trigger: 'change' }
                ],
                accountTaxUid: [
                     { required: true, message: '请选择税金科目', trigger: 'change' }
                ],
                accountPurchaseUid: [
                     { required: true, message: '请选择资产购入科目', trigger: 'change' }
                ],
                accountLiquidateUid: [
                     { required: true, message: '请选择资产清理科目', trigger: 'change' }
                ],
                originalMoney: [
                    { required: true, message: '原值不能为空', trigger: 'blur' },
                ],
                salvagerate: [
                    { required: true, message: '残值率', trigger: 'blur' }
                ],
                impairmentprovision: [
                    { required: true, message: '减值准备', trigger: 'blur' }
                ],
                tax: [
                    { required: true, message: '税额', trigger: 'blur' },
                ],
                usedmonths: [
                    { required: true, message: '已折期间', trigger: 'blur' }
                ],
                canwork: [
                    { required: true, message: '工作总量', trigger: 'blur' }
                ],
                remarks: [
                    { required: true, message: '请填写备注', trigger: 'blur' }
                ],

            },
        }
        //return结束
    },
    //data结束
    created() {
        this.getSubjectData();//生成科目树并更新科目数据
    },
    mounted() {
        //获取卡片数据
        this.getFaFixassetsListXgw();
        //查询固定资产列表
        this.getFatypesList();
        //查询部门列表
        this.getDepartment();
        //查询折旧方法
        this.getFaMethodList();
        //查询会计期间
        this.getPeriodsCurrencysData();
    },
    methods: {
        //数字转换
        changeDate(num) {
            return num < 10 ? ('0' + num) : num;
        },
        //处理开始使用日期
        checkDstartdate(){          
            console.log(this.addForm.dstartdate.getFullYear() + '-' + this.changeDate((this.addForm.dstartdate.getMonth() + 1)) + '-' + this.addForm.dstartdate.getDate());
        },
        //获取卡片数据
        getFaFixassetsListXgw() {
            this.cardData = [];
            let Vue = this;
            Vue.AxiosPost('getFaFixassetsListXgw', this.cardParameter, function(e) {
                if (e.code === '1') {
                    e.data.FixassetsList.forEach((n, i) => {
                        Vue.cardData.push({
                            //固定资产表id
                            fixassetsUid:n.fixassetsUid,
                            //固定资产编码
                            fixassetsCode:n.fixassetsCode,
                            //固定资产名称
                            fixassetsName:n.fixassetsName,
                            //类型
                            assettypesName:n.assettypesName,
                            //部门
                            depName:n.depName,
                            //原值
                            originalMoney:n.originalMoney,
                            //期初累计折旧
                            mbDepr:n.mbDepr,
                            //月折旧
                            deprecitionMonth:n.deprecitionMonth,
                            //预计使用期限
                            fusePeriod:n.fusePeriod,
                            //已使用期
                            usedmonths:n.usedmonths,
                            //残值
                            salvage:n.salvage,
                            //残值率
                            salvagerate:n.salvagerate,
                            //减值准备
                            impairmentprovision:n.impairmentprovision,
                            //期初净值
                            mbNetvalue:n.mbNetvalue,
                            //折旧方法
                            deprecitionMethod:n.deprecitionMethod,
                            //状态
                            status:n.status,
                            //清理期间
                            clearanceDate:n.clearanceDate,
                            //购入凭证
                            purchaseVouchers:n.purchaseVouchers,
                            //清理凭证
                            liquidateVouchers:n.liquidateVouchers                           
                        })
                    });
                } else if (e.code === '1006') {
                    Vue.cradData = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });

        },
        //获取卡片数据

        //点击出现下拉选择
        pullDown() {
            this.periodstate = !this.periodstate;
        },
        //点击出现下拉选择

        //这里需要根据固定资产内别uid与部门uid才能查出卡片内容
        getFatypesList() {
            let Vue = this;
            Vue.AxiosPost('getFatypesList', {
                accbookUid: Vue.$store.state.accbookUid
            }, function(e) {
                if (e.code === '1') {
                    e.data.fatypesList.forEach((n, i) => {
                        Vue.FatypesList[0].children.push({
                            //类别id
                            assettypesUid: n.assettypesUid,
                            //类别名称
                            label: n.assettypesName,
                            type:'资产类别:'
                        });
                        Vue.FatypesList2.push({
                            //类别id
                            value: n.assettypesUid,
                            //类别名称
                            label: n.assettypesName,
                        });
                    });
                    
                    
                } else if (e.code === '1006') {
                    Vue.FatypesList = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //tree树点击固定资产内别的某个节点获取的数据
        getTypesUid(data) {
            this.cardtxt='['+data.type+data.label+']';
            //固定资产请求uid
            this.cardParameter.ttext='';
            this.cardParameter.depUid='';
            this.cardParameter.assettypesUid = data.assettypesUid;
            //根据固定资产请求uid在查询
            this.getFaFixassetsListXgw();
        },
        //tree树点击固定资产内别的某个节点获取的数据

        //查询部门列表
        getDepartment() {
            let Vue = this;
            Vue.AxiosPost('getDepartment', {
                bookid: Vue.$store.state.accbookUid
            }, function(e) {
                if (e.code === '1') {
                    e.data.depallList.forEach((n, i) => {
                        Vue.departments[0].children.push({
                            //部门id
                            depUid: n.depUid,
                            //部门名称
                            label: n.depName,
                            type:'部门:'
                        });
                        Vue.departments2.push({
                            //部门id
                            value: n.depUid,
                            //部门名称
                            label: n.depName,
                        });
                    });
                } else if (e.code === '1006') {
                    Vue.departments = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //查询部门
        getdepUid(data) {
            this.cardtxt='['+data.type+data.label+']';
            this.cardParameter.ttext='';
            this.cardParameter.assettypesUid='';
            //固定资产请求uid
            this.cardParameter.depUid = data.depUid;
            //根据部门查询
           
            this.getFaFixassetsListXgw();
        },
        //击部门的某个节点获取的数据
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        //查询折旧方法
        getFaMethodList() {
            let Vue = this;
            Vue.AxiosPost('getFaMethodList', {
                accbookUid: Vue.$store.state.accbookUid,
            }, function(e) {
                if (e.code === '1') {
                    e.data.fatypesList.forEach((n, i) => {
                        Vue.depreciationMethods.push({
                            value: n.depreciationMethod,
                            label: n.depreciationMethod
                        });
                    });
                } else if (e.code === '1006') {
                    Vue.depreciationMethods = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
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
        //数字转换
        changeDate(num) {
            return num < 10 ? ('0' + num) : num;
        },

        //查询会计期间多少期的多少天是数据
        getPeriodsCurrencysData() {
            let Vue = this;
            Vue.AxiosPost('getAcctBookPeriodAndCurrency', {
                accbookUid: Vue.$store.state.accbookUid
            }, function(e) {
                if (e.code === '1') {
                    e.data.acctBookInfo.periods.forEach((n, i) => {
                        Vue.periodsList.push({
                            iyear: n.iyear,
                            iperiod: n.iperiod,
                            startDay: n.startDay,
                            lastDay: n.lastDay
                        });
                    });  
                    Vue.copyData= Vue.periodsList[0].iyear+'年'+Vue.periodsList[0].iperiod+'期'; 
                    Vue.addForm.dstartdate=new Date(Vue.periodsList[0].iyear + '-' + Vue.changeDate(Vue.periodsList[0].iperiod) + '-' + Vue.changeDate(Vue.periodsList[0].lastDay));             
                } else if (e.code === '1006') {
                    Vue.periodsList = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //提交数据处理
        //过滤查询
        queryFiltering(){
            this.cardParameter.depUid='';
            this.cardParameter.assettypesUid='';
            this.getFaFixassetsListXgw();
         },
        //刷新
        updatedTableDate(){
            this.getFaFixassetsListXgw();
        },
        //单个删除卡片
        delCategory(index, rows) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let Vue = this;
                Vue.AxiosPost('getDeleteFaFixassetsXgw', {
                    fixassetsUid: rows[index].fixassetsUid,
                }, function(e) {
                    if (e.code === '1') {
                        Vue.Message('删除成功！', 'success');
                        rows.splice(index, 1);
                    } else {
                        Vue.Message(e.msg, 'error');
                    }
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //批量删除
        handleSelectionChange(val) {
            
            this.multipleSelection = val;
            // console.log(this.multipleSelection);
        },
        //查询固定资产卡片的月折旧
        getFaMonthDepr(){
            let Vue = this;
            // console.log({
            //     a:Vue.addForm.dstartdate,
            //     deprecitionMethod:Vue.addForm.deprecitionMethod,
            //     salvagerate:Vue.addForm.salvagerate,
            //     originalMoney:Vue.addForm.originalMoney,
            //     fusePeriod:Vue.addForm.fusePeriod,
            //     usedmonths:Vue.addForm.usedmonths,
            //     salvage:Vue.addForm.salvage
            // });
            Vue.AxiosPost('getFaMonthDepr', {
                deprecitionMethod:Vue.addForm.deprecitionMethod,
                salvagerate:Vue.addForm.salvagerate,
                originalMoney:Vue.addForm.originalMoney,
                fusePeriod:Vue.addForm.fusePeriod,
                usedmonths:Vue.addForm.usedmonths,
                salvage:Vue.addForm.salvage
            }, function(e) {
                if (e.code === '1') {
                    
                    console.log(e);
                    // Vue.addForm.deprecitionMonth=e;
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //查询固定资产卡片的期初累计折旧
        getFambDepr(){
            let Vue = this;
            Vue.AxiosPost('getFambDepr', {
                deprecitionMethod:Vue.addForm.deprecitionMethod,
                deprecitionMonth:Vue.addForm.deprecitionMonth,
                usedmonths:Vue.addForm.usedmonths
            }, function(e) {
                if (e.code === '1') {
                    
                    Vue.addForm.mbDepr=e;
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //查询固定资产卡片的期初净值
        getFambNetvalue(){
            let Vue = this;
            Vue.AxiosPost('getFambNetvalue', {
                deprecitionMethod:Vue.addForm.deprecitionMethod,
                originalMoney:Vue.addForm.originalMoney,
                impairmentprovision:Vue.addForm.impairmentprovision,
                mbDepr:Vue.addForm.mbDepr
            }, function(e) {
                if (e.code === '1') {
                    
                    // Vue.addForm.mbNetvalue=e;
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });

        },
        //查询固定资产卡片的预计残值
        getFasalvage(){
            let Vue = this;
            Vue.AxiosPost('getFasalvage', {
                deprecitionMethod:Vue.addForm.deprecitionMethod,
                originalMoney:Vue.addForm.originalMoney,
                impairmentprovision:Vue.addForm.impairmentprovision,
                mbDepr:Vue.addForm.mbDepr
            }, function(e) {
                if (e.code === '1') {
                    
                    // Vue.addForm.salvage=e;
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //选择折旧方法
        selectDeMe(){
            //日期
            this.checkDstartdate();
            // console.log(this.addForm.dstartdate.getFullYear() + '-' + (this.addForm.dstartdate.getMonth() + 1) + '-' + this.addForm.dstartdate.getDate());

            // this.getFaMonthDepr();
            // this.getFambDepr();
            // this.getFambNetvalue();
            // this.getFasalvage();
        },
        //输入预计使用期限
        writeFusePeriod(){
            this.getFaMonthDepr();
        },
        //输入原值
        writeOriginalMoney(){
            this.getFaMonthDepr();
            this.getFambNetvalue();
            this.getFasalvage();
        },
        //输入残值率
        writeSalvagerate(){
            this.getFaMonthDepr();
        },
        //输入已折旧期间
        writeUsedmonths(){
            this.getFambDepr();
            this.getFaMonthDepr()

        },
        //输入减值准备
        writeImpairmentprovision(){
            this.getFambNetvalue();
            this.getFasalvage();
        },

        //添加新卡片
        submitAddForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    Vue.addDialog = false;
                } else {
                    return false;
                }
            });
        },

    },
}
</script>

<style>
/* 数据渲染是的闪烁问题 */

[v-cloak] {
    display: none
}




/* 数据渲染是的闪烁问题 */

#card .card-top {
    color: #555;
    width: 100%;
    height: 45px;
}

.card-span {
    line-height: 28px;
}

.card-span,
.accout-card,
.card-upload {
    float: left;
}

.accout-card {
    margin: 0 10px;
}


/* 明细账选择菜单卡片效果 公共样式*/

.ui-btn-menu {
    zoom: 1;
    z-index: 6;
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
    z-index: 6;
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

.card-top-left .con {
    width: 360px;
    padding: 15px;
    position: absolute;
    top: 27px;
    left: 94px;
    border: 1px solid #c1c1c1;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .15);
    background-color: #fff;
    z-index: 5;
}

/* 区间选择 */


/* #card .con .el-select {
    width: 100px;
} */

#card .con .search {
    padding-top: 20px;
}

/* 区间选择 */


/* 右边按钮部分 */

.card-top-right {
    display: block;
    padding-right: 20px;
    float: right;
    font-size: 13px;
}

.card-top-right .el-button {
    width: 70px;
}


/* 右边按钮部分 */


/* 区间选择 */


/* 科目1001导航样式 */

#card .l-layout-header {
    cursor: default;
    padding-bottom: 10px;
    font-size: 15px;
    height: 24px;
    line-height: 24px;
    font-weight: 400;
    padding-left: 10px;
    overflow: hidden;
}



/* 右边部分快捷切换开始 */

#card .subject-shortcut {
    height: 800px;
}

#card .subject-shortcut .shortcut-div {
    padding-left: 15px;
    line-height: 40px;
    background-color: rgb(238, 242, 246);
}



/* 右边部分快捷切换结束 */

#card .el-dialog--small {
    width: 1200px;
}

#card .assets-wrap {
    height: 500px;
    overflow: auto;
    padding: 20px 30px;
    border: 1px solid #cfcfcf;
    background: #fff;
    /* box-shadow: 0 1px 3px rgba(0,0,0,0.2); */
}



/* .mod-form-rows {
    zoom: 1;
} */

#card .assets-wrap .special {
    width: 600px;
}

.assets-wrap .row-item,
.row-wrap .row-item {
    float: left;
    margin-bottom: 5px;
    width: 320px;
}

.assets-wrap .startData {
    float: left;
    margin-bottom: 5px;
    width: 270px;
}



/* 数量 */

#card .num {
    padding-left: 10px;
    font-size: 12px;
    line-height: 36px;
    float: left;
    width: 60px;
}

.mod-form-rows .row-item {
    margin-bottom: 20px;
    zoom: 1;
}

li {
    list-style: none;
}

.assets-wrap .label-wrap {
    width: 75px;
}

#card .el-form-item {
    margin-bottom: 0px;
}

#card .el-dialog__body .el-form-item__label {
    font-size: 12px;
    width: 75px;
}

#card .input-size1 {
    width: 250px;
}

#card .input-size2 {
    width: 215px;
}

#card .input-size3 {
    width: 140px;
}

#card .select1 {
    width: 150px;
}

#card .input-size3 {
    width: 130px;
}

#card .select2 {
    width: 215px;
}



/* 折旧方法 */

.assets-wrap .row-item-tit {
    display: block;
    padding-top: 10px;
    margin-bottom: 5px;
    border-bottom: 2px solid #ccc;
    font-size: 12px;
}

.value-info-wrap .assets-note-wrap {
    width: 60%;
}



/* 下拉的类别列表 */

.dropdownSelect .el-scrollbar {
    width: 215px;
    overflow: hidden;
}
</style>