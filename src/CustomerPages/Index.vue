<template>
    <div id="Customer">
        <!-- Header -->
        <div id="Header">
            <Logo></Logo>
        </div>
        <!-- Header end -->
        <!-- Content -->
        <div id="Content">
            <div class="el-card--custom cus-tree">
                <el-row>
                    <h3>公司目录</h3>
                    <el-badge :value="1">
                        <i class="el-icon-message"></i>
                    </el-badge>
                </el-row>
                <CustomerTree></CustomerTree>
            </div>
            <div class="cus-view after">
                <transition name="changefade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
        <!-- Content end -->
        <link rel="stylesheet" :href="require('@/assets/css/Customer.scss')">
    </div>
</template>

<script>
import Logo from '@/components/Logo'
import CustomerTree from '@/components/CustomerTree'

export default {
    name: 'customer',
    components: {
        'Logo': Logo,
        'CustomerTree': CustomerTree
    },
    data() {
        return {

        }
    },
    created() {
        this.$store.state.customer = {
            cityLabel: '', //当前城市
            companyUid: '', //当前公司id
            accbookUid: '' //当前账套id
        };
    },
    mounted() {
        document.title = '聚账-客户管理系统';
        console.log(this.$store.state.customer);
    },
    methods: {

    }
}
</script>