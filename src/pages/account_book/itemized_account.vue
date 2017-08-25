<!-- 明细账 -->
<template>
    <div id="itemized">
        <!-- 头开始 -->
        <div class="itemized-top">
            <div class="itemized-top-context">
                <div class="itemized-top-left">
                    <span class="fz4 itemized-span">明细账</span>
                    <!-- 明细账期数 -->
                    <div class="accout-itemized"  >
                        <div class="ui-btn-menu " :class="periodstate==true? 'ui-btn-menu-cur' : ''" @click="pullDown()">
                            <span class="ui-btn menu-btn">
                                <span id="selected-period">
                                    <span>2017年第1期</span>
                                </span>
                                <b></b>
                            </span>
                        </div>
                        <div class="con" v-show="periodstate">
                            <ul>
                                <li>
                                    <span>会计期间：</span>
                                    <template>
                                        <el-select v-model="accountantBegin" placeholder="2017年1期" size="small">
                                            <el-option v-for="item in periods" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                    <span>至</span>
                                    <template>
                                        <el-select v-model="accountantEnd" placeholder="2017年1期" size="small">
                                            <el-option v-for="item in periods" :key="item.value" :label="item.label" :value="item.value" >
                                            </el-option>
                                        </el-select>
                                    </template>
                                    <span>
                                        <i class="el-icon-time"></i>
                                    </span>
                                </li>
                                <li class="subject">
                                    <span>起始科目：</span>
                                    <el-autocomplete size="small" class="inline-input" v-model="subjectBegin" :fetch-suggestions="querySearch" placeholder="请输入起始科目" @select="handleSelect"></el-autocomplete>

                                </li>
                                <li class="subject">
                                    <span>结束科目：</span>
                                    <el-autocomplete size="small" class="inline-input" v-model="subjectEnd" :fetch-suggestions="querySearch" placeholder="请输入结束科目" @select="handleSelect"></el-autocomplete>
                                </li>
                                <li>
                                    <span>科目级别：</span>
                                    <el-input v-model="subjectRankBegin" size="small" style="width:65px;"></el-input>
                                    <span style="margin-left:35px;">至</span>
                                    <el-input v-model="subjectRankEnd" size="small" style="width:65px;"></el-input>
                                </li>
                                <li>
                                    <span>币别：</span>
                                    <template>
                                        <el-select v-model="Currency" placeholder="请选择" size="small">
                                            <el-option v-for="item in Currencys" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </li>
                                <el-checkbox-group v-model="checkList">
                                    <li>
                                        <el-checkbox label="显示辅助核算"></el-checkbox>
                                    </li>
                                    <li>
                                        <el-checkbox label="只显示最明细科目"></el-checkbox>
                                    </li>
                                    <li>
                                        <el-checkbox label="显示现金银行存款对方科目"></el-checkbox>
                                    </li>
                                    <li>
                                        <el-checkbox label="余额为0不显示"></el-checkbox>
                                    </li>
                                    <li>
                                        <el-checkbox label="无发生额且余额为0不显示"></el-checkbox>
                                    </li>
                                </el-checkbox-group>
                            </ul>
                            <div class="itemized-top-right">
                                <el-button size="small">重置</el-button>
                                <el-button type="primary" size="small" @click="periodstate=false">确定</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="itemized-upload">
                    <el-button icon="share" size="small" class="upload"></el-button>
                    </div>
                </div>
                <div class="itemized-top-right">
                    <el-button type="primary" size="small">打印</el-button>
                    <el-button size="small">连续打印</el-button>
                    <el-button size="small">导出 </el-button>
                </div>
            </div>
        </div>
        <!-- 头结束 -->
        <!-- table开始 -->
        <div class="itemized-context">
            <!-- 科目头 -->
            <div class="l-layout-header">科目：1001 库存现金</div>
            <!-- 科目头 -->
            <table class="itemized-table" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <td style="width:15%">日期</td>
                        <td style="width:15%">凭证字号</td>
                        <td style="width:25%">摘要</td>
                        <td style="width:15%">借方</td>
                        <td style="width:15%">贷方</td>
                        <td style="width:5%">方向</td>
                        <td style="width:10%">余额</td>
                    </tr>
                </thead>

                <tbody>
                    <!--明细账 -->
                    <tr>
                        <td style="text-align: center;">2017-01-01</td>
                        <td></td>
                        <td>取现金</td>
                        <td style="text-align: right;">1000.00</td>
                        <td></td>
                        <td style="text-align: center;">借</td>
                        <td style="text-align: right;">11.00</td>
                    </tr>

                    <tr>
                        <td style="text-align: center;">2017-01-01</td>
                        <td>
                            <a href="#">记-2</a>
                        </td>
                        <td>取现金</td>
                        <td style="text-align: right;">1000.00</td>
                        <td></td>
                        <td style="text-align: center;">借</td>
                        <td style="text-align: right;">11.00</td>
                    </tr>

                    <tr>
                        <td style="text-align: center;">2017-01-01</td>
                        <td>记-3</td>
                        <td>取现金</td>
                        <td style="text-align: right;"></td>
                        <td style="text-align: right;">1000.00</td>
                        <td style="text-align: center;">借</td>
                        <td style="text-align: right;">11.00</td>
                    </tr>
                    <!-- 明细账-->
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
        <!-- 左边部分table结束 -->
        <!-- 右边部分快捷切换开始 -->
        <div class="subject-shortcut">
            <div class="l-layout-header">
                <i class="el-icon-d-arrow-right"></i>&nbsp;&nbsp;快速切换</div>
            <div class="shortcut-div">
                <!-- 科目搜索 -->
                <el-autocomplete class="inline-input" v-model="state" icon="search" :fetch-suggestions="querySearch" placeholder="请输入科目" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
                <!-- 科目搜索 -->
            </div>
            <div class="subject-div">
                <p>这里放置科目树</p>
            </div>
        </div>
        <!-- 右边部分快捷切换结束 -->
    </div>
</template>
<script>
export default {
    name: 'itemized',
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
            periodstate:false,
            //会计开始时间
            accountantBegin: '',
            accountantEnd: '',
            //至结束时间
            accountantEnd: '',
            //科目
            subjectBegin: '',
            subjectEnd: '',
            //科目
            //科目级别
            subjectRankBegin:'',
            subjectRankEnd:'',
            //科目级别
            //币别
            Currency: '',
            Currencys: [
                {
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
            //默认选中辅助核算
            checkList: ['显示辅助核算'],
            //表格数据
            itemizedData: [],
            // 科目列表
            restaurants: [],
            state: ''
        }
    },
    mounted() {
        this.restaurants = this.loadAll();
    },
    methods: {
        pullDown(){
            this.periodstate=!this.periodstate;

        },
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
        }
    },

}
</script>
<style>
#itemized .itemized-top {
    font-family: 'Lucida Console';
    color: #555;
    width: 100%;
    height: 45px;
    padding: 5px;
}
.itemized-span,.accout-itemized,.itemized-upload{
    float: left;
}
.itemized-span{
    line-height: 30px;
    margin-right: 15px;
}

/* 明细账选择菜单卡片效果 公共样式*/
.ui-btn-menu {
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
    zoom: 1;
    z-index: 100;
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
    z-index: 100;
}
.ui-btn-menu-cur .ui-btn{
    border-bottom: 1px solid #fff;
    background-color: #fff;
}
.ui-btn {
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
.itemized-top-left .con {
    width: 340px;
    padding: 15px;
    position: absolute;
    top: 32px;
    left: 62px;
    border: 1px solid #c1c1c1;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .15);
    background-color: #fff;
    font: 12px/1.5 \5b8b\4f53;
    z-index: 99;
}







/* 区间选择的大小 */

.itemized-top-left .con ul li {
    padding-bottom: 20px;
    list-style-type: none;
    font-size: 14px;
    text-align: -webkit-match-parent;
    color: #555;
}

.itemized-top-left .con .el-input--small .el-input__inner {
    height: 30px;
    width: 100px;
}

.itemized-top-left .con .el-input__icon {
    right: -4px;
}

.itemized-top-left .con ul .subject .el-input__inner {
    width: 228px;
}







/* hover之后自动追加.ui-btn-menu-cur */


/* 明细账选择菜单卡片效果 */

#itemized .itemized-top .itemized-top-context {
    width: 100%;
    height: 30px;
}

#itemized .itemized-top .itemized-top-context .itemized-top-left {
    display: inline-block;
    /* float: left; */
}

#itemized .itemized-top .itemized-top-context .itemized-top-left .el-input__icon+.el-input__inner {
    padding-right: 0px;
}

#itemized .itemized-top .itemized-top-context .itemized-top-left .el-select .el-input__inner {
    padding-right: 0px;
}

 .itemized-top-right {
    display: inline-block;
    padding-right: 20px;
    float: right;
}

.itemized-top-right .el-button {
    width: 70px;
}














/* 科目列表和快速切换2部分 */

#itemized .itemized-context {
    width: 70%;
    float: left;
    border: 1px solid #D0D0D0;
}




/* 科目1001导航样式 */

#itemized .l-layout-header {
    cursor: default;
    font-size: 12px;
    color: #101010;
    height: 24px;
    line-height: 24px;
    font-weight: bold;
    padding-left: 10px;
    overflow: hidden;
    background-color: #D7D7D7;
    border-bottom: 1px solid #D0D0D0;
}

#itemized .itemized-context .fr {
    margin-top: 5px;
    display: inline-block;
    float: right;
    color: #555;
    font-size: 13px;
}

#itemized .itemized-context .fr p span {
    padding: 5px;
}

.itemized-table {
    color: #555;
    font-family: tahoma, arial, 宋体;
    font-size: 12px;
    border-collapse: collapse;
    /*相邻边被合并;separate: 边框独立*/
    border: none;
    width: 100%;
}















/*tbody斑马线获得奇偶数的子元素*/

.itemized-table tbody>tr:nth-child(odd) {
    background-color: #fff;
}

.itemized-table tbody>tr:nth-child(even) {
    background-color: #eee;
}

.itemized-table tbody>tr>td>p {
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

.itemized-table tbody>tr>td>p:first-child {
    margin-top: 5px;
}

.itemized-table thead {
    background-color: #eee;
}

.itemized-table thead tr td {
    font-weight: bold;
    text-align: center;
    white-space: nowrap;
    font-weight: 700;
}

.itemized-table td {
    height: 34px;
    padding: 0 5px;
    /* 这里要重新布局不然上方div差1px 思路在父级加border td就要不加下与左border */
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc;
    /* td 内容太多，想自动换行 */
    word-wrap: break-word;
}














/* 连接的样式 */

.itemized-table tbody td a {
    color: #555;
    cursor: pointer;
    outline: none;
}

.itemized-table tbody td a:hover {
    color: rgb(0, 135, 190);
    text-decoration: underline;
}














/* 左边部分结束*/


/* 右边部分快捷切换开始 */

#itemized .subject-shortcut {
    width: 29.5%;
    float: right;
}

#itemized .subject-shortcut .shortcut-div {
    height: 50px;
    padding-left: 15px;
    line-height: 50px;
    border: 1px solid #cfcfcf;
    background: #f7f7f7;
}

#itemized .subject-shortcut .subject-div {
    background-color: #fff;
    height: 100%;
    border-left: 1px solid #cfcfcf;
    border-right: 1px solid #cfcfcf;
}










/* 右边部分快捷切换结束 */
</style>