<template>
    <div>
        <div class="search-box">
            <search @search="onSearch" placeHolder="搜索姓名关键字"/>
        </div>
        <div class="fans-list" v-if="!list.length">
            <fans-card class="van-hairline--bottom" v-for="(item, index) in 10" :key="index"/>
        </div>
        <my-empty v-else description="暂无粉丝关注"/>
    </div>
</template>

<script>
  import {fansList} from "@/service/doctorFansService";
  import myEmpty from "@/components/empty/myEmpty";
  import FansCard from "@/components/fans/FansCard";
  import Search from "@/components/Search/Search";
  import {deepClone} from "@/static/js/util";

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
        this.list = this.originalList.filter((item) => item.name.includes(e.trim()));
      }
    },
    created() {
      fansList().then(({data}) => {
        this.list = data;
        this.originalList = deepClone(data)
      })
    },
  }
</script>

<style lang="less" scoped>
    .fans-list {
        border-radius: 60px;
        padding: 15px;
        overflow: hidden;
    }

    .search-box {
        background: @main-color;
        padding: 10px 15px;
    }
</style>
