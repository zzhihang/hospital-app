/**
* @Description: 聊天主页面
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/5/6 21:57
*/
<template>
    <div>
        <div class="chat-area">
            <div class="chat-scroll">
                <div class="message-item he">
                    <van-image :src="require('../../static/img/pic_wujiuzhenren.png')"/>
                    <div class="message">
                        你好
                    </div>
                </div>
                <div class="message-item me">
                    <van-image :src="require('../../static/img/pic_wujiuzhenren.png')"/>
                    <div class="message">
                        你好
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        components: {

        },
    }
</script>

<style lang="less" scoped>
    .chat-area{
        padding: 15px;
    }
    .chat-scroll{
        padding: 20px 15px;
        @white-bg();
        .van-image{
            height: 39px;
            width: 39px;
        }
        .message-item{
            display: flex;
            align-items: center;
        }
        .message{
            color: #333333;
            font-size: 16px;
            padding: 7px 15px 5px;
        }
        .he{
            .message{
                margin-left: 10px;
                border-radius: 0 24px 24px 24px;
                background: #F6F6F6;
            }
        }
        .me{
            flex-flow: row-reverse;
            .message{
                margin-right: 10px;
                border-radius: 24px 0 24px 24px;
                background: #F2F7FF;
            }
        }
    }
</style>
