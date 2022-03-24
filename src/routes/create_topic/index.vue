<template>
    <div class="body">
        <div class="upload">
            <van-uploader :after-read="afterRead"/>
        </div>
        <van-cell-group>
            <div>
                <h1 class="field-title van-field-title">专题名称</h1>
                <van-field
                        v-model="value1"
                        placeholder="请设置专题名称"
                />
            </div>
            <div class="van-hairline--bottom mr15 ml15"></div>
            <van-field
                    label-class="van-field-title"
                    v-model="message"
                    rows="1"
                    autosize
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
                <van-cell>
                    <van-radio-group v-model="radio" direction="horizontal">
                        <van-radio name="1">付费专题</van-radio>
                        <van-radio name="2">免费专题</van-radio>
                    </van-radio-group>
                </van-cell>
                <h6 class="sub-title">
                    <span>设置专题费用</span>
                    <span class="font12" style="color: #D94F17">(创建后不可更改)</span>
                </h6>
                <van-field
                        v-model="value1"
                        placeholder="¥ 50-6000的整数"
                />
            </div>
            <div class="van-hairline--bottom"></div>
            <div class="van-hairline--bottom mr15 ml15"></div>
            <van-field
                    readonly
                    label-class="van-field-title"
                    clickable
                    name="picker"
                    :value="value"
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
                    <van-switch v-model="switchChecked" size="20" />
                </template>
            </van-field>
        </van-cell-group>
        <div class="button-box">
            <van-button class="submit-button" type="primary">完成</van-button>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Button, Cell, CellGroup, Field, Form, Picker, Popup, Radio, RadioGroup, Switch, Uploader} from 'vant';

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
                message: '',
                value: '',
                value1: '',
                showPicker: false,
                switchChecked: false,
                radio: '',
                columns: ['按月度计算', '按季度计算', '按年度计算'],
            }
        },
        methods: {
            afterRead(file) {
                // 此时可以自行将文件上传至服务器
                console.log(file);
            },
            onConfirm(){

            }
        }
    }
</script>

<style lang="less" scoped>
    .upload {
        background: #FFFFFF;
        text-align: center;
        height: 150px;
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
</style>
