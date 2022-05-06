<template>
    <van-swipe-cell>
        <div class="chat-list-item">
            <van-badge :content="5" dot>
                <van-image :src="require('../../static/img/pic_wujiuzhenren.png')"/>
            </van-badge>
            <div class="content">
                <h2>
                    <span>朱志航</span>
                    <span class="time">2022-03-21</span>
                </h2>
                <p class="message ellipsis1">
                    哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
                </p>
            </div>
        </div>
        <template #right>
            <van-button style="height: 100%;" square type="danger" text="删除"/>
        </template>
    </van-swipe-cell>
</template>

<script>
    import Vue from 'vue';

    export default {
        components: {},
    }
</script>

<style lang="less" scoped>
    .chat-list-item {
        @flex-sb-center();
        @white-bg();
        padding: 15px;

        .van-image {
            width: 45px;
            height: 45px;
            flex-shrink: 0;
        }

        .content {
            flex: 1;
            padding-left: 10px;
            overflow: hidden;

            h2 {
                @flex-sb-center();
            }

            .time {
                color: #999999;
                font-size: 12px;
                font-weight: normal;
            }
        }

        .message {
            color: #666666;
            font-size: 14px;
            margin-top: 7px;
        }
    }
</style>
