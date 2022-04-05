<template>
    <div class="body" :class="{pb60: !ifSubscribe}">
        <div style="position:relative;">
            <van-image class="top-img" :src="model.imgUrl"/>
            <div class="badge-box">
                <van-image v-if="String(model.free) === '0'" height="18" :src="require('../../static/img/topic/pic_biaoqian.png')" />
            </div>
            <div class="action-edit" @click="onEditDetail" v-bozhu>
                <van-icon name="edit" />
                <span>编辑</span>
            </div>
        </div>
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
                <tagList :data="labelList" @onChange="onChange"/>
            </div>
            <div class="van-hairline--bottom"></div>
            <van-list
                    v-model="loading"
                    :finished="finished"
                    :immediate-check="false"
                    @load="onLoad"
            >
                <div class="card-list">
                    <card v-for="(item, index) in list"
                          :key="index"
                          :data="item"
                          :forbidden="model.forbidden"
                          @onZanClick="deleteSuccess"
                          @deleteSucces="deleteSuccess"
                    />
                </div>
            </van-list>
            <my-empty v-if="!list.length"/>
            <div class="un-subscribe-tip van-hairline--top van-hairline--bottom" v-if="!ifSubscribe">未订阅用户只能查看近三天内容</div>
            <div class="remark-box" v-if="model.remark">
                <p>注:{{model.remark}}</p>
            </div>
        </div>
        <bottom-box :price="model.price" @onSubscribe="onSubscribe" :free="model.free" :long="model.subscribeType"/>
        <div class="publish-dynamic" @click="onPublishClick">
            <van-image :src="require('../../static/img/topic/icon_dabudongtai@2x.png')"></van-image>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import tagList from "../../components/tag/tagList";
    import card from "./components/card";
    import bottomBox from "./components/bottomBox";
    import {userLabelList} from "../../service/topic/topService";
    import {zhuantiDetail} from "@/service/topic/topService";
    import {Image as VanImage, List, Icon} from 'vant';
    import myEmpty from "@/components/empty/myEmpty";
    import {orderCreate} from "@/service/order/orderService";

    Vue.use(VanImage);
    Vue.use(List);
    Vue.use(Icon);
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
                pageIndex: 1,
                tagModel: {},
                ifSubscribe: false
            }
        },
        created() {
            this.getLabels();
            this.getDetail();
        },
        methods: {
            async onSubscribe(){
                const {data} = await orderCreate(this.model.id);
                if(data.status === 0){
                    this.$router.push({
                        path: '/pay',
                        query: {
                            id: this.$route.query.id,
                            orderNo: data.orderNo,
                            title: this.model.title,
                            price: this.model.price,
                            long: this.model.subscribeType,
                            img: this.model.imgUrl
                        }
                    })
                }
            },
            onChange(e){
                this.tagModel = e;
                this.pageIndex = 1;
                this.list = [];
                this.getDetail();
            },
            async getLabels() {
                const {data} = await userLabelList();
                this.labelList = data;
            },
            async getDetail() {
                const {id} = this.$route.query;
                const params = {
                    zhuantiId: id,
                    page: this.pageIndex,
                    size: 10
                };
                if(this.tagModel.labelId){
                    params.labelList = JSON.stringify([this.tagModel])
                }
                const {data} = await zhuantiDetail(params);
                this.model = data.zhuanti;
                this.ifSubscribe = String(this.model.subscribe) === '1';
                this.list = this.list.concat(data.items.records);
                this.loading = false;
                if (data.items.records.length < 10) {
                    this.finished = true;
                }
            },
            onEditDetail(){
                this.$router.push({
                    path: '/topic/create',
                    query: {
                        id: this.$route.query.id
                    }
                })
            },
            deleteSuccess() {
                this.getDetail();
            },
            ifForbidden(){
                if(this.model.forbidden === 1 && sessionStorage.getItem('isBozhu') !== 'true'){//博主 禁严
                    this.$toast.fail('该专题已设置了全员禁言，您无法评论');
                    return false;
                }
                return true
            },
            onPublishClick() {
                if(!this.ifForbidden()){
                    return;
                }
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
            &:last-child{
                margin-bottom: 0;
            }
        }
    }

    .pb60{
        padding-bottom: 60px;
    }

    .publish-dynamic {
        position: fixed;
        right: 10px;
        bottom: 80px;

        .van-image {
            width: 44px;
        }
    }

    .top-img {
        width: 100%;
        max-height: 250px;
        overflow: hidden;
    }
    .action-edit{
        width: 72px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        color: #333333;
        border-radius: 13px 0 0 13px;
        position: absolute;
        opacity: 0.7;
        background: #DCDEDD;
        right: 0;
        top: 159px;
        font-size: 14px;
    }
    .badge-box{
        position: absolute;
        top: 5px;
        right: 10px;
    }

    .un-subscribe-tip{
        background: #FFFFFF;
        color: #999999;
        line-height: 30px;
        font-size: 12px;
        text-align: center;
    }
    .remark-box{
        padding: 10px 15px;
        color: #D94F17;
        font-size: 12px;
        line-height: 18px;
        background: #FFFFFF;
        p{
            padding: 15px;
            background: #FBEDE7;
            border-radius: 6px;
        }
    }
</style>
