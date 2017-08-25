<!-- 总账 -->
<template>
    <div id="general">
        <!-- 头开始 -->
        <div class="general-top">
            <div class="general-top-context">
                <div class="general-top-left">
                    <span class="fz4">总账</span>
                    <template>
                        <el-select v-model="period" placeholder="2017年1期" size="small">
                            <el-option v-for="item in periods" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                    <!-- <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTAzMDIxMTY0MTE0IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE0MzAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNzM2LjIwNDM0MSA1MTYuNDI2ODIzYy0xNC4xMzI4ODIgMC0yNS41OTkwMjggMTEuNDU3OTYtMjUuNTk5MDI4IDI1LjU5OTAyOCAwIDEwOS41MTExNTktODkuMDk2MjAxIDE5OC42MDczNi0xOTguNjA3MzYgMTk4LjYwNzM2cy0xOTguNjA3MzYtODkuMDk2MjAxLTE5OC42MDczNi0xOTguNjA3MzZjMC0xMDkuNTE5MzQ2IDg5LjA5NjIwMS0xOTguNjE1NTQ3IDE5OC42MDczNi0xOTguNjE1NTQ3bDU0Ljg0OTIxMiAwLTUzLjk4MjQ3MiA1My45ODg2MTJjLTkuOTk5NzQ4IDkuOTk5NzQ4LTkuOTk5NzQ4IDI2LjIwNjg3MiAwIDM2LjE5ODQzMyA0Ljk5OTg3NCA0Ljk5OTg3NCAxMS41NDkwMzQgNy40OTk4MTEgMTguMDk5MjE3IDcuNDk5ODExczEzLjA5OTM0My0yLjQ5OTkzNyAxOC4wOTkyMTctNy40OTk4MTFsOTcuNjc4NjctOTcuNjg2ODU2YzkuOTk5NzQ4LTkuOTk5NzQ4IDkuOTk5NzQ4LTI2LjE5ODY4NSAwLTM2LjE5ODQzM2wtOTcuNjc4NjctOTcuNjg2ODU2Yy05Ljk5OTc0OC05Ljk5OTc0OC0yNi4xOTg2ODUtOS45OTk3NDgtMzYuMTk4NDMzIDAtOS45OTk3NDggOS45OTE1NjItOS45OTk3NDggMjYuMTk4Njg1IDAgMzYuMTk4NDMzbDUzLjk4MjQ3MiA1My45ODg2MTItNTQuODQ5MjEyIDBjLTEzNy43NDMxNTQgMC0yNDkuODA0MzkzIDExMi4wNjk0MjUtMjQ5LjgwNDM5MyAyNDkuODEyNTc5czExMi4wNjEyMzggMjQ5LjgwNDM5MyAyNDkuODA0MzkzIDI0OS44MDQzOTMgMjQ5LjgwNDM5My0xMTIuMDYxMjM4IDI0OS44MDQzOTMtMjQ5LjgwNDM5M0M3NjEuODAyMzQ2IDUyNy44ODQ3ODIgNzUwLjMzNjIgNTE2LjQyNjgyMyA3MzYuMjA0MzQxIDUxNi40MjY4MjN6IiBwLWlkPSIxNDMxIiBmaWxsPSIjMDA4N0JFIj48L3BhdGg+PC9zdmc+"> -->
                    <el-button icon="share" size="small" class="upload"></el-button>
                </div>
                <div class="general-top-right">
                    <el-button type="primary" size="small">打印</el-button>
                    <el-button size="small">导出 </el-button>
                </div>
            </div>
        </div>
        <!-- 头结束 -->
        <!-- table开始 -->
        <div class="general-context">
            <table class="general-table" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <td style="width:10%">科目编码</td>
                        <td style="width:20%">科目名称</td>
                        <td style="width:20%">期间</td>
                        <td style="width:10%">摘要</td>
                        <td style="width:10%">借方</td>
                        <td style="width:10%">贷方</td>
                        <td style="width:10%">方向</td>
                        <td style="width:10%">余额</td>
                    </tr>
                </thead>
                
                <tbody>
                    <!--总账表 -->
                    <tr>
                        <td >1001</td>
                        <td >库存现金</td>
                        <td>
                            <p>201701</p>
                            <p>201701</p>
                            <p>201701</p>
                        </td>
                        <td>
                            <p>年初余额</p>
                            <p>本期合计</p>
                            <p>本年合计</p>
                        </td>
                        <td>
                            <p></p>
                            <p>12000.00</p>
                            <p>12000.00</p>
                        </td>
                        <td>
                            <p></p>
                            <p>12000.00</p>
                            <p>12000.00</p>
                        </td>
                        <td>
                            <p>借</p>
                            <p>借</p>
                            <p>借</p>
                        </td>
                        <td>
                            <p>11.00</p>
                            <p>11646.00</p>
                            <p>11646.00</p>
                        </td>
                    </tr>

                    <tr>
                        <td>1001</td>
                        <td >库存现金</td>
                        <td>
                            <p>201701</p>
                            <p>201701</p>
                            <p>201701</p>
                        </td>
                        <td>
                            <p>年初余额</p>
                            <p>本期合计</p>
                            <p>本年合计</p>
                        </td>
                        <td>
                            <p></p>
                            <p>12000.00</p>
                            <p>12000.00</p>
                        </td>
                        <td>
                            <p></p>
                            <p>12000.00</p>
                            <p>12000.00</p>
                        </td>
                        <td>
                            <p>借</p>
                            <p>借</p>
                            <p>借</p>
                        </td>
                        <td>
                            <p>11.00</p>
                            <p>11646.00</p>
                            <p>11646.00</p>
                        </td>
                    </tr>

                     <tr>
                        <td >1001</td>
                        <td >库存现金</td>
                        <td>
                            <p>201701</p>
                            <p>201701</p>
                            <p>201701</p>
                        </td>
                        <td>
                            <p>年初余额</p>
                            <p>本期合计</p>
                            <p>本年合计</p>
                        </td>
                        <td>
                            <p></p>
                            <p>12000.00</p>
                            <p>12000.00</p>
                        </td>
                        <td>
                            <p></p>
                            <p>12000.00</p>
                            <p>12000.00</p>
                        </td>
                        <td>
                            <p>借</p>
                            <p>借</p>
                            <p>借</p>
                        </td>
                        <td>
                            <p>11.00</p>
                            <p>11646.00</p>
                            <p>11646.00</p>
                        </td>
                    </tr>
                     <tr>
                        <td >1001</td>
                        <td >库存现金</td>
                        <td>
                            <p>201701</p>
                            <p>201701</p>
                            <p>201701</p>
                        </td>
                        <td>
                            <p>年初余额</p>
                            <p>本期合计</p>
                            <p>本年合计</p>
                        </td>
                        <td>
                            <p></p>
                            <p>12000.00</p>
                            <p>12000.00</p>
                        </td>
                        <td>
                            <p></p>
                            <p>12000.00</p>
                            <p>12000.00</p>
                        </td>
                        <td>
                            <p>借</p>
                            <p>借</p>
                            <p>借</p>
                        </td>
                        <td>
                            <p>11.00</p>
                            <p>11646.00</p>
                            <p>11646.00</p>
                        </td>
                    </tr>
                     <tr>
                        <td >1001</td>
                        <td >库存现金</td>
                        <td>
                            <p>201701</p>
                            <p>201701</p>
                            <p>201701</p>
                        </td>
                        <td>
                            <p>年初余额</p>
                            <p>本期合计</p>
                            <p>本年合计</p>
                        </td>
                        <td>
                            <p></p>
                            <p>12000.00</p>
                            <p>12000.00</p>
                        </td>
                        <td>
                            <p></p>
                            <p>12000.00</p>
                            <p>12000.00</p>
                        </td>
                        <td>
                            <p>借</p>
                            <p>借</p>
                            <p>借</p>
                        </td>
                        <td>
                            <p>11.00</p>
                            <p>11646.00</p>
                            <p>11646.00</p>
                        </td>
                    </tr>
                     <tr>
                        <td >1001</td>
                        <td >库存现金</td>
                        <td>
                            <p>201701</p>
                            <p>201701</p>
                            <p>201701</p>
                        </td>
                        <td>
                            <p>年初余额</p>
                            <p>本期合计</p>
                            <p>本年合计</p>
                        </td>
                        <td>
                            <p></p>
                            <p>12000.00</p>
                            <p>12000.00</p>
                        </td>
                        <td>
                            <p></p>
                            <p>12000.00</p>
                            <p>12000.00</p>
                        </td>
                        <td>
                            <p>借</p>
                            <p>借</p>
                            <p>借</p>
                        </td>
                        <td>
                            <p>11.00</p>
                            <p>11646.00</p>
                            <p>11646.00</p>
                        </td>
                    </tr>

                    <!-- 总账表-->
                </tbody>
                
                <tfoot>
                    <tr>
                        <td colspan="8" style="text-align: right;">
                            1-32 共32条
                        </td>
                    </tr>
                </tfoot>
            </table>

        </div>
        <!-- table结束 -->
    </div>
</template>
<script>
export default {
    name: 'general',
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
            period: '',
            //表格数据
            generalData: [],
        }
    },
    mounted() { },
    methods: {},

}
</script>
<style>
#general .general-top {
    font-family: 'Lucida Console';
    color: #555;
    width: 100%;
    height: 66px;
    padding: 18px 5px;
}

#general .general-top .general-top-context {
    width: 100%;
    height: 30px;
}

#general .general-top .general-top-context .general-top-left {
    display: inline-block;
    float: left;
}

#general .general-top .general-top-context .general-top-left .el-input__icon+.el-input__inner {
    padding-right: 0px;
}

#general .general-top .general-top-context .general-top-left .el-select .el-input__inner {
    padding-right: 0px;
}

#general .general-top .general-top-context .general-top-right {
    display: inline-block;
    padding-right: 20px;
    float: right;
}

#general .general-top .general-top-context .general-top-right .el-button {
    width: 60px;
}

#general .general-context .fr {
    margin-top: 5px;
    display: inline-block;
    float: right;
    color: #555;
    font-size: 13px;
}

#general .general-context .fr p span {
    padding: 5px;
}

.general-table {
    color: #555;
    font-family: tahoma, arial, 宋体;
    font-size: 12px;
    border-collapse: collapse;
    /*相邻边被合并;separate: 边框独立*/
    border: none;
    width: 100%;
    /* td 内容太多，想自动换行 */
    table-layout: fixed;
}








/*tbody斑马线获得奇偶数的子元素*/

.general-table tbody>tr:nth-child(odd) {
    background-color: #fff;
}

.general-table tbody>tr:nth-child(even) {
    background-color: #eee;
}

.general-table tbody>tr>td>p {
    box-sizing: border-box;
    padding: 0 5px;
    margin: 0 -5px -1px;
    border-bottom: 1px solid #ddd;
    height: 28px;
    line-height: 26px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.general-table tbody>tr>td>p:first-child {
    margin-top: 5px;
}

.general-table thead {
    background-color: #eee;
}

.general-table thead tr td {
    font-weight: bold;
    text-align: center;
}

.general-table td {
    font-weight: 400;
    overflow: hidden;
    white-space: pre;
    height: 34px;
    padding: 0 5px;
    border: solid #CCC 1px;
    /* td 内容太多，想自动换行 */
    word-wrap: break-word;
}

.general-table td button span {
    color: #555;
    cursor: pointer;
    outline: none;
}

.general-table td button span:hover {
    color: rgb(0, 135, 190);
    text-decoration: underline;
}
/* 固定表头的css */
.comTbody{
    display: inline-block;
    max-height:200px;
    overflow-y: scroll;
}
</style>