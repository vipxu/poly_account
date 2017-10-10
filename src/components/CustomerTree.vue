<template>
    <div id="CustomerTree" v-loading="loading" element-loading-text="加载中">
        <el-tree :data="cusTree" :props="defaultProps" @node-click="cusNodeClick" highlight-current></el-tree>
    </div>
</template>

<script>
export default {
    name: 'customertree',
    data() {
        return {
            cusTree: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            loading: true
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.getCustomerTree();
        });
    },
    methods: {
        cusNodeClick(data) {
            switch (data.level) {
                case 1:
                    this.$store.state.customer.cityLabel = data.label;
                    this.$router.push({ path: '/Customer/CustomerList' });
                    break;
                case 2:
                    this.$store.state.customer.companyUid = data.companyUid;
                    this.$router.push({ path: '/Customer/AccountsList' });
                    break;
                case 3:
                    this.$store.state.customer.accbookUid = data.accbookUid;
                    this.$router.push({ path: '/Customer/Accounts' });
                    break;
                default:
                    break;
            }
        },
        //获取客户树
        getCustomerTree() {
            let Vue = this;
            Vue.AxiosPost('getCustomerTree', {
                useruid: Vue.$store.state.useruid
            }, function(e) {
                Vue.loading = false;
                if (e.code === '1') {
                    let treeData = [];
                    e.data.countrylist.forEach((n1, i1) => {
                        n1.cityList.forEach((n2, i2) => {
                            let cl = {};
                            cl.label = n2.cityName;
                            cl.children = [];
                            cl.level = 1;
                            //遍历区
                            n2.districtList.forEach((n3, i3) => {
                                n3.accountBookList.forEach((n4, i4) => {
                                    let abl = {};
                                    abl.label = n4.companyName;
                                    abl.companyUid = n4.companyUid;
                                    abl.children = [];
                                    abl.level = 2;
                                    //遍历账套
                                    n4.bookList.forEach((n5, i5) => {
                                        let bl = {};
                                        bl.label = n5.accountName;
                                        bl.level = 3;
                                        bl.accbookUid = n5.accbookUid;
                                        abl.children.push(bl);
                                    });
                                    cl.children.push(abl);
                                });
                            });
                            treeData.push(cl);
                        });
                    });
                    Vue.cusTree = treeData;
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        }
        //获取客户树
    }
}
</script>

<style lang="scss" scoped>
#CustomerTree {
    position: absolute;
    top: 65px;
    left: 0;
    right: 0;
    bottom: 0;
    height: auto;
    margin: 0 24px 24px 24px;
    overflow: auto;
    width: 230px;
    .el-tree {
        border: none;
    }
}
</style>

