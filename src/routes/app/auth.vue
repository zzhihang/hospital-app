<template>
    <div class="login">
        <van-image :src="logo"/>
        <h1>普林互联网医院就诊端</h1>
        <div class="login-button-box">
            <van-button
                    class="login-button"
                    type="primary"
                    :icon="require('../../static/img/icon/icon_weixin.png')"
                    @click="onLoginClick">微信授权登录
            </van-button>
        </div>
    </div>
</template>

<script>
  import Vue from 'vue';
  import {Button, Checkbox, Field, Icon, Image as VanImage} from 'vant';
  import {getParams} from "@/static/js/util";
  import {getSystemSetting} from "@/service/commonService";

  Vue.use(Field);
  Vue.use(Icon);
  Vue.use(Checkbox);
  Vue.use(VanImage);
  Vue.use(Button);

  export default {
    data() {
      return {
        logo: require('../../static/img/logo.png')
      }
    },
    methods: {
      onLoginClick() {
        const {kcode} = getParams();
        window.location.href = '/api/user/redirect?kcode=' + kcode
      },
    },
    created() {
      getSystemSetting().then(({data}) => {
        this.logo = data.logo
      })
    },
  }
</script>

<style lang="less" scoped>
    .login {
        position: relative;
        height: 100%;
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

        .van-image {
            height: 100px;
            width: 100px;
            margin-top: 130px;
        }

        h1 {
            margin-top: 25px;
            color: #333333;
            font-size: 24px;
        }

        .login-button {
            width: 300px;
            margin-top: 10px;
            font-size: 18px;

            .van-icon {
                margin-top: 4px;
                margin-right: 2px;
            }
        }
    }

    .copyright {
        font-size: 12px;
        color: #666666;
        width: 100%;
        padding-left: 40px;

        span {
            text-decoration: underline;
            color: @main-color;
        }
    }

    .login-pop {
        padding: 25px;
    }

    .title {
        font-weight: bold;
        @flex-sb-center();

        .logo {
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

        span {
            font-size: 15px;
        }
    }

    .van-popup--bottom {
        right: 0;
        width: unset;

        .van-cell {
            padding: 18px 0pt;
        }
    }

    .content {
        margin-top: 30px;

        h2 {
            font-size: 17px;
            color: #121212;
        }

        p {
            font-size: 14px;
            color: #6A6A6A;
            margin-top: 15px;
        }
    }

    .button-box {
        margin-top: 50px;
        text-align: center;

        .van-button {
            width: 120px;
            height: 38px;
            font-weight: bold;
        }

        .reject-button {
            margin-right: 15px;
            color: #07BF67 !important;

        }
    }

    .login-button-box {
        margin-top: 95px;
    }
</style>
