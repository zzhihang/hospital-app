<template>
    <div class="body">
        <van-field
                v-model="dynamic"
                rows="20"
                autosize
                :border="false"
                :disabled="recorderList.length > 0"
                type="textarea"
                placeholder="点击此处说点什么..."
        >
            <template #extra>fadsfsadfsd</template>
        </van-field>
        <div class="pl10" style="background: #FFFFFF;overflow-x: scroll;">
            <van-uploader
                    accept=".png, .jpg, .jpeg"
                    v-if="imgList.length"
                    capture="camera"
                    v-model="imgList"
                    multiple
                    max-count="2"
                    :after-read="afterRead"
                    upload-icon="plus"
            />
            <van-uploader
                    class="file-uploader"
                    max-count="9"
                    accept=".doc,.pdf,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    v-if="fileList.length"
                    :after-read="afterReadFile"
                    v-model="fileList"
                    upload-icon="plus"
            >
                    <template #preview-cover="file">
                    <div class="file-cover-box">
                        <van-image :src="getFile(file)"/>
                        <span class="file-name">{{file && file.name}}</span>
                    </div>
                </template>
            </van-uploader>
            <div class="recorder-list">
                <audio-player
                        v-if="recorderList.length"
                        v-for="(item, index) in recorderList"
                        :long="item.timeLong"
                        :key="index"
                />
            </div>
        </div>
        <div class="tool-bar van-hairline--top">
            <div class="tool-bar-item" v-for="(item, index) in toolbar" :key="index" @click="item.click">
                <van-uploader
                        v-if="item.type === 'image'"
                        accept=".png, .jpg, .jpeg"
                        :after-read="afterRead2"
                        capture="camera"
                        max-count="9"
                        :disabled="imgList.length === 9 || fileList.length > 0 || recorderList.length > 0"
                >
                    <van-icon :name="item.icon"></van-icon>
                </van-uploader>
                <van-uploader v-else-if="item.type === 'file'"
                              max-count="9"
                              :disabled="fileList.length === 9 || imgList.length > 0 || recorderList.length > 0"
                              accept=".doc,.pdf,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              :after-read="afterReadFile2">
                    <van-icon :name="item.icon"></van-icon>
                </van-uploader>
                <van-icon :class="{disabled: recorderList.length === 1 || imgList.length > 0 || fileList.length > 0}" v-else-if="item.type === 'recorder'"
                          :name="item.icon"
                ></van-icon>
                <van-icon v-else :name="item.icon"></van-icon>
            </div>
        </div>
        <div class="action-bar">
            <van-button class="cancel-button" type="default" @click="cancel">取消</van-button>
            <van-button class="submit-button" type="primary"
                        :disabled="recorderList.length === 0 && imgList.length === 0 && fileList.length === 0 && !dynamic"
                        @click="publish">发表</van-button>
        </div>
        <recorder :show.sync="luyinPanelShow" @recorderSuccess="recorderSuccess"></recorder>
        <van-popup v-model="biaoqianPanelShow" get-container="body" position="right" :style="{ height: '100%', width: '80%' }">
            <label-list @cancelClick="cancelClick" @chooseLabel="chooseLabel"></label-list>
        </van-popup>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Button, Field, Icon, Popup, Uploader} from 'vant';
    import {Image as VanImage} from 'vant';
    import recorder from "@/routes/dynamic/components/recorder";
    import labelList from "@/routes/dynamic/labelList";
    import {upload} from "@/service/commonService";
    import audioPlayer from "@/routes/dynamic/components/audioPlayer";
    import {postDynamic} from "@/service/topic";

    Vue.use(VanImage);
    Vue.use(Uploader);
    Vue.use(Button);
    Vue.use(Field);
    Vue.use(Icon);
    Vue.use(Popup);

    export default {
        components: {
            recorder,
            labelList,
            audioPlayer
        },
        data() {
            return {
                toolbar: [{
                    icon: require('@static/img/dynamic/btn_tupian.png'),
                    type: 'image',
                    click: () => {

                    }
                },{
                    icon: require('@static/img/dynamic/btn_wenjian.png'),
                    type: 'file',
                    click: () => {

                    }
                }, {
                    icon: require('@static/img/dynamic/btn_yuyin.png'),
                    type: 'recorder',
                    click: () => {
                        if(this.recorderList.length === 1 || this.imgList.length > 0 || this.fileList.length > 0){
                            return false;
                        }
                        this.luyinPanelShow = true;
                    }
                }, {
                    icon: require('@static/img/dynamic/btn_biaoqian.png'),
                    click: () => {
                        this.biaoqianPanelShow = true;
                    }
                }],
                luyinPanelShow: false,
                biaoqianPanelShow: false,
                imgList: [],
                fileList: [],
                recorderList: [],
                labelList: [],
                dynamic: '',
            }
        },
        methods: {
            recorderSuccess(e){
                this.recorderList.push(e)
            },
            cancel(){
              this.$router.go(-1)
            },
            async publish(){
                const params = {
                    zhuantiId: this.$route.query.zhuantiId
                };
                let type = 'text';
                let list = [];
                if(this.fileList.length){
                    type = 'doc';
                    list = this.fileList;
                }
                if(this.imgList.length){
                    type = 'pic';
                    list = this.imgList;
                }
                if(this.recorderList.length){
                    type = 'voice';
                    list = this.recorderList;
                }
                params.type = type;
                params.contentObject = JSON.stringify(list);
                params.labelListStr = JSON.stringify(this.labelList);
                params.title = this.dynamic;
                if(type === 'text'){
                    params.contentObject = this.dynamic;
                }
                const result = await postDynamic(params);
                if(result.status){
                    this.$toast.success('发布成功');
                    this.$router.go(-1);
                }
            },
            cancelClick() {
                this.biaoqianPanelShow = false;
            },
            chooseLabel(e){
                this.labelList.push(e);
                this.dynamic = this.dynamic + this.labelList.map(item => '#' + item.label).join('');
                this.biaoqianPanelShow = false;
            },
            upload(file){
                const formData = new FormData();
                formData.append('file', file);
                return upload(formData);
            },
            async afterRead(file){
                await this.upload(file.file)
            },
            async afterRead2(file){
                const {data} = await this.upload(file.file);
                this.imgList.push({url: data.data.url}) //上传axios是重新生成的实例 没有走统一拦截器 所以要取两层
            },
            async afterReadFile(file){
                const {data} = await this.upload(file.file);
            },
            async afterReadFile2(file){
                const {data} = await this.upload(file.file);
                this.fileList.push({url: data.data.url, name: file.file.name, type: file.file.type}) //上传axios是重新生成的实例 没有走统一拦截器 所以要取两层
            },
            getFile(file){
                const type = file.type;
                if(type.includes('pdf')){
                    return require('@static/img/dynamic/pic_pdf.png')
                }else{
                    return require('@static/img/dynamic/pic_word.png')
                }
            }
        },
    }
</script>

<style lang="less" scoped>
    .body{
        @flex-column();
    }
    .van-field{
        flex: 1;
    }
    .tool-bar {
        display: flex;
        padding: 14px 15px;
        background: #FFFFFF;
        .tool-bar-item{
            margin-right: 30px;
        }
    }

    .action-bar {
        margin-top: 6px;
        @flex-sb-center();
        padding: 11px 15px;
        @white-bg();
        .van-button{
            height: 38px;
        }
        .cancel-button{
            width: 90px;
            flex-shrink: 0;
            margin-right: 10px;
        }
        .submit-button{
            flex: 1;
        }
    }

    /deep/.van-uploader__wrapper{
        overflow-x: scroll;
        flex-wrap: nowrap;
        .van-uploader__upload{
            flex-shrink: 0;
        }
    }
    .file-uploader{
        /deep/.van-uploader__file{
            flex-direction: row;
            width: 162px;
            height: 53px;
            padding: 0 30px 0 10px;
        }
        /deep/.van-uploader__upload{
            height: 53px;
            width: 53px;
        }
        /deep/.van-uploader__file-name, /deep/.van-uploader__file-icon{
           visibility: hidden;
        }
        /deep/.van-uploader__preview-cover{
            display: flex;
            justify-content: center;
        }
        .file-cover-box{
            display: flex;
            align-items: center;
            .file-name{
                color: #666666;
                font-size: 12px;
                margin-left: 8px;
            }
            .van-image{
                width: 27px;
                height: 33px;
            }
        }
    }

    .van-icon.disabled{
        opacity: 0.5;
    }
</style>
