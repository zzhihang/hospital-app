<template>
    <div>
        <pay-result type="success"/>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Empty } from 'vant';
    import payResult from "@/routes/pay/components/payResult";
    Vue.use(Empty);

    export default {
        components: {
            payResult
        }
    }
</script>

<style lang="less" scoped>

</style>
