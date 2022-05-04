<template>
    <div id="app" style="height: 100%">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <van-tabbar v-if="ifShowTabBar" v-model="active" active-color="#367DF7">
            <van-tabbar-item replace to="/app">
                <span>专题</span>
                <template #icon="props">
                    <my-icon name="btn_shouye_default" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item icon="search" to="/message" :badge="userInfo.unReadCount > 0 ? userInfo.unReadCount : ''">
                <span>消息</span>
                <template #icon="props">
                    <my-icon name="btn_xiaoxi_default" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item icon="friends-o" to="/my">
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
    import {Tabbar, TabbarItem} from 'vant';
    import connect from "@/store/connect";
    import MyIcon from "@/components/common/MyIcon";

    Vue.use(Tabbar);
    Vue.use(TabbarItem);

    const {mapState, mapMutations} = connect('commonStore');
    export default {
        name: 'App',
        components: {
            MyIcon
        },
        data() {
            return {
                defaultIcon: [
                    // require('@static/img/app/btn_zhuanti_default.png'),
                    // require('@static/img/app/btn_xiaoxi_default.png'),
                    // require('@static/img/app/btn_wode_default.png'),
                ],
                activeIcon: [
                    // require('@static/img/app/btn_zhuanti_pressed.png'),
                    // require('@static/img/app/btn_xiaoxi_pressed.png'),
                    // require('@static/img/app/btn_wode_pressed.png'),
                ],
                showTabBar: false,
                active: 0
            }
        },
        computed: {
            ...mapState(['userInfo', 'ifShowTabBar'])
        },
        mounted(){
        },
        methods: {
            ...mapMutations(['setUserInfo', 'setIsBozhu', 'setCommentShow']),
            async getUserInfo(){
                const {data} = await userinfo();
                this.setUserInfo(data);
                this.setIsBozhu(String(data.userType) === '1');
                window.sessionStorage.setItem('isBozhu', String(data.userType) === '1');
                Vue.directive("bozhu", { //博主按钮权限管理 v-bozhu
                    inserted (el, binding) {
                        debugger
                        let permission = sessionStorage.getItem('isBozhu')
                        if (permission !== 'true') {
                            el.parentNode && el.parentNode.removeChild(el);
                        }
                    }
                });
            }
        },
        watch:{
            // $route(to,from){
            //     const fullPath = to.path;
            //     const list = ['/auth', '/pay', '/pay/success', '/pay/fail'];
            //     if(!list.includes(fullPath)){
            //         if(!window.sessionStorage.getItem('isBozhu') || fullPath === '/topic'){//首页这里请求一次 防止博主身份未出来
            //             this.getUserInfo();
            //         }
            //     }
            //     if(fullPath === '/my'){
            //         this.active = 2;
            //     }else if(fullPath === '/message'){
            //         this.active = 1
            //     }else{
            //         this.active = 0
            //     }
            // }
        }
    }
</script>

<style lang="less" scoped>
    /deep/.van-tabbar-item__icon img{
        height: 20px;
        width: 20px;
    }

</style>
