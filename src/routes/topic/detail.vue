<template>
    <div class="body">
        <van-image class="top-img" :src="model.imgUrl"/>
        <div class="box-father">
            <div class="main-box">
                <h6 class="ellipsis2">{{model.title}}</h6>
                <p class="intro">{{model.introduction}}</p>
                <div class="van-hairline--top"></div>
                <ul>
                    <li>
                        <h5>{{model.subscribeCount}}</h5>
                        <p>订阅人数</p>
                    </li>
                    <li>
                        <h5>{{model.itemCount}}</h5>
                        <p>动态数量</p>
                    </li>
                    <li>
                        <h5>{{model.opDays}}</h5>
                        <p>运营天数</p>
                    </li>
                </ul>
            </div>
            <div class="tab-list">
                <tagList :data="labelList"/>
            </div>
            <div class="van-hairline--bottom"></div>
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
            >
                <div class="card-list" v-if="list.length">
                    <card v-for="(item, index) in list" :key="index" :data="item" @deleteSucces="deleteSuccess"/>
                </div>
                <my-empty v-else/>
            </van-list>
        </div>
        <bottom-box></bottom-box>
        <div class="publish-dynamic" @click="onPublishClick">
            <van-image :src="require('../../static/img/topic/icon_dabudongtai.png')"></van-image>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import tagList from "../../components/tag/tagList";
    import card from "./components/card";
    import bottomBox from "./components/bottomBox";
    import {userLabelList} from "../../service/topic";
    import {zhuantiDetail} from "@/service/topic";
    import {Image as VanImage, List} from 'vant';
    import myEmpty from "@/components/empty/myEmpty";

    Vue.use(VanImage);
    Vue.use(List);
    export default {
        components: {
            tagList,
            card,
            bottomBox,
            myEmpty
        },
        data() {
            return {
                model: {},
                list: [],
                labelList: [],
                loading: false,
                finished: false,
                pageIndex: 0
            }
        },
        created() {
            this.getLabels();
            //this.getDetail();
        },
        methods: {
            async getLabels() {
                const {data} = await userLabelList();
                this.labelList = data;
            },
            async getDetail() {
                const {id} = this.$route.query;
                const {data} = await zhuantiDetail({zhuantiId: id, page: this.pageIndex, size: 10});
                this.model = data.zhuanti;
                this.list = this.list.concat(data.items.records);
                this.loading = false;
                if (data.items.records < 10) {
                    this.finished = true;
                }
            },
            deleteSuccess() {
                this.getDetail();
            },
            onPublishClick() {
                this.$router.push({
                    path: '/dynamic',
                    query: {
                        zhuantiId: this.$route.query.id
                    }
                })
            },
            onLoad() {
                this.pageIndex = this.pageIndex + 1;
                this.getDetail();
            }
        },
    }
</script>

<style lang="less" scoped>
    .box-father {
        transform: translateY(-40px);
    }

    .main-box {
        background: url('../../static/img/topic/bg_shang.png') no-repeat;
        background-size: cover;
        box-shadow: 0 -1px 12px 0 rgba(153, 153, 153, 0.18);
        border-radius: 36px 36px 0 0;
        padding: 20px 15px;
        font-size: 16px;

        h6 {
            font-size: 18px;
        }

        .intro {
            margin-top: 13px;
            line-height: 24px;
        }

        ul {
            border-top: 1px solid rgb(153 153 153 / 30%);
            @flex-sb-center();
            padding-top: 15px;
            margin-top: 15px;

            li {
                border-right: 1px solid rgb(153 153 153 / 30%);
                text-align: center;
                flex: 1;
                font-size: 18px;

                &:last-child {
                    border-right: none;
                }
            }

            p {
                font-size: 12px;
                color: #999999;
                margin-top: 8px;
            }
        }
    }

    .tab-list {
        padding: 15px;
        background: #FFFFFF;
    }

    .card-list {
        .card {
            margin-bottom: 5px;
        }
    }

    .body {
        padding-bottom: 60px;
    }

    .publish-dynamic {
        position: fixed;
        right: 10px;
        bottom: 60px;

        .van-image {
            width: 60px;
        }
    }

    .top-img {
        width: 100%;
        max-height: 250px;
        overflow: hidden;
    }
</style>
