<!-- 凭证汇总表 -->
<template>
    <div id="voucher_summary">
        <!-- 头开始 -->
        <div class="voucher_summary-top">
            <div class="voucher_summary-top-context">
                <div class="voucher_summary-top-left">
                    <span class="fz4 voucher_summary-span">凭证汇总表</span>
                    <!-- 明细账期数 -->
                    <div class="accout-voucher_summary">
                        <div class="ui-btn-menu" id="filter-menu" :class="periodstate==true? 'ui-btn-menu-cur' : ''" @click="pullDown()">
                            <span class="ui-btn menu-btn">
                                <span id="selected-period">
                                    <span>2017-04-01&nbsp;至&nbsp;2017-04-30</span>
                                </span>
                                <b></b>
                            </span>
                        </div>
                        <div class="con" v-show="periodstate">
                            <ul>
                                <li class="day">
                                    <span class="con-text">汇总日期：</span>
                                    <el-date-picker v-model="pickerOptionsBegin" type="date" placeholder="选择日期" :picker-options="pickerOptions" style="width:105px;" size="small" popper-class="voucher_summary_day">
                                    </el-date-picker>
                                    <span>至</span>
                                    <el-date-picker v-model="pickerOptionsEnd" type="date" placeholder="选择日期" :picker-options="pickerOptions" style="width:105px;" size="small" popper-class="voucher_summary_day">
                                    </el-date-picker>
                                </li>
                                <li class="voucherword">
                                    <span class="con-text">凭证字:</span>
                                    <el-select v-model="voucherWordValue" size="small" style="width:65px;">
                                        <el-option v-for="item in voucherWordOptions" :key="item.value" :label="item.label" :value="item.value" size="small">
                                        </el-option>
                                    </el-select>
                                </li>
                                <li>
                                    <span class="con-text">凭证号：</span>
                                    <el-input v-model="voucherWordBegin" size="small" style="width:65px;"></el-input>
                                    <span style="margin-left:35px;">至</span>
                                    <el-input v-model="voucherWordEnd" size="small" style="width:65px;"></el-input>
                                </li>
                                <li>
                                    <span class="con-text">科目级别：</span>
                                    <el-input v-model="subjectBegin" size="small" style="width:65px;"></el-input>
                                    <span style="margin-left:35px;">至</span>
                                    <el-input v-model="subjectEnd" size="small" style="width:65px;"></el-input>
                                </li>
                            </ul>
                            <div class="voucher_summary-top-right">
                                <el-button size="small">重置</el-button>
                                <el-button type="primary" size="small" @click="periodstate=false">确定</el-button>
                            </div>

                        </div>
                    </div>
                    <div class="voucher_summary-upload">
                        <el-button icon="share" size="small" class="upload"></el-button>
                    </div>
                </div>
                <div class="voucher_summary-top-right">
                    <el-button type="primary" size="small">打印</el-button>
                    <el-button size="small">导出 </el-button>
                </div>
            </div>
        </div>
        <!-- 头结束 -->
        <!-- table开始 -->  
        <div class="data-grid">
            <div class="data-view">
                <div class="grid-head">
                    <div class="grid-head-inner">
                        <table class="data-table">
                            <tbody>
                                <tr class="data-table-row">
                                    <td>
                                        <div class="datagrid-cell cell-c1">
                                            科目编码
                                        </div>
                                    </td>
                                    <td>
                                        <div class="datagrid-cell cell-c2">
                                            科目名称
                                        </div>
                                    </td>
                                    <td>
                                        <div class="datagrid-cell cell-c3">
                                            借方金额
                                        </div>
                                    </td>
                                    <td>
                                        <div class="datagrid-cell cell-c3">
                                            贷方金额
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="grid-body">
                    <table class="datagrid-btable">
                        <tbody>
                            <tr>
                                <td>
                                    <div class="datagrid-cell cell-c1">
                                        <p>1001</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c2">
                                        <p>库存现金</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c3">
                                        <p>36.5</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c3">
                                        <p>6666.00</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="datagrid-cell cell-c1">
                                        <p>1001</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c2">
                                        <p>库存现金</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c3">
                                        <p>36.5</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c3">
                                        <p>6666.00</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="datagrid-cell cell-c1">
                                        <p>1001</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c2">
                                        <p>库存现金</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c3">
                                        <p>36.5</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c3">
                                        <p>6666.00</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="datagrid-cell cell-c1">
                                        <p>1001</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c2">
                                        <p>库存现金</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c3">
                                        <p>36.5</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c3">
                                        <p>6666.00</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="datagrid-cell cell-c1">
                                        <p>1001</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c2">
                                        <p>库存现金</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c3">
                                        <p>36.5</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c3">
                                        <p>6666.00</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="datagrid-cell cell-c1">
                                        <p>1001</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c2">
                                        <p>库存现金</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c3">
                                        <p>36.5</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c3">
                                        <p>6666.00</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="datagrid-cell cell-c1">
                                        <p>1001</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c2">
                                        <p>库存现金</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c3">
                                        <p>36.5</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c3">
                                        <p>6666.00</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="datagrid-cell cell-c1">
                                        <p>1001</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c2">
                                        <p>库存现金</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c3">
                                        <p>36.5</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c3">
                                        <p>6666.00</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="datagrid-cell cell-c1">
                                        <p>1001</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c2">
                                        <p>库存现金</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c3">
                                        <p>36.5</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c3">
                                        <p>6666.00</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="datagrid-cell cell-c1">
                                        <p>1001</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c2">
                                        <p>库存现金</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c3">
                                        <p>36.5</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c3">
                                        <p>6666.00</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="datagrid-cell cell-c1">
                                        <p>1001</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c2">
                                        <p>库存现金</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c3">
                                        <p>36.5</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c3">
                                        <p>6666.00</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="datagrid-cell cell-c1">
                                        <p>1001</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c2">
                                        <p>库存现金</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c3">
                                        <p>36.5</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c3">
                                        <p>6666.00</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="datagrid-cell cell-c1">
                                        <p>1001</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c2">
                                        <p>库存现金</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c3">
                                        <p>36.5</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="datagrid-cell cell-c3">
                                        <p>6666.00</p>
                                    </div>
                                </td>
                            </tr>
                           
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
        <!-- table结束 -->

    </div>
</template>
<script>
export default {
    name: 'voucher_summary',
    data() {
        return {
            //选择
            periods: [{
                value: '选项1',
                label: '2017年1期'
            }, {
                value: '选项2',
                label: '2017年2期'
            }, {
                value: '选项3',
                label: '2017年3期'
            }, {
                value: '选项4',
                label: '2017年4期'
            }],
            //明细账期数下拉框是否显示
            periodstate: false,
            //会计开始时间
            //日期
            
            pickerOptionsBegin: '',
            pickerOptionsEnd: '',
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
            // 凭证字 
            //凭证号
            voucherWordBegin: '',
            voucherWordEnd: '',
            //凭证号          
            //科目级别开始
            subjectBegin: '',
            subjectEnd: '',
            //科目
            //表格数据
            voucher_summaryData: [],
            //表格数据
            // 科目列表
            restaurants: [],
            state: '',
            // 科目列表
            //table数据
            // tableData: [{
            //     date: '2016-05-03',
            //     name: '王小虎',
            //     address: '上海市普陀区金沙江路 1518 弄'
            // }, {
            //     date: '2016-05-02',
            //     name: '王小虎',
            //     address: '上海市普陀区金沙江路 1518 弄'
            // }, {
            //     date: '2016-05-04',
            //     name: '王小虎',
            //     address: '上海市普陀区金沙江路 1518 弄'
            // }, {
            //     date: '2016-05-01',
            //     name: '王小虎',
            //     address: '上海市普陀区金沙江路 1518 弄'
            // }, {
            //     date: '2016-05-08',
            //     name: '王小虎',
            //     address: '上海市普陀区金沙江路 1518 弄'
            // }, {
            //     date: '2016-05-06',
            //     name: '王小虎',
            //     address: '上海市普陀区金沙江路 1518 弄'
            // }, {
            //     date: '2016-05-07',
            //     name: '王小虎',
            //     address: '上海市普陀区金沙江路 1518 弄'
            // }]
            //table数据
        }
    },
    mounted() {
    },
    methods: {
        pullDown() {
            this.periodstate = !this.periodstate;
        }
    }
}
</script>
<style>
#voucher_summary .voucher_summary-top {
    font-family: 'Lucida Console';
    color: #555;
    width: 100%;
    height: 45px;
    padding: 5px;
}

.voucher_summary-span,
.accout-voucher_summary,
.voucher_summary-upload {
    float: left;
}

#voucher_summary .voucher_summary-span {
    line-height: 30px;
    margin-right: 15px;
}

/* 明细账选择菜单卡片效果 */
#voucher_summary .ui-btn-menu {
    /* position: relative; */
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
    zoom: 1;
    z-index: 100;
}




#voucher_summary .ui-btn-menu-cur .menu-btn:active,
#voucher_summary .ui-btn-menu-cur .menu-btn:hover {
    padding-bottom: 1px;
    background: #fff!important;
    border-bottom: none;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: none;
}

#voucher_summary .voucher_summary-top .ui-btn-menu .menu-btn {
    width: 190px;
    position: relative;
    margin-right: 0;
    padding-right: 20px;
    z-index: 100;
}

#voucher_summary .ui-btn-menu-cur .ui-btn {
    border-bottom: 1px solid #fff;
    background-color: #fff;
}

#voucher_summary .ui-btn {
    display: inline-block;
    margin-right: 10px;
    padding: 0 6px;
    height: 26px;
    border: 1px solid #c3c7cb;
    border-radius: 2px;
    background: #fafdff;
    font: 14px/2 \5b8b\4f53;
    color: #555;
    vertical-align: middle;
    cursor: pointer;
}

#voucher_summary .ui-btn-menu .menu-btn b {
    font-size: 0;
    position: absolute;
    right: 6px;
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

#voucher_summary .ui-btn-menu-cur .menu-btn b {
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

#voucher_summary .voucher_summary-top-left .con {
    width: 340px;
    padding: 15px;
    position: absolute;
    top: 32px;
    left: 90px;
    border: 1px solid #c1c1c1;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .15);
    background-color: #fff;
    font: 12px/1.5 \5b8b\4f53;
    z-index: 99;
}



/* 区间选择的大小 */

#voucher_summary .voucher_summary-top-left .con ul li {
    padding-bottom: 20px;
    list-style-type: none;
    font-size: 14px;
    text-align: -webkit-match-parent;
    color: #555;
}

#voucher_summary .voucher_summary-top-left .con .el-input--small .el-input__inner {
    height: 30px;
    width: 100px;
}
#voucher_summary .voucher_summary-top-left .con  .el-input__icon+.el-input__inner {
    padding-right: 2px;
}
#voucher_summary .voucher_summary-top-left .con .con-text {
    display: inline-block;
    width: 70px;
    text-align: left;
}



/* 汇总日期 */

#voucher_summary .voucher_summary-top-left .con .day .el-input__icon {
    right: -4px;
}

#voucher_summary .voucher_summary-top-left .con .day .el-input__icon {
    right: 0px;
}



/* 下拉列表的样式 */

#voucher_summary .voucher_summary-top-left .con .day .voucher_summary_day {
    margin-top: 10px;
}



/* 凭证字 */

#voucher_summary .voucher_summary-top-left .con .voucherword .el-input--small .el-input__inner {
    width: 65px;
}

#voucher_summary .voucher_summary-top-left .con .voucherword .el-input__icon {
    right: 0px;
}

#voucher_summary .voucher_summary-top-left .con .voucherword .el-select-dropdown__empty {
    padding: 5px 0;
}
/* 凭证汇总表选择菜单卡片效果 */


/* 右边打印div布局 */
#voucher_summary .voucher_summary-top-right {
    display: inline-block;
    padding-right: 20px;
    float: right;
}

#voucher_summary .voucher_summary-top-right .el-button {
    width: 70px;
}
/* 右边打印div布局 */


/* table表格样式 */
/* 可视表格高度 */
#voucher_summary .data-grid {
    width: 100%;
    height: 400px;
    position: relative;
    overflow: hidden;
    font-size: 14px;
    color: #444;
    box-sizing: border-box;
    border: 1px solid #dedede;
    
}
#voucher_summary .data-view {
    width: 100%;
    position: absolute;
    overflow: hidden;
    top: 0px;
    right: 0px;
}

#voucher_summary .grid-head {
    width: 100%;
    height: 30px;
    border-color: #DDD;
    overflow: hidden;
    cursor: default;
    border-width: 0px 0px 1px;
    border-style: solid;
    background-color: #EEE;
}

#voucher_summary .grid-head-inner {
    display: block;
    float: left;
}

#voucher_summary .data-table {
    height: 30px;
    border-collapse: separate;
}

#voucher_summary .data-table-row {
    height: 30px;
}
/*tbody斑马线获得奇偶数的子元素*/

#voucher_summary .data-grid .data-view .grid-body .datagrid-btable tbody tr:nth-child(odd) {
    background-color: #fff;
}

#voucher_summary .data-grid .data-view .grid-body .datagrid-btable tbody tr:nth-child(even) {
    background-color: #eee;
}

#voucher_summary .data-table td {
    border-color: #CCC;
    border-width: 0px 1px 0px 0px;
    border-style: solid;
    margin: 0px;
    padding: 0px;
    line-height: 1.65em;
}

#voucher_summary .datagrid-cell {
    margin: 0px;
    padding: 0px 4px;
    white-space: nowrap;
    word-wrap: normal;
    overflow: hidden;
    height: 18px;
    line-height: 18px;
    font-size: 12px;
}
/* 期间哪一类的三格 */
#voucher_summary .datagrid-cell p{
    padding: 0 5px;
    margin: 0 -5px -1px;
    border-bottom: 1px solid #ddd;
    height: 28px;
    line-height: 26px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
/* 去掉一点border对不齐 */
#voucher_summary .data-grid table{
    border-spacing: 0px;
}
#voucher_summary .cell-c1 {
    width: 210px;
    text-align: center;
    height: auto;
}

#voucher_summary .cell-c2 {
    text-align: center;
    width: 410px;
    height: auto;
}

#voucher_summary .cell-c3 {
    width: 160px;
    height: auto;  
}
#voucher_summary .cell-c3 p{
    text-align: right;
}
/* 滚动条 */
#voucher_summary .grid-body {
    width: 100%;
    height: 367px;
    overflow-x: hidden;
    margin: 0px;
    padding: 0px;
}

#voucher_summary .datagrid-btable {
    border-collapse: separate;
}

#voucher_summary .datagrid-btable tr {
    height: 25px;
}

#voucher_summary .datagrid-btable tr td {
    border-color: #CCC;
    border-width: 0px 1px 1px 0px;
    border-style: solid;
    margin: 0px;
    padding: 0px;
}
/* table表格样式 */

/* 连接的样式 */

#voucher_summary .voucher_summary-table tbody td a {
    color: #555;
    cursor: pointer;
    outline: none;
}

#voucher_summary .voucher_summary-table tbody td a:hover {
    color: rgb(0, 135, 190);
    text-decoration: underline;
}
</style>