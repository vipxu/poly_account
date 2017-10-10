<template>
    <div id="CustomerList" class="el-card--custom">
        <el-row>
            <div class="search">
                <el-input placeholder="搜索客户" icon="search" v-model="cusSearchWord" :on-icon-click="cusSearch">
                </el-input>
            </div>
            <div class="btnBox">
                <el-button @click="dialogAddVisible = true">新增客户</el-button>
                <el-button>认领客户</el-button>
            </div>
        </el-row>
        <el-table :data="cusData" width="100%" max-height="600" border stripe :fit="false">
            <el-table-column type="index" min-width="70">
            </el-table-column>
            <el-table-column prop="compCode" label="客户编号" min-width="100">
            </el-table-column>
            <el-table-column prop="compName" label="公司名称" min-width="300">
            </el-table-column>
            <el-table-column prop="province" label="省" min-width="100">
            </el-table-column>
            <el-table-column prop="city" label="市" min-width="100">
            </el-table-column>
            <el-table-column prop="district" label="区" min-width="100">
            </el-table-column>
            <el-table-column prop="linkman" label="企业联系人" min-width="120">
            </el-table-column>
            <el-table-column prop="phone" label="手机号码" min-width="150">
            </el-table-column>
            <el-table-column prop="email" label="电子邮箱" min-width="250">
            </el-table-column>
            <!-- <el-table-column prop="modificationTime" label="最后修改时间" min-width="140">
                </el-table-column> -->
            <el-table-column fixed="left" label="操作" min-width="100">
                <template scope="scope">
                    <el-button @click.native.prevent="editRow(scope.$index, cusData)" type="text" size="small">
                        编辑
                    </el-button>
                    <el-button @click.native.prevent="deleteRow(scope.$index, cusData)" type="text" size="small">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 新增客户 -->
        <el-dialog title="新增客户" :visible.sync="dialogAddVisible">
            <el-form ref="addform" :model="addform" :label-width="addFormWidth">
                <el-form-item label="客户编号">
                    <el-input v-model="addform.num" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="客户名称">
                    <el-input v-model="addform.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="所在地区">
                    <el-input v-model="addform.region" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="企业联系人">
                    <el-input v-model="addform.contact" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input v-model="addform.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱">
                    <el-input v-model="addform.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="微信号">
                    <el-input v-model="addform.wx" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogAddVisible = false">确定</el-button>
            </div>
        </el-dialog>
        <!-- 新增客户 -->

        <!-- 编辑客户 -->
        <el-dialog title="编辑客户" :visible.sync="dialogEditVisible">
            <el-form ref="editform" :model="editform" :label-width="editFormWidth">
                <el-form-item label="客户编号">
                    <el-input v-model="editform.num" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="客户名称">
                    <el-input v-model="editform.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="所在地区">
                    <el-input v-model="editform.region" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="企业联系人">
                    <el-input v-model="editform.contact" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input v-model="editform.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱">
                    <el-input v-model="editform.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="微信号">
                    <el-input v-model="editform.wx" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogEditVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogEditVisible = false">确定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑客户 -->
    </div>
</template>

<script>
export default {
    name: 'customerlist',
    data() {
        return {
            cusSearchWord: '',
            cusData: [],
            //新增客户
            dialogAddVisible: false,
            addFormWidth: '120px',
            addform: {
                num: '',//客户编号
                name: '',//客户名称
                region: '',//地区
                contact: '',//联系人
                phone: '',//电话
                email: '',//邮箱
                wx: ''//微信号
            },
            //新增客户
            //编辑客户
            dialogEditVisible: false,
            editFormWidth: '120px',
            editform: {
                num: '',//客户编号
                name: '',//客户名称
                region: '',//地区
                contact: '',//联系人
                phone: '',//电话
                email: '',//邮箱
                wx: ''//微信号
            },
            //编辑客户
        }
    },
    created() {

    },
    mounted() {
        this.$nextTick(() => {
            this.getCustomerList();
        });
    },
    methods: {
        //搜索客户
        cusSearch(e) {

        },
        //搜索客户
        //编辑客户
        editRow(index, data) {
            this.dialogEditVisible = true;
        },
        //编辑客户
        //删除客户
        deleteRow(index, data) {

        },
        //删除客户
        //获取客户列表
        getCustomerList(keyword) {
            let Vue = this,
                data = {
                    userUid: this.$store.state.useruid,
                    city: this.$store.state.customer.cityLabel,
                };
            if (keyword) {
                data.text = keyword;
            }
            Vue.AxiosPost('getCustomerList', data, function(e) {
                if (e.code === '1') {
                    console.log(e);
                    Vue.cusData = e.data.qureyList;
                } else {
                    Vue.Message(e.msg, 'error');
                }
            })
        }
        //获取客户列表
    }
}
</script>

<style lang="scss">
#CustomerList {
    .el-dialog {
        width: 600px;
    }
}
</style>

<style lang="scss" scoped>
#CustomerList {
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
