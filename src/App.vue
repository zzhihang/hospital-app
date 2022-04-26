<template>
    <div id="app" style="height: 100%">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <van-tabbar v-if="ifShowTabBar" v-model="active" active-color="#FE7B35">
            <van-tabbar-item replace to="/topic" icon="home-o">
                <span>专题</span>
                <template #icon="props">
                    <img :src="props.active ? activeIcon[0] : defaultIcon[0]"/>
                </template>
            </van-tabbar-item>
            <van-tabbar-item icon="search" to="/message" :badge="userInfo.unReadCount > 0 ? userInfo.unReadCount : ''">
                <span>消息</span>
                <template #icon="props">
                    <img :src="props.active ? activeIcon[1] : defaultIcon[1]"/>
                </template>
            </van-tabbar-item>
            <van-tabbar-item icon="friends-o" to="/my">
                <span>我的</span>
                <template #icon="props">
                    <img :src="props.active ? activeIcon[2]: defaultIcon[2]"/>
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Tabbar, TabbarItem} from 'vant';
    import {userinfo} from "@/service/topic/topService";
    import connect from "@/store/connect";
    import watermark from '@/static/js/third/watermark'

    Vue.use(Tabbar);
    Vue.use(TabbarItem);

    const {mapState, mapMutations} = connect('commonStore');
    export default {
        name: 'App',
        data() {
            return {
                defaultIcon: [
                    require('@static/img/app/btn_zhuanti_default.png'),
                    require('@static/img/app/btn_xiaoxi_default.png'),
                    require('@static/img/app/btn_wode_default.png'),
                ],
                activeIcon: [
                    require('@static/img/app/btn_zhuanti_pressed.png'),
                    require('@static/img/app/btn_xiaoxi_pressed.png'),
                    require('@static/img/app/btn_wode_pressed.png'),
                ],
                showTabBar: false,
                active: 0
            }
        },
        computed: {
            ...mapState(['userInfo', 'ifShowTabBar'])
        },
        mounted(){
            setTimeout(() => {
                watermark.set(this.userInfo.nickname);
            },500);
        },
        methods: {
            ...mapMutations(['setUserInfo', 'setIsBozhu', 'setCommentShow']),
            async getUserInfo(){
                const {data} = await userinfo();
                this.setUserInfo(data);
                this.setIsBozhu(data.userType === 1);
                window.sessionStorage.setItem('isBozhu', data.userType === 1);
            }
        },
        watch:{
            $route(to,from){
                const fullPath = to.path;
                if(fullPath !== '/auth'){
                    if(!window.sessionStorage.getItem('isBozhu')){
                        this.getUserInfo();
                    }
                }
                if(fullPath === '/my'){
                    this.active = 2;
                }else if(fullPath === '/message'){
                    this.active = 1
                }else{
                    this.active = 0
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    /deep/.van-tabbar-item__icon img{
        height: 20px;
        width: 20px;
    }

</style>
