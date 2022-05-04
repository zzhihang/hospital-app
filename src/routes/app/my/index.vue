<template>
    <div>
        <div class="bg"></div>
        <div class="back">
            <info-card @click2="$router.push({name: 'family'})"/>
            <order-card class="mt10"/>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import InfoCard from "@/components/common/InfoCard";
    import OrderCard from "@/components/OrderCard/OrderCard";

    export default {
        components: {
            InfoCard,
            OrderCard
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
</style>
