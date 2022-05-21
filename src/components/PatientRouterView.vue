<template>
    <div style="height: 100%;">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <van-tabbar v-model="tabBarActive" active-color="#367DF7" v-if="ifShowTabBar">
            <van-tabbar-item replace to="/app">
                <span>首页</span>
                <template #icon="props">
                    <my-icon name="btn_shouye_default"/>
                </template>
            </van-tabbar-item>
            <van-tabbar-item icon="search" to="/message">
                <span>消息</span>
                <template #icon="props">
                    <my-icon name="btn_xiaoxi_default"/>
                </template>
            </van-tabbar-item>
            <van-tabbar-item icon="friends-o" to="/focus">
                <span>关注</span>
                <template #icon="props">
                    <my-icon name="icon_guanzhu_default"/>
                </template>
            </van-tabbar-item>
            <van-tabbar-item icon="friends-o" to="/my">
                <span>我的</span>
                <template #icon="props">
                    <my-icon name="btn_wode_default"/>
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
  import MyIcon from "@/components/common/MyIcon";
  import connect from "@/store/connect";
  import {userInfo} from "@/service/userCommonService";

  const {mapState, mapMutations} = connect('commonStore');
  export default {
    components: {
      MyIcon
    },
    data() {
      return {}
    },
    computed: {
      ...mapState(['userInfo', 'ifShowTabBar', 'tabBarActive'])
    },
    created() {
      this.getUserInfo();
    },
    methods: {
      ...mapMutations(['setUserInfo', 'setIfShowTabBar', 'setTabBarActive']),
      async getUserInfo() {
        if(!this.userInfo.id) {
          const {data} = await userInfo();
          this.setUserInfo(data);
        }
      }
    },
    watch:{
      $route(to,from){
        this.getUserInfo();
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
