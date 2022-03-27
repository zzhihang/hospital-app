<template>
    <div class="card">
        <div class="avatar-action">
            <avatar></avatar>
            <van-popover @select="onSelectPopover" v-model="showPopover" placement="bottom-end" trigger="click" :actions="actions">
                <template #reference>
                    <van-image :src="require('../../../static/img/topic/icon_action.png')"></van-image>
                </template>
            </van-popover>
        </div>
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
                    <van-icon class="mt4 mr4" :name="commentIcon" size="15"/>
                    <span>13</span>
                </span>
                <span class="ml10 mr10" style="color: #F5F5F5;">|</span>
                <span @click="onZanClick">
                    <van-icon class="mr4" :name="dianzanIcon" size="15"/>
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
    import {Icon, Image as VanImage, Popover} from 'vant';
    import comment from './comment'
    import avatar from './avatar'
    import {deleteDongtai, dianZan} from "@/service/topic";

    Vue.use(Popover);
    Vue.use(VanImage);
    Vue.use(Icon);

    export default {
        components: {
            avatar,
            comment
        },
        data() {
            return {
                commentIcon: require('@static/img/topic/icon_pinglun.png'),
                dianzanIcon: require('@static/img/topic/icon_dianzan.png'),
                dianguozanIcon: require('@static/img/topic/icon_dianzan_pressed.png'),
                showPopover: false,
                actions: [
                    { text: '编辑', action: 'edit', icon: require('@static/img/topic/icon_bianji.png')},
                    { text: '删除', action: 'del', icon: require('@static/img/topic/icon_shanchu.png')},
                ],
            }
        },
        methods: {
            onSelectPopover(e) {
                if(e.action === 'edit'){

                }
                if(e.action === 'del'){
                    this.$confirm({message: '您确定要删除此动态？'}, async () => {
                        const {data} = await deleteDongtai();
                        //TODO 删除
                    })
                }
            },
            async onZanClick(){
                const {data} = await dianZan(this.data.id)
            }
        },
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
        margin-top: 4px;
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
    .avatar-action{
        @flex-sb-center();
        .van-image{
            width:20px;
        }
    }
</style>
