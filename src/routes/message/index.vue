<template>
    <div class="body">
        <template v-if="list.length > 0">
            <message-card class="mt5" v-for="(item, index) in list" :key="index" :data="item"/>
        </template>
        <my-empty v-else description="暂无消息"/>
    </div>
</template>

<script>
    import Vue from 'vue';
    import messageCard from './components/messageCard'
    import {sysMessageList, sysMessageReadall} from "@/service/message/messageService";
    import {userinfo} from "@/service/topic/topService";
    import connect from "@/store/connect";
    import myEmpty from "@/components/empty/myEmpty";
    const {mapMutations} = connect('commonStore');

    export default {
        components: {
            messageCard,
            myEmpty
        },
        data() {
            return {
                list: [],
                page: 1
            }
        },
        created() {
            this.getData();
            this.readAll();
        },
        methods: {
            ...mapMutations(['setUserInfo']),
            async getData() {
                const {data} = await sysMessageList({
                    page: this.page,
                    size: 8
                });
                this.list = data.records;
            },
            async readAll(){
                await sysMessageReadall();
                this.getUserInfo();
            },
            async getUserInfo(){
                const {data} = await userinfo();
                this.setUserInfo(data);
            }
        },
    }
</script>

<style lang="less" scoped>
.body{
    padding-bottom: 60px;
}
</style>
