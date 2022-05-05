<template>
    <div class="doctor-card" :class="mode">
        <van-image v-if="avatar" :src="avatar" round/>
        <div style="overflow:hidden;flex: 1;">
            <doctor-title :name="name" :color="mode" :title="title"></doctor-title>
            <p class="intro">{{dept}}</p>
            <p class="intro ellipsis1">{{hospital}}</p>
            <div class="tag-list" v-if="tagList.length">
                <van-tag color="#33B4D1" type="primary" v-for="(item, index) in tagList" :key="index">{{item}}</van-tag>
            </div>
        </div>
        <van-button v-if="showFocus" plain type="primary" @click="onFollowClick">
            <my-icon name="icon_guanzhu" size="12"></my-icon>
            <span class="ml3">{{follow ? '已关注' : '关注'}}</span>
        </van-button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import DoctorTitle from "@/components/doctor/DoctorTitle";
    import MyIcon from "@/components/common/MyIcon";
    import {doctorFollow, doctorUnFollow} from "@/service/doctorService";

    export default {
        components: {
            DoctorTitle,
            MyIcon
        },
        props: {
            name: String,
            title: String,
            hospital: String,
            dept: String,
            doctorId: [String, Number],
            tagList: {
                type: Array,
                default: () => []
            },
            avatar: {
                type: String,
                default: ''
            },
            showFocus:{
                type: Boolean,
                default: false
            },
            showTag:{
                type: Boolean,
                default: false
            },
            mode: {
                type: String,
                default: 'white'
            },
            follow: {
                type: Boolean,
                default: false
            },
        },
        methods: {
            async onFollowClick() {
                if(this.follow){
                    await doctorFollow(this.doctorId);
                }else{
                    await doctorUnFollow(this.doctorId)
                }
                this.follow = !this.follow
                this.$toast.success('操作成功')
            }
        },
    }
</script>

<style lang="less" scoped>
    .doctor-card{
        @white-bg();
        padding: 10px;
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
            height: 59px;
            width: 59px;
            flex-shrink: 0;
            margin-right: 10px;
        }
        .van-button{
            font-size: 12px;
            width: 60px;
            height: 21px;
            line-height: 21px;
            padding: 0;
            flex-shrink: 0;
            background: transparent;
            color: #FFFFFF;
        }
    }
    .tag-list{
        margin-top: 10px;
        .van-tag{
            margin-right: 5px;
        }
    }
</style>
