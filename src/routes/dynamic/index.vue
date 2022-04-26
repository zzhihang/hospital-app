<template>
    <div class="body">
        <van-field
                v-model="dynamic"
                rows="15"
                autosize
                :border="false"
                type="textarea"
                placeholder="点击此处说点什么..."
        >
        </van-field>
        <div class="pl10" style="background: #FFFFFF;overflow-x: scroll;">
            <van-uploader
                    accept="image/*"
                    v-if="imgList.length"
                    v-model="imgList"
                    :max-size="maxSize"
                    @oversize="onOversize"
                    multiple
                    max-count="9"
                    :after-read="afterRead"
                    upload-icon="plus"
            />
            <van-uploader
                    class="file-uploader"
                    max-count="9"
                    accept="application/pdf,.pdf,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    v-if="fileList.length"
                    :max-size="maxSize"
                    @oversize="onOversize"
                    :after-read="afterReadFile"
                    v-model="fileList"
                    upload-icon="plus"
            >
                    <template #preview-cover="file">
                    <div class="file-cover-box">
                        <van-image :src="getFileInfo(file).logo"/>
                        <span class="file-name">{{getFileInfo(file).name}}</span>
                    </div>
                </template>
            </van-uploader>
            <div class="recorder-list">
                <audio-player
                        v-if="recorderList.length"
                        v-for="(item, index) in recorderList"
                        :long="item.timeLong"
                        :url="item.url"
                        :allow-close="true"
                        @onDeleteClick="onDeleteClick"
                        :key="index"
                />
            </div>
        </div>
        <!--<div class="topic-list">-->
            <!--<span v-for="(item, index) in labelList" :key="index">#{{item.label}}</span>-->
        <!--</div>-->
        <div class="tool-bar van-hairline--top">
            <div class="tool-bar-item" v-for="(item, index) in toolbar" :key="index" @click="item.click">
                <van-uploader
                        v-if="item.type === 'image'"
                        accept="image/*"
                        :max-size="maxSize"
                        @oversize="onOversize"
                        :after-read="afterRead2"
                        max-count="9"
                        :disabled="imgList.length === 9 || fileList.length > 0 || recorderList.length > 0"
                >
                    <van-icon size="24" :name="item.icon"></van-icon>
                </van-uploader>
                <van-uploader v-else-if="item.type === 'file'"
                              max-count="9"
                              :max-size="maxSize"
                              @oversize="onOversize"
                              :disabled="fileList.length === 9 || imgList.length > 0 || recorderList.length > 0"
                              accept="application/pdf,.pdf,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              :after-read="afterReadFile2">
                    <van-icon size="24" :name="item.icon"></van-icon>
                </van-uploader>
                <van-icon size="24" :class="{disabled: recorderList.length === 1 || imgList.length > 0 || fileList.length > 0}" v-else-if="item.type === 'recorder'"
                          :name="item.icon"
                ></van-icon>
                <van-icon size="24" v-else :name="item.icon"></van-icon>
            </div>
        </div>
        <div class="action-bar">
            <van-button class="cancel-button" type="default" @click="cancel">取消</van-button>
            <van-button class="submit-button" type="primary"
                        :disabled="recorderList.length === 0 && imgList.length === 0 && fileList.length === 0 && !dynamic"
                        :loading="buttonLoading"
                        loading-text="正在发布..."
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
    import {dyncmicInfo, postDynamic} from "@/service/topic/topService";
    import {compressFile} from "@/static/js/fileUtils";

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
                maxSize: 1024 * 1024 *30,
                luyinPanelShow: false,
                biaoqianPanelShow: false,
                imgList: [],
                fileList: [],
                recorderList: [],
                labelList: [],
                dynamic: '',
                buttonLoading: false
            }
        },
        beforeRouteLeave(to, from, next){
            if(to.path !== '/label_list'){
                this.setPageInit();
            }
            next();
        },
        activated(){
            if(this.$route.query.id){
                this.getDetail()
            }
        },
        created(){
            if(this.$route.query.id){
                this.getDetail()
            }
        },
        methods: {
            setPageInit(){
                this.imgList = [];
                this.fileList = [];
                this.recorderList = [];
                this.labelList = [];
                this.dynamic = [];
            },
            onOversize(){
                this.$toast.fail('文件大小不能超过30M')
            },
            async getDetail(){
                const {data} = await dyncmicInfo(this.$route.query.id);
                this.dynamic = data.title;
                this.labelList = data.labelList;
                if(data.type === 'pic'){
                    this.imgList = data.contentObject;
                }else if(data.type === 'doc'){
                    this.fileList = data.contentObject;
                }else if(data.type === 'voice'){
                    this.recorderList = data.contentObject;
                }
            },
            recorderSuccess(e){
                this.recorderList.push(e);
            },
            onDeleteClick(){
                this.recorderList = [];
            },
            cancel(){
              this.$router.go(-1)
            },
            async publish(){
                this.$loading.show();
                this.buttonLoading = true;
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
                if(this.$route.query.id){
                    params.id = this.$route.query.id;
                }
                params.type = type;
                params.contentObject = JSON.stringify(list);
                params.labelListStr = JSON.stringify(this.labelList);
                params.title = this.dynamic;
                if(type === 'text'){
                    params.contentObject = this.dynamic;
                }
                const result = await postDynamic(params);
                this.$loading.hide();
                this.buttonLoading = false;
                if(result.success){
                    this.$toast.success('发布成功');
                    this.$router.go(-1);
                }else{
                    this.$toast.fail(result.msg)
                }
            },
            cancelClick() {
                this.biaoqianPanelShow = false;
            },
            chooseLabel(e){
                if(this.labelList.includes(e)){
                    return this.$toast.fail('不能重复选择')
                }
                this.labelList.push(e);
                this.dynamic = this.dynamic + '#' + e.label;
                this.biaoqianPanelShow = false;
            },
            upload(file){
                const formData = new FormData();
                formData.append('file', file);
                return upload(formData);
            },
            async afterRead(file){
                const result = await compressFile(file.file);
                this.$loading.show();
                const {data} = await this.upload(result);
                if(data.success){
                    this.imgList.splice(this.imgList.length - 1, 1, {url: data.data.url});
                }else{
                    this.$toast.fail(data.msg);
                }
                this.$loading.hide();

            },
            async afterRead2(file){
                const result = await compressFile(file.file);
                this.$loading.show();
                const {data} = await this.upload(result);
                if(data.success){
                    this.imgList.push({url: data.data.url}) //上传axios是重新生成的实例 没有走统一拦截器 所以要取两层
                }else{
                    this.$toast.fail(data.msg);
                }
                this.$loading.hide();
            },
            async afterReadFile(file){
                this.$loading.show();
                const {data} = await this.upload(file.file);
                if(data.success){
                    this.fileList.splice(this.fileList.length - 1, 1, {url: data.data.url, name: file.file.name, type: file.file.type});
                }else{
                    this.$toast.fail(data.msg);
                }
                this.$loading.hide();
            },
            async afterReadFile2(file){
                this.$loading.show();
                const {data} = await this.upload(file.file);
                if(data.success){
                    this.fileList.push({url: data.data.url, name: file.file.name, type: file.file.type}) //上传axios是重新生成的实例 没有走统一拦截器 所以要取两层
                }else{
                    this.$toast.fail(data.msg);
                }
                this.$loading.hide();
            },
            getFileInfo(file){
                file = file.file || file;
                const result = {
                    logo: '',
                    name: file.name
                };
                let type = file.type;
                if(file.file){
                    type = file.file.type; //两种上传规则
                }
                if(type.includes('pdf')){
                    result.logo = require('@static/img/dynamic/pic_pdf.png');
                }else{
                    result.logo = require('@static/img/dynamic/pic_word.png');
                }
                return result;
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
            min-width: 170px;
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
    .topic-list{
        background: #FFFFFF;
        font-size: 14px;
        color: @main-color;
        padding-left: 10px;
        padding-bottom: 10px;
        span{
            margin-right: 4px;
        }
    }
</style>
