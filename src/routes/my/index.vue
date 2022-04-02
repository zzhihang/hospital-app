<template>
    <div class="body">
        <div class="base-info">
            <van-image
                    class="avatar"
                    round
                    :src="userInfo.headimgurl"
            />
            <h1>{{userInfo.nickname}}</h1>
            <p>ID:{{userInfo.id}}</p>
            <div class="edit" @click="goEdit">
                <van-image
                        width="12"
                        height="13"
                        :src="icon_bianji"
                />
                <span>编辑</span>
            </div>
        </div>
        <div class="content">
            <div class="wallet" :class="userType" @click="onWalletClick">
                <div class="left">
                    <van-icon :name="icon"/>
                    <span class="font18" style="color: #333333;">{{text}}</span>
                </div>
                <div class="num">
                    <span>{{userInfo.money}}</span>
                    <van-icon size="14" name="arrow" color="#666666"/>
                </div>
            </div>
        </div>
        <div class="login-out" @click="logOut">退出登录</div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Icon, Image as VanImage} from 'vant';
    import {userinfo} from "@/service/topic/topService";
    import connect from "@/store/connect";
    import {logout} from "@/service/commonService";

    Vue.use(Icon);
    Vue.use(VanImage);

    const {mapState, mapMutations} = connect('commonStore');
    export default {
        data() {
            return {
                icon: '',
                icon_bianji: require('@static/img/my/icon_bianji.png'),
                text: '',
            }
        },
        created() {
            this.getUserInfo();
        },
        methods: {
            ...mapMutations(['setUserInfo']),
            async getUserInfo() {
                const {data} = await userinfo();
                this.setUserInfo(data); //实时更新全局vuex
            },
            goEdit() {
                this.$router.push({
                    path: 'my/info'
                })
            },
            logOut() {
                this.$confirm({
                    message: '您确定要退出登录吗？'
                }, async () => {
                    const result = await logout();
                    if(result.status === 200){
                        this.$toast.success('退出成功');
                    }
                })
            },
            onWalletClick(){
                this.$router.push({
                    path: '/my/wallet'
                })
            }
        },
        computed: {
            ...mapState(['userInfo', 'isBozhu'])
        },
        watch: {
            userType: {
                handler() {
                    if (this.isBozhu) {
                        this.icon = require('@static/img/my/icon_qianbao.png');
                        this.text = '钱包'
                    } else {
                        this.icon = require('@static/img/my/icon_dingdan.png');
                        this.text = '订单明细';
                    }
                },
                immediate: true

            }
        }
    }
</script>

<style lang="less" scoped>
    .body {
        display: flex;
        flex-direction: column;
    }

    .base-info {
        width: 100%;
        height: 210px;
        background: url("../../static/img/my/bg_shang.png") no-repeat;
        background-size: cover;
        text-align: center;
        color: #FFFFFF;

        .avatar {
            margin-top: 19px;
            width: 78px;
            height: 78px;
        }

        h1 {
            font-size: 21px;
            margin-top: 12px;
        }

        p {
            font-size: 16px;
            margin-top: 10px;
        }
    }

    .content {
        background: #FFFFFF;
        flex: 1;
        transform: translateY(-20px);
        border-radius: 18px 18px 0 0;
        padding: 30px 15px;

        .wallet {
            &.vistor {
                background: url("../../static/img/my/bg_dingdanmingxi.png") no-repeat;
                background-size: cover;
            }

            background: url("../../static/img/my/bg_qianbao.png") no-repeat;
            background-size: cover;
            padding: 25px 12px 25px 25px;
            @flex-sb-center();

            .left {
                @flex-sb-center();

                span {
                    margin-left: 10px;
                }
            }

            .num {
                color: #666666;
                font-size: 16px;
            }
        }
    }

    .login-out {
        background: #FFFFFF;
        font-size: 16px;
        color: #D94F17;
        line-height: 40px;
        text-align: center;
        margin-top: -10px;
        margin-bottom: 60px;
    }

    .edit {
        position: fixed;
        top: 116px;
        right: 0;
        height: 26px;
        line-height: 26px;
        width: 73px;
        background: #FDC7AB;
        box-shadow: 0 0 12px 0 rgba(153, 153, 153, 0.18);
        border-radius: 13px 0 0 13px;
        @flex-all-center();

        span {
            font-size: 14px;
            color: #D94F17;
            margin-left: 4px;
        }
    }

</style>
