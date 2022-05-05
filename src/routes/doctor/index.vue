<template>
    <div>
        <div class="search-box">
            <doctor-card
                    mode="dark"
                    :avatar="require('../../static/img/logo.png')"
                    v-for="(item, index) in recommendList"
                    :name="item.doctorName"
                    :dept="item.deptName"
                    :hospital="item.hospitalName"
                    :title="item.doctorTitle"
                    :tag-list="['1','2']"
                    :key="index"
                    @click.native="$router.push({path: '/doctor', query: {id: item.doctorId}})"
            />
            <div class="count-area">
                <div class="count">
                    <div class="left">
                        <van-icon size="16" :name="require('../../static/img/icon/icon_shouyi.png')"/>
                        <span class="font14 ml5">累计收益（元）</span>
                    </div>
                    <span class="count-num">2112</span>
                </div>
                <order-card :data-source="orderData"></order-card>
            </div>
        </div>
        <van-tabs v-model="active" color="#367DF7" sticky>
            <van-tab title="待接收订单">
                <order-item-card
                        v-for="(item, index) in orderList"
                        @click.native="onOrderItemClick(item)"
                        @actionSuccess="onActionSuccess"
                        class="mt7"
                        :data="item"
                        :key="index"
                />
            </van-tab>
            <van-tab title="进行中订单">内容 2</van-tab>
        </van-tabs>
        <div class="link-me">
            <my-icon size="60" :name="require('../../static/img/index/icon_kefudianhua.png')"/>
        </div>
    </div>
</template>

<script>
    import Search from "components/Search/Search";
    import OrderCard from "components/OrderCard/OrderCard";
    import DoctorCard from "@/components/doctor/DoctorCard";
    import MyIcon from "@/components/common/MyIcon";
    import {doctorRecommend} from "@/service/doctorService";
    import {userCount} from "@/service/userService";
    import OrderItemCard from "@/routes/app/order/components/OrderItemCard";
    import {orderDjs, orderJxz} from "@/service/doctorOrderService";
    export default {
        components: {
            Search,
            OrderCard,
            DoctorCard,
            MyIcon,
            OrderItemCard
        },
        data() {
            return {
                orderList1: [],
                orderList2: [],
                countMap: {},
                orderData: [{
                    text: '待接收订单',
                    value: 0
                }, {
                    text: '进行中订单',
                    value: 0
                }, {
                    text: '已完成订单',
                    value: 0
                }]
            }
        },
        created() {
            orderJxz().then(({data}) => {
                this.orderList1 = data;
            });
            orderDjs().then(({data}) => {
                this.orderList2 = data;
            });
            userCount().then(({data}) => {
                this.countMap = data;
                this.orderData[0].value = data.daijieshou;
                this.orderData[1].value = data.daizhifu;
                this.orderData[2].value = data.jinxingzhong;
                this.orderData[3].value = data.beibohui;
            })
        },
        methods: {
            onSearch(value) {
                if (!value.trim().length) {
                    return this.$toast.fail('请输入搜索关键词')
                }
                this.$router.push({name: 'search', query: {value: value}})
            }
        },
    }
</script>

<style lang="less" scoped>
    .search-box {
        padding: 10px 15px;
        background: linear-gradient(180deg, #367DF7 0%, rgba(54, 125, 247, 0) 100%);
    }

    .count-area {
        background: rgba(54, 125, 247, 0.24);
        padding-top: 5px;
        box-shadow: 0 0 12px 0 rgba(54, 125, 247, 0.1);
        border-radius: 9px;
    }

    .doctor-card {
        background: transparent !important;
    }

    .link-me {
        position: fixed;
        bottom: 60px;
        right: 0;
    }

    .count {
        @flex-sb-center();
        background: #FFFFFF;
        padding: 10px 10px;
        border-radius: 9px;
        margin-left: 5px;
        margin-right: 5px;

        .left {
            @flex-col-center();
        }

        .count-num {
            font-weight: bold;
            color: #FC7C4D;
            font-size: 21px;
        }
    }

    /deep/ .van-tabs__nav {
        background: none;
    }

    /deep/.van-tab--active{
        font-weight: bold;
        font-size: 16px;
    }
    /deep/.van-tab{
        font-size: 16px;
    }
</style>
