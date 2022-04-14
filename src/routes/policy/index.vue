<template>
    <div>
        <p v-html="data"></p>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {serviceAgreement} from "@/service/commonService";

    export default {
        data() {
            return {
                data: ''
            }
        },
        created(){
            serviceAgreement().then(({data}) => {
                this.data = data;
            })
        }
    }
</script>

<style lang="less" scoped>

</style>
