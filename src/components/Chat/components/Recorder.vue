<template>
    <div class="luyin-panel" v-model="show" @close="onClose" closeable>
        <div @click="onStart" v-if="!recording">
            <van-image :src="require('../../../static/img/icon/btn_luzhi.png')"></van-image>
            <p>点击开始录制</p>
        </div>
        <div @click="onEnd" v-if="recording">
            <h1>{{timeLong}}″</h1>
            <van-circle v-model="circleModel"
                        rate="100"
                        :speed="speed"
                        layer-color="#F5F5F5"
                        color="#367DF7"
            >
                <div class="circle-spot"></div>
            </van-circle>
            <p>录制中,点击完成录制并发送</p>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {ActionSheet, Circle, Image as VanImage} from 'vant';
    import Recorder from 'js-audio-recorder';
    import {upload} from "../../../service/userCommonService";

    Vue.use(Circle);
    Vue.use(VanImage);
    Vue.use(ActionSheet);
    export default {
        props: ['show'],
        created(){
            this.recorder = new Recorder();
            this.bindEvents()
        },
        data() {
            return {
                recording: false, //默认非录制状态
                timeLong: 0,
                speed: 100 /60,
                circleModel: 0
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
                    this.$emit('update:show', false);
                    this.$emit('recorderSuccess', result.data.data)
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
    .circle-spot{
        height: 25px;
        width: 25px;
        background: #367DF7;
        border-radius: 4px;
        display: inline-block;
        margin-top: 35px;
    }
</style>
