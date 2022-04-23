<template>
    <div class="bg-image">
        <van-image :src="data.imgUrl"></van-image>
        <div class="inner-content">
            <div class="badge-box">
                <span class="badge" v-if="!isBozhu">{{ifSubscribe}}</span>
                <div style="flex: 1;text-align: right">
                    <van-image class="vip mr10" v-if="String(data.free) === '0'" height="18" width="38" :src="require('../../../static/img/topic/pic_biaoqian.png')"></van-image>
                </div>
            </div>
            <div class="content-box">
                <avatar :name="data.userName" :photo="data.headimgurl"></avatar>
                <h1 class="ellipsis2">{{data.title}}</h1>
                <div class="count">
                    <ul>
                        <li>动态数量<span>{{data.itemCount}}</span></li>
                        <li>运营天数<span>{{data.opDays}}</span></li>
                    </ul>
                    <h6>{{data.subscribeCount}}人订阅</h6>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Icon, Image as VanImage} from 'vant';
    import avatar from "./avatar";

    Vue.use(VanImage);
    Vue.use(Icon);

    export default {
        props: ['data'],
        data() {
            return {
                isBozhu: sessionStorage.getItem('isBozhu') == 'true'
            }
        },
        components: {
            avatar
        },
        computed: {
            ifSubscribe(){
                return String(this.data.subscribe) === '1' ? '已订阅' : '未订阅'
            }
        }
    }
</script>

<style lang="less" scoped>
    .bg-image {
        position: relative;
        height: 230px;
        border-radius: 9px;
        overflow: hidden;
        display: flex;
        background: linear-gradient(0deg, rgb(75 71 71 / 30%), rgb(240 233 233 / 20%));
        flex-direction: column;
        .inner-content{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-content: space-between;
        }
        .badge-box{
            @flex-sb-center();
            margin-top: 10px;
        }
        .badge{
            width: 57px;
            background: #FFFFFF;
            opacity: 0.8;
            border-radius: 0 9px 9px 0;
            color: #D94F17;
            font-size: 12px;
            line-height: 21px;
            text-align: center;
        }
        .content-box{
            padding: 20px 15px;
            color: #FFFFFF;
            h1{
                font-size: 24px;
                margin-top: 14px;
            }
            .count{
                @flex-sb-center();
                margin-top: 20px;
            }
            ul{
                display: flex;
                font-size: 12px;
                color: #333333;
                li{
                    display: block;
                    padding: 5px 10px;
                    border-radius: 2px;
                    background: #DCDEDD;
                    margin-right: 5px;
                    span{
                        font-weight: bold;
                        color: #DF2824;
                    }
                }
            }
            h6{
                font-size: 12px;
            }
        }
    }
</style>
