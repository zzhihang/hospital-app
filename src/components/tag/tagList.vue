<template>
    <div class="tag-list">
        <van-tabs v-model="active" type="card">
            <van-tab title="标签 1" v-for="(item, index) in 10" :key="index">内容 1</van-tab>
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
    }
    /deep/.van-tabs__nav--card{
        border: none !important;
    }
</style>
