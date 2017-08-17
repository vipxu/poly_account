<!-- 资产负债表 -->
<template>
    <div id="balance_sheet">
        <!-- 头开始 -->
        <div class="sheet-top">
            <div class="sheet-top-context">
                <div class="sheet-top-left">
                    <span class="fz4">资产负债表</span>
                    <template>
                        <el-select v-model="value" placeholder="2017年1期" size="small">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                    <el-button icon="share" size="small"></el-button>
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
            <template>
                <el-table :data="sheetData" height="300" border style="width: 100%">
                    <el-table-column prop="date" label="资产" width="300" header-align="center">
                    </el-table-column>
                    <el-table-column prop="name" label="行数" width="90" header-align="center">
                    </el-table-column>
                    <el-table-column prop="address" label="期末数" width="200" header-align="center">
                    </el-table-column>
                    <el-table-column prop="ji" label="年初数" width="200" header-align="center">
                    </el-table-column>
                    <el-table-column prop="dd" label="负债和所有者（或股东）权益" width="390" header-align="center" show-overflow-tooltip="true">
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
            </template>
    
        </div>
        <!-- table结束 -->
    
    </div>
</template>
<script>
export default {
    name: 'sheet',
    data() {
        return {
            options: [{
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
            value: '',

            sheetData: [{
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                ji: 'ddd',
                dd: 'sddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd45466666666666666666666666s',
                aa: 'ssssssdd',
                bb: 'sddddddd',
                cc: '呃呃点肉第三方水电费是'
            },
            {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                ji: 'ddd',
                dd: 'ss',
                aa: 'ssssssdd',
                bb: 'sddddddd',
                cc: '呃呃点肉第三方水电费是'
            },
            {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                ji: 'ddd',
                dd: 'ss',
                aa: 'ssssssdd',
                bb: 'sddddddd',
                cc: '呃呃点肉第三方水电费是'
            },
            {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                ji: 'ddd',
                dd: 'ss',
                aa: 'ssssssdd',
                bb: 'sddddddd',
                cc: '呃呃点肉第三方水电费是'
            },
            {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                ji: 'ddd',
                dd: 'ss',
                aa: 'ssssssdd',
                bb: 'sddddddd',
                cc: '呃呃点肉第三方水电费是'
            },
            {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                ji: 'ddd',
                dd: 'ss',
                aa: 'ssssssdd',
                bb: 'sddddddd',
                cc: '呃呃点肉第三方水电费是'
            }

            ]
        }
    },
    methods: {
    }
}
</script>
<style>
#balance_sheet .sheet-top {
    font-family: 'Lucida Console';
    color: #555;
    width: 100%;
    height: 66px;
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
#balance_sheet .sheet-top .sheet-top-context .sheet-top-right .el-button{
    width: 60px;
}
#balance_sheet .sheet-context .fr {
    margin-top: 5px;
    display: inline-block;
    float: right;
    color: #555;
    font-size: 13px;
}
#balance_sheet .sheet-context .fr p span{
    padding: 5px;
}
</style>