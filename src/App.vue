<template>
    <div id="app" style="height: 100%">
        <router-view />
    </div>
</template>

<script>
    import Vue from 'vue';
    import connect from "@/store/connect";
    import MyIcon from "@/components/common/MyIcon";

    const {mapState, mapMutations} = connect('commonStore');
    export default {
        name: 'App',
        components: {
            MyIcon
        },
        data() {
            return {
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
            }
        },
        watch:{
            $route(to,from){
                const fullPath = to.path;
                // const list = ['/auth', '/pay', '/pay/success', '/pay/fail'];
                // if(!list.includes(fullPath)){
                //     if(!window.sessionStorage.getItem('isBozhu') || fullPath === '/topic'){//首页这里请求一次 防止博主身份未出来
                //         this.getUserInfo();
                //     }
                // }
                if(fullPath === '/focus'){
                    this.active = 2;
                }else if(fullPath === '/message'){
                    this.active = 1
                }else if(fullPath === '/my'){
                    this.active = 3
                }else if(fullPath === '/app'){
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
