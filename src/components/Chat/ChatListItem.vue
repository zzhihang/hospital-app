<template>
    <van-swipe-cell>
        <div class="chat-list-item">
            <van-badge :dot="unRead">
                <van-image :src="avatar"/>
            </van-badge>
            <div class="content">
                <h2>
                    <span>{{name}}</span>
                    <span class="time">{{lastTime}}</span>
                </h2>
                <p class="message ellipsis1">
                    {{lastMsg}}
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
        props: ['avatar', 'name', 'lastMsg', 'lastTime', 'unRead']
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
