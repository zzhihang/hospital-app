<template>
    <div>
        <div class="bg"></div>
        <div class="back">
            <info-card
                    @click1="$router.push({name: 'focus'})"
                    @click2="$router.push({name: 'family'})"
                    :avatar="userInfo.headimgurl"
                    :name="userInfo.nickname"
                    :phone="userInfo.phone"
                    :fans-or-focus-num="userInfo.followCount"
                    :family-num="userInfo.jzrCount"
                    @logout="logout"
            />
            <order-card class="mt10" :data-source="orderData"/>
        </div>
    </div>
</template>

<script>
  import Vue from 'vue';
  import InfoCard from "@/components/common/InfoCard";
  import OrderCard from "@/components/OrderCard/OrderCard";
  import {userCount, userPatientLogout} from "@/service/userInfoService";
  import {userInfo} from "@/service/userCommonService";

  export default {
    components: {
      InfoCard,
      OrderCard
    },
    data() {
      return {
        orderData: [{
          text: '待接收',
          value: 0,
          code: 'DJS'
        }, {
          text: '待支付',
          value: 0,
          code: 'DZF'
        }, {
          text: '进行中',
          value: 0,
          code: 'JXZ'
        }, {
          text: '被驳回',
          value: 0,
          code: 'BBH'
        }],
        userInfo: {}
      }
    },
    created() {
      userCount().then(({data}) => {
        this.orderData[0].value = data.daijieshou;
        this.orderData[1].value = data.daizhifu;
        this.orderData[2].value = data.jinxingzhong;
        this.orderData[3].value = data.beibohui;
      });
      userInfo().then(({data}) => {
        this.userInfo = data;
      });
    },
    methods: {
      logout() {
        this.$confirm({message: '退出后，将无法收到消息提醒，确认是否退出？'}, async () => {
          userPatientLogout().then(result => {
            if (result.success) {
              this.$toast.success('退出成功');
              this.$router.push({path: '/login'})
            } else {
              this.$toast.fail(result.msg);
            }
          })
        })
      }
    },
  }
</script>

<style lang="less" scoped>
    .bg {
        background: @main-color;
        height: 88px;
    }

    .info-card {
        box-shadow: 0 0 12px 0 rgba(54, 125, 247, 0.1);
    }

    .back {
        transform: translateY(-50px);
        margin: 0 10px;
    }
</style>
