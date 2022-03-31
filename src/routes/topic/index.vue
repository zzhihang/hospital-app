<template>
    <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
    >
        <div class="subject-list">
            <subject class="subject" v-for="(item, index) in list" :key="index" @click.native="goDetail(item.id)"
                     :data="item"></subject>
            <div class="float-button">
                <van-image :src="require('../../static/img/topic/btn_chuangjianzhuti.png')" @click="createSubject"/>
            </div>
        </div>
    </van-list>
</template>

<script>
    import Vue from 'vue';
    import subject from "./components/subject";
    import {zhuantiList} from "@/service/topic";
    import {Image as VanImage, List} from 'vant';

    Vue.use(VanImage);
    Vue.use(List);
    export default {
        components: {
            subject
        },
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                pageIndex: 1
            }
        },
        created() {
            this.getData();
        },
        methods: {
            async getData() {
                const {data} = await zhuantiList({page: this.pageIndex, size: 8});
                this.list = this.list.concat(data.records);
                this.loading = false;
                if (data.records < 8) {
                    this.finished = true;
                }
            },
            createSubject() {
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
            },
            onLoad() {
                this.pageIndex = this.pageIndex + 1;
                this.getData();
            }
        },
    }
</script>

<style lang="less" scoped>
    .subject-list {
        padding: 20px 15px;

        .subject {
            margin-bottom: 15px;
        }
    }
</style>
