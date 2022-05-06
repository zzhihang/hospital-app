<template>
    <div class="pb10">
        <div class="bg"></div>
        <div class="back">
            <info-card
                    @click1="$router.push({name: 'focus'})"
                    @click2="$router.push({name: 'family'})"
                    @logout="logout"
            />
            <order-card class="mt10" :data-source="orderData"/>
            <div class="service mt15">
                <h2>
                    <span>服务项目管理</span>
                    <span class="action">
                        <van-icon name="add-o" class="mr2"/>
                        <span>新增服务项目</span>
                    </span>
                </h2>
                <van-cell title="免费咨询聊天" class="mt22">
                    <template #right-icon>
                        <van-switch @change="onServiceFreeClick" v-model="serviceFree" size="20" />
                    </template>
                </van-cell>
            </div>
            <service-item name="项目名称"
                          class="service_item"
                          v-for="(item, index) in 5"
                          :key="index"
                          @click.native="$router.push({name: 'serviceAdd', query:{id: item.id, readonly: true}})"
            >
                <template #action>
                    <div class="service-action van-hairline--top">
                        <span class="status">已通过</span>
                        <div class="button-box">
                            <van-button plain size="mini" type="primary" @click="onEditClick(item)">编辑</van-button>
                            <van-button class="ml10" type="primary" size="mini" @click="onDeleteClick(item)">删除</van-button>
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
    import {userCount} from "@/service/userService";
    import {orderCancel} from "@/service/orderService";
    import {doctorLogout} from "@/service/doctorCommonService";
    import {doctorServiceDelete, doctorServiceList} from "@/service/doctorServiceItemService";
    import ServiceItem from "@/routes/app/doctor/components/ServiceItem";

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
                    value: 0
                },{
                    text: '进行中订单',
                    value: 0
                },{
                    text: '已完成订单',
                    value: 0
                }],
                serviceFree: '',
                serviceList: []
            }
        },
        created(){
            userCount().then(({data}) => {
                this.orderData[0].value = data.daijieshou;
                this.orderData[1].value = data.jinxingzhong;
                this.orderData[2].value = data.yiwancheng;
            });
            doctorServiceList(({data}) => {
                this.serviceList = data;
            });
        },
        methods: {
            onServiceFreeClick(open){
                if(open){
                    this.$confirm({message: '是否确定开启免费咨询？'}, async () => {
                        const result = await orderCancel(open);
                        if(result.success){
                            this.$toast.success('操作成功');
                        }else{
                            this.$toast.fail(result.msg);
                        }
                    })
                }
            },
            onEditClick({id}){
                this.$router.push({name: 'serviceAdd', query: {id}})
            },
            onDeleteClick({id}){
                this.$confirm({message: '是否确定删除此服务项目？'}, async () => {
                    const result = await doctorServiceDelete(id);
                    if(result.success){
                        this.$toast.success('操作成功');
                    }else{
                        this.$toast.fail(result.msg);
                    }
                })
            },
            logout() {
                doctorLogout(result => {
                    if(result.success){
                        this.$toast.success('退出成功');
                    }else{
                        this.$toast.fail(result.msg);
                    }
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
    .info-card{
        box-shadow: 0 0 12px 0 rgba(54, 125, 247, 0.1);
    }
    .back{
        transform: translateY(-50px);
        margin: 0 10px;
    }
    .service{
        padding: 15px;
        border-radius: 9px;
        @white-bg();
        h2{
            @flex-sb-center();
        }
        .action{
            font-size: 12px;
            color: #367DF7;
            font-weight: bold;
        }
        .van-cell{
            padding-left: 0;
            padding-right: 0;
        }
    }
    .service-action{
        height: 44px;
        @flex-sb-center();
        padding: 0 15px;
        .status{
            font-size: 14px;
            color: #33B4D1;
            &.DSH{
                color: #367DF7;
            }
            &.YBH{
                color: #F6AA26;
            }
        }
    }
    .button-box{
        @flex-col-center();
        .van-button{
            width: 52px;
            height: 24px;
            border-radius: 4px;
            font-size: 14px;
        }
    }
    .service_item{
        border-radius: 9px;
        margin-top: 8px;
        /deep/.detail{
            padding-left: 15px !important;
        }
    }
</style>
