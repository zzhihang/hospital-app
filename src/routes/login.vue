<template>
    <div class="login">
        <van-button class="close-btn" color="rgba(254, 123, 53, 0.1)" round>关闭</van-button>
        <van-image :src="require('../static/img/login/pic_zhi.png')"/>
        <h1>知识付费平台</h1>
        <van-button
                class="login-button"
                type="primary"
                @click="onLoginClick"
                :icon="require('../static/img/login/icon_weixindenglu.png')">微信授权登录</van-button>
        <p class="copyright">
            <van-checkbox v-model="checked" checked-color="#FE7B35" shape="square" icon-size="12px">已阅读并同意知识付费平台协议隐私政策</van-checkbox>
        </p>
        <van-popup v-model="show" round get-container="body" position="bottom" :style="{ height: '50%' }" />
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Button, Checkbox, Image as VanImage, Popup} from 'vant';

    Vue.use(Checkbox);
    Vue.use(VanImage);
    Vue.use(Button);
    Vue.use(Popup);

    export default {
        data() {
            return {
                checked: false,
                show: true,
            }
        },
        methods: {
            onLoginClick() {
                this.show = true;
            }
        },
    }
</script>

<style lang="less" scoped>
    .login {
        position: relative;
        height: 100%;
        background: url("../static/img/login/bg.png") no-repeat;
        background-size: cover;
        text-align: center;

        .close-btn {
            position: absolute;
            right: 15px;
            top: 30px;
            color: #D94F17 !important;
            font-size: 14px;
            height: 24px;
        }

        .van-image{
            height: 100px;
            width: 100px;
            margin-top: 130px;
        }
        h1{
            margin-top: 25px;
            color: #333333;
            font-size: 24px;
        }
        .login-button{
            width: 300px;
            margin-top: 105px;
            font-size: 18px;
            .van-icon{
                margin-top: 4px;
                margin-right: 2px;
            }
        }
    }
    .copyright{
        font-size: 12px;
        color: #666666;
        position: absolute;
        bottom: 31px;
        text-align: center;
        width: 100%;
        .van-checkbox{
            justify-content: center;
        }
    }
</style>
