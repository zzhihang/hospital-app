<template>
    <van-action-sheet class="luyin-panel" v-model="show" @close="onClose" closeable>
        <div @click="onStart" v-if="!recording">
            <van-image :src="require('../../static/img/dynamic/btn_luzhi.png')"></van-image>
            <p>点击开始录制</p>
        </div>
        <div @click="onEnd" v-if="recording">
            <h1>{{timeLong}}″</h1>
            <van-image :src="require('../../static/img/dynamic/btn_luzhi.png')"></van-image>
            <p>录制中,点击完成录制</p>
        </div>
    </van-action-sheet>
</template>

<script>
    import Vue from 'vue';
    import {ActionSheet, Image as VanImage} from 'vant';

    Vue.use(VanImage);
    Vue.use(ActionSheet);
    import Recorder from 'js-audio-recorder';
    import {upload} from "@/service/commonService";
    export default {
        props: ['show'],
        created(){
            this.recorder = new Recorder();
            this.bindEvents()
        },
        data() {
            return {
                recording: false, //默认非录制状态
                timeLong: 0
            }
        },
        methods: {
            onStart(){
                this.recording = true;
                this.recorder.start().then(() => {
                }, (error) => {
                    this.$toast.fail(`${error.name} : ${error.message}`)
                });
            },
            onEnd(){
                if(this.timeLong <= 1){
                    return this.$toast.fail('语音录制不能低于1S')
                }
                this.recorder.stop();
                const data = this.recorder.getWAV();
                const file = new File([data], 'recorder');
                this.upload(file);
                this.recording = false;
            },
            async upload(file){
                const formData = new FormData();
                formData.append('file', file);
                formData.append('timeLong', this.timeLong);
                const result = await upload(formData);
                if(result.status === 200){
                    this.$toast.success('录制成功');
                    this.$emit('update:show', false)
                }
            },
            bindEvents(){
                this.recorder.onprogress = (params) => {
                    this.timeLong = Math.ceil(params.duration);
                    if(this.timeLong >=60){
                        this.onEnd();
                        this.$toast('语音至多录制60S');
                    }
                }
            },
            onClose() {
                this.$emit('update:show', false)
            },
        },
    }
</script>

<style lang="less" scoped>
    .luyin-panel {
        text-align: center;
        padding: 75px 0;

        .van-image {
            height: 100px;
            width: 100px;
        }

        p {
            color: #999999;
            font-size: 16px;
            margin-top: 20px;
        }
        h1{
            font-size: 16px;
            color: #666666;
            font-weight: normal;
            margin-bottom: 15px;
        }
    }

    /deep/ .van-action-sheet__content {
        overflow-y: unset;
    }
</style>
