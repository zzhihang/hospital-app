<template>
    <div class="order-item-card">
        <h2 v-if="userType === 'user'" class="title van-hairline--top van-hairline--bottom">
            <span>{{data.patientName}}</span>
            <span class="inner">{{data.deptName}}</span>
        </h2>
        <div class="content">
            <div class="status" :class="data.orderStatus">{{ORDER_STATUS[data.orderStatus]}}</div>
            <h2>
                <van-icon :name="require('../../static/img/icon/icon_shijian.png')" size="12"/>
                <span class="ml6">{{data.businessTime}}</span>
            </h2>
            <h3 class="mt11">
                <span>就诊人：{{data.patientName}}</span>
                <span class="ml30">金额：{{data.price}}</span>
            </h3>
            <div class="van-hairline--bottom mt15"></div>
            <div class="order-item">
                <p>订单编号：{{data.orderNo}}</p>
                <p>服务项目：{{data.serviceItem}}</p>
                <p>出诊地点：{{data.serviceAddr}}</p>
            </div>
        </div>
        <div class="action-bar van-hairline--top" v-if="userType === 'user'">
            <van-button type="primary" plain size="mini" @click.stop="cancelClick" v-if="['DZF'].includes(data.orderStatus)">
                取消订单
            </van-button>
            <van-button type="primary" size="mini" v-if="['DZF'].includes(data.orderStatus)" @click.stop="onPayClick">支付</van-button>
            <van-button type="primary" size="mini" v-if="['YWC', 'YQX', 'BBH', 'YTK'].includes(data.orderStatus)"
                        @click.stop="deleteClick">
                删除订单
            </van-button>
        </div>
        <div class="action-bar van-hairline--top" v-if="userType === 'doctor'">
            <van-button type="primary" plain size="mini" @click.stop="onRejectClick"
                        v-if="['DJS'].includes(data.orderStatus)">
                驳回
            </van-button>
            <van-button type="primary" size="mini" v-if="['DJS'].includes(data.orderStatus)" @click.stop="onAcceptClick">接收
            </van-button>
        </div>
    </div>
</template>

<script>
  import {ORDER_STATUS} from "../../static/js/const";
  import {orderCancel, orderDelete} from "../../service/userOrderService";
  import {doctorOrderAccept, doctorOrderReject} from "../../service/doctorOrderService";

  export default {
    props: {
      data: {
        type: Object,
        default: () => {
        }
      },
      userType: {
        type: String,
        default: 'user'
      }

    },
    data() {
      return {
        ORDER_STATUS: ORDER_STATUS
      }
    },
    methods: {
      onPayClick(){

      },
      cancelClick() {
        this.$confirm({message: '是否确定取消订单？'}, async () => {
          const result = await orderCancel(this.data.id);
          if (result.success) {
            this.$toast.success('操作成功');
            this.$emit('actionSuccess')
          } else {
            this.$toast.fail(result.msg);
          }
        })
      },
      onAcceptClick() {
        this.$confirm({message: '是否确定接收此条订单？'}, async () => {
          const result = await doctorOrderAccept(this.data.id);
          if (result.success) {
            this.$toast.success('操作成功');
            this.$emit('actionSuccess')
          } else {
            this.$toast.fail(result.msg);
          }
        })
      },
      onRejectClick() {
        this.$confirm({message: '是否确定驳回此条订单？'}, async () => {
          const result = await doctorOrderReject(this.data.id);
          if (result.success) {
            this.$toast.success('操作成功');
            this.$emit('actionSuccess')
          } else {
            this.$toast.fail(result.msg);
          }
        })
      },
      deleteClick() {
        this.$confirm({message: '是否确定删除此条订单记录？'}, async () => {
          const result = await orderDelete(this.data.id);
          if (result.success) {
            this.$toast.success('操作成功');
            this.$emit('actionSuccess')
          } else {
            this.$toast.fail(result.msg);
          }
        })
      },
    },
  }
</script>

<style lang="less" scoped>
    .title {
        height: 36px;
        background: #ECF0F6;
        @flex-col-center();
        padding-left: 15px;

        .inner {
            color: #666666;
            font-size: 14px;
            font-weight: normal;
            margin-left: 8px;
        }
    }

    .content {
        padding: 15px;
        @white-bg();
        position: relative;
        border-radius: 9px;
    }

    .order-item {
        color: #666666;
        padding-top: 14px;

        p {
            font-size: 14px;
            margin-bottom: 10px;
            line-height: 14px;
        }
    }

    .status {
        position: absolute;
        right: 15px;
        top: 0;
        width: 60px;
        height: 25px;
        line-height: 25px;

        &.DJS {
            color: #367DF7;
            background: #EAF2FE;
        }

        &.DZF {
            color: #04B38F;
            background: #E5F7F3;
        }

        &.JXZ {
            color: #F6AA26;
            background: #FEF6E9;
        }

        &.YTK {
            color: #F55454;
            background: #FEEDED;
        }

        &.YWC, &.YQX, &.BBH {
            color: #999999;
            background: #F4F4F4;
        }

        background: rgba(54, 125, 247, 0.1);
        border-radius: 0 0 9px 9px;
        font-size: 13px;
        text-align: center;
    }

    .action-bar {
        @white-bg();
        text-align: right;
        padding-right: 15px;

        .van-button {
            border-radius: 4px;
            padding: 0 12px;
            font-size: 14px;
            margin-right: 8px;
            margin-bottom: 8px;
            &:last-child {
                margin-right: 0;
            }
        }
    }
</style>
