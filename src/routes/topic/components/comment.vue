<template>
    <div class="comment">
        <avatar size="small" :name="data.userName" :photo="data.headimgurl"></avatar>
        <div class="comment-box">
            <p class="content" @click="onCommentItemClick">{{data.content}}</p>
            <div class="reply-list">
                <div class="reply-item" v-for="(item, index) in data.children" :key="index">
                    <div class="user-info">
                        <avatar size="small" :name="item.userName" :photo="item.headimgurl"></avatar>
                        <span class="font13 ml6 mr6" style="color: #666;">回复</span>
                        <avatar size="small" :has-photo="false" :name="item.toUserName"></avatar>
                    </div>
                    <p class="reply-content">{{item.content}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import avatar from "./avatar";

    export default {
        props: ['data'],
        components: {
            avatar
        },
        methods: {
            onCommentItemClick() {
                this.$emit('onCommentItemClick', this.data)
            }
        },
    }
</script>

<style lang="less" scoped>
    .comment {
        .comment-box{
            padding-left: 28px;
        }
        .content{
            color: #333333;
            line-height: 21px;
            font-size: 14px;
        }
        .reply-list{
            background: #F5F5F5;
            border-radius: 12px;
            padding: 15px;
            margin-top: 15px;
            .user-info{
                display: flex;
                align-items: center;
            }
            .reply-item{
                margin-bottom: 13px;
                &:last-child{
                    margin-bottom: 0;
                }
            }
        }
    }
    .reply-content{
        font-size: 13px;
        color: #666666;
        margin-top: 10px;
        padding-left: 26px;
    }
</style>
