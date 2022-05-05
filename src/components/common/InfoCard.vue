<template>
    <div class="info-card">
        <van-image :src="avatar" round/>
        <div style="overflow:hidden;flex: 1;">
            <doctor-title name="朱志航" color="white" title="主人"></doctor-title>
            <p class="intro">牛逼科</p>
            <div class="focus">
                <div class="mr12" @click="() => $emit('click1')">
                    <span class="num" style="color: #F6AA26;">3</span>
                    <span>关注医生</span>
                    <my-icon size="6" name="icon_jinru_01"/>
                </div>
                <div @click="() => $emit('click2')">
                    <span class="num">3</span>
                    <span>就诊人管理</span>
                    <my-icon size="6" name="icon_jinru_01"/>
                </div>
            </div>
        </div>
        <van-button color="#E7F0FE" @click="() => $emit('logout')">
            退出登录
        </van-button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import DoctorTitle from "@/components/doctor/DoctorTitle";
    import MyIcon from "@/components/common/MyIcon";

    export default {
        components: {
            DoctorTitle,
            MyIcon
        },
        props: {
            avatar: {
                type: String,
                default: ''
            },
        }
    }
</script>

<style lang="less" scoped>
    .info-card{
        background: linear-gradient(180deg, #FBFDFF 0%, #F0F6FF 100%);
        padding: 26px 0 26px 21px;
        border-radius: 6px;
        display: flex;
        &.dark{
            background: url("../../static/img/doctor/bg_shang.png");
            background-size: cover;
            .intro{
                color: rgba(255, 255, 255, 0.8);
            }
        }
        .intro{
            font-size: 12px;
            color: #999999;
            margin-top: 8px;
        }
        .van-image{
            height: 75px;
            width: 75px;
            flex-shrink: 0;
            margin-right: 10px;
        }
        .van-button{
            font-size: 12px;
            width: 66px;
            height: 22px;
            line-height: 22px;
            padding: 0;
            flex-shrink: 0;
            color: @main-color !important;
            font-weight: bold;
        }
    }
    .focus{
        font-size: 12px;
        display: flex;
        margin-top: 12px;
        .num{
            font-weight: bold;
            font-size: 16px;
            color: @main-color;
            margin-right: 3px;
        }
    }
</style>
