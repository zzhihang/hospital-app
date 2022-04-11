<template>
    <div>
        <pay-result type="fail" @onButtonClick="onButtonClick"/>
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
        },
        methods: {
            onButtonClick() {
                this.$router.go(-1);
            }
        },
    }
</script>

<style lang="less" scoped>

</style>
