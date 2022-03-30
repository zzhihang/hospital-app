<template>
    <van-empty
            :image="require('../../static/img/empty.png')"
            description="暂无动态"
    />
</template>

<script>
    import Vue from 'vue';
    import { Empty } from 'vant';

    Vue.use(Empty);
    export default {

    }
</script>

<style lang="less" scoped>

</style>
