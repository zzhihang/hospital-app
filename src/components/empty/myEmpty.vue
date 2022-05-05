<template>
    <van-empty
        :image="require('../../static/img/pic_wujiuzhenren.png')"
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
                default: '暂无数据'
            }
        }
    }
</script>

<style lang="less" scoped>
    /deep/.van-empty__image{
        width: 280px;
        height: unset;
    }
</style>
