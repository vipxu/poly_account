<template>
    <div class="my-popover">
        <div class="pop-text" :class="[setSize(size), popover ? 'pop-hover' : '']" :style="{ 'width': width + 'px'}" @click="handleClick(popover)">
            <slot name="text"></slot>
            <i class="my-icon el-icon-caret-top" :class="[popover ? 'is-reverse' : '']"></i>
        </div>
        <transition :name="transition">
            <div class="pop-content" v-show="popover" :style="{ 'width': contentWidth + 'px'}">
                <slot name="content"></slot>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'my-popover',
    props: {
        width: String,
        contentWidth: String,
        text: String,
        transition: {
            type: String,
            default: 'fade-in-linear'
        },
        size: String,
        popover: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
        }
    },
    methods: {
        setSize(size) {
            let s = '';
            switch (size) {
                case 'small':
                    s = 'size-small'
                    break;
                case 'mini':
                    s = 'size-mini'
                    break;
                case 'large':
                    s = 'size-large'
                    break;

                default:
                    break;
            }
            return s;
        },
        handleClick(popover) {
            this.$emit('update:popover', !popover);
        }
    }
}
</script>

<style lang="scss" scoped>
.my-popover {
    display: inline-block;
    position: relative;
    font-size: 14px;
    .pop-text {
        vertical-align: top;
        display: inline-block;
        position: relative;
        height: 36px;
        line-height: 16px;
        padding: 10px 36px 10px 10px;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #c4c4c4;
        color: rgb(31, 49, 61);
        margin: 0;
        border-radius: 4px;
        box-sizing: border-box;
        &.pop-hover{
            border-color: #0087be;
        }
        .my-icon {
            position: absolute;
            width: 35px;
            height: 100%;
            line-height: 16px;
            text-align: center;
            right: 0;
            top: 50%;
            color: #bfcbd9;
            font-size: 12px;
            transition: transform .3s;
            transform: translateY(-50%) rotate(180deg);
            box-sizing: border-box;
            cursor: pointer;
            &:after {
                content: "";
                height: 100%;
                width: 0;
                display: inline-block;
                vertical-align: middle;
            }
        }
        .my-icon.is-reverse {
            transform: translateY(-50%);
        }
        &.size-small {
            height: 28px;
            line-height: 12px;
            font-size: 12px;
            padding: 7px 36px 7px 10px;
        }
        &.size-mini {
            height: 22px;
            line-height: 12px;
            font-size: 12px;
            padding: 4px 36px 4px 10px;
        }
        &.size-large {
            height: 40px;
            line-height: 18px;
            font-size: 16px;
            padding: 11px 36px 11px 10px;
        }
    }
    .pop-content {
        position: absolute;
        background: #fff;
        min-width: 150px;
        border-radius: 2px;
        border: 1px solid #d1dbe5;
        padding: 15px;
        z-index: 5;
        margin-top: 5px;
        font-size: 14px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .12);
    }
}
</style>

