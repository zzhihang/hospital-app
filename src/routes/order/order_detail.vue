<template>
    <div class="body">
        <van-image
                class="bg-image"
                :src="require('../../static/img/bg.png')" />
        <div class="content">
            <van-icon size="40" :name="require('../../static/img/icon_dingyue.png')" />
            <van-icon size="40" :name="require('../../static/img/icon_tixian.png')" />
            <h1>交易明细</h1>
            <h2>-100</h2>
            <p class="status" :class="status">交易取消</p>
            <p class="reason" v-if="status === 'fail'">
                余额不足，交易失败
            </p>
        </div>
        <van-cell-group class="mt5">
            <van-cell title="商品说明" value="订阅何思远的用户研究方法专题"/>
            <van-cell title="创建时间" value="2022-03-10 12:10:10"/>
            <van-cell title="订单号" value="857759403940"/>
            <van-cell title="交易方式" value="微信支付"/>
        </van-cell-group>
        <div style="background: #FFFFFF;flex: 1;" class="mt5"></div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Cell, CellGroup, Icon, Image as VanImage} from 'vant';

    Vue.use(Icon);
    Vue.use(VanImage);
    Vue.use(Cell);
    Vue.use(CellGroup);
    export default {
        data() {
            return {
                status: 'fail'
            }
        },
    }
</script>

<style lang="less" scoped>
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
