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
            <van-cell title="订阅时间" :value="now"/>
        </van-cell-group>

        <div class="pay-box">
            <div class="button-box">
                <van-button @click="onWxPay" color="#04CA62" plain :icon="require('../../static/img/pay/icon_weixinzhifu.png')">微信支付</van-button>
                <van-button @click="onZhifubaoPay" plain class="mt20" :icon="require('../../static/img/pay/icon_zhifubaozhifu.png')" type="info">支付宝支付</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Cell, CellGroup, Image as VanImage, Button} from 'vant';
    import {aliPay, orderStatus, wxPay, wxYanQian} from "@/service/order/orderService";
    import {LONG_MAP} from "@/static/js/const";
    import {formatDate} from "@/static/js/util";
    import wx from 'weixin-js-sdk'

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
                const {orderNo, id} = this.$route.query;
                const result = await orderStatus(orderNo);
                const {data} = result;
                if(result.success){
                    if(data.redirect){
                        window.location.href = data.redirectUrl;
                    }
                    if(data.status === 1){
                        this.$router.replace({path: '/pay/success', query: {orderNo, id}})
                    }
                }else{
                    this.$toast.fail(result.msg)
                }
            },
            async onZhifubaoPay(){
                const {orderNo} = this.$route.query;
                const result = await aliPay(orderNo)
                if(result.status === 200){
                    window.location.href = result.data.redirect
                }else{
                    this.$toast.fail(result.msg);
                }
            },
            async onWxPay(){
                const result = await wxYanQian(window.location.href.split('?')[0]);
                if(result.success){
                    const {orderNo} = this.$route.query;
                    const result2 = await wxPay(orderNo);
                    const _this = this;
                    if(result2.success){
                        const params = result2.data;
                        function onBridgeReady(){
                            WeixinJSBridge.invoke(
                                'getBrandWCPayRequest', {
                                    "appId": params.appId,     //公众号ID，由商户传入
                                    "timeStamp": params.timeStamp,         //时间戳，自1970年以来的秒数
                                    "nonceStr": params.nonceStr, //随机串
                                    "package": params.packageValue,
                                    "signType":"MD5",         //微信签名方式：
                                    "paySign": params.paySign //微信签名
                                },
                                function(res){
                                    if(res.err_msg == "get_brand_wcpay_request:ok" ){
                                        _this.$toast.success('支付成功')
                                        _this.queryOrderStatus();
                                    }
                                });
                        }
                        if (typeof WeixinJSBridge == "undefined"){
                            if( document.addEventListener ){
                                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                            }else if (document.attachEvent){
                                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                            }
                        }else{
                            onBridgeReady();
                        }
                    }else{
                        this.$toast.fail(result2.msg);
                        this.$router.push({path: '/pay/fail'})
                    }
                }else{
                    this.$toast.fail(result.msg);
                }
            },
            queryOrderStatus(){
                this.timer = setInterval(() => {
                    this.getOrderStatus();
                    clearInterval(this.timer)
                },500)
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
