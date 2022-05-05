<template>
    <div class="list">
        <div class="item" v-for="(item, index) in 10" :key="index">
            <van-icon size="20" :name="require('../../../../static/img/icon/icon_jibing.png')"/>
            <span>生病了吧</span>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        components: {

        },
    }
</script>

<style lang="less" scoped>
    .list{
        padding: 15px;
    }
    .item{
        @white-bg();
        @flex-col-center();
        border-radius: 6px;
        height: 46px;
        padding: 0 15px;
        margin-top: 10px;
        span{
            color: #333333;
            font-size: 16px;
            margin-left: 8px;
        }
    }
</style>
