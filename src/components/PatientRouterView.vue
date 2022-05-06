<template>
    <div>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <van-tabbar v-model="active" active-color="#367DF7">
            <van-tabbar-item replace to="/app">
                <span>首页</span>
                <template #icon="props">
                    <my-icon name="btn_shouye_default" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item icon="search" to="/message">
                <span>消息</span>
                <template #icon="props">
                    <my-icon name="btn_xiaoxi_default" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item icon="friends-o" to="/focus">
                <span>关注</span>
                <template #icon="props">
                    <my-icon name="icon_guanzhu_default" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item icon="friends-o" to="/my">
                <span>我的</span>
                <template #icon="props">
                    <my-icon name="btn_wode_default" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    import Vue from 'vue';
    import MyIcon from "@/components/common/MyIcon";

    export default {
        components: {
            MyIcon
        },
        data() {
            return {
                active: ''
            }
        },
    }
</script>

<style lang="less" scoped>

</style>
