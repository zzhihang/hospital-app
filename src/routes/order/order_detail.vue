<template>
    <div class="body">
        <van-image
                class="bg-image"
                :src="require('../../static/img/my/bg_d.jpg')" />
        <div class="content">
            <van-icon size="40" :name="icon" />
            <h1>交易明细</h1>
            <h2>{{model.price}}</h2>
            <p class="status" :class="status">{{statusMessage}}</p>
            <p class="reason" v-if="status === 'fail'">
                余额不足，交易失败
            </p>
        </div>
        <van-cell-group class="mt5">
            <van-cell title="商品说明" :value="model.title"/>
            <van-cell title="创建时间" :value="model.ctime"/>
            <van-cell title="订单号" :value="model.orderNo"/>
            <van-cell title="交易方式" :value="model.payType"/>
        </van-cell-group>
        <div style="background: #FFFFFF;flex: 1;" class="mt5"></div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Cell, CellGroup, Icon, Image as VanImage} from 'vant';
    import {customerOrderDetail, orderDetail, orderStatus} from "@/service/order/orderService";
    import connect from "@/store/connect";
    const {mapState, mapMutations} = connect('commonStore');
    Vue.use(Icon);
    Vue.use(VanImage);
    Vue.use(Cell);
    Vue.use(CellGroup);
    export default {
        data() {
            return {
                status: '',
                statusMessage: '',
                model: {},
                icon: ''
            }
        },
        created(){
            this.getDetail();
        },
        computed: {
            ...mapState(['isBozhu'])
        },
        methods: {
            async getDetail() {
                const {id} = this.$route.query;
                let service = customerOrderDetail;
                if(this.isBozhu){
                    service = orderDetail
                }
                const {data} = await service(id);
                this.model = data;
                const result = await orderStatus(data.orderNo);
                if(result.status === false){
                    this.status = 'fail';
                }
                this.statusMessage = result.msg;
            }
        },
        watch: {
            isBozhu: {
                handler() {
                    if (this.isBozhu) {
                        if(this.model.price < 0){
                            this.icon = require('@static/img/my/icon_tixian.png');
                        }else{
                            this.icon = require('@static/img/my/icon_dingyue.png');
                        }
                    } else {
                        this.icon = require('@static/img/my/icon_dingyue.png');
                    }
                },
                immediate: true
            }
        }
    }
</script>

<style lang="less" scoped>
    @tran80: {
        transform: translateY(-80px);
    }
    .mt5{
        @tran80();
    }
    .body{
        display: flex;
        flex-direction: column;
    }
    /deep/ .van-cell__title {
        color: #666666;
        font-size: 16px;
        flex: unset;
        flex-shrink: 0;
    }

    /deep/ .van-cell__value {
        color: #333333;
        font-size: 16px;
        flex: 1;
    }
    .bg-image{
        width: 100%;
    }
    .content{
        @tran80();
        background: #FFFFFF;
        border-radius: 18px 18px 0 0;
        text-align: center;
        padding-bottom: 20px;
        color: #333333;
        .van-icon{
            transform: translateY(-18px);
        }
        h1{
            font-size: 16px;
            margin-top: -10px;
        }
        h2{
            margin-top: 15px;
            font-size: 30px;
        }
        .status{
            color: #999999;
            font-size: 14px;
            margin-top: 8px;
            &.success{
                color: #339D83;
            }
            &.fail{
                color: #D94F17;
            }
        }
        .reason{
            font-size: 12px;
            color: #999999;
            margin-top: 7px;
        }
    }
</style>
