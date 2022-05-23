<template>
    <div class="login">
        <div class="login-content">
            <div class="login-item">
                <div class="login-title">
                    <van-icon :name="require('../../static/img/icon/icon_shouji.png')" size="16"/>
                    <span>手机号</span>
                </div>
                <div class="login-input">
                    <van-field placeholder="请输入手机号" v-model="phone"/>
                </div>
            </div>
            <div class="login-item">
                <div class="login-title">
                    <van-icon :name="require('../../static/img/icon/icon_yanzhengma.png')" size="16"/>
                    <span>验证码</span>
                </div>
                <div class="login-input">
                    <van-field placeholder="请输入验证码" v-model="code">
                        <template #button>
                            <van-button
                                    class="send-sms"
                                    color="#D6E3F8"
                                    size="mini"
                                    type="primary"
                                    v-show="!counting"
                                    @click="sendSms">获取验证码</van-button>
                            <van-count-down
                                    v-show="counting"
                                    ref="countDown"
                                    class="send-sms"
                                    :time="time"
                                    format="ss秒后再次发送"
                                    :auto-start="false"
                                    @finish="onCountDownFinish"
                            />
                        </template>
                    </van-field>
                </div>
            </div>
            <van-button class="login-button" type="primary" @click="login">立即绑定</van-button>
        </div>
    </div>
</template>

<script>
  import Vue from 'vue';
  import {Checkbox, CountDown, Field, Icon, Image as VanImage, Popup} from 'vant';
  import connect from "@/store/connect";
  import {doctorBind, doctorSendSms} from "@/service/doctorCommonService";

  Vue.use(CountDown);
    Vue.use(Field);
    Vue.use(Icon);
    Vue.use(Checkbox);
    Vue.use(VanImage);
    Vue.use(Popup);
    const {mapState, mapMutations} = connect('commonStore');
    export default {
        data() {
            return {
                checked: false,
                show: true,
                phone: '',
                code: '',
                time: 60 * 1000,
                counting: false,
                agreementEnable: false,
                privacyEnable: false
            }
        },
        methods: {
            ...mapMutations(['setUserInfo']),
            onLoginClick() {
                this.show = true;
            },
            async sendSms(){
                if(!this.phone){
                    return this.$toast.fail('请输入手机号');
                }
                if(this.phone.length !== 11){
                    return this.$toast.fail('请输入正确的手机号');
                }
                this.$refs.countDown.start();
                this.counting = true;
                const result = await doctorSendSms(this.phone);
                if(result.status === 200){
                    this.$toast.success('发送成功')
                }
            },
            onCountDownFinish(){
                this.counting = false;
                this.$refs.countDown.reset();
            },
            async login(){
                if(!this.phone){
                    return this.$toast.fail('请输入手机号');
                }
                if(this.phone.length !== 11){
                    return this.$toast.fail('请输入正确的手机号');
                }
                if(!this.code){
                    return this.$toast.fail('请输入验证码');
                }
                const {phone, code} = this;
                const result = await doctorBind({phone, code});
                if(result.status === 200){
                    const data = result.data;
                    this.setUserInfo(data);
                    this.$router.push({
                        path: '/doctor/app'
                    });
                }else{
                    this.$toast.fail(result.msg);
                }
            }
        },
    }
</script>

<style lang="less" scoped>
    .login{
        height: 100%;
        padding: 20px 15px;
        background-size: cover;
        box-sizing: border-box;
        background: url("../../static/img/bg.png");
        background-size: cover;
    }
    .login-content{
        border-radius: 9px;
        padding: 30px 0;
        .login-title{
            font-size: 16px;
            font-weight: bold;
            span{
                margin-left: 4px;
            }
        }
        .van-field{
            border: 0.026667rem solid rgb(88 98 119 / 30%);
            border-radius: 12px;
            background: transparent;
            margin-top: 15px;
        }
        .login-item{
            margin-top: 15px;
        }
    }
    .login-button{
        margin-top: 30px;
        width: 100%;
        font-size: 18px;
        height: 44px;
    }
    .send-sms{
        color: #367DF7 !important;
        font-size: 13px;
        padding: 4px 10px;
    }
    .copyright{
        font-size: 12px;
        color: #666666;
        width: 100%;
        margin-top: 10px;
        span{
            text-decoration: underline;
            color: @main-color;
        }
    }
</style>
