<template>
    <div>
        <p v-html="data"></p>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {dictPrivacy} from "@/service/dict/dictService";

    export default {
        data() {
            return {
                data: ''
            }
        },
        created(){
            dictPrivacy().then(({data}) => {
                this.data = data;
            })
        }
    }
</script>

<style lang="less" scoped>

</style>
