<template>
    <div class="comment">
        <avatar size="small"></avatar>
        <div class="comment-box">
            <p class="content">用户体验地图是通过“故事化+图形化”的方式，直观的展示用户在产品使用过程中的情绪曲线，帮助我们从全局视角审视产品。</p>
            <div class="reply-list">
                <div>
                    <div class="user-info">
                        <avatar size="small"></avatar>
                        <span class="font13 ml6 mr6" style="color: #666;">回复</span>
                        <avatar size="small" :has-photo="false"></avatar>
                    </div>
                    <p class="reply-content">说的对，确实是这样的，受益匪浅。</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import avatar from "./avatar";

    export default {
        components: {
            avatar
        }
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
        }
    }
    .reply-content{
        font-size: 13px;
        color: #666666;
        margin-top: 10px;
        padding-left: 26px;
    }
</style>
