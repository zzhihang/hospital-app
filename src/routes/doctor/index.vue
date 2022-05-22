<template>
    <div class="common-tab-bar-pb">
        <div class="search-box">
            <doctor-card
                    mode="dark"
                    :avatar="userInfo.headimgurl"
                    :title="userInfo.title"
                    :name="userInfo.name"
                    :dept="userInfo.deptName"
                    :hospital="userInfo.hospitalName"
                    :tag-list="userInfo.diseaseLabel && userInfo.diseaseLabel.split(',')"
            />
            <div class="count-area">
                <div class="count">
                    <div class="left">
                        <van-icon size="16" :name="require('../../static/img/icon/icon_shouyi.png')"/>
                        <span class="font14 ml5">累计收益（元）</span>
                    </div>
                    <span class="count-num">{{countMap.doctorFee}}</span>
                </div>
                <order-card order-router="doctorOrderList" :data-source="orderData"></order-card>
            </div>
        </div>
        <van-tabs v-model="active" color="#367DF7" sticky>
            <van-tab title="待接收订单">
                <div class="order-list" v-if="orderList1.length">
                    <order-item-card
                            v-for="(item, index) in orderList1"
                            @click.native="onOrderItemClick(item)"
                            @actionSuccess="onActionSuccess"
                            class="mt7"
                            user-type="doctor"
                            :data="item"
                            :key="index"
                    />
                </div>
                <van-empty v-else description="暂无待接收订单"/>
            </van-tab>
            <van-tab title="进行中订单">
                <div class="order-list" v-if="orderList2.length">
                    <order-item-card
                            v-for="(item, index) in orderList2"
                            @click.native="onOrderItemClick(item)"
                            @actionSuccess="onActionSuccess"
                            user-type="doctor"
                            class="mt7"
                            :data="item"
                            :key="index"
                    />
                </div>
                <van-empty v-else description="暂无进行中订单"/>
            </van-tab>
        </van-tabs>
        <customer-service />
    </div>
</template>

<script>
  import Search from "components/Search/Search";
  import OrderCard from "components/OrderCard/OrderCard";
  import DoctorCard from "@/components/doctor/DoctorCard";
  import MyIcon from "@/components/common/MyIcon";
  import OrderItemCard from "@/components/OrderCard/OrderItemCard";
  import {doctorOrderDjs, doctorOrderJxz} from "@/service/doctorOrderService";
  import CustomerService from "@/components/common/CustomerLink";
  import connect from "@/store/connect";
  import {doctorOrderCount} from "@/service/doctorInfoService";

  const {mapState} = connect('commonStore');

  export default {
    components: {
      Search,
      OrderCard,
      DoctorCard,
      MyIcon,
      OrderItemCard,
      CustomerService
    },
    data() {
      return {
        doctor: {},
        active: '',
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
      this.getListData();
      doctorOrderCount().then(({data}) => {
        this.countMap = data;
        this.orderData[0].value = data.djs;
        this.orderData[1].value = data.jxz;
        this.orderData[2].value = data.ywc;
      })
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      getListData(){
        doctorOrderDjs().then(({data}) => {
          this.orderList1 = data;
        });
        doctorOrderJxz().then(({data}) => {
          this.orderList2 = data;
        });
      },
      onSearch(value) {
        this.$router.push({name: 'search', query: {value: value}})
      },
      onActionSuccess() {
        this.getListData();
      },
      onOrderItemClick({id}) {
        this.$router.push({name: 'doctorOrderDetail', query: {id}})
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
        padding-bottom: 5px;
        box-shadow: 0 0 12px 0 rgba(54, 125, 247, 0.1);
        border-radius: 9px;
    }

    .doctor-card {
        background: transparent !important;
    }

    .order-card {
        margin: 5px;
        margin-bottom: 0;
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

    /deep/ .van-tab--active {
        font-weight: bold;
        font-size: 16px;
    }

    /deep/ .van-tab {
        font-size: 16px;
    }
    /deep/.van-sticky--fixed{
        background: #ffffff;
    }

    .order-list{
        padding-left: 15px;
        padding-right: 15px;
    }
</style>
