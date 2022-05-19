<template>
    <div class="recorder" @click="play">
        <span>{{long}}S</span>
        <van-image :src="require('../../../static/img/icon/icon_shengbo.png')"/>
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
        width: 90px;
        height: 33px;
        background: #FFFAF7;
        border-radius: 6px;
        background-size: 100% 100%;
        line-height: 35px;
        position: relative;
        display: flex;
        align-items: center;
        padding: 0 10px;
        box-sizing: border-box;
        .van-image{
            width: 20px;
            height: 15px;
        }
        span{
            color: #FE7B35;
            font-weight: bold;
            font-size: 12px;
            flex: 1;
            text-align: right;
            padding-right: 23px;
        }
    }
    .delete-icon{
        color: @main-color;
        position: absolute;
        right: -2px;
        top: 0;
    }
</style>
