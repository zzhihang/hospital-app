<template>
    <div class="message-card">
        <div class="title">
            <!--<van-image-->
                    <!--round-->
                    <!--height="30"-->
                    <!--width="30"-->
                    <!--:src="require(type === 'fuwu' ? '../../../static/img/icon_fuwutongzhi.png' : '../../../img/icon_xiaoxitongzhi.png')"></van-image>-->
            <div class="right">
                <h1>消息通知</h1>
                <p>2022-03-10 14:37:30</p>
            </div>
        </div>
        <p class="message">您成功订阅了何思远的用户研究方法专题。</p>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Image as VanImage} from 'vant';

    Vue.use(VanImage);

    export default {
        data() {
            return {
                type: 'xiaoxi'
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
