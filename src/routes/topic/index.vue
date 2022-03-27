<template>
    <div class="subject-list">
        <subject class="subject" v-for="(item, index) in list" :key="index" @click.native="goDetail(item.id)" :data="item"></subject>
    </div>
</template>

<script>
    import Vue from 'vue';
    import subject from "./components/subject";
    import {zhuantiList} from "@/service/topic";

    export default {
        components: {
            subject
        },
        data() {
            return {
                list: []
            }
        },
        created() {
            this.getData();
        },
        methods: {
            async getData() {
                const {data} = await zhuantiList({page: 1, size: 8});
                this.list = data.records;
            },
            goDetail(id) {
                this.$router.push({
                    path: '/topic/detail',
                    query: {
                        id
                    }
                })
            }
        },
    }
</script>

<style lang="less" scoped>
    .subject-list {
        padding: 20px 15px;
        .subject{
            margin-bottom: 15px;
        }
    }
</style>
