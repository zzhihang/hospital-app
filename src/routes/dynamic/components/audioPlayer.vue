<template>
    <div class="recorder" @click="play">
        <van-image :src="require('../../../static/img/dynamic/icon_shengbo.png')"/>
        <span>{{long}}S</span>
        <audio style="display:none;" :src="url" ref="player" controls="controls"></audio>
        <van-icon @click.stop="onDeleteClick" v-if="allowClose" class="delete-icon" size="14" name="close" />
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Icon, Image as VanImage} from 'vant';

    Vue.use(VanImage);
    Vue.use(Icon);

    export default {
        props: {
            long: {},
            url: {},
            allowClose: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            play() {
                this.$refs.player.play();
            },
            onDeleteClick(){
                this.$emit('onDeleteClick', this.url)
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
        position: relative;
        display: flex;
        align-items: center;
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
    .delete-icon{
        color: @main-color;
        position: absolute;
        right: -2px;
        top: 0;
    }
</style>
