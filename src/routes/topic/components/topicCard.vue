<template>
    <div class="card">
        <div class="avatar-action">
            <avatar :name="data.userName" :photo="data.headimgurl"></avatar>
            <van-popover v-bozhu @select="onSelectPopover" v-model="showPopover" placement="bottom-end" trigger="click" :actions="actions">
                <template #reference>
                    <van-image :src="require('../../../static/img/topic/icon_action.png')"></van-image>
                </template>
            </van-popover>
        </div>
        <div class="dynamic-status" v-if="data.status === 2">
            <van-notice-bar left-icon="close" background="#FFF7F3" mode="closeable" wrapable>
                {{data.audit}}
                <template #right-icon>
                    <div style="align-self: center" @click="goEdit">
                        重新编辑>>
                    </div>
                </template>
            </van-notice-bar>
        </div>
        <div class="detail">
            <div>
                <overflow-line-hidden :content="data.title"/>
            </div>
            <div class="doc-list" v-if="data.type === 'doc'">
                <doc-card
                        v-for="(item, index) in data.contentObject"
                        :name="item.name"
                        @click.native="onDocCardClick(item)"
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
            <template v-for="(item, index) in data.contentObject">
                <audio-player v-if="data.type === 'voice'" :long="item.timeLong" :key="index" :url="item.url"/>
            </template>
        </div>
        <div class="bottom-info">
            <span class="date">{{data.ctime}}</span>
            <div class="action">
                <span @click.stop="onCommentClick">
                    <van-icon class="mt4 mr4" :name="commentIcon" size="15"/>
                    <span>{{data.commentCount}}</span>
                </span>
                <span class="ml10 mr10" style="color: #F5F5F5;">|</span>
                <span @click.stop="onZanClick">
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
        <van-popup v-model="pdfShow" position="bottom" :style="{ height: '80%' }" get-container="body" closeable>
            <template v-for="i in pdfPages">
                <pdf :page="i" ref="pdf" :src="pdfUrl"></pdf>
            </template>
        </van-popup>
        <van-popup v-model="wordShow" position="bottom" :style="{ height: '80%' }" get-container="body" closeable>
            <div ref="file"></div>
        </van-popup>
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
    import {Field, Icon, Image as VanImage, NoticeBar, Popover, Popup} from 'vant';
    import comment from './comment'
    import avatar from './avatar'
    import {commentPost, deleteTopic, dianZan} from "@/service/topic/topService";
    import docCard from "@/routes/topic/components/docCard";
    import audioPlayer from "@/routes/dynamic/components/audioPlayer";
    import pdf from 'vue-pdf'
    import axios from 'axios';
    import overflowLineHidden from "@/components/common/overflowLineHidden";

    Vue.use(NoticeBar);
    let docx = require('docx-preview');

    Vue.use(Field);
    Vue.use(Popover);
    Vue.use(VanImage);
    Vue.use(Icon);

    Vue.use(Popup);

    export default {
        name: 'topicCard',
        props: ['data', 'forbidden', 'subscribe'],
        components: {
            avatar,
            comment,
            docCard,
            audioPlayer,
            pdf,
            overflowLineHidden
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
                ifZan: String(this.data.up) === '1',
                pdfUrl: '',
                pdfPages: 1,
                pdfShow: false,
                wordShow: false,
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
            goEdit(){
                this.$router.push({
                    path: '/dynamic',
                    query: {
                        id: this.data.id,
                        zhuantiId: this.$route.query.id
                    }
                })
            },
            onSelectPopover(e) {
                if(e.action === 'edit'){
                    this.goEdit();
                }
                if(e.action === 'del'){
                    this.$confirm({message: '您确定要删除此动态？'}, async () => {
                        const result = await deleteTopic(this.data.id);
                        if(result.status === 200){
                            this.$toast.success('删除成功');
                            this.$emit('deleteSuccess', this.data.id);
                        }
                    })
                }
            },
            async onZanClick(){
                if(!this.subscribe){
                    return this.$toast.fail('请先订阅')
                }
                const result = await dianZan(this.data.id);
                if(result.status === 200){
                    if(this.ifZan){
                        this.data.upCount = this.data.upCount - 1;
                    }else{
                        this.data.upCount = this.data.upCount + 1;
                    }
                    this.$emit('onZanClick');
                    this.ifZan = !this.ifZan;
                    this.$toast.success('操作成功')
                }
            },
            previewPdf(url) {
                const loadingTask = pdf.createLoadingTask(url);
                this.pdfShow = true;
                //this.$toast('正在解析文件,请稍候...');
                loadingTask.promise.then(pdf => {
                    this.pdfUrl = loadingTask;
                    this.pdfPages = pdf.numPages;
                });
            },
            onCommentClick(name){
                // if(!this.subscribe){
                //     return this.$toast.fail('请先订阅')
                // }
                if(!this.ifForbidden()){
                    return;
                }
                this.currentCommentTo = this.data.userName;
                this.$refs.commentInput.focus();
                this.commentShow = true;
            },
            ifForbidden(){
                if(String(this.forbidden) === '1' && sessionStorage.getItem('isBozhu')!== 'true'){//博主 禁严
                    this.$toast.fail('该专题已设置了全员禁言，您无法评论');
                    return false;
                }
                return true
            },
            onCommentItemClick(data){
                this.onCommentClick(data.userName);
                this.parentId = data.id;
            },
            onDocCardClick(data){
                if(data.type.includes('pdf')){
                    this.previewPdf(data.url)
                }else{
                    this.wordShow = true;
                    axios({
                        method: 'get',
                        responseType: 'blob', // 设置响应文件格式
                        url:  data.url,
                    }).then(data => {
                        docx.renderAsync(data, this.$refs.file) // 渲染到页面预览
                    })
                }
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
    .van-notice-bar{
        font-size: 12px;
        align-items: unset;
        /deep/.van-notice-bar__left-icon{
            min-width: unset;
            margin-top: 7px;
            font-size: 12px;
            margin-right: 2px;
        }
    }
</style>
