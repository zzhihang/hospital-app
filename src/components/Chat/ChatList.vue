<template>
    <div class="chat">
        <div class="chat-action">
            <div class="action-item ml20">
                <van-icon :name="require('../../static/img/icon/icon_qingchuweidu.png')"/>
                <span>清除未读消息</span>
            </div>
            <div class="action-item">
                <van-icon :name="require('../../static/img/icon/icon_faqiqunliao.png')"/>
                <span>发起群聊</span>
            </div>
        </div>
        <div class="chat-list">
            <chat-list-item @click.native="onChatItemClick" v-for="(item, index) in 10" :key="index"/>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import ChatListItem from "@/components/Chat/ChatListItem";

    export default {
        components: {
            ChatListItem
        },
        methods: {
            onChatItemClick() {
                this.$router.push({name: 'doctorChat'})
            }
        },
    }
</script>

<style lang="less" scoped>
    .chat{
        padding: 5px 15px 50px;
    }
    .chat-action{
        background: #EEF2FA;
        text-align: right;
        height: 35px;
        @flex-col-center();
        flex-flow: row-reverse;
        .action-item{
            @flex-col-center();
            font-size: 14px;
        }
    }
    .chat-list{
        margin-top: 5px;
        border-radius: 9px;
        overflow: hidden;
    }
</style>
