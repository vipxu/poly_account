<template>
    <table cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <th class="abstract">摘要</th>
                <th class="subject">会计科目</th>
                <th class="DeCr">
                    <p>借方金额</p>
                    <div>
                        <span class="fz5">亿</span>
                        <span class="fz5">千</span>
                        <span class="fz5">百</span>
                        <span class="fz5">十</span>
                        <span class="fz5">万</span>
                        <span class="fz5">千</span>
                        <span class="fz5">百</span>
                        <span class="fz5">十</span>
                        <span class="fz5">元</span>
                        <span class="fz5">角</span>
                        <span class="fz5">分</span>
                    </div>
                </th>
                <th class="DeCr">
                    <p>贷方金额</p>
                    <div>
                        <span class="fz5">亿</span>
                        <span class="fz5">千</span>
                        <span class="fz5">百</span>
                        <span class="fz5">十</span>
                        <span class="fz5">万</span>
                        <span class="fz5">千</span>
                        <span class="fz5">百</span>
                        <span class="fz5">十</span>
                        <span class="fz5">元</span>
                        <span class="fz5">角</span>
                        <span class="fz5">分</span>
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in trData" :key="index">
                <template>
                    <div class="tr_option">
                        <span class="add" @click="addtr(index)"></span>
                        <span class="del" @click="deltr(index)"></span>
                    </div>
                </template>
                <!--摘要-->
                <td class="abstract" @click="abstract_click(item)">
                    <p v-if="!item.abstract.show">{{item.abstract.val}}</p>
                    <input v-else class="fz4" type="text" autocomplete="off" v-model="item.abstract.val" v-focus v-select @input="abstract_input(item,index)" @blur="input_blur(item)" @keydown.enter="input_keydown_enter(item,index,1)">
                    <div class="option fz6" @click="dialogAbsShow">摘要</div>
                </td>
                <!--摘要-->
                <!--会计科目-->
                <td class="subject" @click="subject_click(item)">
                    <p v-if="!item.subject.show">{{item.subject.val}}</p>
                    <input v-else class="fz4" type="text" autocomplete="off" v-model="item.subject.val" v-focus v-select @blur="input_blur(item)" @keydown.enter="input_keydown_enter(item,index,2)">
                    <div class="option fz6" @click="dialogSubShow">科目</div>
                </td>
                <!--会计科目-->
                <!--借方金额-->
                <td class="DeCr" :class="isNegative(item.DeCr.De_val)" @click="De_click(item)">
                    <template v-if="item.DeCr.state">
                        <template v-if="!item.DeCr.show">
                            <span v-for="index in 11" :key="index">{{moneyRender(item.DeCr.De_val,index)}}</span>
                        </template>
                        <template v-else>
                            <input class="fz1" type="text" autocomplete="off" v-model="item.DeCr.De_val" v-focus v-select @input="De_filter(item)" @blur="input_blur(item)" @keydown.prevent.space="input_keydown_space(item)" @keydown.enter="input_keydown_enter(item,index,3)">
                        </template>
                    </template>
                    <template v-else>
                        <span v-for="index in 11" :key="index">{{moneyRender(item.DeCr.De_val,index)}}</span>
                    </template>
                </td>
                <!--借方金额-->
                <!--贷方金额-->
                <td class="DeCr" :class="isNegative(item.DeCr.Cr_val)" @click="Cr_click(item)">
                    <template v-if="!item.DeCr.state">
                        <template v-if="!item.DeCr.show">
                            <span v-for="index in 11" :key="index">{{moneyRender(item.DeCr.Cr_val,index)}}</span>
                        </template>
                        <template v-else>
                            <input class="fz1" type="text" autocomplete="off" v-model="item.DeCr.Cr_val" v-focus v-select @input="Cr_filter(item)" @blur="input_blur(item)" @keydown.prevent.space="input_keydown_space(item)" @keydown.enter="input_keydown_enter(item,index,4)">
                        </template>
                    </template>
                    <template v-else>
                        <span v-for="index in 11" :key="index">{{moneyRender(item.DeCr.Cr_val,index)}}</span>
                    </template>
                </td>
                <!--贷方金额-->
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td class="total" :class="isNegative(DeCr_Total.De)" colspan="2">
                    <strong>合计：
                        <span>{{DeCr_Total.allTotal}}</span>
                    </strong>
                </td>
                <td class="DeCr" :class="isNegative(DeCr_Total.De)">
                    <span v-for="index in 11" :key="index">{{moneyRender(DeCr_Total.De,index)}}</span>
                </td>
                <td class="DeCr" :class="isNegative(DeCr_Total.Cr)">
                    <span v-for="index in 11" :key="index">{{moneyRender(DeCr_Total.Cr,index)}}</span>
                </td>
            </tr>
        </tfoot>
    </table>
</template>
<script>
export default {
    name: 'voucher-table',
    data() {
        return {
            trData: [{
                abstract: {
                    show: false,
                    val: ''
                },
                subject: {
                    show: false,
                    val: ''
                },
                DeCr: {
                    state: true,//true是借，false是贷
                    show: false,
                    De_val: '',
                    Cr_val: ''
                }
            }, {
                abstract: {
                    show: false,
                    val: ''
                },
                subject: {
                    show: false,
                    val: ''
                },
                DeCr: {
                    state: true,
                    show: false,
                    De_val: '',
                    Cr_val: ''
                }
            }, {
                abstract: {
                    show: false,
                    val: ''
                },
                subject: {
                    show: false,
                    val: ''
                },
                DeCr: {
                    state: true,
                    show: false,
                    De_val: '',
                    Cr_val: ''
                }
            }],
            DeCr_Total: {
                allTotal: '',
                De: '',
                Cr: ''
            }
        }
    },
    methods: {
        //金额渲染
        moneyRender(a, b) {
            let arr = a.replace(/[^\d]/g, '').replace(/\b(0+)/gi, '').split('');
            let l = arr.length;
            return arr[l - (12 - b)];
        },
        //金额渲染
        //是否为负数
        isNegative(a) {
            let b = parseFloat(a) < 0 ? 'Negative' : '';
            return b;
        },
        //是否为负数
        //添加行
        addtr(n) {
            this.trData.splice(n + 1, 0, {
                abstract: {
                    show: false,
                    val: ''
                },
                subject: {
                    show: false,
                    val: ''
                },
                DeCr: {
                    state: true,
                    show: false,
                    De_val: '',
                    Cr_val: ''
                }
            });
        },
        //添加行
        //删除行
        deltr(n) {
            if (this.trData.length <= 2) {
                this.msg("至少要剩下2条记录！", 'warning');
            } else {
                this.trData.splice(n, 1);
            }
        },
        //删除行
        //摘要点击
        abstract_click(item) {
            this.trData.forEach((tritem, index) => {
                tritem.DeCr.show = false;
                item.abstract.show = false;
                item.subject.show = false;
            });
            item.abstract.show = true;
        },
        dialogAbsShow(){
            this.$emit('dialogAbsShow');
        },
        //摘要点击
        //科目点击
        subject_click(item) {
            this.trData.forEach((tritem, index) => {
                tritem.DeCr.show = false;
                item.abstract.show = false;
                item.subject.show = false;
            });
            item.subject.show = true;
        },
        dialogSubShow(){
            this.$emit('dialogSubShow');
        },
        //科目点击
        //借方点击
        De_click(item) {
            item.DeCr.state = true;
            this.trData.forEach((tritem, index) => {
                tritem.DeCr.show = false;
            });
            item.DeCr.show = true;
        },
        //借方点击
        //贷方点击
        Cr_click(item) {
            item.DeCr.state = false;
            this.trData.forEach((tritem, index) => {
                tritem.DeCr.show = false;
            });
            item.DeCr.show = true;
        },
        //贷方点击
        //输入框失焦
        input_blur(item) {
            item.abstract.show = false;
            item.subject.show = false;
            item.DeCr.show = false;
            if (item.DeCr.state) {
                if (this.input_filter(item.DeCr.De_val).replace(/[^\d]/g, '').replace(/\b(0+)/gi, '').length > 11) {
                    this.msg("您输入的金额不能超过10亿", 'warning');
                    item.DeCr.De_val = '';
                } else {
                    //过滤
                    item.DeCr.De_val = this.input_filter(item.DeCr.De_val)
                    //过滤
                }
            } else {
                if (this.input_filter(item.DeCr.Cr_val).replace(/[^\d]/g, '').replace(/\b(0+)/gi, '').length > 11) {
                    this.msg("您输入的金额不能超过10亿", 'warning');
                    item.DeCr.Cr_val = '';
                } else {
                    //过滤
                    item.DeCr.Cr_val = this.input_filter(item.DeCr.Cr_val);
                    //过滤
                }
            }
            //合计
            this.DeCr_Ammount();
            //合计
        },
        //输入框失焦
        //输入过滤
        De_filter(item) {
            item.DeCr.Cr_val = '';
            if (item.DeCr.De_val === '=') {
                this.$nextTick(() => {
                    item.DeCr.De_val = '';
                    let deammout = this.De_Ammout(),
                        crammout = this.Cr_Ammout();
                    item.DeCr.De_val = (crammout - deammout) + '';
                });
            }
        },
        Cr_filter(item) {
            item.DeCr.De_val = '';
            if (item.DeCr.Cr_val === '=') {
                this.$nextTick(() => {
                    item.DeCr.Cr_val = '';
                    let deammout = this.De_Ammout(),
                        crammout = this.Cr_Ammout();
                    item.DeCr.Cr_val = (deammout - crammout) + '';
                });
            }
        },
        input_filter(str) {
            var str1, str2, result,
                negative = parseFloat(str) < 0 ? true : false;
            if (str === '' || parseFloat(str) === 0 || isNaN(parseFloat(str))) {
                result = '';
            } else {
                if (str.indexOf(".") === -1) {
                    str = str.replace(/[^\d]/g, '').replace(/\b(0+)/gi, '') + '.00';
                    result = str;
                } else {
                    str1 = str.substring(0, str.indexOf('.')).replace(/[^\d]/g, '').replace(/\b(0+)/gi, '');
                    str2 = this.countnum(str.substring(str.indexOf('.') + 1, str.length).replace(/[^\d]/g, '').substring(0, 2));
                    if (str1 === '') {
                        if (str2 === '00') {
                            result = '';
                        } else {
                            result = '0.' + str2;
                        }
                    } else {
                        result = str1 + '.' + str2;
                    }
                }
            }
            if (negative) {
                result = '-' + result;
            }
            return result;
        },
        countnum(num) {
            var l = num.length;
            switch (l) {
                case 0:
                    num += '00';
                    break;
                case 1:
                    num += '0';
                    break;
                default:
                    break;
            }
            return num;
        },
        //输入过滤
        //摘要快捷键
        abstract_input(item, index) {
            let tr = this.trData;
            switch (item.abstract.val) {
                case '//':
                    if (index != 0) {
                        item.abstract.val = tr[0].abstract.val;
                    } else {
                        item.abstract.val = '';
                    }
                    break;
                case '..':
                    if (tr[index - 1]) {
                        item.abstract.val = tr[index - 1].abstract.val;
                    } else {
                        item.abstract.val = '';
                    }
                    break;
                default:
                    break;
            }
        },
        //摘要快捷键
        //快捷键（空格）
        input_keydown_space(item) {
            item.DeCr.state = !item.DeCr.state;
            let De = item.DeCr.De_val;
            let Cr = item.DeCr.Cr_val;
            item.DeCr.De_val = Cr;
            item.DeCr.Cr_val = De;
            this.$nextTick(() => {
                item.DeCr.show = true;
            })
            return false;
        },
        //快捷键（空格）
        //快捷键（回车）
        input_keydown_enter(item, index, check) {
            let tr = this.trData;
            switch (check) {
                case 1:
                    item.abstract.show = false;
                    this.$nextTick(() => {
                        item.subject.show = true;
                    });
                    break;
                case 2:
                    item.subject.show = false;
                    this.$nextTick(() => {
                        item.DeCr.state = true;
                        item.DeCr.show = true;
                    });
                    break;
                case 3:
                    if (item.DeCr.De_val === '') {
                        item.DeCr.state = false;
                        this.$nextTick(() => {
                            item.DeCr.show = true;
                        });
                    } else {
                        this.$nextTick(() => {
                            if (tr[index + 1]) {
                                tr[index + 1].abstract.show = true;
                                tr[index + 1].abstract.val = item.abstract.val !== '' ? item.abstract.val : tr[0].abstract.val;
                            } else {
                                this.addtr(index);
                                tr[index + 1].abstract.show = true;
                                tr[index + 1].abstract.val = item.abstract.val !== '' ? item.abstract.val : tr[0].abstract.val;
                            }
                        });
                    }
                    break;
                case 4:
                    if (item.DeCr.Cr_val != '') {
                        item.DeCr.show = false;
                        this.$nextTick(() => {
                            this.$nextTick(() => {
                                if (tr[index + 1]) {
                                    tr[index + 1].abstract.show = true;
                                    tr[index + 1].abstract.val = item.abstract.val !== '' ? item.abstract.val : tr[0].abstract.val;
                                } else {
                                    this.addtr(index);
                                    tr[index + 1].abstract.show = true;
                                    tr[index + 1].abstract.val = item.abstract.val !== '' ? item.abstract.val : tr[0].abstract.val;
                                }
                            });
                        });
                    }
                    break;
                default:
                    break;
            }
        },
        //快捷键（回车）
        //借贷合计
        DeCr_Ammount() {
            let deammout = this.De_Ammout(),
                crammout = this.Cr_Ammout();
            if (this.input_filter(deammout === 0 ? '' : deammout + '').replace(/[^\d]/g, '').replace(/\b(0+)/gi, '').length > 11) {
                this.msg("借方的合计金额不能超过10亿，请重新输入！", 'warning');
                this.DeCr_Total.De = '';
            } else {
                this.DeCr_Total.De = this.input_filter(deammout === 0 ? '' : deammout + '');
            }
            if (this.input_filter(crammout === 0 ? '' : crammout + '').replace(/[^\d]/g, '').replace(/\b(0+)/gi, '').length > 11) {
                this.msg("贷方的合计金额不能超过10亿，请重新输入！", 'warning');
                this.DeCr_Total.Cr = '';
            } else {
                this.DeCr_Total.Cr = this.input_filter(crammout === 0 ? '' : crammout + '');
            }

            //总合计渲染
            if (deammout != 0 && deammout === crammout) {
                this.DeCr_Total.allTotal = this.toCapital(deammout);
            } else {
                this.DeCr_Total.allTotal = '';
            }
            //总合计渲染
        },
        //借贷合计
        //借方金额求和
        De_Ammout() {
            var de_ammout = 0;
            this.trData.forEach(function (item, index) {
                if (item.DeCr.De_val != "") {
                    de_ammout += parseFloat(item.DeCr.De_val);
                }
            });
            return de_ammout;
        },
        //借方金额求和
        //贷方金额求和
        Cr_Ammout() {
            var cr_ammout = 0;
            this.trData.forEach(function (item, index) {
                if (item.DeCr.Cr_val != "") {
                    cr_ammout += parseFloat(item.DeCr.Cr_val);
                }
            });
            return cr_ammout;
        },
        //贷方金额求和
        //中文大写
        toCapital(n) {
            var fraction = ['角', '分'];
            var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
            var unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
            var head = n < 0 ? '负' : '';
            n = Math.abs(n);
            var s = '';
            for (var i = 0; i < fraction.length; i++) {
                s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
            }
            s = s || '整';
            n = Math.floor(n);
            for (var i = 0; i < unit[0].length && n > 0; i++) {
                var p = '';
                for (var j = 0; j < unit[1].length && n > 0; j++) {
                    p = digit[n % 10] + unit[1][j] + p;
                    n = Math.floor(n / 10);
                }
                s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
            }
            return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
        },
        //中文大写
        //提示框
        msg(txt, type) {
            this.$message({
                showClose: true,
                message: txt,
                type: type
            });
        }
        //提示框
    }
}
</script>

<style scoped>
table {
    width: 100%;
    border: 2px solid rgb(119, 119, 119);
    font-size: 14px;
    color: rgb(85, 85, 85);
}

tr {
    position: relative;
    display: block;
    width: 100%;
    padding-left: 30px;
    float: right;
}

th {
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid rgb(119, 119, 119);
}

td {
    position: relative;
    height: 60px;
    line-height: 60px;
}

tbody td {
    border-bottom: 1px solid rgb(119, 119, 119);
}

.abstract {
    width: 281px;
}

.subject {
    width: 345px;
}

.DeCr {
    width: 209px;
}

.total {
    width: 626px;
    padding: 0 10px;
}

th:not(:last-child),
td:not(:last-child) {
    border-right: 1px solid rgb(119, 119, 119);
}

th>div,
th>p {
    height: 24px;
    line-height: 24px;
}

th>div {
    box-sizing: border-box;
    border-top: 1px solid rgb(223, 230, 236);
    font-weight: normal;
}

th>div>span,
td>span {
    float: left;
    display: block;
    width: 19px;
    height: 100%;
    text-align: center;
}

td>span {
    font-weight: bold;
}

th>div>span:not(:first-child),
td>span:not(:first-child) {
    box-sizing: border-box;
    border-left: 1px solid rgb(223, 230, 236);
}

table tr td.DeCr>span:nth-child(4),
table tr td.DeCr>span:nth-child(7),
table tr th.DeCr span:nth-child(4),
table tr th.DeCr span:nth-child(7) {
    border-color: rgb(153, 207, 229);
}

table tr td.DeCr>span:nth-child(10),
table tr th.DeCr span:nth-child(10) {
    border-color: rgb(237, 184, 184);
}

table tr .Negative span {
    color: rgb(221, 78, 78);
}

tbody td input[type=text] {
    display: block;
    box-sizing: border-box;
    outline: none;
    resize: none;
    border: 1px solid rgb(0, 135, 190);
    height: 60px;
    width: 100%;
    padding: 5px;
    overflow: hidden;
}

tbody td.abstract p,
tbody td.subject p {
    padding-left: 5px;
    padding-right: 35px;
}

tbody td.abstract input[type=text],
tbody td.subject input[type=text] {
    padding-right: 35px;
}

tbody td.DeCr input[type=text] {
    text-align: right;
}

tbody tr>div.tr_option {
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    text-align: center;
    width: 30px;
    height: 60px;
}

tbody tr>div.tr_option .add,
tbody tr>div.tr_option .del {
    display: block;
    width: 16px;
    height: 16px;
    margin: 0 auto;
    background: url(/static/img/page_spr_icons.32707f6.png) no-repeat
}

tbody tr>div.tr_option .add {
    margin-top: 11px;
    background-position: -112px -96px;
}

tbody tr>div.tr_option .del {
    margin-top: 6px;
    background-position: -128px -96px;
}

tbody tr>div.tr_option .add:hover,
tbody tr>div.tr_option .del:hover {
    cursor: pointer;
}

tbody td .option {
    display: none;
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    text-align: center;
    color: rgb(170, 170, 170);
}

tbody td .option:hover {
    cursor: pointer;
    color: rgb(0, 135, 190);
}

tbody tr:hover td {
    background-color: rgb(238, 241, 246);
}

tbody tr:hover .option,
tbody tr:hover .tr_option {
    display: block;
}
</style>