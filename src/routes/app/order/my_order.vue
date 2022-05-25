<template>
    <div>
        <van-tabs color="#367DF7" @change="tabChange" sticky v-model="active">
            <van-tab v-for="(item, index) in tabList" :key="index" :title="item.title" :name="item.value"></van-tab>
            <van-list
                    :immediate-check="false"
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="getOrderList"
            >
                <order-item-card
                        v-for="(item, index) in orderList"
                        @click.native="onOrderItemClick(item)"
                        @actionSuccess="onActionSuccess"
                        class="mt7"
                        :data="item"
                        :key="index"
                />
            </van-list>
        </van-tabs>
    </div>
</template>

<script>
  import {ORDER_STATUS} from "@/static/js/const";
  import OrderItemCard from "@/components/OrderCard/OrderItemCard";
  import {orderList} from "@/service/userOrderService";

  export default {
    components: {
      OrderItemCard
    },
    data() {
      return {
        tabList: [],
        orderList: [],
        orderStatus: '',
        active: '',
        loading: false,
        finished: false,
        pageNum: 0,
        size: 10
      }
    },
    created() {
      this.active = this.$route.query.status || '';
      this.orderStatus = this.$route.query.status || '';
      this.getTabList();
      this.getOrderList();
    },
    methods: {
      async getOrderList() {
        this.pageNum = this.pageNum + 1;
        const result = await orderList({orderStatus: this.orderStatus, page: this.pageNum, size: this.size});
        if (result.success) {
          this.orderList = this.orderList.concat(result.data.records);
          this.loading = false;
          if (result.data.records.length < 10) {
            this.finished = true;
          }
        }
      },
      getTabList() {
        const keys = Object.keys(ORDER_STATUS);
        this.tabList = keys.map(key => {
          return {
            title: ORDER_STATUS[key],
            value: key
          }
        });
        this.tabList.unshift({title: '全部', value: ''})
      },
      resetStatus() {
        this.pageNum = 0;
        this.orderList = [];
        this.getOrderList();
      },
      tabChange(e) {
        this.orderStatus = e;
        this.resetStatus();
      },
      onActionSuccess() {
        this.resetStatus();
        this.getOrderList();
      },
      onOrderItemClick({id}) {
        this.$router.push({name: 'orderConfirm', query: {id}})
      }
    },
  }
</script>

<style lang="less" scoped>

</style>
