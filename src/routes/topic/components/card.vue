<template>
    <div class="card">
        <div class="avatar-action">
            <avatar :name="data.userName" :photo="data.headimgurl"></avatar>
            <van-popover @select="onSelectPopover" v-model="showPopover" placement="bottom-end" trigger="click" :actions="actions">
                <template #reference>
                    <van-image :src="require('../../../static/img/topic/icon_action.png')"></van-image>
                </template>
            </van-popover>
        </div>
        <div class="detail">
            <div>
                <p v-html='data.title'></p>
                <!--<span class="topic">{{getLabelString(data.labelList)}}</span>-->
            </div>
            <div class="doc-list">
                <doc-card
                        v-if="data.type === 'doc'"
                        v-for="(item, index) in data.contentObject"
                        :name="item.name"
                        :type="item.type"
                        :url="item.url"
                        :key="index"/>
            </div>
            <div class="img-list" v-if="data.type === 'pic'">
                <van-image
                        class="mr5"
                        round
                        width="110"
                        height="110"
                        radius="6"
                        :src="item.url"
                        v-for="(item, index) in data.contentObject"
                        :key="index" />
            </div>
            <teplate v-for="(item, index) in data.contentObject" :key="index">
                <audio-player v-if="data.type === 'voice'" :long="item.timeLong" :url="item.url"/>
            </teplate>
        </div>
        <div class="bottom-info">
            <span class="date">{{data.ctime}}</span>
            <div class="action">
                <span @click="onCommentClick">
                    <van-icon class="mt4 mr4" :name="commentIcon" size="15"/>
                    <span>{{data.commentCount}}</span>
                </span>
                <span class="ml10 mr10" style="color: #F5F5F5;">|</span>
                <span @click="onZanClick">
                    <van-icon class="mr4" :name="ifZan ? dianzanPressIcon : dianzanIcon" size="15"/>
                    <span>{{data.upCount}}</span>
                </span>
            </div>
        </div>
        <div class="comment-list">
            <h6 class="font16 mt22">评论</h6>
            <template v-if="data.comments.length > 0">
                <comment
                        class="mt20"
                        :data="item"
                        v-for="(item, index) in data.comments"
                        :key="index"
                        @onCommentItemClick="onCommentItemClick"
                />
            </template>
            <div v-else class="comment-none">暂无评论，快来评论吧</div>
        </div>
        <div class="more" v-if="data.comments.length > 8">查看更多>></div>
        <div class="comment-input" v-show="commentShow">
            <h2><span>评论</span>{{this.currentCommentTo}}</h2>
            <div class="input-area">
                <van-field
                        ref="commentInput"
                        v-model="content"
                        rows="2"
                        autosize
                        type="textarea"
                        maxlength="100"
                        placeholder="请输入您要评论的内容"
                        show-word-limit
                />
                <span class="send-button" :class="{active: content.length > 0}" @click="sendComment">发表</span>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Field, Icon, Image as VanImage, Popover} from 'vant';
    import comment from './comment'
    import avatar from './avatar'
    import {commentPost, deleteTopic, dianZan} from "@/service/topic/topService";
    import docCard from "@/routes/topic/components/docCard";
    import audioPlayer from "@/routes/dynamic/components/audioPlayer";

    Vue.use(Field);
    Vue.use(Popover);
    Vue.use(VanImage);
    Vue.use(Icon);

    export default {
        props: ['data'],
        components: {
            avatar,
            comment,
            docCard,
            audioPlayer
        },
        data() {
            return {
                commentIcon: require('@static/img/topic/icon_pinglun.png'),
                dianzanIcon: require('@static/img/topic/icon_dianzan.png'),
                dianzanPressIcon: require('@static/img/topic/icon_dianzan_pressed.png'),
                dianguozanIcon: require('@static/img/topic/icon_dianzan_pressed.png'),
                showPopover: false,
                actions: [
                    { text: '编辑', action: 'edit', icon: require('@static/img/topic/icon_bianji.png')},
                    { text: '删除', action: 'del', icon: require('@static/img/topic/icon_shanchu.png')},
                ],
                type: 'doc',
                content: '',
                commentShow: false,
                currentCommentTo: '',
                ifZan: String(this.data.up) === '1'
            }
        },
        watch: {
            labelList: {
                handler(){
                    this.data.labelList.forEach(item => {
                        const keyword = '#' + item.label;
                        const reg = new RegExp(keyword, 'ig');
                        this.data.title = this.data.title.replace(reg, `<span style="color: #D94F17;">${keyword}</span>`);

                    });
                },
                immediate: true,
                deep: true
            }
        },
        methods: {
            onSelectPopover(e) {
                if(e.action === 'edit'){
                    this.$router.push({
                        path: '/dynamic',
                        query: {
                            id: this.data.id,
                            zhuantiId: this.$route.query.id
                        }
                    })
                }
                if(e.action === 'del'){
                    this.$confirm({message: '您确定要删除此动态？'}, async () => {
                        const result = await deleteTopic(this.data.id);
                        if(result.status === 200){
                            this.$toast.success('删除成功');
                            this.$emit('deleteSuccess')
                        }
                    })
                }
            },
            async onZanClick(){
                const result = await dianZan(this.data.id);
                if(result.status === 200){
                    this.$emit('onZanClick');
                    this.ifZan = !this.ifZan;
                    this.$toast.success('操作成功')
                }
            },
            onCommentClick(name){
                this.currentCommentTo = this.data.userName;
                this.$refs.commentInput.focus();
                this.commentShow = true;
            },
            onCommentItemClick(data){
                this.onCommentClick(data.userName);
                this.parentId = data.id;
            },
            getLabelString(data){
                if(!data || !data.length){
                    return ''
                }
                const d = data.map(item => item.label);
                return '#' + d.join('#')
            },
            async sendComment(){
                const params = {
                    itemId: this.data.id,
                    content: this.content
                };
                if(this.parentId){
                    params.parentId = this.parentId;
                }
                const result = await commentPost(params);
                if(result.status === 200){
                    this.$toast.success('评论成功');
                }
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

    .img-list, .doc-list {
        margin-top: 15px;
        display: flex;
        flex-wrap: nowrap;
        overflow-x: scroll;
        .doc-card{
            flex-shrink: 0;
            margin-right: 10px;
        }
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
    .comment-input{
        background: #FFFFFF;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 15px 15px 20px;
        h2{
            font-size: 14px;
            color: #333333;
            span{
                font-weight: normal;
                color: #666666;
            }
        }
        .van-field{
            background: #F5F5F5;
            flex: 1;
        }
        .input-area{
            margin-top: 12px;
            display: flex;
            align-items: center;
        }
        .send-button{
            flex-shrink: 0;
            color: #BBBBBB;
            font-size: 16px;
            margin-left: 13px;
            &.active{
                color: @main-color;
            }
        }
    }
    .comment-none{
        color: #999999;
        text-align: center;
        margin-top: 10px;
        font-size: 14px;
    }
</style>
