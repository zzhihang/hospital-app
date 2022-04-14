<template>
    <div class="body">
        <template v-if="list.length > 0">
            <order-list-item @click.native="onItemClick(item)" class="mt5" v-for="(item, index) in list" :data="item" :key="index"/>
        </template>
        <my-empty v-else description="暂无数据"/>
    </div>
</template>

<script>
    import Vue from 'vue';
    import orderListItem from "@/routes/order/components/orderListItem";
    import {customerOrderList, orderList} from "@/service/order/orderService";
    import connect from "@/store/connect";
    import myEmpty from "@/components/empty/myEmpty";
    const {mapState, mapMutations} = connect('commonStore');
    export default {
        components: {
            orderListItem,
            myEmpty
        },
        data() {
            return {
                list: []
            }
        },
        created(){
            this.getOrderList();
        },
        computed: {
            ...mapState(['isBoZhu'])
        },
        methods: {
            async getOrderList() {
                let service = orderList;
                if(this.isBozhu){
                   service = customerOrderList;
                }
                const {data} = await service();
                this.list = data.records;
            },
            onItemClick(e){
                this.$router.push({
                    path: '/order/detail',
                    query: {
                        id: e.id
                    }
                })
            }
        },
    }
</script>

<style lang="less" scoped>

</style>
