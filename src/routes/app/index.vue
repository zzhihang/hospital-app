<template>
    <div>
        <div class="search-box">
            <search @search="onSearch"/>
            <div class="search-by">
                <div class="search-by-item">
                    <van-image :src="require('../../static/img/index/icon_yiyuan.png')"/>
                    <div @click="$router.push({name: 'entry_hospital'})">
                        <h1>按医院找</h1>
                        <p>{{countMap.hospital}}家医院</p>
                    </div>
                </div>
                <div class="search-by-item ml10">
                    <van-image :src="require('../../static/img/index/icon_jibing.png')"/>
                    <div @click="$router.push({name: 'entry_disease'})">
                        <h1>按疾病找</h1>
                        <p>{{countMap.disease}}种疾病</p>
                    </div>
                </div>
            </div>
            <order-card class="mt10" :data-source="orderData"/>
        </div>
        <div class="recommend">
            <h2 class="">专家医生</h2>
            <div class="card-list">
                <doctor-card
                    v-for="(item, index) in recommendList"
                    :name="item.doctorName"
                    :dept="item.deptName"
                    :hospital="item.hospitalName"
                    :title="item.doctorTitle"
                    :key="index"
                    @click.native="$router.push({path: '/doctor/detail', query: {id: item.doctorId}})"
                />
            </div>
        </div>
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

    export default {
        components: {
            Search,
            OrderCard,
            DoctorCard,
            MyIcon
        },
        data() {
            return {
                recommendList: [],
                countMap: {},
                orderData: [{
                    text: '待接收',
                    value: 0
                },{
                    text: '待支付',
                    value: 0
                },{
                    text: '进行中',
                    value: 0
                },{
                    text: '被驳回',
                    value: 0
                }]
            }
        },
        created(){
            doctorRecommend().then(({data}) => {
                this.recommendList = data;
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
                this.$router.push({name: 'search', query: {value: value}})
            }
        },
    }
</script>

<style lang="less" scoped>
    .search-box{
        padding: 10px 15px;
        background: linear-gradient(180deg, #367DF7 0%, rgba(54, 125, 247, 0) 100%);
    }
    .order-card{
        background: rgba(54, 125, 247, 0.24);
        box-shadow: 0 0 12px 0 rgba(54, 125, 247, 0.1);
    }
    .recommend{
        padding: 10px 15px;
    }
    .search-by{
        @flex-sb-center();
        margin-top: 15px;
    }
    .search-by-item{
        width: 50%;
        background: url("../../static/img/index/bg_anyiyuan.png");
        background-size: cover;
        @flex-sb-center();
        padding: 15px 20px 10px;
        &:last-child{
            background: url("../../static/img/index/bg_anjibing.png");
            background-size: cover;
        }
        .van-image{
            width: 33px;
            height: 50px;
        }
        h1{
            color: #FFFFFF;
            font-size: 19px;
        }
        p{
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
            margin-top: 10px;
        }
    }
    .card-list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        flex: 1;
        margin-top: 15px;
        .doctor-card{
            margin-right: 10px;
            margin-bottom: 10px;
            width: 42%;
            &:nth-of-type(2n){
                margin-right: 0;
            }
        }
    }
    .link-me{
        position: fixed;
        bottom: 60px;
        right: 0;
    }
</style>
