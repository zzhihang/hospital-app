<template>
    <div class="pb10">
        <div class="bg"></div>
        <div class="back">
            <info-card
                    @click1="$router.push({name: 'fansList'})"
                    card-type="doctor"
                    :avatar="doctorInfo.headimgurl"
                    :name="doctorInfo.name"
                    :deptName="doctorInfo.deptName"
                    :phone="doctorInfo.phone"
                    :fansOrFocusNum="countMap.fansCount"
                    @logout="logout"
            />
            <order-card class="mt10" order-router="doctorOrderList" :data-source="orderData"/>
            <div class="service mt15">
                <h2 class="pb18 van-hairline--bottom">
                    <span>服务项目管理</span>
                    <span class="action">
                        <van-icon name="add-o" class="mr2"/>
                        <span @click="$router.push({name: 'serviceAdd'})">新增服务项目</span>
                    </span>
                </h2>
                <van-cell title="免费咨询聊天">
                    <template #right-icon>
                        <van-switch :value="serviceFree" @input="onServiceFreeClick" :active-value="1"
                                    :inactive-value="0" size="20"/>
                    </template>
                </van-cell>
            </div>
            <service-item v-for="(item, index) in serviceList"
                          class="service_item"
                          :key="index"
                          :name="item.serviceItem"
                          :price="item.price"
                          :address="item.addr"
                          :desc="item.serviceDescr"
                          @click.native.prevent.stop="$router.push({name: 'serviceAdd', query:{id: item.id, readonly: true}})"
            >
                <template #action>
                    <div class="service-action van-hairline--top">
                        <span class="status"
                              :class="{YTG: item.auditStatus === '通过', DSH: item.auditStatus === '待审核', YBH: item.auditStatus === '已驳回'}">
                            {{item.auditStatus}}
                        </span>
                        <div class="button-box">
                            <van-button plain size="mini" type="primary" @click.prevent.stop="onEditClick(item)">编辑
                            </van-button>
                            <van-button class="ml10" type="primary" size="mini"
                                        @click.prevent.stop="onDeleteClick(item)">删除
                            </van-button>
                        </div>
                    </div>
                </template>
            </service-item>
        </div>
    </div>
</template>

<script>
  import InfoCard from "@/components/common/InfoCard";
  import OrderCard from "@/components/OrderCard/OrderCard";
  import {doctorLogout, doctorUserInfo} from "@/service/doctorCommonService";
  import {
    doctorServiceDelete,
    doctorServiceFreeDisable,
    doctorServiceFreeEnable,
    doctorServiceList
  } from "@/service/doctorServiceItemService";
  import ServiceItem from "@/routes/app/doctor/components/ServiceItem";
  import {doctorOrderCount} from "@/service/doctorInfoService";

  export default {
    components: {
      InfoCard,
      OrderCard,
      ServiceItem
    },
    data() {
      return {
        orderData: [{
          text: '待接收订单',
          value: 0,
          code: 'DJS'
        }, {
          text: '进行中订单',
          value: 0,
          code: 'JXZ'
        }, {
          text: '已完成订单',
          value: 0,
          code: 'YWC'
        }],
        countMap: {},
        serviceFree: '',
        serviceList: [],
        doctorInfo: {}
      }
    },
    created() {
      doctorOrderCount().then(({data}) => {
        this.countMap = data;
        this.orderData[0].value = data.djs;
        this.orderData[1].value = data.jxz;
        this.orderData[2].value = data.ywc;
      });
      doctorUserInfo().then(({data}) => {
        this.doctorInfo = data;
        this.serviceFree = this.doctorInfo.serviceFree
      });
      this.getDoctorServiceList();
    },
    methods: {
      getDoctorServiceList(){
        doctorServiceList().then(({data}) => {
          this.serviceList = data;
        });
      },
      onServiceFreeClick(open) {
        const tip = open ? '是否确定开启免费咨询？' : '是否确定关闭免费咨询？';
        const service = open ? doctorServiceFreeEnable : doctorServiceFreeDisable;
        this.$confirm({message: tip}, async () => {
          const result = await service(open);
          if (result.success) {
            this.serviceFree = this.serviceFree === 0 ? 1 : 0;
            this.$toast.success('操作成功');
          } else {
            this.$toast.fail(result.msg);
          }
        })
      },
      onEditClick({id}) {
        this.$router.push({name: 'serviceAdd', query: {id}})
      },
      onDeleteClick({id}) {
        this.$confirm({message: '是否确定删除此服务项目？'}, async () => {
          const result = await doctorServiceDelete(id);
          if (result.success) {
            this.$toast.success('操作成功');
            this.getDoctorServiceList();
          } else {
            this.$toast.fail(result.msg);
          }
        })
      },
      logout() {
        this.$confirm({message: '退出后，将无法收到消息提醒，确认是否退出？'}, async () => {
          doctorLogout().then(result => {
            if (result.success) {
              this.$toast.success('退出成功');
              this.$router.push({path: '/doctor/login'})
            } else {
              this.$toast.fail(result.msg);
            }
          })
        });
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

    .service {
        border-radius: 9px;
        @white-bg();
        padding: 15px 15px 0;

        h2 {
            @flex-sb-center();
        }

        .action {
            font-size: 12px;
            color: #367DF7;
            font-weight: bold;
        }

        .van-cell {
            padding-left: 0;
            padding-right: 0;

            /deep/ .van-cell__title {
                font-weight: normal !important;
            }
        }
    }

    .service-action {
        height: 44px;
        @flex-sb-center();
        padding: 0 15px;

        .status {
            font-size: 14px;
            color: #33B4D1;

            &.DSH {
                color: #367DF7;
            }

            &.YBH {
                color: #F6AA26;
            }
        }
    }

    .button-box {
        @flex-col-center();

        .van-button {
            width: 52px;
            height: 24px;
            border-radius: 4px;
            font-size: 14px;
        }
    }

    .service_item {
        border-radius: 9px;
        margin-top: 8px;

        /deep/ .detail {
            padding-left: 15px !important;
        }
    }
</style>
