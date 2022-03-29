<template>
    <div class="body">
        <div class="upload">
            <van-uploader :after-read="afterRead" v-model="fileList" max-count="1">
                <div class="upload-box">
                    <van-image :src="require('../../static/img/topic/icon_zhaoxiangji.png')"/>
                </div>
            </van-uploader>
        </div>
        <van-cell-group>
            <div class="van-hairline--bottom">
                <h1 class="field-title van-field-title">专题名称</h1>
                <van-field
                        v-model="formData.title"
                        required
                        placeholder="请设置专题名称"
                />
            </div>
            <div class="van-hairline--bottom mr15 ml15"></div>
            <van-field
                    label-class="van-field-title"
                    v-model="formData.introduction"
                    rows="1"
                    autosize
                    required
                    label="专题简介"
                    type="textarea"
                    maxlength="100"
                    placeholder="请简要描述专题简介..."
                    show-word-limit
            />
        </van-cell-group>

        <van-cell-group>
            <div>
                <h1 class="field-title van-field-title">专题费用</h1>
                <van-cell required>
                    <van-radio-group v-model="formData.free" direction="horizontal">
                        <van-radio name="1">付费专题</van-radio>
                        <van-radio name="0">免费专题</van-radio>
                    </van-radio-group>
                </van-cell>
                <h6 class="sub-title">
                    <span>设置专题费用</span>
                    <span class="font12" style="color: #D94F17">(创建后不可更改)</span>
                </h6>
                <van-field
                        v-model="formData.price"
                        required
                        type="number"
                        placeholder="¥ 50-6000的整数"
                />
            </div>
            <div class="van-hairline--bottom"></div>
            <div class="van-hairline--bottom mr15 ml15"></div>
            <van-field
                    required
                    readonly
                    label-class="van-field-title"
                    clickable
                    name="picker"
                    :value="formData.subscribeType"
                    right-icon="arrow"
                    label="有效期"
                    placeholder="请选择"
                    @click="showPicker = true"
            />
            <van-popup v-model="showPicker" position="bottom">
                <van-picker
                        show-toolbar
                        :columns="columns"
                        @confirm="onConfirm"
                        @cancel="showPicker = false"
                />
            </van-popup>
        </van-cell-group>

        <van-cell-group>
            <van-field name="switch" label="全员禁言">
                <template #input>
                    <van-switch v-model="formData.forbidden" size="20" />
                </template>
            </van-field>
        </van-cell-group>
        <div class="button-box">
            <van-button class="submit-button" type="primary" @click="submit">完成</van-button>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {
        Button,
        Cell,
        CellGroup,
        Field,
        Form,
        Image as VanImage,
        Picker,
        Popup,
        Radio,
        RadioGroup,
        Switch,
        Uploader
    } from 'vant';
    import {createTopic} from "@/service/topic";
    import {upload} from "@/service/commonService";

    Vue.use(VanImage)
    Vue.use(Button);
    Vue.use(Cell);
    Vue.use(CellGroup);
    Vue.use(Picker);
    Vue.use(Uploader);
    Vue.use(Form);
    Vue.use(Field);
    Vue.use(Popup);
    Vue.use(Radio);
    Vue.use(RadioGroup);
    Vue.use(Switch);

    export default {
        data() {
            return {
                fileList: [],
                showPicker: false,
                switchChecked: false,
                columns: [
                    {text: '按月度计算', value: 'month'},
                    {text: '按季度计算', value: 'quarter'},
                    {text: '按年度计算', value: 'year'}
                ],
                formData: {
                    title: '',
                    introduction: '',
                    imgUrl: '',
                    subscribeType: '',
                    free: '',
                    price: '',
                    forbidden: 0,
                }
            }
        },
        methods: {
            async afterRead(file) {
                const formData = new FormData();
                formData.append('file', file.file);
                const {data} = await upload(formData);
                this.formData.imgUrl = data.data.url;
            },
            onConfirm(){
                this.showPicker = false;
            },
            async submit(){
                const result = await createTopic(this.formData);
                if(result.status === 200){
                    this.$toast.success('操作成功');
                    this.$router.go(-1);
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .upload {
        background: #FFFFFF;
        text-align: center;
        padding: 15px 0;
    }

    .field-title, .sub-title {
        background: #FFFFFF;
        padding-left: 15px;
        padding-right: 15px;
        padding-top: 15px;
    }
    /deep/.van-field-title{
        font-size: 18px;
        color: #333333;
        font-weight: bold;
    }
    .sub-title{
        font-weight: normal;
        color: #333333;
    }
    .van-cell-group{
        margin-top: 5px;
    }
    .button-box{
        background: #FFFFFF;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 27px 15px 30px;
    }
    .submit-button{
        height: 44px;
        width: 100%;
    }
    .upload-box{
        width: 180px;
        height: 120px;
        background: url("../../static/img/topic/pic_tupian.png");
        background-size: cover;
        @flex-all-center();
        .van-image{
            height: 54px;
            width: 54px;
        }
    }
</style>
