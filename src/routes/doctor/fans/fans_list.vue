<template>
    <div>
        <div class="fans-list" v-if="!list.length">
            <fans-card class="van-hairline--bottom" v-for="(item, index) in 10" :key="index" />
        </div>
        <my-empty v-else description="暂无粉丝关注"/>
    </div>
</template>

<script>
    import {fansList} from "@/service/fansService";
    import myEmpty from "@/components/empty/myEmpty";
    import FansCard from "@/components/fans/FansCard";

    export default {
        components: {
            myEmpty,
            FansCard
        },
        data() {
            return {
                list: []
            }
        },
        created(){
            fansList().then(({data}) => {
                this.list = data;
            })
        },
    }
</script>

<style lang="less" scoped>
    .fans-list{
        border-radius: 60px;
        padding: 15px;
        overflow: hidden;
    }

</style>
