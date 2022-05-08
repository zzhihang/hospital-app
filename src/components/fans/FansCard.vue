<template>
    <div class="fans-card">
        <van-image :src="require('../../static/img/pic_wujiuzhenren.png')"/>
        <div class="info">
            <h2>朱志航</h2>
            <p>女 24岁</p>
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
    .fans-card{
        @flex-sb-center();
        @white-bg();
        padding: 15px;
        .van-image{
            height: 42px;
            width: 42px;
            flex-shrink: 0;
        }
        .info{
            padding-left: 11px;
            flex: 1;
            p{
                color: #666666;
                font-size: 14px;
                margin-top: 7px;
            }
        }
    }
</style>
