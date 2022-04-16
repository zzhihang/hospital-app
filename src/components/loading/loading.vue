<template>
    <van-popup
            :close-on-click-overlay="false"
            v-model="show" style="background-color:transparent"
    >
        <div class="loadingWrap">
            <van-loading v-if="show" type="spinner" />
        </div>
    </van-popup>
</template>

<script>
    import Vue from 'vue';
    import {Popup, Loading} from 'vant';

    Vue.use(Popup);
    Vue.use(Loading);

    export default {
        data () {
            return {
                show:false,
            }
        },

    }
</script>
<style lang="less" scoped>
    /*.van-overlay{*/
        /*background-color: #000;*/
    /*}*/
</style>
