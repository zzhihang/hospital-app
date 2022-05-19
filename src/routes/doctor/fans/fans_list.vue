<template>
    <div>
        <div class="search-box">
            <search @search="onSearch" placeHolder="搜索姓名关键字"/>
        </div>
        <div class="fans-list" v-if="list.length">
            <fans-card class="van-hairline--bottom"
                       v-for="(item, index) in list"
                       :key="index"
                       @click.native="onFansItemClick(item)"
                       :avatar="item.headimgurl"
                       :name="item.nickname"
                       :phone="item.phone"
            />
        </div>
        <my-empty v-else description="暂无粉丝关注"/>
    </div>
</template>

<script>
  import {doctorFansList} from "@/service/doctorFansService";
  import myEmpty from "@/components/empty/myEmpty";
  import FansCard from "@/components/fans/FansCard";
  import Search from "@/components/Search/Search";
  import {deepClone} from "@/static/js/util";
  import {doctorCreateChat} from "@/service/doctorMessageService";

  export default {
    components: {
      myEmpty,
      FansCard,
      Search
    },
    data() {
      return {
        list: [],
        originalList: [] //初始的list search前端过滤这个list
      }
    },
    methods: {
      onSearch(e) {
        this.list = this.originalList.filter((item) => item.nickname.includes(e.trim()));
      },
      async onFansItemClick({userId}) {
        const {data} = await doctorCreateChat(userId);
        this.$router.push({
          name: 'chat',
          query: {bookType: data.bookType, id: data.id, toImid: data.toImid, name: data.name}
        })
      }
    },
    created() {
      doctorFansList().then(({data}) => {
        this.list = data;
        this.originalList = deepClone(data)
      })
    },
  }
</script>

<style lang="less" scoped>
    .fans-list {
        padding: 15px;
        overflow: hidden;
    }

    .search-box {
        background: @main-color;
        padding: 10px 15px;
    }
</style>
