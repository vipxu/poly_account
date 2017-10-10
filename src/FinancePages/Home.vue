<template>
    <div id="Home">
        <div class="el-card--custom">
            <div class="part-1">
                <p class="fz4 custom-color-primary">最近凭证</p>
                <el-row>
                    <el-col :span="20">
                        <table class="fz5" width="100%">
                            <tr v-for="(item, index) in tableData" :key="index" width="100%">
                                <td width="13%">{{item.date}}</td>
                                <td width="12%">{{item.name}}</td>
                                <td width="65%">{{item.abstract}}</td>
                                <td width="10%">{{item.amountOfMoney}}</td>
                            </tr>
                        </table>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="link('1-1')">录凭证
                            <i class="el-icon-plus el-icon--right"></i>
                        </el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="part-2">
                <el-row>
                    <el-col :span="6">
                        <div @click="link('3-1')">
                            <span class="png-main-1"></span>
                            <p class="fz4 custom-color-primary">查凭证</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div @click="link('4-4')">
                            <span class="png-main-2"></span>
                            <p class="fz4 custom-color-primary">科目余额表</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div @click="link('5-2')">
                            <span class="png-main-3"></span>
                            <p class="fz4 custom-color-primary">利润表</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div @click="link('5-1')">
                            <span class="png-main-4"></span>
                            <p class="fz4 custom-color-primary">资产负债表</p>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <div @click="link('4-2')">
                            <span class="png-main-5"></span>
                            <p class="fz4 custom-color-primary">明细账</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div>
                            <span class="png-main-6"></span>
                            <p class="fz4 custom-color-primary">结账</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div>
                            <span class="png-main-7"></span>
                            <p class="fz4 custom-color-primary">意见反馈</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div>
                            <span class="png-main-8"></span>
                            <p class="fz4 custom-color-primary">增值服务</p>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'home',
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '记1',
                abstract: '办公用品',
                amountOfMoney: '100.00'
            }, {
                date: '2016-05-04',
                name: '记2',
                abstract: '办公用品',
                amountOfMoney: '120.00'
            }]
        }
    },
    methods: {
        link(route) {
            this.$router.push({ path: route });
        }
    }
}
</script>
<style lang="scss" scoped>
#Home {
    .el-card--custom {
        min-width: 900px;
        padding: 0;
    }

    .part-1 {
        padding: 15px;
        .el-row {
            margin-top: 10px;
            .el-col:last-child {
                text-align: center;
            }
        }
        table {
            color: #1f2d3d;
            td {
                height: 26px;
                box-sizing: border-box;
                text-overflow: ellipsis;
                vertical-align: middle;
                position: relative;
            }
        }
        button {
            margin-top: 11px;
        }
    }

    .part-2 {
        .el-row {
            border-top: 1px solid rgb(209, 221, 229);
            .el-col {
                text-align: center;
                padding: 60px 0;
                &:not(:last-child) {
                    border-right: 1px solid rgb(209, 221, 229);
                }
                &:hover {
                    cursor: pointer;
                    background-color: rgb(244, 244, 244);
                }
                span {
                    display: inline-block;
                    width: 60px;
                    height: 60px;
                }
            }
        }
    }
}
</style>