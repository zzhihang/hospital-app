<template>
    <div class="recorder" @click="play">
        <van-image :src="require('../../../static/img/dynamic/icon_shengbo.png')"/>
        <span>{{long}}S</span>
        <audio style="display:none;" :src="url" ref="player" controls="controls"></audio>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Image as VanImage} from 'vant';
    Vue.use(VanImage);

    export default {
        props: ['long', 'url'],
        methods: {
            play() {
                this.$refs.player.play();
            }
        },
    }
</script>

<style lang="less" scoped>
    .recorder{
        width: 185px;
        height: 40px;
        margin-bottom: 15px;
        background: #FFFAF7;
        border-radius: 6px;
        background: url("../../../static/img/dynamic/bg_yuyin.png");
        background-size: 100% 100%;
        padding-left: 18px;
        line-height: 35px;
        .van-image{
            width: 20px;
            height: 15px;
        }
        span{
            color: #FE7B35;
            font-weight: bold;
            font-size: 14px;
            margin-left: 10px;
        }
    }
</style>
