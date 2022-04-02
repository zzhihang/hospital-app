<template>
    <van-empty
            :image="require('../../static/img/empty.png')"
            :description="description"
    />
</template>

<script>
    import Vue from 'vue';
    import { Empty } from 'vant';

    Vue.use(Empty);
    export default {
        props: {
            description: {
                type: String,
                default: '暂无动态'
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
