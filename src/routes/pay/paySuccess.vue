<template>
    <div>
        <pay-result type="success" @onButtonClick="onButtonClick"/>
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
                const zhuantiId = this.$route.query.id;
                this.$router.replace({
                    path: '/topic/detail',
                    query: {
                        id: zhuantiId
                    }
                })
            }
        },
    }
</script>

<style lang="less" scoped>

</style>
