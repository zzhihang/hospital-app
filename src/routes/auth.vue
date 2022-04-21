<template>
    <div class="login">
        <!--<van-button class="close-btn" color="rgba(254, 123, 53, 0.1)" round @click="closeWindow">关闭</van-button>-->
        <van-image :src="require('../static/img/logo.png')"/>
        <h1>知识付费平台</h1>
        <van-button
                class="login-button"
                type="primary"
                @click="onLoginClick"
                :icon="require('../static/img/login/icon_weixindenglu.png')">微信授权登录</van-button>
        <p class="copyright">
            <van-checkbox v-model="checked" checked-color="#FE7B35" shape="square" icon-size="12px">已阅读并同意<span @click="$router.push({path: '/agreement'})">知识付费平台协议、</span><span @click="$router.push({path: '/privacy'})">隐私政策</span></van-checkbox>
        </p>
        <van-popup class="login-pop" v-model="show" round get-container="body" position="bottom" :style="{ height: '45%' }" >
            <div class="title">
                <div>
                    <span class="logo">知</span>
                    <span>知识付费平台 申请</span>
                </div>
                <van-icon name="info-o" color="#999999" size="18"/>
            </div>
            <div class="content">
                <h2>获取你的手机号</h2>
                <p>用于使用第三方账号授权登录的情形</p>
                <div class="van-hairline--top van-hairline--bottom mt20">
                    <van-field v-model="phone" placeholder="请输入手机号" />
                </div>
            </div>
            <div class="button-box">
                <van-button class="reject-button" color="#F2F2F2">拒绝</van-button>
                <van-button color="#07BF67" @click="sendSms">允许</van-button>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Button, Checkbox, Field, Icon, Image as VanImage, Popup} from 'vant';
    import {sendSms} from "@/service/commonService";
    import {getParams} from "@/static/js/util";

    Vue.use(Field);
    Vue.use(Icon);
    Vue.use(Checkbox);
    Vue.use(VanImage);
    Vue.use(Button);
    Vue.use(Popup);

    export default {
        data() {
            return {
                checked: false,
                show: false,
                phone: '',
            }
        },
        methods: {
            onLoginClick() {
                if(!this.checked){
                    return this.$toast.fail('请阅读并同意隐私政策');
                }
                const {kcode} = getParams();
                window.location.href = '/api/redirect?kcode=' + kcode
            },
            async sendSms(){
                if(!this.phone){
                    return this.$toast.fail('请输入手机号');
                }
                const result = await sendSms();
                if(result.status === 200){
                    this.$toast.success('发送成功')
                }

            },
            closeWindow(){
                window.close();
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

    .login-pop{
        padding: 25px;
    }

    .title{
        font-weight: bold;
        @flex-sb-center();
        .logo{
            display: inline-block;
            width: 26px;
            height: 26px;
            text-align: center;
            line-height: 26px;
            margin-right: 7px;
            border-radius: 50%;
            font-size: 14px;
            color: #FFFFFF;
            background: #FE7B35;
        }
        span{
            font-size: 15px;
        }
    }

    .van-popup--bottom{
        right: 0;
        width: unset;
        .van-cell{
            padding: 18px 0pt;
        }
    }
    .content{
        margin-top: 30px;
        h2{
            font-size: 17px;
            color: #121212;
        }
        p{
            font-size: 14px;
            color: #6A6A6A;
            margin-top: 15px;
        }
    }
    .button-box{
        margin-top: 50px;
        text-align: center;
        .van-button {
            width: 120px;
            height: 38px;
            font-weight: bold;
        }
        .reject-button{
            margin-right: 15px;
            color: #07BF67 !important;

        }
    }
    .copyright{
        font-size: 12px;
        color: #666666;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 31px;
        text-align: center;
        width: 100%;
        .van-checkbox{
            justify-content: center;
        }
        span{
            text-decoration: underline;
            color: @main-color;
        }
    }
</style>
