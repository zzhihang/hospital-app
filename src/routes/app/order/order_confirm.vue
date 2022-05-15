<template>
    <div>
        <doctor-card
            mode="dark"
            :avatar="id ? orderInfo.headimgurl : orderDoctor.headimgurl"
            :name="id ? orderInfo.doctorName : orderDoctor.name"
            :dept="id ? orderInfo.headimgurl : orderDoctor.deptName"
            :hospital="id ? orderInfo.headimgurl : orderDoctor.hospitalName"
            :title="id ? orderInfo.doctorTitle : orderDoctor.title"
            :show-focus="false"
        />
        <van-cell-group class="mt10">
            <van-cell title="就诊时间" :value="id ? orderInfo.businessTime : businessTime" />
            <van-cell title="就诊人" :value="id ? orderInfo.patientName : orderPatient.name" />
            <van-cell title="身份证号" :value="id ? orderInfo.patientIdNum : orderPatient.idNumber" />
            <van-cell title="就诊人联系方式" :value="id ? orderInfo.patientPhone : orderPatient.phone" />
        </van-cell-group>

        <van-cell-group class="mt5">
            <van-cell title="金额" :value="id ? orderInfo.price : orderService.price" />
            <van-cell title="订单编号" v-if="id" :value="orderInfo.orderNo" />
            <van-cell title="服务项目" :value="id ? orderInfo.serviceItem : orderService.serviceItem" />
            <van-cell title="出诊地点" :value="id ? orderInfo.serviceAddr : orderService.addr" />
            <van-cell title="服务说明" :value="id ? orderInfo.serviceDescr : orderService.serviceDescr" />
        </van-cell-group>

        <div class="bottom-button-box">
            <van-button type="primary" @click="submitOrder" v-if="!id">提交订单</van-button>
            <van-button type="primary" v-if="['YWC', 'YQX', 'BBH', 'YTK'].includes(orderInfo.orderStatus)" @click="deleteClick">删除订单</van-button>
            <div v-if="['DZF'].includes(orderInfo.orderStatus)" style="display: flex;">
                <van-button type="primary" plain @click="cancelClick" class="mr10" style="width: 30%;flex-shrink: 0">取消订单</van-button>
                <van-button type="primary" @click="onPayClick">支付</van-button>
            </div>
        </div>
    </div>
</template>

<script>

    import DoctorCard from "@/components/doctor/DoctorCard";
    import connect from "@/store/connect";
    import {getParams} from "@/static/js/util";
    import {
        orderCancel,
        orderCreate,
        orderDelete,
        orderInfo,
        orderStatus,
        wxPay,
        wxYanQian
    } from "@/service/userOrderService";
    const {mapState, mapMutations} = connect('commonStore');
    export default {
        components: {
            DoctorCard
        },
        data() {
            return {
                businessTime: '',
                orderInfo: {},
                id: ''
            }
        },
        computed: {
            ...mapState(['orderDoctor', 'orderPatient', 'orderService'])
        },
        created(){
            if(this.$route.query.id){//有id的话代表来自我的订单页面，即订单已经是生成状态
                this.id = this.$route.query.id;
                this.getOrderInfo()
            }else{
                this.businessTime = getParams().dateTime;
            }
        },
        beforeRouteLeave(){
            this.setOrderDoctor({});
            this.setOrderPatient({});
            this.setOrderService({});
        },
        methods: {
            ...mapMutations(['setOrderDoctor', 'setOrderPatient', 'setOrderService']),
            async getOrderInfo(){
                const {data} = await orderInfo(this.id);
                this.orderInfo = data;
            },
            cancelClick() {
                this.$confirm({message: '是否确定取消订单？'}, async () => {
                    const result = await orderCancel(this.orderInfo.id);
                    if(result.success){
                        this.$toast.success('操作成功');
                        this.$emit('actionSuccess')
                    }else{
                        this.$toast.fail(result.msg);
                    }
                })
            },
            async getOrderStatus() {
                const {orderNo} = this.orderInfo;
                const result = await orderStatus(orderNo);
                const {data} = result;
                if(result.success){
                    if(data.status === 1){
                        this.$router.push({name: 'myOrder'})
                    }
                }else{
                    this.$toast.fail(result.msg)
                }
            },
            queryOrderStatus(){
                this.timer = setInterval(() => {
                    this.getOrderStatus();
                    clearInterval(this.timer)
                },500)
            },
            async onPayClick(cb){
                const result = await wxYanQian(window.location.href.split('?')[0]);
                if(result.success){
                    const {orderNo} = this.orderInfo;
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
                                        _this.$toast.success('支付成功');
                                        if(cb){
                                            cb();
                                        }else{
                                            this.$router.push({name: 'myOrder'})
                                        }
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
            },
            deleteClick() {
                this.$confirm({message: '是否确定删除此条订单记录？'}, async () => {
                    const result = await orderDelete(this.orderInfo.id);
                    if(result.success){
                        this.$toast.success('操作成功');
                        this.$emit('actionSuccess')
                    }else{
                        this.$toast.fail(result.msg);
                    }
                })
            },
            async submitOrder() {
                const sbData = {
                    businessTime: this.businessTime,
                    patientId: this.orderPatient.id,
                    serviceId: this.orderService.id,
                };
                const result = await orderCreate(sbData);
                if(result.success){
                    this.orderInfo.orderNo = result.data.orderNo;
                    this.onPayClick(() => {
                        this.$confirm({message: '订单已提交，正在等待医生接收订单~', showCancelButton: false}, async () => {
                            this.$router.push({name: 'myOrder'})
                        })
                    });
                }else{
                    this.$toast.fail(result.msg);
                }
            }
        },
    }
</script>

<style lang="less" scoped>

</style>
