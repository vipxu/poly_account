<template>
    <div id="AccountsList"  class="el-card--custom">
        <el-row>
            <div class="search">
                <el-input placeholder="搜索账套" icon="search" v-model="accSearchWord" :on-icon-click="accSearch">
                </el-input>
            </div>
            <div class="btnBox">
            </div>
        </el-row>
        <el-table :data="accData" width="100%" border stripe :fit="false">
            <el-table-column type="index" min-width="70">
            </el-table-column>
            <el-table-column prop="number" label="账套编号" min-width="100">
            </el-table-column>
            <el-table-column prop="name" label="账套名称" min-width="350">
            </el-table-column>
            <el-table-column prop="modificationTime" label="启动时间" min-width="140">
            </el-table-column>
            <el-table-column fixed="left" label="操作" min-width="150">
                <template scope="scope">
                    <el-button @click.native.prevent="enterRow(scope.$index, cusData)" type="text" size="small">
                        记账
                    </el-button>
                    <el-button @click.native.prevent="editRow(scope.$index, cusData)" type="text" size="small">
                        编辑
                    </el-button>
                    <el-button @click.native.prevent="deleteRow(scope.$index, cusData)" type="text" size="small">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'accountslist',
    data() {
        return {
            accSearchWord: '',
            accData: [{
                number: '10001',
                name: '深圳市维积网络科技有限公司',
                modificationTime: '2016-05-02'
            }, {
                number: '10001',
                name: '深圳市维积网络科技有限公司',
                modificationTime: '2016-05-02'
            }, {
                number: '10001',
                name: '深圳市维积网络科技有限公司',
                modificationTime: '2016-05-02'
            }, {
                number: '10001',
                name: '深圳市维积网络科技有限公司',
                modificationTime: '2016-05-02'
            }, {
                number: '10001',
                name: '深圳市维积网络科技有限公司',
                modificationTime: '2016-05-02'
            }, {
                number: '10001',
                name: '深圳市维积网络科技有限公司',
                modificationTime: '2016-05-02'
            }]
        }
    },
    methods: {
        //搜索客户
        accSearch(e) {

        },
        //搜索客户
        //进入记账
        enterRow(index, data) {

        },
        //进入记账
        //编辑客户
        editRow(index, data) {

        },
        //编辑客户
        //删除客户
        deleteRow(index, data) {

        }
        //删除客户
    }
}
</script>

<style lang="scss" scoped>
#AccountsList {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: auto;
    height: auto;
    >.el-row {
        margin-bottom: 15px;
        .search {
            float: left;
        }
        .btnBox {
            float: right;
        }
    }
}
</style>
