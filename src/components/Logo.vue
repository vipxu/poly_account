<template>
    <div id="Logo">
        <img :src="require('@/assets/img/logo.png')" />
    </div>
</template>

<script>
export default {
    name: 'logo'
}
</script>

<style lang="scss" scoped>
#Logo {
    position: relative;
    height: 100%;
    width: 150px;
    img {
        position: absolute;
        top: 0;
        bottom: 0;
        left: -15px;
        right: 0;
        margin: auto;
        max-height: 100%;
        max-width: 100%;
        height: 50%;
    }
}
</style>
