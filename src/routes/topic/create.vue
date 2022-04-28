<template>
    <div class="body">
        <van-form ref="form" @submit="onSubmit">
            <div class="upload">
                <van-uploader
                        :after-read="afterRead"
                        v-model="fileList"
                        max-count="1">
                    <div class="upload-box">
                        <van-image :src="require('../../static/img/topic/icon_zhaoxiangji.png')"/>
                    </div>
                </van-uploader>
            </div>
            <van-cell-group>
                <div class="van-hairline--bottom">
                    <h1 class="field-title van-field-title">专题名称</h1>
                    <van-field
                            required
                            :rules="[{ required: true, message: '请填写专题名称' }]"
                            v-model="formData.title"
                            placeholder="请设置专题名称"
                    />
                </div>
                <div class="van-hairline--bottom mr15 ml15"></div>
                <van-field
                        label-class="van-field-title"
                        v-model="formData.introduction"
                        rows="1"
                        required
                        autosize
                        :rules="[{ required: true, message: '请填写专题简介' }]"
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
                        <van-radio-group
                                v-model="formData.free"
                                direction="horizontal"
                                @change="onFreeChange"
                                :rules="[{ required: true, message: '请选择' }]"
                        >
                            <van-radio name="0">付费专题</van-radio>
                            <van-radio name="1">免费专题</van-radio>
                        </van-radio-group>
                    </van-cell>
                    <h6 class="sub-title">
                        <span>设置专题费用</span>
                        <span class="font12" style="color: #D94F17">(创建后不可更改)</span>
                    </h6>
                    <van-field
                            v-model="formData.price"
                            :disabled="formData.free === '1' || !ifEnablePriceDict"
                            :required="ifEnablePriceDict"

                            type="number"
                            @blur="inputHandler"
                            :rules="[{ required: ifEnablePriceDict, message: '请设置专题费用' }]"
                            :placeholder="placeHolder"
                    />
                </div>
                <div class="van-hairline--bottom"></div>
                <div class="van-hairline--bottom mr15 ml15"></div>
                <van-field
                        readonly
                        label-class="van-field-title"
                        clickable
                        required
                        name="picker"
                        v-model="formData.subscribeTypeText"
                        right-icon="arrow"
                        label="有效期"
                        :rules="[{ required: true, message: '请选择有效期' }]"
                        input-align="right"
                        placeholder="请选择"
                        @click="showPicker = true"
                />
                <van-popup v-model="showPicker" position="bottom">
                    <van-picker
                            show-toolbar
                            :value="formData.subscribeType"
                            :columns="columns"
                            @confirm="onConfirm"
                            @cancel="showPicker = false"
                    />
                </van-popup>
            </van-cell-group>

            <van-cell-group>
                <van-field required name="switch" label="全员禁言" input-align="right">
                    <template #input>
                        <van-switch disabled v-model="formData.forbidden" size="20" :active-value="1" :inactive-value="0"/>
                    </template>
                </van-field>
            </van-cell-group>
        </van-form>
        <div class="button-box">
            <van-button class="submit-button" type="primary" @click="onSubmit">完成</van-button>
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
    import {createTopic, zhuantiInfo} from "@/service/topic/topService";
    import {upload} from "@/service/commonService";
    import {dictPrice} from "../../service/dict/dictService";
    import {compressFile} from "@/static/js/fileUtils";

    Vue.use(Form);
    Vue.use(VanImage);
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
                ifEnablePriceDict: false,
                noLimit: false,
                priceMin: 0,
                priceMax: 0,
                formData: {
                    title: '',
                    introduction: '',
                    imgUrl: '',
                    subscribeType: '',
                    subscribeTypeText: '',
                    free: '',
                    price: '',
                    forbidden: 1,
                }
            }
        },
        created(){
            this.getDictPrice();
            const {id} = this.$route.query;
            id && this.getDetail();
        },
        methods: {
            inputHandler () {
                const value = Number(this.formData.price);
                if(value){
                    this.formData.price = Number(value); //将022格式的数字转换成22
                }
                if(String(this.formData.free) === '0' && value && !this.noLimit){//收费专题才去控制输入范围
                    if(value > this.priceMax || value < this.priceMin){
                        this.formData.price = '';
                        this.$toast.fail(`请输入${this.priceMin}-${this.priceMax}的整数`);
                    }
                }
            },
            async getDictPrice(){
                const result = await dictPrice();
                const {data} = result;
                this.ifEnablePriceDict = String(result.enable) !== '1';
                this.noLimit = data.noLimit;
                this.priceMin = data.priceMin;
                this.priceMax = data.priceMax;
            },
            async getDetail(){
                const {id} = this.$route.query;
                const {data} = await zhuantiInfo({id});
                const model = data;
                this.formData = model;
                this.formData.free = String(model.free);
                this.formData.subscribeTypeText = this.columns.filter((item) => item.value === model.subscribeType)[0].text;
                this.fileList.push({url: model.imgUrl});
            },
            async afterRead(file) {
                const result = await compressFile(file.file);
                const formData = new FormData();
                formData.append('file', result);
                const {data} = await upload(formData);
                this.formData.imgUrl = data.data.url;
            },
            onConfirm(e) {
                this.showPicker = false;
                this.formData.subscribeType = e.value;
                this.formData.subscribeTypeText = e.text;
            },
            async onSubmit() {
                if(!this.fileList.length){
                    return this.$toast.fail('请上传图片')
                }
                if(this.ifEnablePriceDict && String(this.formData.free) === '0' && (Number(this.formData.price)> this.priceMax || Number(this.formData.price) < this.priceMin)){
                    return this.$toast.fail(`专题费用请输入${this.priceMin}-${this.priceMax}的整数`);
                }
                await this.$refs.form.validate().then(async () => {
                    const result = await createTopic(this.formData);
                    if (result.status === 200) {
                        this.$toast.success('操作成功');
                        this.$router.go(-1);
                    }else{
                        this.$toast.fail(result.msg);
                    }
                }).catch(() => {
                    this.$toast.fail(result.msg )
                })

            },
            onFreeChange(e) {
                this.formData.free = e;
                if (e === '1') {
                    this.formData.price = 0
                }else{
                    this.inputHandler();
                }
            },
        },
        watch: {
            fileList(){
                if(this.fileList.length === 0){
                    this.formData.imgUrl = ''
                }
            }
        },
        computed: {
            placeHolder(){
                if(!this.noLimit){
                    return `¥ ${this.priceMin}-${this.priceMax}的整数`
                }
                return '¥ 请输入大于0的整数'
            }
        }
    }
</script>

<style lang="less" scoped>
    .body{
        @flex-column();
        .van-form{
            flex: 1;
        }
    }
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

    /deep/ .van-field-title {
        font-size: 18px;
        color: #333333;
        font-weight: bold;
    }

    .sub-title {
        font-weight: normal;
        color: #333333;
    }

    .van-cell-group {
        margin-top: 5px;
    }

    .button-box {
        background: #FFFFFF;
        margin-top: 30px;
        /*position: fixed;*/
        /*bottom: 0;*/
        /*left: 0;*/
        /*right: 0;*/
        padding: 27px 15px 30px;
    }

    .submit-button {
        height: 44px;
        width: 100%;
    }

    .upload-box {
        width: 180px;
        height: 120px;
        background: url("../../static/img/topic/pic_tupian.png");
        background-size: cover;
        @flex-all-center();

        .van-image {
            height: 54px;
            width: 54px;
        }
    }
</style>
