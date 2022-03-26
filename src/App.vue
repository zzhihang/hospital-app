<template>
  <div id="app" style="height: 100%">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item replace to="/my_topic" icon="home-o">专题</van-tabbar-item>
      <van-tabbar-item icon="search" to="/message">消息</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Tabbar, TabbarItem } from 'vant';

  Vue.use(Tabbar);
  Vue.use(TabbarItem);
export default {
  name: 'App',
  methods: {},
}
</script>
