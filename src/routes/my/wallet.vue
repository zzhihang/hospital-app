<template>
    <div class="body-content">
        <div class="wallet-box">
            <p>钱包余额（元）</p>
            <h1>{{userInfo.money}}</h1>
        </div>
        <div class="content-list">
            <div class="content-item" @click="goOrderList">
                <div class="content-item-title">
                    <van-image :src="require('../../static/img/my/icon_qianbaomingxi.png')"/>
                    <span>钱包明细</span>
                </div>
                <van-icon class="ml5" size="14" name="arrow" color="#999999"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Image as VanImage, Icon} from 'vant';
    import connect from "@/store/connect";
    const {mapState, mapMutations} = connect('commonStore');
    Vue.use(VanImage);
    Vue.use(Icon);

    export default {
        computed: {
            ...mapState(['userInfo'])
        },
        methods: {
            goOrderList() {
                this.$router.push({
                    path: '/order'
                })
            }
        },
    }
</script>

<style lang="less" scoped>
    .body-content{
        @flex-column();
        height: 100%;
    }
    .wallet-box{
        height: 300px;
        background: url("../../static/img/my/bg_wa1.jpg") no-repeat;
        background-size: cover;
        text-align: center;
        padding-top: 40px;
        p{
            font-size: 16px;
            color: #333333;
        }
        h1{
            color: #D94F17;
            font-size: 40px;
            margin-top: 20px;
        }
    }
    .content-list{
        flex: 1;
        border-radius: 18px 18px 0 0;
        padding: 25px 15px;
        overflow: hidden;
        transform: translateY(-180px);
        background: #ffffff;
        .content-item{
            @flex-sb-center();
            background: #FFFAF5;
            padding: 20px 15px;
            .van-image{
                height: 20px;
                width: 20px;
            }
            span{
                color: #333333;
                font-size: 16px;
                margin-left: 4px;
            }
        }
        .content-item-title{
            @flex-sb-center();
        }
    }
</style>
