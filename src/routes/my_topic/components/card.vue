<template>
    <div class="card">
        <avatar></avatar>
        <div class="detail">
            <p>体验地图是基于用户研究开展的需要借助用户画像去界定范围，形成用户材料，再去考虑用何种体验可视化地图展现。
                <span class="topic">#朱志航话题</span>
            </p>
            <div class="img-list">
                <van-image
                        class="mr5"
                        round
                        width="110"
                        height="110"
                        radius="6"
                        src="https://img01.yzcdn.cn/vant/cat.jpeg" v-for="(item, index) in 3" :key="index"></van-image>
            </div>
        </div>
        <div class="bottom-info">
            <span class="date">2022.03.10  12:10</span>
            <div class="action">
                <span>
                    <van-icon name="chat-o" size="15"/>
                    <span>13</span>
                </span>
                <span class="ml10 mr10">|</span>
                <span>
                    <van-icon name="chat-o" size="15"/>
                    <span>13</span>
                </span>
            </div>
        </div>
        <div class="comment-list">
            <h6 class="font16 mt22">评论</h6>
            <comment class="mt20" v-for="(item, index) in 5" :key="index"></comment>
        </div>
        <div class="more">查看更多>></div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Icon, Image as VanImage} from 'vant';
    import comment from './comment'
    import avatar from './avatar'

    Vue.use(VanImage);
    Vue.use(Icon);

    export default {
        components: {
            avatar,
            comment
        }
    }
</script>

<style lang="less" scoped>
    .card {
        padding: 15px;
        background: #FFFFFF;
    }

    .detail {
        font-size: 15px;
        color: #666666;
        line-height: 21px;
        margin-top: 13px;
    }

    .topic {
        color: #D94F17;
    }

    .img-list {
        margin-top: 15px;
    }

    .bottom-info {
        @flex-sb-center();

        .date {
            color: #999999;
            font-size: 12px;
        }
        .action{
            @flex-sb-center();
            span{
                font-size: 16px;
                display: flex;
                align-items: center;
            }
        }
    }
    .comment-list{
        padding-bottom: 17px;
    }
    .more{
        color: #D94F17;
        font-size: 14px;
        border-top: 1px solid #ddd;
        padding-top: 10px;
        @flex-sb-center();
    }
</style>
