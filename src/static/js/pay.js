import {wxYanQian} from "@/service/userOrderService";

export const wxPay = async (orderNo) => {
    const result = await wxYanQian(window.location.href.split('?')[0]);
    if(result.success){
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
        }
    }else{
        this.$toast.fail(result.msg);
    }
};
