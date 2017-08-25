<!-- 资产负债表 -->
<template>
    <div id="balance_sheet">
        <!-- 头开始 -->
        <div class="sheet-top">
            <div class="sheet-top-context">
                <div class="sheet-top-left">
                    <span class="fz4">资产负债表</span>
                    <template>
                        <el-select v-model="period" placeholder="2017年1期" size="small">
                            <el-option v-for="item in periods" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                    <!-- <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTAzMDIxMTY0MTE0IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE0MzAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNzM2LjIwNDM0MSA1MTYuNDI2ODIzYy0xNC4xMzI4ODIgMC0yNS41OTkwMjggMTEuNDU3OTYtMjUuNTk5MDI4IDI1LjU5OTAyOCAwIDEwOS41MTExNTktODkuMDk2MjAxIDE5OC42MDczNi0xOTguNjA3MzYgMTk4LjYwNzM2cy0xOTguNjA3MzYtODkuMDk2MjAxLTE5OC42MDczNi0xOTguNjA3MzZjMC0xMDkuNTE5MzQ2IDg5LjA5NjIwMS0xOTguNjE1NTQ3IDE5OC42MDczNi0xOTguNjE1NTQ3bDU0Ljg0OTIxMiAwLTUzLjk4MjQ3MiA1My45ODg2MTJjLTkuOTk5NzQ4IDkuOTk5NzQ4LTkuOTk5NzQ4IDI2LjIwNjg3MiAwIDM2LjE5ODQzMyA0Ljk5OTg3NCA0Ljk5OTg3NCAxMS41NDkwMzQgNy40OTk4MTEgMTguMDk5MjE3IDcuNDk5ODExczEzLjA5OTM0My0yLjQ5OTkzNyAxOC4wOTkyMTctNy40OTk4MTFsOTcuNjc4NjctOTcuNjg2ODU2YzkuOTk5NzQ4LTkuOTk5NzQ4IDkuOTk5NzQ4LTI2LjE5ODY4NSAwLTM2LjE5ODQzM2wtOTcuNjc4NjctOTcuNjg2ODU2Yy05Ljk5OTc0OC05Ljk5OTc0OC0yNi4xOTg2ODUtOS45OTk3NDgtMzYuMTk4NDMzIDAtOS45OTk3NDggOS45OTE1NjItOS45OTk3NDggMjYuMTk4Njg1IDAgMzYuMTk4NDMzbDUzLjk4MjQ3MiA1My45ODg2MTItNTQuODQ5MjEyIDBjLTEzNy43NDMxNTQgMC0yNDkuODA0MzkzIDExMi4wNjk0MjUtMjQ5LjgwNDM5MyAyNDkuODEyNTc5czExMi4wNjEyMzggMjQ5LjgwNDM5MyAyNDkuODA0MzkzIDI0OS44MDQzOTMgMjQ5LjgwNDM5My0xMTIuMDYxMjM4IDI0OS44MDQzOTMtMjQ5LjgwNDM5M0M3NjEuODAyMzQ2IDUyNy44ODQ3ODIgNzUwLjMzNjIgNTE2LjQyNjgyMyA3MzYuMjA0MzQxIDUxNi40MjY4MjN6IiBwLWlkPSIxNDMxIiBmaWxsPSIjMDA4N0JFIj48L3BhdGg+PC9zdmc+"> -->
                    <el-button icon="share" size="small" class="upload"></el-button>
                </div>
                <div class="sheet-top-right">
                    <el-button type="primary" size="small">打印</el-button>
                    <el-button size="small">导出 </el-button>
                </div>
            </div>
        </div>
        <!-- 头结束 -->
        <!-- table开始 -->
        <div class="sheet-context">
            <table class="sheet-table" cellpadding="0" cellspacing="0">
                <thead style="  ">
                    <tr>
                        <td style="width:20%">资产</td>
                        <td style="width:10%">行次</td>
                        <td style="width:10%">期末数</td>
                        <td style="width:10%">年初数</td>
                        <td style="width:20%">负债和所有者（或股东）权益</td>
                        <td style="width:10%">行次</td>
                        <td style="width:10%">期末数</td>
                        <td style="width:10%">年初数</td>
                    </tr>
                </thead>
                <tbody>
                    <!-- 没有连接的头 -->
                    <tr>
                        <td>流动资产：</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>流动负债：</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <!-- 流动资金的一个渲染 循环 -->
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTableVisible = true">货币资金</el-button>
                            <i class="el-icon-edit"></i>
                        </td>
                        <td style="text-align: center;">1</td>
                        <td style="text-align: right;">-66666.22</td>
                        <td style="text-align: right;">454.00</td>
                        <td>
                            <el-button type="text" @click="dialogTableVisible = true">短期借款</el-button>
                            <i class="el-icon-edit"></i>
                        </td>
                        <td style="text-align: center;">30</td>
                        <td style="text-align: right;">-666</td>
                        <td style="text-align: right;">5552</td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTableVisible = true">货币资金</el-button>
                            <i class="el-icon-edit"></i>
                        </td>
                        <td style="text-align: center;">1</td>
                        <td style="text-align: right;">-66666.22</td>
                        <td style="text-align: right;">454.00</td>
                        <td>
                            <el-button type="text" @click="dialogTableVisible = true">短期借款</el-button>
                            <i class="el-icon-edit"></i>
                        </td>
                        <td style="text-align: center;">30</td>
                        <td style="text-align: right;">-666</td>
                        <td style="text-align: right;">5552</td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTableVisible = true">货币资金</el-button>
                            <i class="el-icon-edit"></i>
                        </td>
                        <td style="text-align: center;">1</td>
                        <td style="text-align: right;">-66666.22</td>
                        <td style="text-align: right;">454.00</td>
                        <td>
                            <el-button type="text" @click="dialogTableVisible = true">短期借款</el-button>
                            <i class="el-icon-edit"></i>
                        </td>
                        <td style="text-align: center;">30</td>
                        <td style="text-align: right;">-666</td>
                        <td style="text-align: right;">5552</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="8" style="text-align: right;">
                            1-32 共32条
                        </td>
                    </tr>
                </tfoot>
            </table>
            <!-- <template>
                                <el-table :data="sheetData" height="300" border style="width: 100%">
                                    <el-table-column prop="date" label="资产" width="300" header-align="center">
                                    </el-table-column>
                                    <el-table-column prop="name" label="行数" width="90" header-align="center">
                                    </el-table-column>
                                    <el-table-column prop="address" label="期末数" width="200" header-align="center">
                                    </el-table-column>
                                    <el-table-column prop="ji" label="年初数" width="200" header-align="center">
                                    </el-table-column>
                                    <el-table-column prop="dd" label="负债和所有者（或股东）权益" width="390" header-align="center" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="aa" label="行次" width="90" header-align="center">
                                    </el-table-column>
                                    <el-table-column prop="bb" label="期末数" width="200" header-align="center">
                                    </el-table-column>
                                    <el-table-column prop="cc" label="年初数" width="200" header-align="center">
                                    </el-table-column>
                                </el-table>
                                <div class="fr">
                                    <p>
                                        <span>1-32</span>
                                        <span>共32条</span>
                                    </p>
                                </div>
                            </template> -->

        </div>
        <!-- table结束 -->

        <!-- 编辑公式-减，营业成本弹出层 -->
        <el-dialog title="编辑公式:货币资金" :visible.sync="dialogTableVisible" size="small" top="20%" :close-on-click-modal="false">
            <div class="sheet-dialog">
                <el-row>
                    <el-col :span="9" style="position: relative">
                        <span>科目</span>
                        <!-- 搜索科目 -->
                        <!-- <el-autocomplete popper-class="my-autocomplete" v-model="subject" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect" icon="document" :on-icon-click="handleIconClick" size="small">                           
                        </el-autocomplete> -->
                        <el-input placeholder="请输入内容" size="small" class="subject-search" v-model.lazy="subject" name="subject" :fetch-suggestions="querySearch">
                        </el-input>

                        <div class="subject-box">
                            <div class="subject-data">
                                <ul>
                                    <li v-for="(item,index) in restaurants" :key="index" @select="handleSelect">
                                        {{item.value}}
                                    </li>
                                </ul>
                            </div>
                            <div class="newsubject">
                                <i class="el-icon-plus"></i>新增科目
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <span class="operator-span">运算符号</span>
                        <el-select v-model="operator" placeholder="+" size="small" class="operator">
                            <el-option v-for="item in operators" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <span class="operator-span">取数规则</span>
                        <el-select v-model="fetch" placeholder="余额" size="small" class="fetch">
                            <el-option v-for="item in fetchs" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" size="small" @click="addSubjectEx()" class="operator-span">添加</el-button>
                    </el-col>
                </el-row>
            </div>
            <!-- 编辑的表格 -->
            <el-table :data="dialogData" border height="200" :summary-method="getSummaries" show-summary style="width: 100%; margin-top: 20px">
                <el-table-column prop="project" label="科目" header-align="center">
                </el-table-column>
                <el-table-column prop="operator" label="运算方式" header-align="center" align="center" width="100">
                </el-table-column>
                <el-table-column prop="operator" label="取数规则" header-align="center" align="center" width="100">
                </el-table-column>
                <el-table-column prop="current" label="期末数" align="right" header-align="center">
                </el-table-column>
                <el-table-column prop="next" label="年初数" align="right" header-align="center">
                </el-table-column>
                <el-table-column label="操作" width="120" header-align="center" align="center">
                    <template scope="scope">
                        <el-button @click.native.prevent="deleteRow(scope.$index, dialogData)" type="text" size="small">
                            <i class="el-icon-close"></i>
                            <!-- 移除 -->
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
            <!-- 编辑的表格 -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="dialogTableVisible = false" size="small">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑公式-减，营业成本弹出层 -->
    </div>
</template>
<script>
export default {
    name: 'sheet',
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
            sheetData: [],
            //弹出默认
            dialogTableVisible: false,
            //弹出table数据
            dialogData: [{
                project: '6051 其他业务收入',
                operator: '+',
                current: '0.00',
                next: '0.00'
            }, {
                project: '6001 主营业务收入',
                operator: '+',
                current: '0.00',
                next: '0.00'
            }],
            //弹出层 科目搜索
            restaurants: [],
            subject: '',
            //运算符号

            operators: [{
                value: '选项1',
                label: '+'
            }, {
                value: '选项2',
                label: '-'
            }],
            operator: '',
            //取数规则
            fetchs: [{
                value: '选项1',
                label: '余额'
            }, {
                value: '选项2',
                label: '借方余额'
            },
            {
                value: '选项3',
                label: '贷方余额'
            }],
            fetch: '',
        }
    },
    mounted() {

        //弹出层 科目搜索
        this.restaurants = this.loadAll();
        // console.log(this.restaurants);
    },
    methods: {
        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
            };
        },
        loadAll() {
            return [
                { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
                { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
                { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
                { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
                { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
                { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
                { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
                { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
                { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
                { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
                { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
                { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
                { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
                { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
                { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
                { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
                { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
                { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
                { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
                { "value": "枪会山", "address": "上海市普陀区棕榈路" },
                { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
                { "value": "钱记", "address": "上海市长宁区天山西路" },
                { "value": "壹杯加", "address": "上海市长宁区通协路" },
                { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
                { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
                { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
                { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
                { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
                { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
                { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
                { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
                { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
                { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
                { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
                { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
                { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
                { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
                { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
                { "value": "浏阳蒸菜", "address": "天山西路430号" },
                { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
                { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
                { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
                { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
                { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
                { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
                { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
                { "value": "阳阳麻辣烫", "address": "天山西路389号" },
                { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
            ];
        },
        handleSelect(item) {
            console.log(item);
        },
        handleIconClick(ev) {
            console.log(ev);
        },
        // 弹出层自动计算
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '总价';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[index] += '元';
                } else {
                    sums[index] = '';
                }
            });
            return sums;
        },
        //移除当前行
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        //添加一条规则
        addSubjectEx() {
            this.dialogData.push({
                project: '6001 主营业务收入',
                operator: '+',
                current: '99.99',
                next: '0.00'
            });
        },
    }
}
</script>
<style>
#balance_sheet .sheet-top {
    font-family: 'Lucida Console';
    color: #555;
    width: 100%;
    height: 45px;
    padding: 18px 5px;
}

#balance_sheet .sheet-top .sheet-top-context {
    width: 100%;
    height: 30px;
}

#balance_sheet .sheet-top .sheet-top-context .sheet-top-left {
    display: inline-block;
    float: left;
}

#balance_sheet .sheet-top .sheet-top-context .sheet-top-left .el-input__icon+.el-input__inner {
    padding-right: 0px;
}

#balance_sheet .sheet-top .sheet-top-context .sheet-top-left .el-select .el-input__inner {
    padding-right: 0px;
}

#balance_sheet .sheet-top .sheet-top-context .sheet-top-right {
    display: inline-block;
    padding-right: 20px;
    float: right;
}

#balance_sheet .sheet-top .sheet-top-context .sheet-top-right .el-button {
    width: 60px;
}

#balance_sheet .sheet-context .fr {
    margin-top: 5px;
    display: inline-block;
    float: right;
    color: #555;
    font-size: 13px;
}

#balance_sheet .sheet-context .fr p span {
    padding: 5px;
}


/* 弹出框css */

.sheet-dialog {
    padding: 10px 5px 20px 5px;
}

.el-dialog__header {
    background-color: #0087be;
    padding: 10px 10px 10px 10px;
}

.el-dialog__title {
    color: #fff;
}


/* 科目 运算符与取数规则 */

#balance_sheet .sheet-dialog .el-input__icon+.el-input__inner {
    padding-right: 0px;
}

#balance_sheet .sheet-dialog .operator-box {
    padding-left: 5px;
    padding-right: 5px;
}

#balance_sheet .sheet-dialog .operator {
    width: 70px;
    height: 30px;
}

#balance_sheet .sheet-dialog .fetch {
    width: 140px;
    height: 30px;
}

.subject-search {
    width: 180px;
    height: 30px;
}

.subject-box {
    z-index: 999;
    position: absolute;
    left: 33px;
    top: 33px;
    width: 180px;
    height: 250px;
}

.subject-data {
    font-size: 12px;
    width: 180px;
    height: 200px;
    overflow-y: scroll;
    background-color: #fff;
}

.newsubject {
    width: 180px;
    height: 30px;
    background-color: #f4f4f4;
    top: 298px;
    text-align: center;
    line-height: 30px;
}

.sheet-table {
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

.sheet-table tbody tr:nth-child(odd) {
    background-color: #fff;
}

.sheet-table tbody tr:nth-child(even) {
    background-color: #eee;
}


.sheet-table thead {
    background-color: #eee;
}

.sheet-table thead tr td {
    font-weight: bold;
    text-align: center;
}

.sheet-table td {
    font-weight: 400;
    overflow: hidden;
    white-space: pre;
    height: 34px;
    padding: 0 5px;
    border: solid #CCC 1px;
    /* td 内容太多，想自动换行 */
    word-wrap: break-word;
}

.sheet-table td button span {
    color: #555;
    cursor: pointer;
    outline: none;
}

.sheet-table td button span:hover {
    color: rgb(0, 135, 190);
    text-decoration: underline;
}
</style>