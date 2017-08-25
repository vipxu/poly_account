<template>
    <table cellpadding="0" cellspacing="0">
        <thead>
            <tr>
                <!--摘要-->
                <th :class="(quantity || currency) ? 'abstract-1' : 'abstract'">摘要</th>
                <!--摘要-->
                <!--会计科目-->
                <th v-if="quantity && currency" class="subject-2">会计科目</th>
                <th v-else-if="quantity || currency" class="subject-1">会计科目</th>
                <th v-else class="subject">会计科目</th>
                <!--会计科目-->
                <!--数量-->
                <th class="quantity" v-if="quantity">数量</th>
                <!--数量-->
                <!--外币-->
                <th class="currency" v-if="currency">外币</th>
                <!--外币-->
                <!--借方金额-->
                <th :class="(quantity && currency) ? 'DeCr-1' : 'DeCr'">
                    <p>借方金额</p>
                    <div>
                        <span v-for="index in thSpanData" :key="index" :class="(quantity && currency) ? 'fz6':'fz5'">{{index}}</span>
                    </div>
                </th>
                <!--借方金额-->
                <!--贷方金额-->
                <th :class="(quantity && currency) ? 'DeCr-1' : 'DeCr'">
                    <p>贷方金额</p>
                    <div>
                        <span v-for="index in thSpanData" :key="index" :class="(quantity && currency) ? 'fz6':'fz5'">{{index}}</span>
                    </div>
                </th>
                <!--贷方金额-->
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
                <td :class="(quantity || currency) ? 'abstract-1' : 'abstract'" @click="abstract_click(item)">
                    <p v-if="!item.abstract.show">{{item.abstract.val}}</p>
                    <input v-else class="fz4" type="text" autocomplete="off" v-model="item.abstract.val" v-focus v-select @input="abstract_input(item,index)" @blur="input_blur(item)" @keydown="input_keydown($event,item,index,1)">
                    <div class="option fz6" @click="dialogAbsShow">摘要</div>
                </td>
                <!--摘要-->
                <!--会计科目-->
                <td v-if="quantity && currency" class="subject-2" @click="subject_click(item)">
                    <p v-if="!item.subject.show">{{item.subject.val}}</p>
                    <input v-else class="fz4" type="text" autocomplete="off" v-model="item.subject.val" v-focus v-select @blur="input_blur(item)" @keydown="input_keydown($event,item,index,2)">
                    <div class="option fz6" @click="dialogSubShow">科目</div>
                </td>
                <td v-else-if="quantity || currency" class="subject-1" @click="subject_click(item)">
                    <p v-if="!item.subject.show">{{item.subject.val}}</p>
                    <input v-else class="fz4" type="text" autocomplete="off" v-model="item.subject.val" v-focus v-select @blur="input_blur(item)" @keydown="input_keydown($event,item,index,2)">
                    <div class="option fz6" @click="dialogSubShow">科目</div>
                </td>
                <td v-else class="subject" @click="subject_click(item)">
                    <p v-if="!item.subject.show">{{item.subject.val}}</p>
                    <input v-else class="fz4" type="text" autocomplete="off" v-model="item.subject.val" v-focus v-select @blur="input_blur(item)" @keydown="input_keydown($event,item,index,2)">
                    <div class="option fz6" @click="dialogSubShow">科目</div>
                </td>
                <!--会计科目-->
                <!--数量-->
                <td class="quantity" v-if="quantity">
                    <p>
                        <el-input v-model="item.quantity.num_val" placeholder="数量" size="mini"></el-input>
                    </p>
                    <p>
                        <el-input v-model="item.quantity.price_val" placeholder="单价" size="mini"></el-input>
                    </p>
                </td>
                <!--数量-->
                <!--外币-->
                <td class="currency" v-if="currency">
                    <p>
                        <el-select v-model="item.currency.currencyValue" placeholder="请选择" size="mini">
                            <el-option v-for="item in currencyOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        <el-input v-model="item.currency.foreign" size="mini"></el-input>
                    </p>
                    <p>
                        <el-input v-model="item.currency.original" placeholder="原币" size="mini"></el-input>
                    </p>
                </td>
                <!--外币-->
                <!--借方金额-->
                <td :class="(quantity && currency) ? 'DeCr-1 '+isNegative(DeCr_Total.De) : 'DeCr '+isNegative(DeCr_Total.De)" @click="De_click(item)">
                    <template v-if="item.DeCr.state">
                        <template v-if="!item.DeCr.show">
                            <span v-for="index in 11" :key="index">{{moneyRender(item.DeCr.De_val,index)}}</span>
                        </template>
                        <template v-else>
                            <input class="fz1" type="text" autocomplete="off" v-model="item.DeCr.De_val" v-focus v-select @input="De_filter(item)" @blur="input_blur(item)" @keydown="input_keydown($event,item,index,3)">
                        </template>
                    </template>
                    <template v-else>
                        <span v-for="index in 11" :key="index">{{moneyRender(item.DeCr.De_val,index)}}</span>
                    </template>
                </td>
                <!--借方金额-->
                <!--贷方金额-->
                <td :class="(quantity && currency) ? 'DeCr-1 '+isNegative(DeCr_Total.De) : 'DeCr '+isNegative(DeCr_Total.De)" @click="Cr_click(item)">
                    <template v-if="!item.DeCr.state">
                        <template v-if="!item.DeCr.show">
                            <span v-for="index in 11" :key="index">{{moneyRender(item.DeCr.Cr_val,index)}}</span>
                        </template>
                        <template v-else>
                            <input class="fz1" type="text" autocomplete="off" v-model="item.DeCr.Cr_val" v-focus v-select @input="Cr_filter(item)" @blur="input_blur(item)" @keydown="input_keydown($event,item,index,4)">
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
                <td :class="(quantity && currency) ? 'total-1 '+isNegative(DeCr_Total.De) : 'total '+isNegative(DeCr_Total.De)" colspan="4">
                    <strong>合计：
                        <span>{{DeCr_Total.allTotal}}</span>
                    </strong>
                </td>
                <td :class="(quantity && currency) ? 'DeCr-1 '+isNegative(DeCr_Total.De) : 'DeCr '+isNegative(DeCr_Total.De)">
                    <span v-for="index in 11" :key="index">{{moneyRender(DeCr_Total.De,index)}}</span>
                </td>
                <td :class="(quantity && currency) ? 'DeCr-1 '+isNegative(DeCr_Total.De) : 'DeCr '+isNegative(DeCr_Total.De)">
                    <span v-for="index in 11" :key="index" >{{moneyRender(DeCr_Total.Cr,index)}}</span>
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
            //数量
            quantity: false,
            //数量
            //外币
            currency: true,
            currencyOptions: [{
                value: '选项1',
                label: 'RMB'
            }, {
                value: '选项2',
                label: 'USD'
            }],
            //外币
            thSpanData: ['亿', '千', '百', '十', '万', '千', '百', '十', '元', '角', '分'],
            //tr数据
            trData: [
                {
                    abstract: {
                        show: false,
                        val: ''
                    },
                    subject: {
                        show: false,
                        val: ''
                    },
                    quantity: {
                        state: true,
                        show: false,
                        num_val: '',
                        price_val: ''
                    },
                    currency: {
                        state: true,
                        show: false,
                        foreign: '',
                        original: '',
                        currencyValue: ''
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
                    quantity: {
                        state: true,
                        show: false,
                        num_val: '',
                        price_val: ''
                    },
                    currency: {
                        state: true,
                        show: false,
                        foreign: '',
                        original: '',
                        currencyValue: ''
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
                    quantity: {
                        state: true,
                        show: false,
                        num_val: '',
                        price_val: ''
                    },
                    currency: {
                        state: true,
                        show: false,
                        foreign: '',
                        original: '',
                        currencyValue: ''
                    },
                    DeCr: {
                        state: true,
                        show: false,
                        De_val: '',
                        Cr_val: ''
                    }
                }
            ],
            //tr数据
            DeCr_Total: {
                allTotal: '',
                De: '',
                Cr: ''
            }
        }
    },
    updated() {
        //合计
        this.DeCr_Ammount();
        //合计
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
                this.Message("至少要剩下2条记录！", 'warning');
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
        dialogAbsShow() {
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
        dialogSubShow() {
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
                    this.Message("您输入的金额不能超过10亿", 'warning');
                    item.DeCr.De_val = '';
                } else {
                    //过滤
                    item.DeCr.De_val = this.input_filter(item.DeCr.De_val)
                    //过滤
                }
            } else {
                if (this.input_filter(item.DeCr.Cr_val).replace(/[^\d]/g, '').replace(/\b(0+)/gi, '').length > 11) {
                    this.Message("您输入的金额不能超过10亿", 'warning');
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
        //输入过滤
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
                    if (index !== 0) {
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
        //keydown
        input_keydown(e, item, index, check) {
            if ((e.keyCode === 13 && e.shiftKey) || (e.keyCode === 9 && e.shiftKey)) {
                e.preventDefault();
                //shift+enter shift+tab
                this.keydown_Shift_EnterAndTab(item, index, check);
            }
            else if ((e.keyCode === 13 && !e.shiftKey) || (e.keyCode === 9 && !e.shiftKey)) {
                e.preventDefault();
                //enter tab
                this.keydown_EnterAndTab(item, index, check);
            } else if (e.keyCode === 32) {
                e.preventDefault();
                //space
                this.keydown_Space(item);
            }
        },
        //keydown
        //快捷键（space）
        keydown_Space(item) {
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
        //快捷键（space）
        //快捷键（enter tab）
        keydown_EnterAndTab(item, index, check) {
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
                        if (item.DeCr.De_val === '' && item.DeCr.Cr_val === '') {
                            item.DeCr.state = true;
                        } else {
                            item.DeCr.state = item.DeCr.De_val !== '';
                        }
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
                    if (item.DeCr.Cr_val !== '') {
                        item.DeCr.show = false;
                        this.$nextTick(() => {
                            this.$nextTick(() => {
                                if (tr[index + 1]) {
                                    tr[index + 1].abstract.show = true;
                                    if (tr[index + 1].abstract.val === '') {
                                        tr[index + 1].abstract.val = item.abstract.val !== '' ? item.abstract.val : tr[0].abstract.val;
                                    }
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
        //快捷键（enter tab）
        //快捷键（shift+enter shift+tab）
        keydown_Shift_EnterAndTab(item, index, check) {
            let tr = this.trData;
            switch (check) {
                case 1:
                    if (tr[index - 1]) {
                        item.abstract.show = false;
                        this.$nextTick(() => {
                            tr[index - 1].DeCr.state = tr[index - 1].DeCr.De_val === '' ? false : true;
                            tr[index - 1].DeCr.show = true;
                        });
                    }
                    break;
                case 2:
                    item.subject.show = false;
                    this.$nextTick(() => {
                        item.abstract.show = true;
                    });
                    break;
                case 3:
                    item.DeCr.show = false;
                    this.$nextTick(() => {
                        item.subject.show = true;
                    });
                    break;
                case 4:
                    if (item.DeCr.Cr_val === '') {
                        item.DeCr.state = true;
                        this.$nextTick(() => {
                            item.DeCr.show = true;
                        });
                    } else {
                        item.DeCr.show = false;
                        this.$nextTick(() => {
                            item.subject.show = true;
                        });
                    }
                    break;
                default:
                    break;
            }
        },
        //快捷键（shift+enter shift+tab）
        //借贷合计
        DeCr_Ammount() {
            let deammout = this.De_Ammout(),
                crammout = this.Cr_Ammout();
            if (this.input_filter(deammout === 0 ? '' : deammout + '').replace(/[^\d]/g, '').replace(/\b(0+)/gi, '').length > 11) {
                this.Message("借方的合计金额不能超过10亿，请重新输入！", 'warning');
                this.DeCr_Total.De = '';
            } else {
                this.DeCr_Total.De = this.input_filter(deammout === 0 ? '' : deammout + '');
            }
            if (this.input_filter(crammout === 0 ? '' : crammout + '').replace(/[^\d]/g, '').replace(/\b(0+)/gi, '').length > 11) {
                this.Message("贷方的合计金额不能超过10亿，请重新输入！", 'warning');
                this.DeCr_Total.Cr = '';
            } else {
                this.DeCr_Total.Cr = this.input_filter(crammout === 0 ? '' : crammout + '');
            }

            //总合计渲染
            if (deammout !== 0 && deammout === crammout) {
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
                if (item.DeCr.De_val !== "") {
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
                if (item.DeCr.Cr_val !== "") {
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
    }
}
</script>

<style>
#page_Voucher td.quantity p>.el-input .el-input__inner,
#page_Voucher td.currency p>.el-input .el-input__inner {
    border: 0;
    border-radius: 0;
    border-bottom: solid 1px rgb(191, 207, 217);
    background-color: transparent;
    padding: 3px;
}

#page_Voucher td.currency p .el-select .el-input .el-input__inner {
    background-color: transparent;
}
</style>

<style scoped>
table {
    width: 100%;
    border: 2px solid rgb(119, 119, 119);
    font-size: 14px;
    color: rgb(85, 85, 85);
}

table tr {
    position: relative;
    display: block;
    width: 100%;
    padding-left: 30px;
    float: right;
}

table th {
    height: 48px;
    line-height: 48px;
    border-bottom: 1px solid rgb(119, 119, 119);
}

table td {
    position: relative;
    line-height: 90px;
    height: 90px;
}

table tbody td {
    border-bottom: 1px solid rgb(119, 119, 119);
}

table th:not(:last-child),
table td:not(:last-child) {
    border-right: 1px solid rgb(119, 119, 119);
}

table th>div,
table th>p {
    height: 24px;
    line-height: 24px;
}

table th>div {
    box-sizing: border-box;
    border-top: 1px solid rgb(223, 230, 236);
    font-weight: normal;
}

table th>div>span,
table td>span {
    float: left;
    height: 100%;
    display: block;
    text-align: center;
}

table th>div>span:not(:first-child),
table td>span:not(:first-child) {
    box-sizing: border-box;
    border-left: 1px solid rgb(223, 230, 236);
}

table td.DeCr>span,
table td.DeCr-1>span {
    font-weight: bold;
}

table tr td.DeCr>span:nth-child(4),
table tr td.DeCr>span:nth-child(7),
table tr th.DeCr span:nth-child(4),
table tr th.DeCr span:nth-child(7),
table tr td.DeCr-1>span:nth-child(4),
table tr td.DeCr-1>span:nth-child(7),
table tr th.DeCr-1 span:nth-child(4),
table tr th.DeCr-1 span:nth-child(7) {
    border-color: rgb(153, 207, 229);
}

table tr td.DeCr>span:nth-child(10),
table tr th.DeCr span:nth-child(10),
table tr td.DeCr-1>span:nth-child(10),
table tr th.DeCr-1 span:nth-child(10) {
    border-color: rgb(237, 184, 184);
}

table tr .Negative span {
    color: rgb(221, 78, 78);
}

table .abstract {
    width: 280px;
}

table .abstract-1 {
    width: 197px;
}

table .subject {
    width: 343px;
}

table .subject-1 {
    width: 305px;
}

table .subject-2 {
    width: 294px;
}

table .quantity {
    width: 120px;
}

table .currency {
    width: 120px;
}

table .DeCr {
    width: 209px;
}

table .DeCr-1 {
    width: 154px;
}

table .total {
    width: 626px;
    padding: 0 10px;
}

table .total-1 {
    width: 736px;
    padding: 0 10px;
}

table th.DeCr>div>span,
table td.DeCr>span {
    width: 19px;
}

table th.DeCr-1>div>span,
table td.DeCr-1>span {
    width: 14px;
}

table tbody td>input[type=text] {
    display: block;
    box-sizing: border-box;
    outline: none;
    resize: none;
    border: 1px solid rgb(0, 135, 190);
    height: 90px;
    width: 100%;
    padding: 5px;
    overflow: hidden;
}

table tbody td.abstract p,
table tbody td.subject p,
table tbody td.abstract-1 p,
table tbody td.subject-1 p,
table tbody td.subject-2 p {
    padding-left: 5px;
    padding-right: 35px;
}

table tbody td.abstract input[type=text],
table tbody td.subject input[type=text] {
    padding-right: 35px;
}

table tbody td.quantity p,
table tbody td.currency p {
    padding: 0 5px;
    margin: 5px 0;
    line-height: normal;
}

table tbody td.DeCr input[type=text],
table tbody td.DeCr-1 input[type=text] {
    text-align: right;
}

table tbody tr>div.tr_option {
    display: none;
    position: absolute;
    left: 7px;
    top: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    width: 30px;
    height: 60px;
}

table tbody tr>div.tr_option .add,
table tbody tr>div.tr_option .del {
    display: block;
    width: 16px;
    height: 16px;
    margin: 0 auto;
    background: url(/static/img/page_spr_icons.png) no-repeat
}

table tbody tr>div.tr_option .add {
    position: absolute;
    top: 11px;
    background-position: -112px -96px;
}

table tbody tr>div.tr_option .del {
    position: absolute;
    bottom: 11px;
    background-position: -128px -96px;
}

table tbody tr>div.tr_option .add:hover,
table tbody tr>div.tr_option .del:hover {
    cursor: pointer;
}

table tbody td .option {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: 90px;
    width: 30px;
    text-align: center;
    color: rgb(170, 170, 170);
}

table tbody td .option:hover {
    cursor: pointer;
    color: rgb(0, 135, 190);
}

table tbody tr:hover td {
    background-color: rgb(238, 241, 246);
}

table tbody tr:hover .option,
table tbody tr:hover .tr_option {
    display: block;
}
</style>