<template>
    <table id="Voucher_table" class="fz4" cellpadding="0" cellspacing="0">

        <thead>
            <tr>
                <!--摘要-->
                <th :class="(childData.quantity || childData.currency) ? 'abstract-1' : 'abstract'">摘要</th>
                <!--会计科目-->
                <th :class="subjectClass()">会计科目</th>
                <!--数量-->
                <th class="quantity" v-if="childData.quantity">数量</th>
                <!--外币-->
                <th class="currency" v-if="childData.currency">外币</th>
                <!--借方金额-->
                <th :class="(childData.quantity && childData.currency) ? 'DeCr-1' : 'DeCr'">
                    <p>借方金额</p>
                    <div>
                        <span v-for="i in DeCr_thSpan" :key="i" class="fz6" v-text="i"></span>
                    </div>
                </th>
                <!--贷方金额-->
                <th :class="(childData.quantity && childData.currency) ? 'DeCr-1' : 'DeCr'">
                    <p>贷方金额</p>
                    <div>
                        <span v-for="i in DeCr_thSpan" :key="i" class="fz6" v-text="i"></span>
                    </div>
                </th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(item,index) in childData.trData" :key="index">
                <template>
                    <div class="tr_option">
                        <span class="add" @click.stop="addtr(index)"></span>
                        <span class="del" @click.stop="deltr(index)"></span>
                    </div>
                </template>
                <!--摘要-->
                <td :class="(childData.quantity || childData.currency) ? 'abstract-1' : 'abstract'" v-tdClick>
                    <p v-if="!item.abstract.show" v-text="item.abstract.val"></p>
                    <el-autocomplete type="text" v-model="item.abstract.val" default-first-option v-abstractEven="{item:item,index:index}" @select="abstractSelect" :fetch-suggestions="abstractSearch"></el-autocomplete>
                    <div class="option fz6" @click.stop="dialogAbsShow(index)">摘要</div>
                </td>
                <!--摘要-->
                <!--会计科目-->
                <td :class="subjectClass()" v-tdClick>
                    <p v-if="!item.subject.show" v-text="auxText(item)"></p>
                    <p v-if="item.subject.balance_show" class="fz6 balance">余额：
                        <span v-text="balanceText(item)"></span>
                    </p>
                    <el-autocomplete type="text" v-model="item.subject.val" default-first-option v-subjectEven="{item:item,index:index}" @select="subjectSelect" :fetch-suggestions="subjectSearch"></el-autocomplete>
                    <div class="option fz6" @click.stop="dialogSubShow(index)">科目</div>
                </td>
                <!--会计科目-->
                <!--数量-->
                <td class="quantity" v-if="childData.quantity">
                    <template v-if="item.quantity.show">
                        <p>
                            <el-input v-model="item.quantity.num_val" v-quantityEven="{index: index,elName: 'num_el'}" @blur="quaNumBlur(item)" :placeholder="'数量' + item.quantity.cmeasure" size="mini"></el-input>
                        </p>
                        <p>
                            <el-input v-model="item.quantity.price_val" v-quantityEven="{index: index,elName: 'price_el'}" @blur="quaPriceBlur(item)" placeholder="单价" size="mini"></el-input>
                        </p>
                    </template>
                </td>
                <!--数量-->
                <!--外币-->
                <td class="currency" v-if="childData.currency">
                    <template v-if="item.currency.show">
                        <p>
                            <el-select v-model="item.currency.currencyValue" v-currencyEven="{item: item,index: index,elName: 'sel_el'}" placeholder="请选择" size="mini" @change="curChange">
                                <el-option v-for="i in item.currency.currencyOptions" :key="i.value" :label="i.label" :value="i.value"></el-option>
                            </el-select>
                        </p>
                        <p>
                            <el-input v-model="item.currency.exchangeRate" v-currencyEven="{item: item,index: index,elName: 'ce_el'}" placeholder="汇率" size="mini" :disabled="item.currency.homeCurrency === 1"></el-input>
                        </p>
                        <p>
                            <el-input v-model="item.currency.original" v-currencyEven="{item: item,index: index,elName: 'co_el'}" placeholder="原币" size="mini" :disabled="item.currency.homeCurrency === 1"></el-input>
                        </p>
                    </template>
                </td>
                <!--外币-->
                <!--借方金额-->
                <td :class="[(childData.quantity && childData.currency) ? 'DeCr-1' : 'DeCr', isNegative(item.DeCr.De_val)]" v-tdClick>
                    <el-input type="text" v-model="item.DeCr.De_val" v-DeCrEven="{item: item,index: index,elName: 'De_el'}" @change="De_filter(item)" @focus="De_focus(item)" @blur="DeCr_blur(item)"></el-input>
                    <div class="DeCroutput">
                        <div v-for="index in 11" :key="index" class="DeCrspan">
                            <span v-if="(item.DeCr.state && !item.DeCr.show) || !item.DeCr.state" v-text="moneyRender(item.DeCr.De_val,index)"></span>
                            <span v-else></span>
                        </div>
                    </div>
                </td>
                <!--借方金额-->
                <!--贷方金额-->
                <td :class="[(childData.quantity && childData.currency) ? 'DeCr-1' : 'DeCr', isNegative(item.DeCr.Cr_val)]" v-tdClick>
                    <el-input type="text" v-model="item.DeCr.Cr_val" v-DeCrEven="{item: item,index: index,elName: 'Cr_el'}" @change="Cr_filter(item)" @focus="Cr_focus(item)" @blur="DeCr_blur(item)"></el-input>
                    <div class="DeCroutput">
                        <div v-for="index in 11" :key="index" class="DeCrspan">
                            <span v-if="(!item.DeCr.state && !item.DeCr.show) || item.DeCr.state" v-text="moneyRender(item.DeCr.Cr_val,index)"></span>
                            <span v-else></span>
                        </div>
                    </div>
                </td>
                <!--贷方金额-->
            </tr>
        </tbody>

        <tfoot>
            <tr>
                <td :class="[(childData.quantity && childData.currency) ? 'total-1' : 'total ', isNegative(childData.DeCr_Total.De)]" colspan="4">
                    <strong>合计：
                        <span v-text="childData.DeCr_Total.allTotal"></span>
                    </strong>
                </td>
                <td :class="[(childData.quantity && childData.currency) ? 'DeCr-1' : 'DeCr', isNegative(childData.DeCr_Total.De)]">
                    <div class="DeCroutput">
                        <div v-for="index in 11" :key="index" class="DeCrspan">
                            <span v-text="moneyRender(childData.DeCr_Total.De,index)"></span>
                        </div>
                    </div>
                </td>
                <td :class="[(childData.quantity && childData.currency) ? 'DeCr-1' : 'DeCr', isNegative(childData.DeCr_Total.Cr)]">
                    <div class="DeCroutput">
                        <div v-for="index in 11" :key="index" class="DeCrspan">
                            <span v-text="moneyRender(childData.DeCr_Total.Cr,index)"></span>
                        </div>
                    </div>
                </td>
            </tr>
        </tfoot>

    </table>
</template>

<script>
export default {
    name: 'voucher-table',
    props: ['childData', 'abstractData'],
    directives: {

        //td指令
        tdClick: {
            unbind: function(el) {
                $(el).off();
            },
            inserted: function(el, binding, vnode) {
                $(el).on('click', function() {
                    $(this).find('input').eq(0).focus();
                });
            }
        },

        //数量指令
        quantityEven: {
            unbind: function(el) {
                $(el).off();
            },
            inserted: function(el, binding, vnode) {
                let Vue = vnode.context,
                    val = binding.value;
                Vue.childData.trData[val.index].quantity[val.elName] = el;
                $(el).find('input').on('keydown', function(e) {
                    if ((e.keyCode === 13 && e.shiftKey) || (e.keyCode === 9 && e.shiftKey)) {
                        e.preventDefault();
                        Vue.prevInput(el);
                    } else if ((e.keyCode === 13 && !e.shiftKey) || (e.keyCode === 9 && !e.shiftKey)) {
                        e.preventDefault();
                        Vue.nextInput(el);
                    }
                });
            }
        },
        //数量指令

        //外币指令
        currencyEven: {
            unbind: function(el) {
                $(el).off();
            },
            inserted: function(el, binding, vnode) {
                let Vue = vnode.context,
                    val = binding.value;
                Vue.childData.trData[val.index].currency[val.elName] = el;
                $(el).on('click', function(e) {
                    Vue.nowEditindex = val.index;
                    Vue.getNowEditindex(Vue.nowEditindex);
                }).find('input').on('focus', function(e) {
                    Vue.nowEditindex = val.index;
                    Vue.getNowEditindex(Vue.nowEditindex);
                }).on('keydown', function(e) {
                    if ((e.keyCode === 13 && e.shiftKey) || (e.keyCode === 9 && e.shiftKey)) {
                        e.preventDefault();
                        Vue.prevInput(el);
                    } else if ((e.keyCode === 13 && !e.shiftKey) || (e.keyCode === 9 && !e.shiftKey)) {
                        e.preventDefault();
                        Vue.nextInput(el);
                    }
                });
            }
        },
        //外币指令

        //摘要指令
        abstractEven: {
            unbind: function(el) {
                $(el).off();
            },
            inserted: function(el, binding, vnode) {
                let Vue = vnode.context,
                    val = binding.value;
                Vue.childData.trData[val.index].abstract.el = el;
                $(el).find('input').on('input', function(e) {
                    Vue.abstract_change(val.item, val.index);
                }).on('focus', function(e) {
                    $(this).select();
                    Vue.nowEditindex = val.index;
                    Vue.getNowEditindex(Vue.nowEditindex);
                    Vue.abstract_focus(val.item, val.index);
                }).on('blur', function(e) {
                    Vue.abstract_blur(val.item, val.index);
                }).on('keydown', function(e) {
                    if ((e.keyCode === 13 && e.shiftKey) || (e.keyCode === 9 && e.shiftKey)) {
                        e.preventDefault();
                        let lastitem = Vue.childData.trData[val.index - 1];
                        if (lastitem) {
                            if (lastitem.DeCr.De_val !== '') {
                                $(lastitem.DeCr.De_el).find('input').focus();
                            } else {
                                Vue.prevInput(el);
                            }
                        }
                    } else if ((e.keyCode === 13 && !e.shiftKey) || (e.keyCode === 9 && !e.shiftKey)) {
                        e.preventDefault();
                        Vue.nextInput(el);
                    }
                });
            }
        },
        //摘要指令

        //科目指令
        subjectEven: {
            unbind: function(el) {
                $(el).off();
            },
            inserted: function(el, binding, vnode) {
                let Vue = vnode.context,
                    val = binding.value;
                Vue.childData.trData[val.index].subject.el = el;
                $(el).find('input').on('input', function(e) {
                    if (!Vue.subjectCheck(val.item.subject.val)) {
                        let sval = val.item.subject.val;
                        Vue.subClear(val.item);
                        val.item.subject.val = sval;
                    }
                }).on('focus', function(e) {
                    $(this).select();
                    Vue.nowEditindex = val.index;
                    Vue.getNowEditindex(Vue.nowEditindex);
                    Vue.subject_focus(val.item, val.index);
                }).on('blur', function(e) {
                    Vue.subject_blur(val.item, val.index);
                }).on('keydown', function(e) {
                    if ((e.keyCode === 13 && e.shiftKey) || (e.keyCode === 9 && e.shiftKey)) {
                        e.preventDefault();
                        Vue.prevInput(el);
                    } else if ((e.keyCode === 13 && !e.shiftKey) || (e.keyCode === 9 && !e.shiftKey)) {
                        e.preventDefault();
                        if (val.item.isaux) {
                            Vue.dialogAuxShow(val.item.subject.auxData);
                        } else {
                            Vue.nextInput(el);
                        }
                    }
                });
            }
        },
        //科目指令

        //借贷指令
        DeCrEven: {
            unbind: function(el) {
                $(el).off();
            },
            inserted: function(el, binding, vnode) {
                let Vue = vnode.context,
                    val = binding.value;
                Vue.childData.trData[val.index].DeCr[val.elName] = el;
                $(el).find('input').on('keydown', function(e) {
                    if (e.keyCode === 32) {
                        e.preventDefault();
                        Vue.kd_Space(val.item, val.index);//space
                    } else if ((e.keyCode === 13 && e.shiftKey) || (e.keyCode === 9 && e.shiftKey)) {
                        e.preventDefault();
                        if (val.item.DeCr.state) {
                            Vue.prevInput(el);
                        } else {
                            if (val.item.DeCr.Cr_val !== '') {
                                Vue.prevInput(val.item.DeCr.De_el);
                            } else {
                                Vue.prevInput(el);
                            }
                        }
                    } else if ((e.keyCode === 13 && !e.shiftKey) || (e.keyCode === 9 && !e.shiftKey)) {
                        e.preventDefault();
                        if (val.item.DeCr.state) {
                            if (val.item.DeCr.De_val !== '') {
                                if (Vue.childData.trData[val.index + 1]) {
                                    $(Vue.childData.trData[val.index + 1].abstract.el).find('input').focus();
                                } else {
                                    Vue.nextInput(el);
                                }
                            } else {
                                Vue.nextInput(el);
                            }
                        } else {
                            if (val.item.DeCr.Cr_val !== '' || val.item.DeCr.De_val !== '') {
                                Vue.nextInput(el);
                            }
                        }
                    }
                });
            }
        },
        //借贷指令
    },
    data() {
        return {
            DeCr_thSpan: ['亿', '千', '百', '十', '万', '千', '百', '十', '元', '角', '分'],
            nowEditindex: ''
        }
    },
    updated() {
        this.DeCr_Ammount();
    },
    methods: {

        //会计科目class
        subjectClass() {
            let q = this.childData.quantity,
                c = this.childData.currency;
            if (q && c) {
                return 'subject-2';
            } else if (q || c) {
                return 'subject-1';
            } else {
                return 'subject';
            }
        },
        //会计科目class

        //科目辅助核算拼接
        auxText(item) {
            let txt = item.subject.val;
            item.subject.auxData.forEach((n, i) => {
                n.options.forEach((n1, i1) => {
                    if (n.value === n1.uid) {
                        txt += '_' + n1.name;
                    }
                });
            });
            return txt;
        },
        //科目辅助核算拼接

        //科目余额拼接
        balanceText(item) {
            let result = '',
                bal = parseFloat(item.subject.balance_val);
            if (item.currency.show) {
                //数量核算和外币核算
                if (item.subject.DeCr_direction) {
                    //借方向
                    result = item.DeCr.state ? bal + parseFloat(item.currency.original === '' ? 0 : item.currency.original) : bal - parseFloat(item.currency.original === '' ? 0 : item.currency.original);
                } else {
                    //贷方向
                    result = item.DeCr.state ? bal - parseFloat(item.currency.original === '' ? 0 : item.currency.original) : bal + parseFloat(item.currency.original === '' ? 0 : item.currency.original);
                }
            } else {
                if (item.subject.DeCr_direction) {
                    //借方向
                    result = item.DeCr.state ? bal + parseFloat(item.DeCr.De_val === '' ? 0 : item.DeCr.De_val) : bal - parseFloat(item.DeCr.Cr_val === '' ? 0 : item.DeCr.Cr_val);
                } else {
                    //贷方向
                    result = item.DeCr.state ? bal - parseFloat(item.DeCr.De_val === '' ? 0 : item.DeCr.De_val) : bal + parseFloat(item.DeCr.Cr_val === '' ? 0 : item.DeCr.Cr_val);
                }
            }
            item.subject.realBalance = result;
            return result;
        },
        //科目余额拼接

        //是否为负数
        isNegative(a) {
            return parseFloat(a) < 0 ? 'Negative' : '';
        },
        //是否为负数

        //金额渲染
        moneyRender(a, b) {
            if (a === '0') {
                let arr = a.split('');
                return arr[1 - (12 - b)];
            } else {
                let arr = a.replace(/[^\d]/g, '').replace(/\b(0+)/gi, '').split('');
                let l = arr.length;
                return l !== 0 ? arr[l - (12 - b)] : '';
            }
        },
        //金额渲染

        //添加行
        addtr(n) {
            this.$emit('addtr', n);
        },
        //添加行

        //删除行
        deltr(n) {
            this.$emit('deltr', n);
        },
        //删除行

        //打开摘要库
        dialogAbsShow(i) {
            this.$emit('dialogAbsShow', i);
        },
        //打开摘要库

        //打开科目树
        dialogSubShow(i) {
            this.$emit('dialogSubShow', i);
        },
        //打开科目树

        //打开辅助核算
        dialogAuxShow(i) {
            this.$emit('dialogAuxShow', i);
        },
        //打开辅助核算

        //摘要输入
        abstract_change(item, index) {
            let tr = this.childData.trData;
            switch (item.abstract.val) {
                case '//':
                    item.abstract.val = index === 0 ? '' : tr[0].abstract.val;
                    break;
                case '..':
                    item.abstract.val = tr[index - 1] ? tr[index - 1].abstract.val : '';
                    break;
                default:
                    break;
            }
        },
        //摘要输入
        //摘要聚焦
        abstract_focus(item, index) {
            let data = this.childData.trData;
            data.forEach((n, i) => {
                n.DeCr.show = false;
                n.abstract.show = false;
                n.subject.show = false;
            });
            item.abstract.show = true;
            if (data[index - 1] && data[index - 1].abstract.val !== '' && item.abstract.val === '') {
                item.abstract.val = data[index - 1].abstract.val;
            }
        },
        //摘要聚焦
        //摘要失焦
        abstract_blur(item, index) {
            item.abstract.show = false;
        },
        //摘要失焦
        //摘要搜索
        abstractSearch(queryString, callback) {
            let abs = this.abstractData;
            let results = queryString ? abs.filter(this.abstractFilter(queryString)) : abs;
            results.forEach((n, i) => {
                n.value = n.digestText;
            });
            callback(results);
        },
        abstractFilter(queryString) {
            return (res) => {
                return (res.digestText.indexOf(queryString.toLowerCase()) !== -1);
            };
        },
        //摘要搜索
        //摘要选择
        abstractSelect(item) {
            let thisitem = this.childData.trData[this.nowEditindex];
            this.$nextTick(() => {
                this.nextInput(thisitem.abstract.el);
            });
        },
        //摘要选择


        //科目聚焦
        subject_focus(item, index) {
            this.childData.trData.forEach((n, i) => {
                n.DeCr.show = false;
                n.abstract.show = false;
                n.subject.show = false;
            });
            item.subject.show = true;
        },
        //科目聚焦
        //科目失焦
        subject_blur(item, index) {
            item.subject.show = false;
            if (!this.subjectCheck(item.subject.val)) {
                this.subClear(item);
            }
        },
        //科目失焦
        //清空科目数据
        subClear(item) {
            this.$emit('subClear', item);
        },
        //清空科目数据
        //科目搜索
        subjectSearch(queryString, callback) {
            let sub = this.$store.state.subjectList;
            let results = queryString ? sub.filter(this.subjectFilter(queryString)) : sub;
            callback(results);
        },
        subjectFilter(queryString) {
            return (res) => {
                return (res.value.indexOf(queryString.toLowerCase()) === 0);
            };
        },
        //科目搜索
        //科目选择
        subjectSelect(data) {
            let item = this.childData.trData[this.nowEditindex];
            item.subject.id = data.id;
            switch (data.accountProperty) {
                case '借':
                    item.subject.DeCr_direction = true;
                    break;
                case '贷':
                    item.subject.DeCr_direction = false;
                    break;
                default:
                    break;
            }
            this.auxCheck(item, data);
            this.$nextTick(() => {
                if (!item.isaux) {
                    this.nextInput(item.subject.el);
                    this.getBalance(item);
                } else {
                    this.dialogAuxShow(item.subject.auxData);
                }
            });
        },
        //科目选择
        //获取会计科目余额
        getBalance(item) {
            this.$emit('getBalance', item);
        },
        //获取会计科目余额
        //科目检索
        subjectCheck(text) {
            let result;
            this.$store.state.subjectList.forEach((n, i) => {
                if (text === n.value) {
                    result = n;
                }
            });
            return result;
        },
        //科目检索
        //辅助核算检测
        auxCheck(item, sel) {
            let data = [item, sel];
            this.$emit('auxCheck', data);
        },
        //辅助核算检测

        //数量失焦
        quaNumBlur(item) {
            //数量
            item.quantity.num_val = this.floatFilter(item.quantity.num_val);
            if (item.currency.show) {
                //数量核算和外币核算同时存在
                this.quaCountBoth(item);
            } else {
                //只有数量核算
                this.quaCount(item);
            }
        },
        quaPriceBlur(item) {
            //单价
            item.quantity.price_val = this.moneyFilter(item.quantity.price_val);
            if (item.currency.show) {
                //数量核算和外币核算同时存在
                this.quaCountBoth(item);
            } else {
                //只有数量核算
                this.quaCount(item);
            }
        },
        //数量失焦
        //计算数量核算结果
        quaCount(item) {
            let qn = item.quantity.num_val,
                qp = item.quantity.price_val;
            if (qn !== '' && qp !== '') {
                if (item.DeCr.state) {
                    item.DeCr.De_val = (parseFloat(qn) * parseFloat(qp)).toFixed(2) + '';
                    item.DeCr.Cr_val = '';
                } else {
                    item.DeCr.De_val = '';
                    item.DeCr.Cr_val = (parseFloat(qn) * parseFloat(qp)).toFixed(2) + '';
                }
            }
        },
        quaCountBoth(item) {
            let qn = item.quantity.num_val,
                qp = item.quantity.price_val;
            if (qn !== '' && qp !== '') {
                item.currency.original = this.moneyFilter((parseFloat(qn) * parseFloat(qp)).toFixed(2) + '');
                if (item.currency.exchangeRate !== '') {
                    let co = item.currency.original,
                        ce = item.currency.exchangeRate;
                    if (item.DeCr.state) {
                        item.DeCr.De_val = (parseFloat(co) * parseFloat(ce)).toFixed(2) + '';
                        item.DeCr.Cr_val = '';
                    } else {
                        item.DeCr.De_val = '';
                        item.DeCr.Cr_val = (parseFloat(co) * parseFloat(ce)).toFixed(2) + '';
                    }
                }
            }
        },
        //计算数量核算结果

        //外币失焦
        curExchangeRateBlur(item) {
            //汇率
            item.currency.exchangeRate = this.floatFilter(item.currency.exchangeRate);
            if (item.quantity.show) {
                //数量核算和外币核算同时存在
                this.curCountBoth(item);
            } else {
                //只有外币核算
                this.curCount(item);
            }
        },
        curOriginalBlur(item) {
            //原币
            item.currency.original = this.moneyFilter(item.currency.original);
            if (item.quantity.show) {
                //数量核算和外币核算同时存在
                this.curCountBoth(item);
            } else {
                //只有外币核算
                this.curCount(item);
            }
        },
        //外币失焦
        //外币选择
        curChange(value) {
            let item = this.childData.trData[this.nowEditindex];
            item.currency.currencyOptions.forEach((n, i) => {
                if (value === n.value) {
                    item.currency.exchangeRate = n.exchangeRate;
                    item.currency.homeCurrency = n.homeCurrency;
                }
            });
            this.getBalance(item);
            this.curCount(item);
            this.nextInput(item.currency.sel_el);
        },
        //外币选择
        //计算外币核算结果
        curCount(item) {
            let ce = item.currency.exchangeRate,
                co = item.currency.original;
            if (ce !== '' && co !== '') {
                if (item.DeCr.state) {
                    item.DeCr.De_val = (parseFloat(ce) * parseFloat(co)).toFixed(2) + '';
                    item.DeCr.Cr_val = '';
                } else {
                    item.DeCr.De_val = '';
                    item.DeCr.Cr_val = (parseFloat(ce) * parseFloat(co)).toFixed(2) + '';
                }
            }
        },
        curCountBoth(item) {
            let qn = item.quantity.num_val,
                qp = item.quantity.price_val,
                ce = item.currency.exchangeRate,
                co = item.currency.original;
            if (ce !== '' && co !== '') {
                if (item.DeCr.state) {
                    item.DeCr.De_val = (parseFloat(ce) * parseFloat(co)).toFixed(2) + '';
                    item.DeCr.Cr_val = '';
                } else {
                    item.DeCr.De_val = '';
                    item.DeCr.Cr_val = (parseFloat(ce) * parseFloat(co)).toFixed(2) + '';
                }
                if (qn !== '') {
                    item.quantity.price_val = this.moneyFilter((parseFloat(co) / parseFloat(qn)).toFixed(2) + '');
                } else {
                    item.quantity.price_val = '';
                }
            }
        },
        //计算外币核算结果

        floatFilter(str) {
            var str1, str2, result;
            if (str === '' || parseFloat(str) === 0 || isNaN(parseFloat(str))) {
                result = '';
            } else {
                if (str.indexOf(".") === -1) {
                    str = str.replace(/[^\d]/g, '').replace(/\b(0+)/gi, '');
                    result = str;
                } else {
                    str1 = str.substring(0, str.indexOf('.')).replace(/[^\d]/g, '').replace(/\b(0+)/gi, '');
                    str2 = str.substring(str.indexOf('.') + 1, str.length).replace(/[^\d]/g, '');
                    if (str1 === '') {
                        if (parseFloat(str2) === 0 || str2 === '') {
                            result = '';
                        } else {
                            result = ('0.' + str2).replace(/0+?$/, '');
                        }
                    } else {
                        if (parseFloat(str2) === 0 || str2 === '') {
                            result = str1;
                        } else {
                            result = (str1 + '.' + str2).replace(/0+?$/, '');
                        }
                    }
                }
            }
            return result;
        },

        moneyFilter(str) {
            var str1, str2, result;
            if (str === '' || parseFloat(str) === 0 || isNaN(parseFloat(str))) {
                result = '';
            } else {
                if (str.indexOf(".") === -1) {
                    str = str.replace(/[^\d]/g, '').replace(/\b(0+)/gi, '');
                    result = str + '.00';
                } else {
                    str1 = str.substring(0, str.indexOf('.')).replace(/[^\d]/g, '').replace(/\b(0+)/gi, '');
                    str2 = this.countnum(str.substring(str.indexOf('.') + 1, str.length).replace(/[^\d]/g, ''));
                    if (str1 === '') {
                        if (parseFloat(str2) === 0) {
                            result = '';
                        } else {
                            result = '0.' + str2;
                        }
                    } else {
                        if (parseFloat(str2) === 0) {
                            result = str1 + '.00';
                        } else {
                            result = str1 + '.' + str2;
                        }
                    }
                }
            }
            return result;
        },

        //借贷输入
        De_filter(item) {
            item.DeCr.Cr_val = '';
            if (item.DeCr.De_val === '=' || item.DeCr.De_val.indexOf('=') >= 0) {
                this.$nextTick(() => {
                    item.DeCr.De_val = '';
                    let deammout = this.De_Ammout().toFixed(4),
                        crammout = this.Cr_Ammout().toFixed(4);
                    item.DeCr.De_val = (((crammout * 10000) - (deammout * 10000)) / 10000) + '';
                });
            }
        },

        Cr_filter(item) {
            item.DeCr.De_val = '';
            if (item.DeCr.Cr_val === '=' || item.DeCr.Cr_val.indexOf('=') >= 0) {
                this.$nextTick(() => {
                    item.DeCr.Cr_val = '';
                    let deammout = this.De_Ammout().toFixed(4),
                        crammout = this.Cr_Ammout().toFixed(4);
                    item.DeCr.Cr_val = (((deammout * 10000) - (crammout * 10000)) / 10000) + '';
                });
            }
        },
        //借贷输入

        //借贷聚焦
        De_focus(item) {
            item.DeCr.state = true;
            this.childData.trData.forEach((n, i) => {
                n.DeCr.show = false;
                n.abstract.show = false;
                n.subject.show = false;
            });
            item.DeCr.show = true;
            this.$nextTick(() => {
                $(item.DeCr.De_el).find('input').select();
            });
        },
        Cr_focus(item) {
            item.DeCr.state = false;
            this.childData.trData.forEach((n, i) => {
                n.DeCr.show = false;
                n.abstract.show = false;
                n.subject.show = false;
            });
            item.DeCr.show = true;
            this.$nextTick(() => {
                $(item.DeCr.Cr_el).find('input').select();
            });
        },
        //借贷聚焦
        //借贷失焦
        DeCr_blur(item) {
            item.DeCr.show = false;
            item.DeCr.state = (item.DeCr.Cr_val === '');
            //判断过滤
            this.DeCr_filter(item);
            //合计
            this.DeCr_Ammount();
            //计算数量核算或外币核算
            if (item.quantity.show && item.currency.show) {
                this.DeCr_CountBoth(item);
            } else if (item.quantity.show) {
                //只有数量核算
                this.DeCr_quaCount(item);
            } else if (item.currency.show) {
                //只有外币核算
                this.DeCr_curCount(item);
            }
        },
        //借贷失焦

        DeCr_quaCount(item) {
            let qn = item.quantity.num_val,
                qp = item.quantity.price_val,
                val = item.DeCr.state ? item.DeCr.De_val : item.DeCr.Cr_val;
            if (qn !== '') {
                item.quantity.price_val = this.moneyFilter((parseFloat(val) / parseFloat(qn)).toFixed(2) + '');
            } else if (qp !== '') {
                item.quantity.num_val = this.floatFilter((parseFloat(val) / parseFloat(qp)).toFixed(2) + '');
            }
        },
        DeCr_curCount(item) {
            let ce = item.currency.exchangeRate,
                co = item.currency.original,
                val = item.DeCr.state ? item.DeCr.De_val : item.DeCr.Cr_val;
            if (ce !== '') {
                item.currency.original = this.moneyFilter((parseFloat(val) / parseFloat(ce)).toFixed(2) + '');
            } else if (co !== '') {
                item.currency.exchangeRate = this.floatFilter((parseFloat(val) / parseFloat(co)).toFixed(2) + '');
            }
        },
        DeCr_CountBoth(item) {
            let ce = item.currency.exchangeRate,
                co = item.currency.original,
                val = item.DeCr.state ? item.DeCr.De_val : item.DeCr.Cr_val;
            if (ce === '' && co === '') {
                this.Message('汇率为空，无法计算原币！', 'warning');
            } else if (ce !== '') {
                item.currency.original = this.moneyFilter((parseFloat(val) / parseFloat(ce)).toFixed(2) + '');
                if (item.quantity.num_val !== '') {
                    let qn = item.quantity.num_val,
                        qp = item.quantity.price_val;
                    item.quantity.price_val = this.moneyFilter((parseFloat(item.currency.original) / parseFloat(qn)).toFixed(2) + '');
                }
            } else if (co !== '') {
                item.currency.exchangeRate = this.floatFilter((parseFloat(val) / parseFloat(co)).toFixed(2) + '');
            }
        },

        //借贷切换
        kd_Space(item, index) {
            item.DeCr.state = !item.DeCr.state;
            let De = item.DeCr.De_val;
            let Cr = item.DeCr.Cr_val;
            item.DeCr.De_val = Cr;
            item.DeCr.Cr_val = De;
            this.DeCr_filter(item);
            this.$nextTick(() => {
                item.DeCr.show = true;
                if (item.DeCr.state) {
                    $(item.DeCr.De_el).find('input').focus();
                } else {
                    $(item.DeCr.Cr_el).find('input').focus();
                }
            });
        },
        //借贷切换

        //输入过滤
        DeCr_filter(item) {
            if (item.DeCr.state) {
                if (this.DeCr_moneyFilter(item.DeCr.De_val).replace(/[^\d]/g, '').replace(/\b(0+)/gi, '').length > 11) {
                    this.Message("您输入的金额不能超过10亿", 'warning');
                    item.DeCr.De_val = '';
                } else {
                    //过滤
                    item.DeCr.De_val = this.DeCr_moneyFilter(item.DeCr.De_val);
                    //过滤
                }
            } else if (!item.DeCr.state) {
                if (this.DeCr_moneyFilter(item.DeCr.Cr_val).replace(/[^\d]/g, '').replace(/\b(0+)/gi, '').length > 11) {
                    this.Message("您输入的金额不能超过10亿", 'warning');
                    item.DeCr.Cr_val = '';
                } else {
                    //过滤
                    item.DeCr.Cr_val = this.DeCr_moneyFilter(item.DeCr.Cr_val);
                    //过滤
                }
            }
        },
        DeCr_moneyFilter(str) {
            var str1, str2, result, negative = parseFloat(str) < 0 ? true : false;
            if (str === '' || parseFloat(str) === 0 || isNaN(parseFloat(str))) {
                result = '';
            } else {
                if (str.indexOf(".") === -1) {
                    str = str.replace(/[^\d]/g, '').replace(/\b(0+)/gi, '') + '.00';
                    result = str;
                } else {
                    str1 = str.substring(0, str.indexOf('.')).replace(/[^\d]/g, '').replace(/\b(0+)/gi, '');
                    str2 = str.substring(str.indexOf('.') + 1, str.length).replace(/[^\d]/g, '').substring(0, 3);
                    if (str2.length === 3) {
                        let strlast = parseInt(str2.substring(2, 3));
                        if (strlast <= 4) {
                            str2 = str2.substring(0, 2);
                        } else if (strlast >= 5) {
                            str2 = parseInt(str2.substring(0, 2)) + 1 + '';
                        }
                    } else {
                        str2 = this.countnum(str2);
                    }
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
        countnum(str) {
            let l = str.length;
            switch (l) {
                case 0:
                    str += '00';
                    break;
                case 1:
                    str += '0';
                    break;
                default:
                    break;
            }
            return str;
        },
        //输入过滤

        //借贷合计
        DeCr_Ammount() {
            let data = this.childData,
                deammout = this.De_Ammout(),
                crammout = this.Cr_Ammout();
            if (this.DeCr_moneyFilter(deammout === 0 ? '' : deammout + '').replace(/[^\d]/g, '').replace(/\b(0+)/gi, '').length > 11) {
                this.Message("借方的合计金额不能超过10亿，请重新输入！", 'warning');
                data.DeCr_Total.De = '';
            } else {
                data.DeCr_Total.De = this.DeCr_moneyFilter(deammout === 0 ? '' : deammout + '');
            }
            if (this.DeCr_moneyFilter(crammout === 0 ? '' : crammout + '').replace(/[^\d]/g, '').replace(/\b(0+)/gi, '').length > 11) {
                this.Message("贷方的合计金额不能超过10亿，请重新输入！", 'warning');
                data.DeCr_Total.Cr = '';
            } else {
                data.DeCr_Total.Cr = this.DeCr_moneyFilter(crammout === 0 ? '' : crammout + '');
            }
            //总合计渲染
            if (deammout !== 0 && deammout === crammout) {
                data.DeCr_Total.allTotal = this.toCapital(deammout);
            } else {
                data.DeCr_Total.allTotal = '';
            }
            //总合计渲染
        },
        //借贷合计

        //借方金额求和
        De_Ammout() {
            let de_ammout = 0;
            this.childData.trData.forEach(function(item, index) {
                if (item.DeCr.De_val !== "") {
                    de_ammout += parseFloat(item.DeCr.De_val) * 10000;
                }
            });
            return de_ammout / 10000;
        },
        //借方金额求和

        //贷方金额求和
        Cr_Ammout() {
            let cr_ammout = 0;
            this.childData.trData.forEach(function(item, index) {
                if (item.DeCr.Cr_val !== "") {
                    cr_ammout += parseFloat(item.DeCr.Cr_val) * 10000;
                }
            });
            return cr_ammout / 10000;
        },
        //贷方金额求和

        //中文大写
        toCapital(n) {
            let fraction = ['角', '分'];
            let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
            let unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
            let head = n < 0 ? '欠' : '';
            n = Math.abs(n);
            let s = '';
            for (let i = 0, l = fraction.length; i < l; i++) {
                s += (digit[Math.floor(n * 10000 * Math.pow(10, i) / 1000) % 10] + fraction[i]).replace(/零./, '');
            }
            s = s || '整';
            n = Math.floor(n);
            for (let i = 0, l = unit[0].length; i < l && n > 0; i++) {
                let p = '';
                for (let j = 0, jl = unit[1].length; j < jl && n > 0; j++) {
                    p = digit[n % 10] + unit[1][j] + p;
                    n = Math.floor(n / 10);
                }
                s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
            }
            return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
        },
        //中文大写

        prevInput(el) {
            this.$emit('prevInput', el);
        },
        //选择下一个input框
        nextInput(el) {
            this.$emit('nextInput', el);
        },
        //选择下一个input框

        //获取当前编辑的index
        getNowEditindex(a) {
            this.$emit('getNowEditindex', a);
        },
        //获取当前编辑的index
    }
}
</script>

<style lang="scss">
$primary: rgb(0, 135, 190);
$primary-dark: rgb(0, 120, 165);
table#Voucher_table {
    tbody {
        tr {
            td {
                >.el-autocomplete {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    display: block;
                    height: 80px;
                    width: 100%;
                    overflow: hidden;
                    .el-input {
                        height: 100%;
                        input[type=text] {
                            height: 100%;
                            opacity: 0;
                            &:focus {
                                opacity: 1;
                            }
                        }
                    }
                }
                >.el-input {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    display: block;
                    height: 80px;
                    width: 100%;
                    overflow: hidden;
                    z-index: 1;
                    input[type=text] {
                        height: 100%;
                        opacity: 0;
                        &:focus {
                            opacity: 1;
                        }
                    }
                }
                &.DeCr,
                &.DeCr-1 {
                    .el-input input[type=text] {
                        font-size: 20px;
                        text-align: right;
                    }
                }
                &.abstract,
                &.abstract-1 {
                    .el-input input[type=text] {
                        padding-right: 45px;
                    }
                    p {
                        word-break: break-all;
                        box-sizing: border-box;
                        line-height: normal;
                        padding: 3px 45px 3px 10px;
                    }
                }
                &.subject,
                &.subject-1,
                &.subject-2 {
                    .el-input input[type=text] {
                        padding-right: 45px;
                    }
                    p {
                        word-break: break-all;
                        box-sizing: border-box;
                        line-height: normal;
                        padding: 3px 45px 3px 10px;
                    }
                }
            }
        }
    }
}
</style>


<style lang="scss" scoped>
$primary: rgb(0, 135, 190);
$primary-dark: rgb(0, 120, 165);
$table-border: rgb(119, 119, 119);
$table-inner-border: rgb(223, 230, 236);
$table-color: rgb(85, 85, 85);
$DeCr-span-blue: rgb(153, 207, 229);
$DeCr-span-red: rgb(237, 184, 184);
$option: rgb(191, 207, 217);
table {
    width: 100%;
    border: 2px solid $table-border;
    color: $table-color;

    tr {
        position: relative;
        display: block;
        width: 100%;
        padding-left: 30px;
        float: right;
        .tr_option {
            display: none;
            position: absolute;
            left: 5px;
            top: 50%;
            margin-top: -40px;
            text-align: center;
            width: 30px;
            height: 80px;
            .add,
            .del {
                position: absolute;
                display: block;
                width: 20px;
                height: 20px;
                margin: 0 auto;
                &:hover {
                    cursor: pointer;
                }
            }
            .add {
                top: 17px;
                background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB0PSIxNTAyOTQ5NjU1NTE5IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiBwLWlkPSI4ODYiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiLz48L2RlZnM+PHBhdGggZD0iTTUxMiA5NTguMDE2NjExYy0xMTkuNjQ4NDM0IDAtMjMyLjEyODgtNDYuMzY3OTYxLTMxNi43MzY3ODMtMTMwLjU1OTY1Ni04NC42NDA2NjctODQuMjU1MzQyLTEzMS4yNjMyMTctMTk2LjI1NTc3Mi0xMzEuMjYzMjE3LTMxNS40NTUyMzUgMC0xMTkuMTY4NDk5IDQ2LjYyNDI3MS0yMzEuMTk5ODkyIDEzMS4yMzIyNTQtMzE1LjQyNDI3MSA4NC42MDc5ODMtODQuMTkxNjk1IDE5Ny4wODgzNDgtMTMwLjU1OTY1NiAzMTYuNzM2NzgzLTEzMC41NTk2NTZzMjMyLjEyODggNDYuMzY3OTYxIDMxNi43MDQwOTkgMTMwLjU1OTY1NmM4NC42NzE2MyA4NC4yMjQzNzggMTMxLjI2MzIxNyAxOTYuMjU1NzcyIDEzMS4yNjMyMTcgMzE1LjM5MTU4NyAwLjAzMjY4NCAxMTkuMTk5NDYyLTQ2LjU5MTU4NyAyMzEuMjMyNTc2LTEzMS4yNjMyMTcgMzE1LjQ1NTIzNUM3NDQuMTI4OCA5MTEuNjE1OTY2IDYzMS42NDg0MzQgOTU4LjAxNjYxMSA1MTIgOTU4LjAxNjYxMXpNNTEyIDEyOS45ODMzODljLTEwMi42MjM2MjYgMC0xOTkuMDcxNzM4IDM5Ljc0MzQ3NS0yNzEuNTgzMjgyIDExMS45MzY3ODMtNzIuNDgwNTgxIDcyLjEyNzk0LTExMi40MTY3MTggMTY4LjA2MzQzMi0xMTIuNDE2NzE4IDI3MC4wNzk4MjhzMzkuOTAzNDU0IDE5Ny45NTE4ODggMTEyLjM4NDAzNCAyNzAuMDQ3MTQ0YzcyLjUxMTU0NCA3Mi4xOTE1ODcgMTY4Ljk1OTY1NiAxMTEuOTM2NzgzIDI3MS41ODMyODIgMTExLjkzNjc4MyAxMDIuNTkyNjYyIDAgMTk5LjA3MTczOC0zOS43NDM0NzUgMjcxLjU4MzI4Mi0xMTEuOTM2NzgzIDcyLjQ4MDU4MS03Mi4xNjA2MjQgMTEyLjQxNjcxOC0xNjguMDYzNDMyIDExMi4zODQwMzQtMjcwLjA3OTgyOCAwLTEwMi4wMTYzOTYtMzkuOTAzNDU0LTE5Ny45MTkyMDQtMTEyLjM4NDAzNC0yNzAuMDE2MTgxQzcxMS4wNzE3MzggMTY5Ljc1OTU0OCA2MTQuNTkyNjYyIDEyOS45ODMzODkgNTEyIDEyOS45ODMzODl6IiBmaWxsPSIjYmZjZmQ5IiBwLWlkPSI4ODciLz48cGF0aCBkPSJNNzM2LjAwMDg2IDQ4MC4wMDA4NiA1NDQuMDAwODYgNDgwLjAwMDg2IDU0NC4wMDA4NiAyODguMDAwODZjMC0xNy42NjQ3MjItMTQuMzM2MTM4LTMyLjAwMDg2LTMyLjAwMDg2LTMyLjAwMDg2cy0zMi4wMDA4NiAxNC4zMzYxMzgtMzIuMDAwODYgMzIuMDAwODZsMCAxOTJMMjg4LjAwMDg2IDQ4MC4wMDA4NmMtMTcuNjY0NzIyIDAtMzIuMDAwODYgMTQuMzM2MTM4LTMyLjAwMDg2IDMyLjAwMDg2czE0LjMzNjEzOCAzMi4wMDA4NiAzMi4wMDA4NiAzMi4wMDA4NmwxOTIgMCAwIDE5MmMwIDE3LjY5NTY4NiAxNC4zMzYxMzggMzIuMDAwODYgMzIuMDAwODYgMzIuMDAwODZzMzIuMDAwODYtMTQuMzAzNDU0IDMyLjAwMDg2LTMyLjAwMDg2TDU0NC4wMDI1OCA1NDQuMDAwODZsMTkyIDBjMTcuNjk1Njg2IDAgMzIuMDAwODYtMTQuMzM2MTM4IDMyLjAwMDg2LTMyLjAwMDg2Uzc1My42OTY1NDYgNDgwLjAwMDg2IDczNi4wMDA4NiA0ODAuMDAwODZ6IiBmaWxsPSIjYmZjZmQ5IiBwLWlkPSI4ODgiLz48L3N2Zz4=') no-repeat;
                background-size: 100% 100%;
                &:hover {
                    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB0PSIxNTAyOTQ5MjAwMjAyIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiBwLWlkPSI5MzEiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiLz48L2RlZnM+PHBhdGggZD0iTTgyOC43MDQwOTkgMTk2LjU3NTcyOUM3NDQuMDk2MTE2IDExMi4zODQwMzQgNjMxLjY0ODQzNCA2Ni4wMTYwNzMgNTEyIDY2LjAxNjA3M3MtMjMyLjEyODggNDYuMzY3OTYxLTMxNi43MzY3ODMgMTMwLjU1OTY1NkMxMTAuNjI0MjcxIDI4MC44MDAxMDggNjQgMzkyLjgzMTUwMSA2NCA1MTJjMCAxMTkuMTk5NDYyIDQ2LjYyNDI3MSAyMzEuMTk5ODkyIDEzMS4yMzIyNTQgMzE1LjQyNDI3MSA4NC42MDc5ODMgODQuMTkxNjk1IDE5Ny4wODgzNDggMTMwLjU1OTY1NiAzMTYuNzM2NzgzIDEzMC41NTk2NTZzMjMyLjEyODgtNDYuMzY3OTYxIDMxNi43MDQwOTktMTMwLjU1OTY1NmM4NC42NzE2My04NC4yNTUzNDIgMTMxLjI5NTkwMS0xOTYuMjg4NDU2IDEzMS4yNjMyMTctMzE1LjQ1NTIzNUM5NTkuOTY3MzE2IDM5Mi44MDA1MzggOTEzLjM3NTcyOSAyODAuODAwMTA4IDgyOC43MDQwOTkgMTk2LjU3NTcyOXpNNzM2LjAwMDg2IDU0NC4wMDA4NiA1NDQuMDAwODYgNTQ0LjAwMDg2bDAgMTkyYzAgMTcuNjk1Njg2LTE0LjMzNjEzOCAzMi4wMDA4Ni0zMi4wMDA4NiAzMi4wMDA4NnMtMzIuMDAwODYtMTQuMzAzNDU0LTMyLjAwMDg2LTMyLjAwMDg2TDQ3OS45OTkxNCA1NDQuMDAwODYgMjg4LjAwMDg2IDU0NC4wMDA4NmMtMTcuNjY0NzIyIDAtMzIuMDAwODYtMTQuMzM2MTM4LTMyLjAwMDg2LTMyLjAwMDg2czE0LjMzNjEzOC0zMi4wMDA4NiAzMi4wMDA4Ni0zMi4wMDA4NmwxOTIgMEw0ODAuMDAwODYgMjg4LjAwMDg2YzAtMTcuNjY0NzIyIDE0LjMzNjEzOC0zMi4wMDA4NiAzMi4wMDA4Ni0zMi4wMDA4NnMzMi4wMDA4NiAxNC4zMzYxMzggMzIuMDAwODYgMzIuMDAwODZsMCAxOTIgMTkyIDBjMTcuNjk1Njg2IDAgMzIuMDAwODYgMTQuMzM2MTM4IDMyLjAwMDg2IDMyLjAwMDg2Uzc1My42OTY1NDYgNTQ0LjAwMDg2IDczNi4wMDA4NiA1NDQuMDAwODZ6IiBmaWxsPSIjMDA4N2JlIiBwLWlkPSI5MzIiLz48L3N2Zz4=') no-repeat;
                    background-size: 100% 100%;
                }
            }
            .del {
                bottom: 17px;
                background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB0PSIxNTAyOTQ5NjYxNDg0IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiBwLWlkPSIxMDAwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIi8+PC9kZWZzPjxwYXRoIGQ9Ik01MTIgOTYwYy0yNDcuMDM5NDg0IDAtNDQ4LTIwMC45NjA1MTYtNDQ4LTQ0OFMyNjQuOTYwNTE2IDY0IDUxMiA2NCA5NjAgMjY0Ljk2MDUxNiA5NjAgNTEyIDc1OS4wMzk0ODQgOTYwIDUxMiA5NjB6TTUxMiAxMjguMjg3MjczYy0yMTEuNTg0NDY0IDAtMzgzLjcxMjcyNyAxNzIuMTI4MjYyLTM4My43MTI3MjcgMzgzLjcxMjcyNyAwIDIxMS41NTE3ODEgMTcyLjEyODI2MiAzODMuNzEyNzI3IDM4My43MTI3MjcgMzgzLjcxMjcyNyAyMTEuNTUxNzgxIDAgMzgzLjcxMjcyNy0xNzIuMTU5MjI2IDM4My43MTI3MjctMzgzLjcxMjcyN0M4OTUuNzEyNzI3IDMwMC40MTU1MzYgNzIzLjU1MTc4MSAxMjguMjg3MjczIDUxMiAxMjguMjg3MjczeiIgZmlsbD0iI2JmY2ZkOSIgcC1pZD0iMTAwMSIvPjxwYXRoIGQ9Ik01NTcuMDU1NDUgNTEzLjM3NjE1OWwxMzguMzY3NjM5LTEzNi44NjQxODVjMTIuNTc2Mzc0LTEyLjQxNjM5NiAxMi42NzI3MDUtMzIuNjcxNzM4IDAuMjU2MzEtNDUuMjQ4MTEycy0zMi43MDQ0MjEtMTIuNjcyNzA1LTQ1LjI0ODExMi0wLjI1NjMxbC0xMzguNTYwMzAxIDEzNy4wMjQxNjMtMTM2LjQ0Nzg5Ny0xMzYuODY0MTg1Yy0xMi41MTI3MjctMTIuNTEyNzI3LTMyLjczNTM4NS0xMi41NzYzNzQtNDUuMjQ4MTEyLTAuMDYzNjQ3LTEyLjUxMjcyNyAxMi40ODAwNDMtMTIuNTQzNjkgMzIuNzM1Mzg1LTAuMDYzNjQ3IDQ1LjI0ODExMmwxMzYuMjU1MjM1IDEzNi42NzE1MjMtMTM3LjM3NjgwNCAxMzUuOTA0MzE0Yy0xMi41NzYzNzQgMTIuNDQ3MzU5LTEyLjY3MjcwNSAzMi42NzE3MzgtMC4yNTYzMSA0NS4yNDgxMTIgNi4yNzE4NDUgNi4zMzU0OTMgMTQuNDk2MTE2IDkuNTA0MDk5IDIyLjc1MTM1MSA5LjUwNDA5OSA4LjEyNzk0IDAgMTYuMjU1ODgtMy4xMDMyMzkgMjIuNDk2NzYxLTkuMjQ3Nzg5bDEzNy41Njc3NDYtMTM2LjA2NDI5MiAxMzguNjg3NTk2IDEzOS4xMzY1NjhjNi4yNDA4ODIgNi4yNzE4NDUgMTQuNDMyNDY5IDkuNDA3NzY4IDIyLjY1Njc0IDkuNDA3NzY4IDguMTkxNTg3IDAgMTYuMzUyMjExLTMuMTM1OTIzIDIyLjU5MTM3Mi05LjM0NDEyIDEyLjUxMjcyNy0xMi40ODAwNDMgMTIuNTQzNjktMzIuNzA0NDIxIDAuMDYzNjQ3LTQ1LjI0ODExMkw1NTcuMDU1NDUgNTEzLjM3NjE1OXoiIGZpbGw9IiNiZmNmZDkiIHAtaWQ9IjEwMDIiLz48L3N2Zz4=') no-repeat;
                background-size: 100% 100%;
                &:hover {
                    background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB0PSIxNTAyOTQ5MTczMjE5IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiBwLWlkPSI4MjIiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiLz48L2RlZnM+PHBhdGggZD0iTTUxMiA2NGMtMjQ3LjAwODUyIDAtNDQ4IDIwMC45NjA1MTYtNDQ4IDQ0OFMyNjQuOTYwNTE2IDk2MCA1MTIgOTYwYzI0Ny4wMDg1MiAwIDQ0OC0yMDAuOTYwNTE2IDQ0OC00NDhTNzU5LjAzOTQ4NCA2NCA1MTIgNjR6TTY5NC43NTIyMTEgNjQ5Ljk4NDAzNGMxMi40ODAwNDMgMTIuNTQzNjkgMTIuNDQ3MzU5IDMyLjc2ODA2OS0wLjA2MzY0NyA0NS4yNDgxMTItNi4yMzkxNjEgNi4yMDgxOTgtMTQuMzk5Nzg1IDkuMzQ0MTItMjIuNTkxMzcyIDkuMzQ0MTItOC4yMjQyNzEgMC0xNi40MTU4NTgtMy4xMzU5MjMtMjIuNjU2NzQtOS40MDc3NjhsLTEzNy42MDA0My0xMzguMDE2NzE4LTEzOC4wNDc2ODIgMTM2LjU3NjkxMmMtNi4yMzkxNjEgNi4xNDQ1NS0xNC4zNjg4MjEgOS4yNDc3ODktMjIuNDk2NzYxIDkuMjQ3Nzg5LTguMjU1MjM1IDAtMTYuNDc5NTA1LTMuMTY4NjA2LTIyLjc1MTM1MS05LjUwNDA5OS0xMi40MTYzOTYtMTIuNTc2Mzc0LTEyLjMyMDA2NS0zMi44MDA3NTMgMC4yNTYzMS00NS4yNDgxMTJsMTM3Ljg4NzcwMy0xMzYuMzg0MjQ5LTEzNy4zNzY4MDQtMTM3LjgyNDA1NmMtMTIuNDgwMDQzLTEyLjUxMjcyNy0xMi40NDczNTktMzIuNzY4MDY5IDAuMDYzNjQ3LTQ1LjI0ODExMiAxMi41MTI3MjctMTIuNTEyNzI3IDMyLjczNTM4NS0xMi40NDczNTkgNDUuMjQ4MTEyIDAuMDYzNjQ3bDEzNy41Njc3NDYgMTM3Ljk4NDAzNCAxMzguMDQ3NjgyLTEzNi41NzUxOTJjMTIuNTQzNjktMTIuNDQ3MzU5IDMyLjgzMTcxNi0xMi4zMjAwNjUgNDUuMjQ4MTEyIDAuMjU2MzEgMTIuNDQ3MzU5IDEyLjU3NjM3NCAxMi4zMjAwNjUgMzIuODMxNzE2LTAuMjU2MzEgNDUuMjQ4MTEyTDU1Ny4zNDQ0NDMgNTEyLjEyNzI5NSA2OTQuNzUyMjExIDY0OS45ODQwMzR6IiBmaWxsPSIjMDA4N2JlIiBwLWlkPSI4MjMiLz48L3N2Zz4=') no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
        .abstract {
            width: 320px;
        }

        .abstract-1 {
            width: 237px;
        }

        .subject {
            width: 383px;
        }

        .subject-1 {
            width: 345px;
        }

        .subject-2 {
            width: 334px;
        }

        .quantity {
            width: 120px;
        }

        .currency {
            width: 120px;
        }

        .DeCr {
            width: 209px;
        }

        .DeCr-1 {
            width: 154px;
        }

        .total {
            width: 706px;
            padding: 0 10px;
        }

        .total-1 {
            width: 816px;
            padding: 0 10px;
        }
        th {
            $thVertical: 48px;
            height: $thVertical;
            line-height: $thVertical;
            border-bottom: 1px solid $table-border;
            >div,
            >p {
                height: $thVertical/2;
                line-height: $thVertical/2;
            }
            >div {
                box-sizing: border-box;
                border-top: 1px solid $table-inner-border;
                font-weight: normal;
            }
            &.DeCr,
            &.DeCr-1 {
                >div {
                    >span {
                        float: left;
                        height: 100%;
                        display: block;
                        text-align: center;
                        &:not(:first-child) {
                            box-sizing: border-box;
                            border-left: 1px solid $table-inner-border;
                        }
                    }
                    >span:nth-child(4),
                    >span:nth-child(7) {
                        border-color: $DeCr-span-blue;
                    }
                    >span:nth-child(10) {
                        border-color: $DeCr-span-red;
                    }
                }
            }
            &.DeCr>div>span {
                width: 19px;
            }
            &.DeCr-1>div>span {
                width: 14px;
            }
        }
        td {
            $tdVertical: 80px;
            position: relative;
            line-height: $tdVertical;
            height: $tdVertical;
            &.Negative span {
                color: rgb(221, 78, 78);
            }
            &.quantity p,
            &.currency p {
                padding: 0 5px;
                line-height: normal;
                &:not(:last-child) {
                    margin-bottom: 2px;
                }
            }
            &.DeCr,
            &.DeCr-1 {
                .DeCroutput {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    margin: auto;
                    width: 100%;
                    height: 100%;
                    .DeCrspan {
                        float: left;
                        height: 100%;
                        display: block;
                        text-align: center;
                        position: relative;
                        font-weight: bold;
                        &:not(:first-child) {
                            box-sizing: border-box;
                            border-left: 1px solid $table-inner-border;
                        }
                        &:nth-child(4),
                        &:nth-child(7) {
                            border-color: $DeCr-span-blue;
                        }
                        &:nth-child(10) {
                            border-color: $DeCr-span-red;
                        }
                        >span {
                            $spanVertical: 30px;
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            height: $spanVertical;
                            line-height: $spanVertical;
                            margin: auto;
                        }
                    }
                }
            }
            &.DeCr .DeCrspan {
                width: 19px;
            }
            &.DeCr-1 .DeCrspan {
                width: 14px;
            }
            .balance {
                color: $option;
            }
        }
        th,
        td {
            &:not(:last-child) {
                border-right: 1px solid $table-border;
            }
        }
    }

    tbody {
        tr {
            &:hover {
                td {
                    background-color: rgb(238, 241, 246);
                }
                .option,
                .tr_option {
                    display: block;
                }
            }
            td {
                border-bottom: 1px solid $table-border;
                .option {
                    display: none;
                    position: absolute;
                    top: 50%;
                    right: 0;
                    margin-top: -40px;
                    height: 80px;
                    width: 30px;
                    padding-right: 10px;
                    text-align: center;
                    color: $option;
                    &:hover {
                        cursor: pointer;
                        color: $primary;
                    }
                }
            }
        }
    }
}
</style>


