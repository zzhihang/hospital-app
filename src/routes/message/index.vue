<template>
    <div class="body">
        <message-card class="mt5" v-for="(item, index) in list" :key="index" :data="item"/>
    </div>
</template>

<script>
    import Vue from 'vue';
    import messageCard from './components/messageCard'
    import {sysMessageList, sysMessageReadall} from "@/service/message/messageService";

    export default {
        components: {
            messageCard
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
            async getData() {
                const {data} = await sysMessageList({
                    page: this.page,
                    size: 8
                });
                this.list = data.records;
            },
            readAll(){
                sysMessageReadall()
            }
        },
    }
</script>

<style lang="less" scoped>

</style>
