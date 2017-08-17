<!-- 利润表 -->
<template>
    <div id="profit">
        <!-- 头开始 -->
        <div class="profit-top">
            <div class="profit-top-context">
                <div class="profit-top-left">
                    <span class="fz5">利润表</span>
                    <template>
                        <el-select v-model="forms" placeholder="月报" size="small" class="forms">
                            <el-option v-for="item in monthly" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                    <template>
                        <el-select v-model="period" placeholder="2017年6期" size="small" class="preiod">
                            <el-option v-for="item in periods" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                    <el-button icon="share" size="small"></el-button>
    
                    <template>
                        <!-- `checked` 为 true 或 false -->
                        <el-checkbox v-model="checked" class="profit-check">显示本月数、本年累计数</el-checkbox>
                    </template>
                </div>
                <div class="profit-top-right">
                    <el-button type="primary" size="small">打印</el-button>
                    <el-button size="small">导出 </el-button>
                </div>
            </div>
        </div>
        <!-- 头结束 -->
        <!-- table开始 stripe带白马线-->
        <div class="profit-context">
            <template>
                <el-table :data="profitData" stripe height="600" border style="width: 100%">
                    <el-table-column prop="date" label="项目" width="700" header-align="center">
                    </el-table-column>
                    <el-table-column prop="name" label="行次" width="200" header-align="center">
                    </el-table-column>
                    <el-table-column prop="address" label="本期金额" width="400" header-align="center">
                    </el-table-column>
                    <el-table-column prop="ji" label="上期金额" width="400" header-align="center">
                    </el-table-column>
                </el-table>
                <div class="fr">
                    <p>
                        <span>1-32</span>
                        <span>共32条</span>
                    </p>
                </div>
            </template>
        </div>
        <!-- table结束 -->
    
        <!-- 编辑公式-减，营业成本弹出层 -->
        <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button>
        <el-dialog title="编辑公式-减:营业成本" :visible.sync="dialogTableVisible" size="small" top="20%" :close-on-click-modal="false">
            <div class="profit-dialog">
                <span>科目</span>
                <!-- 搜索科目 -->
                <el-autocomplete popper-class="my-autocomplete" v-model="subject" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect" icon="document" :on-icon-click="handleIconClick" size="small"></el-autocomplete>
                <el-button type="primary" size="small" @click="addSubjectEx()">添加</el-button>
            </div>
            <!-- 编辑的表格 -->
            <el-table :data="dialogData" border height="200" :summary-method="getSummaries" show-summary style="width: 100%; margin-top: 20px">
                <el-table-column prop="project" label="项目" header-align="center">
                </el-table-column>
                <el-table-column prop="operator" label="运算方式" header-align="center" align="center" width="100">
                </el-table-column>
                <el-table-column prop="current" label="本期金额" align="right" header-align="center">
                </el-table-column>
                <el-table-column prop="next" label="上期金额" align="right" header-align="center">
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
    name: 'profit',
    data() {
        return {
            //月报与季报
            monthly: [{
                value: '选项1',
                label: '月报'
            }, {
                value: '选项2',
                label: '季报'
            }],
            forms: '',
            //多少期
            periods: [{
                value: '选项1',
                label: '2018年6期'
            }, {
                value: '选项2',
                label: '2018年7期'
            },
            {
                value: '选项3',
                label: '2018年8期'
            }, {
                value: '选项4',
                label: '2018年9期'
            }],
            period: '',
            //选择
            checked: true,
            //table数据
            profitData: [{
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                ji: 'ddd',
            },
            {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                ji: 'ddd'
            },
            {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                ji: 'ddd'
            },
            {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                ji: 'ddd',
            },
            {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                ji: 'ddd',
            },
            {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                ji: 'ddd',
            }
            ],
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
            subject: ''

        }
    },
    mounted() {
        //弹出层 科目搜索
        this.restaurants = this.loadAll();
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
#profit .profit-top {
    font-family: 'Lucida Console';
    color: #555;
    width: 100%;
    height: 66px;
    padding: 18px 5px 5px 5px;
}

#profit .profit-top .profit-top-context {
    width: 100%;
    height: 30px;
}

#profit .profit-top .profit-top-context .profit-top-left {
    display: inline-block;
    float: left;
}

#profit .profit-top .profit-top-context .profit-top-left .el-input__icon+.el-input__inner {
    padding-right: 0px;
}

#profit .profit-top .profit-top-context .profit-top-left .el-select .el-input__inner {
    padding-right: 0px;
}










/* 月报 */

#profit .profit-top .profit-top-context .profit-top-left .forms {
    width: 70px;
    height: 30px;
}

#profit .profit-top .profit-top-context .profit-top-left .preiod {
    width: 140px;
    height: 30px;
}










/*选择框*/

#profit .profit-top .profit-top-context .profit-top-left .profit-check {
    margin-left: 25px;
}

#profit .profit-top .profit-top-context .profit-top-left .profit-check .el-checkbox__inner {
    width: 15px;
    height: 15px;
}

#profit .profit-top .profit-top-context .profit-top-left .profit-check .el-checkbox__inner::after {
    box-sizing: content-box;
    content: "";
    border: 2px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 6px;
    left: 4px;
}

#profit .profit-top .profit-top-context .profit-top-left .profit-check .el-checkbox__label {
    font-size: 12px;
    padding-left: 5px;
}

#profit .profit-top .profit-top-context .profit-top-right {
    display: inline-block;
    padding-right: 20px;
    float: right;
}

#profit .profit-top .profit-top-context .profit-top-right .el-button,
#profit .el-button {
    width: 60px;
}

#profit .profit-context .fr {
    margin-top: 5px;
    display: inline-block;
    float: right;
    color: #555;
    font-size: 13px;
}

#profit .profit-context .fr p span {
    padding: 5px;
}











/*弹出框css*/

.profit-dialog {
    padding: 10px 5px 20px 5px;
    ;
}

.el-dialog__header {
    background-color: #0087be;
    padding: 10px 10px 10px 10px;
}

.el-dialog__title {
    color: #fff;
}

.my-autocomplete li {
    line-height: normal;
    padding: 7px;
}

.my-autocomplete li .name {
    text-overflow: ellipsis;
    overflow: hidden;
}

.my-autocomplete li .addr {
    font-size: 12px;
    color: #b4b4b4;
}

.my-autocomplete li .highlighted .addr {
    color: #ddd;
}

.profit-dialog button {
    margin-left: 20px;
}
</style>