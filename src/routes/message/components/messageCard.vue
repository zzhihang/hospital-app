<template>
    <div class="message-card">
        <div class="title">
            <van-image
                    round
                    height="30"
                    width="30"
                    :src="require(data.type === 'service' ? '../../../static/img/icon_fuwutongzhi.png' : '../../../static/img/icon_xiaoxitongzhi.png')" />
            <div class="right">
                <h1>{{data.type === 'service' ? '服务通知' : '消息通知'}}</h1>
                <p>{{data.ctime}}</p>
            </div>
        </div>
        <p class="message">{{data.message}}。</p>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Image as VanImage} from 'vant';

    Vue.use(VanImage);

    export default {
        props: ['data'],
        data() {
            return {

            }
        },
    }
</script>

<style lang="less" scoped>
    .message-card {
        background: #FFFFFF;
        padding: 15px;
    }

    .title {
        @flex-sb-center();

        .van-image {
            flex-shrink: 0;
        }

        .right {
            flex: 1;
            margin-left: 8px;
            h1 {
                font-size: 16px;
            }

            p {
                color: #999999;
                font-size: 12px;
                margin-top: 4px;
            }
        }
    }
    .message{
        font-size: 14px;
        color: #666666;
        margin-top: 14px;
    }
</style>
