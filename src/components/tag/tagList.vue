<template>
    <div class="tag-list">
        <van-tabs v-model="active" type="card" title-active-color="#D94F17" title-inactive-color="#999999">
            <van-tab :title="item.label" v-for="(item, index) in data" :key="index"></van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Tab, Tabs } from 'vant';
    Vue.use(Tab);
    Vue.use(Tabs);
    export default {
        props: ['data'],
        data() {
            return {
                active: ''
            }
        },
    }
</script>

<style lang="less" scoped>
    /deep/.van-tab{
        background: rgba(153, 153, 153, 0.1);
        margin-right: 10px;
    }
    /deep/.van-tabs__nav--card .van-tab{
        border: none !important;
        border-radius: 4px;
    }
    /deep/.van-tabs__nav--card{
        border: none !important;
    }
    /deep/.van-tabs__nav{
        padding-left: 0;
        margin-left: 0;
    }
    /deep/.van-tabs__nav--card .van-tab.van-tab--active{
        background: rgba(217, 79, 23, 0.1);
    }
</style>
