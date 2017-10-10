<template>
    <div id="Accounts">
        <div class="left-col">
            <div class="el-card--custom">
                <el-row class="ac-btn-Box">
                    <el-col :span="8">
                        <el-button type="primary">记账</el-button>
                    </el-col>
                    <el-col :span="8">
                        <el-button type="primary">录凭证
                            <i class="el-icon-plus el-icon--right"></i>
                        </el-button>
                    </el-col>
                    <el-col :span="8">
                        <el-button type="primary">报税</el-button>
                    </el-col>
                </el-row>
                <div class="table-Box">
                    <p class="fz4 custom-color-primary">最近凭证</p>
                    <table class="fz5" width="100%">
                        <tr v-for="(item, index) in tableData" :key="index" width="100%">
                            <td width="13%">{{item.date}}</td>
                            <td width="12%">{{item.name}}</td>
                            <td width="65%">{{item.abstract}}</td>
                            <td width="10%">{{item.amountOfMoney}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="el-card--custom">

            </div>
        </div>
        <div class="right-col">
            <div class="part1 el-card--custom"></div>
            <div class="part2 el-card--custom"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'accounts',
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

    }
}
</script>

<style lang="scss" scoped>
#Accounts {
    .left-col {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 315px;
        width: auto;
        height: auto;
        .el-card--custom {
            &:first-child{
                margin-bottom: 15px; 
            }
            .ac-btn-Box {
                margin: 50px 0;
                .el-button {
                    width: 120px;
                    margin: 0 auto;
                    display: block;
                }
            }
            .table-Box {
                padding: 24px;
                p {
                    border-bottom: 1px solid rgb(209, 221, 229);
                    padding: 5px 0;
                }
                table {
                    margin-top: 10px;
                    color: #1f2d3d;
                    td {
                        height: 26px;
                        box-sizing: border-box;
                        text-overflow: ellipsis;
                        vertical-align: middle;
                        position: relative;
                    }
                }
            }
        }
    }
    .right-col {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 300px;
        height: auto;
        .part1 {
            margin-bottom: 15px;
        }
    }
}
</style>
