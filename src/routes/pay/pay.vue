<template>
    <div class="body">
        <div class="order-info">
            <div class="content-card">
                <van-image :src="info.img" radius="6"/>
                <div class="info">
                    <h1>{{info.title}}</h1>
                    <p>付费专题</p>
                </div>
            </div>
        </div>

        <van-cell-group class="mt5">
            <van-cell title="金额" :value="info.price" />
            <van-cell title="有效期" :value="info.timeLong"/>
            <van-cell title="订阅时间" :value="formatDate"/>
        </van-cell-group>

        <div class="pay-box">
            <div class="button-box">
                <van-button color="#04CA62" plain :icon="require('../../static/img/pay/icon_weixinzhifu.png')">微信支付</van-button>
                <van-button plain class="mt20" :icon="require('../../static/img/pay/icon_zhifubaozhifu.png')" type="info">支付宝支付</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Cell, CellGroup, Image as VanImage, Button} from 'vant';
    import {orderStatus} from "@/service/order/orderService";
    import {LONG_MAP} from "@/static/js/const";
    import {formatDate} from "@/static/js/util";

    Vue.use(Cell);
    Vue.use(CellGroup);
    Vue.use(VanImage);
    Vue.use(Button);

    export default {
        data() {
            return {
                info: {},
                now: formatDate(new Date())
            }
        },
        created(){
            this.info = this.$route.query;
            this.info.timeLong = LONG_MAP[this.info.long];
            this.getOrderStatus();
        },
        methods: {
            async getOrderStatus() {
                const {orderNo} = this.$route.query;
                const {data} = await orderStatus(orderNo);
            }
        },
    }
</script>

<style lang="less" scoped>
    .body{
        @flex-column();
    }
    .order-info {
        background: #FFFFFF;
        padding: 20px 15px;
        .content-card{
            border-radius: 10px;
            padding: 15px;
            background: linear-gradient(180deg, #FFF7F3, #FDFDFD);
            display: flex;
        }
        .van-image{
            width: 112px;
            height: 75px;
        }
        .info{
            margin-left: 14px;
            h1{
                font-size: 18px;
                color: #333333;
                margin-top: 16px;
            }
            p{
                color: #D94F17;
                font-size: 14px;
                margin-top: 10px;

            }
        }
    }
    .pay-box{
        margin-top: 5px;
        background: #FFFFFF;
        padding: 0 15px;
        flex: 1;
        position: relative;
        .van-button{
            width: 100%;
            font-weight: bold;
            font-size: 18px;
            .van-icon{
                margin-top: 6px;
                margin-right: 2px;
            }
        }
        .button-box{
            position: absolute;
            left: 15px;
            right: 15px;
            bottom: 30px;
        }
    }
</style>
