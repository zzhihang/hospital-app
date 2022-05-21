<template>
    <div>
        <van-cell-group>
            <van-cell title="用户手机号" :value="orderInfo.patientPhone"/>
        </van-cell-group>
        <van-cell-group class="mt10">
            <van-cell title="就诊时间" :value="orderInfo.businessTime"/>
            <van-cell title="就诊人" :value="orderInfo.patientName"/>
            <van-cell title="性别" :value="orderInfo.patientSex"/>
            <van-cell title="身份证号" :value="orderInfo.patientIdNumber"/>
            <van-cell title="就诊人关系" :value="orderInfo.patientRelationship"/>
            <van-cell title="就诊人联系方式" :value="orderInfo.patientPhone"/>
        </van-cell-group>

        <van-cell-group class="mt5">
            <van-cell title="金额" :value="orderInfo.price"/>
            <van-cell title="订单编号" v-if="id" :value="orderInfo.orderNo"/>
            <van-cell title="服务项目" :value="orderInfo.serviceItem"/>
            <van-cell title="出诊地点" :value="orderInfo.serviceAddr"/>
            <van-cell title="服务说明" :value="orderInfo.serviceDescr"/>
        </van-cell-group>

        <div class="bottom-button-box">
            <div v-if="['DJS'].includes(orderInfo.orderStatus)" style="display: flex;">
                <van-button type="primary" plain @click="onRejectClick" class="mr10" style="width: 30%;flex-shrink: 0">
                    驳回
                </van-button>
                <van-button type="primary" @click="onAcceptClick">接收</van-button>
            </div>
        </div>
    </div>
</template>

<script>
  import {doctorOrderAccept, doctorOrderDetail, doctorOrderReject} from "@/service/doctorOrderService";

  export default {
    data() {
      return {
        orderInfo: {},
        id: ''
      }
    },
    created() {
      if (this.$route.query.id) {
        this.id = this.$route.query.id;
        this.getOrderInfo()
      }
    },
    methods: {
      async getOrderInfo() {
        const {data} = await doctorOrderDetail(this.id);
        this.orderInfo = data;
      },
      onAcceptClick() {
        this.$confirm({message: '是否确定接收此条订单？'}, async () => {
          const result = await doctorOrderAccept(this.id);
          if (result.success) {
            this.$toast.success('操作成功');
            this.$router.go(-1);
            this.$emit('actionSuccess');
          } else {
            this.$toast.fail(result.msg);
          }
        })
      },
      onRejectClick() {
        this.$confirm({message: '是否确定驳回此条订单？'}, async () => {
          const result = await doctorOrderReject(this.id);
          if (result.success) {
            this.$toast.success('操作成功');
            this.$emit('actionSuccess');
            this.$router.go(-1)
          } else {
            this.$toast.fail(result.msg);
          }
        })
      },
    },
  }
</script>

<style lang="less" scoped>

</style>
