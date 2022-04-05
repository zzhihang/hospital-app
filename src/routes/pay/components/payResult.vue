<template>
    <div>
        <van-empty
                :image="icon"
                :description="text"
        />
        <p class="reason" v-if="type === 'fail'">余额不足，支付失败</p>
        <van-button class="result-button" type="primary">{{buttonText}}</van-button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Empty, Button} from 'vant';

    Vue.use(Empty);
    Vue.use(Button);
    export default {
        props: ['type'],
        data() {
            return {
                icon: '',
                text: '',
                buttonText: ''
            }
        },
        watch: {
            type: {
                handler() {
                    if (this.type === 'success') {
                        this.icon = require('@static/img/pay/pic_zhifuchenggong.png');
                        this.text = '支付成功';
                        this.buttonText = '完成'
                    } else {
                        this.icon = require('@static/img/pay/pic_zhifushibai.png');
                        this.text = '支付失败';
                        this.buttonText = '重新支付'
                    }
                },
                immediate: true
            }
        }
    }
</script>

<style lang="less" scoped>
    .van-empty{
        padding-bottom: 0;
    }
    /deep/ .van-empty__image {
        width: 220px;
        height: 164px;
    }

    /deep/.van-empty__description{
        color: #333333;
        font-size: 18px;
        margin-top: 30px;
    }
    .reason{
        font-size: 14px;
        color: #999999;
        text-align: center;
        margin-top: 12px;
    }
    .result-button{
        position: fixed;
        bottom: 30px;
        left: 15px;
        right: 15px;
        font-size: 16px;
    }
</style>
