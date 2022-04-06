<template>
    <div class="login">
        <div class="login-content">
            <div class="login-item">
                <div class="login-title">
                    <van-icon :name="require('../static/img/login/icon_shoujihao.png')" size="16"/>
                    <span>手机号</span>
                </div>
                <div class="login-input">
                    <van-field placeholder="请输入手机号" v-model="phone"/>
                </div>
            </div>
            <div class="login-item">
                <div class="login-title">
                    <van-icon :name="require('../static/img/login/icon_yanzhengma.png')" size="16"/>
                    <span>验证码</span>
                </div>
                <div class="login-input">
                    <van-field placeholder="请输入验证码" v-model="code">
                        <template #button>
                            <span class="send-sms" v-show="!counting" @click="sendSms">获取验证码</span>
                            <van-count-down
                                    v-show="counting"
                                    ref="countDown"
                                    class="send-sms"
                                    :time="time"
                                    format="ss"
                                    :auto-start="false"
                                    @finish="onCountDownFinish"
                            />
                        </template>
                    </van-field>
                </div>
            </div>
            <van-button type="primary" @click="login">立即绑定</van-button>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Button, Checkbox, CountDown, Field, Icon, Image as VanImage, Popup} from 'vant';
    import {login, sendSms} from "@/service/commonService";
    import connect from "@/store/connect";

    Vue.use(CountDown);
    Vue.use(Field);
    Vue.use(Icon);
    Vue.use(Checkbox);
    Vue.use(VanImage);
    Vue.use(Button);
    Vue.use(Popup);
    const {mapState, mapMutations} = connect('commonStore');
    export default {
        data() {
            return {
                checked: false,
                show: true,
                phone: '15210821694',
                code: '',
                time: 60 * 1000,
                counting: false
            }
        },
        methods: {
            ...mapMutations(['setUserInfo', 'setIsBozhu']),
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
                const result = await sendSms(this.phone);
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
                const result = await login({phone, code});
                if(result.status === 200){
                    const data = result.data;
                    this.setUserInfo(data);
                    this.setIsBozhu(data.userType === 1);
                    window.sessionStorage.setItem('isBozhu', data.userType === 1);
                    this.$router.push({
                        path: '/topic'
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
        background: url("../static/img/login/bg.png") no-repeat;
        padding: 20px 15px;
        background-size: cover;
    }
    .login-content{
        border-radius: 9px;
        background: #EFF5F3;
        padding: 30px 15px;
        border: 1px solid #ECE7E1;
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
            background: #EFF5F3;
            margin-top: 15px;
        }
        .login-item{
            margin-top: 15px;
        }
    }
    .van-button{
        margin-top: 30px;
        width: 100%;
        font-size: 18px;
        height: 44px;
    }
    .send-sms{
        color: #FE7B35;
    }
</style>
