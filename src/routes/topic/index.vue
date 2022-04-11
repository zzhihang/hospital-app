<template>
    <div>
        <div class="subject-list">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    :immediate-check="false"
                    @load="onLoad"
            >
                <subject class="subject" v-for="(item, index) in list" :key="index" @click.native="goDetail(item.id)"
                         :data="item"></subject>
                <div class="float-button">
                    <div v-bozhu>
                        <van-image width="44" height="44" :src="require('../../static/img/topic/btn_chuangjianzhuti.png')"
                                   @click="createSubject"/>
                    </div>
                </div>
            </van-list>
        </div>
        <my-empty description="暂无专题" v-if="!list.length"/>
    </div>
</template>

<script>
    import Vue from 'vue';
    import subject from "./components/subject";
    import {zhuantiList} from "@/service/topic/topService";
    import {Image as VanImage, List} from 'vant';
    import myEmpty from "@/components/empty/myEmpty";

    Vue.use(VanImage);
    Vue.use(List);
    export default {
        components: {
            subject,
            myEmpty
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
                if (data.records.length < 8) {
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
        padding: 20px 15px 40px;
        .subject {
            margin-bottom: 15px;
        }
    }
</style>
