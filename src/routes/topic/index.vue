<template>
    <div class="subject-list">
        <subject class="subject" v-for="(item, index) in list" :key="index" @click.native="goDetail(item.id)" :data="item"></subject>
        <div class="float-button">
            <van-image :src="require('../../static/img/topic/btn_chuangjianzhuti.png')" @click="createSubject"/>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import subject from "./components/subject";
    import {zhuantiList} from "@/service/topic";
    import {Image as VanImage} from 'vant';
    Vue.use(VanImage)

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
            createSubject(){
                this.$router.push({
                    path: '/topic/create'
                })
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
