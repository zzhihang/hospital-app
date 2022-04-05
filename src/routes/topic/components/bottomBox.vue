<template>
    <div class="bottom-box">
        <div>
            <h6>&yen;{{price}}</h6>
            <p>时效：{{timeLong}}</p>
        </div>
        <van-button color="#FE7B35" @click="onSubscribe">{{buttonText}}</van-button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Button } from 'vant';
    import {LONG_MAP} from "@/static/js/const";

    Vue.use(Button);

    export default {
        props: ['price', 'free', 'long'],
        computed: {
            buttonText(){
                return String(this.free) === '1' ? '立即订阅' : '免费订阅'
            },
            timeLong(){
                return LONG_MAP[this.long]
            }
        },
        methods: {
            onSubscribe() {
                this.$emit('onSubscribe')
            }
        },
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
