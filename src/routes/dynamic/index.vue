<template>
    <div class="body">
        <van-field
                v-model="message"
                rows="1"
                autosize
                type="textarea"
                placeholder="点击此处说点什么..."
        />
        <div class="pl10" style="background: #FFFFFF;">
            <van-uploader
                    accept=".png, .jpg, .jpeg"
                    v-if="imgList.length"
                    v-model="imgList"
                    multiple
                    :after-read="afterRead"
                    upload-icon="plus"
            />
            <van-uploader
                    class="file-uploader"
                    accept=".doc,.pdf,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    :after-read="afterReadFile"
                    v-model="fileList"
                    upload-icon="plus"
            >
                <template #preview-cover>
                    hha
                </template>
            </van-uploader>
        </div>
        <div class="tool-bar van-hairline--top">
            <div class="tool-bar-item" v-for="(item, index) in toolbar" :key="index" @click="item.click">
                <van-uploader v-if="item.type === 'image'" accept=".png, .jpg, .jpeg" :after-read="afterRead2">
                    <van-icon :name="item.icon"></van-icon>
                </van-uploader>
                <van-uploader v-else-if="item.type === 'file'"
                              accept=".doc,.pdf,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              :after-read="afterReadFile2">
                    <van-icon :name="item.icon"></van-icon>
                </van-uploader>
                <van-icon v-else :name="item.icon"></van-icon>
            </div>
        </div>
        <div class="action-bar">
            <van-button class="cancel-button" type="default">取消</van-button>
            <van-button class="submit-button" type="primary" disabled>发表</van-button>
        </div>
        <recorder :show.sync="luyinPanelShow"></recorder>
        <van-popup v-model="biaoqianPanelShow" get-container="body" position="right" :style="{ height: '100%', width: '80%' }">
            <label-list @cancelClick="cancelClick"></label-list>
        </van-popup>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Button, Field, Icon, Popup, Uploader} from 'vant';
    import {Image as VanImage} from 'vant';
    import recorder from "@/routes/dynamic/recorder";
    import labelList from "@/routes/dynamic/labelList";
    import {upload} from "@/service/commonService";

    Vue.use(VanImage);
    Vue.use(Uploader);
    Vue.use(Button);
    Vue.use(Field);
    Vue.use(Icon);
    Vue.use(Popup);

    export default {
        components: {
            recorder,
            labelList
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
                    click: () => {
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
            }
        },
        methods: {
            cancelClick() {
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
                this.fileList.push({url: data.data.url}) //上传axios是重新生成的实例 没有走统一拦截器 所以要取两层
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
            width: unset;
            height: 53px;
            padding: 0 30px 0 10px;
        }
        /deep/.van-uploader__upload{
            height: 53px;
            width: 53px;
        }
    }
</style>
