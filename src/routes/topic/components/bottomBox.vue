<template>
    <div class="bottom-box">
        <div>
            <h6>&yen;{{price}}</h6>
            <p>时效：永久</p>
        </div>
        <van-button color="#FE7B35" radius="">免费订阅</van-button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Button } from 'vant';

    Vue.use(Button);
    export default {
        props: ['price']
    }
</script>

<style lang="less" scoped>
    .bottom-box{
        box-shadow: 0px -1px 12px 0px rgba(153, 153, 153, 0.18);
        height: 60px;
        background: #FFFFFF;
        position: fixed;
        bottom: 0;
        padding: 0 15px;
        left: 0;
        right: 0;
        @flex-sb-center();
        h6{
            font-size: 21px;
            color: #333333;
        }
        p{
            font-size: 14px;
            color: #666666;
            margin-top: 2px;
        }
        .van-button{
            height: 33px;
            border-radius: 6px;
        }
    }

</style>
