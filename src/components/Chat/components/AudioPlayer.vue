<template>
    <div class="recorder" @click="play" :style="{background: background}">
        <div v-show="playing" class="bg voicePlay"></div>
        <my-icon v-show="!playing" class="playing" name="saying"/>
        <span>{{long}}''</span>
        <!--<van-image :src="require('../../../static/img/icon/icon_shengbo.png')"/>-->
        <audio style="display:none;" :src="url" ref="player" controls="controls" @ended="playing=false"></audio>
        <van-icon @click.stop="onDeleteClick" v-if="allowClose" class="delete-icon" size="14" name="close"/>
    </div>
</template>

<script>
  import Vue from 'vue';
  import {Icon, Image as VanImage} from 'vant';
  import MyIcon from "@/components/common/MyIcon";

  Vue.use(VanImage);
  Vue.use(Icon);

  export default {
    props: {
      long: {},
      url: {},
      background: {
        type: String,
        default: '#F2F7FF'
      },
      allowClose: {
        type: Boolean,
        default: false
      }
    },
    components: {
      MyIcon
    },
    data() {
      return {
        playing: false
      }
    },
    methods: {
      play() {
        this.$refs.player.play();
        this.playing = true;
      },
      onDeleteClick() {
        this.$emit('onDeleteClick', this.url)
      }
    },
  }
</script>

<style lang="less" scoped>
    .recorder {
        width: 90px;
        height: 33px;
        border-radius: 6px;
        background-size: 100% 100%;
        line-height: 35px;
        position: relative;
        display: flex;
        align-items: center;
        padding: 0 10px;
        box-sizing: border-box;
        flex-flow: row;

        .van-image {
            width: 20px;
            height: 15px;
        }

        span {
            color: #333333;
            font-weight: bold;
            font-size: 12px;
            flex: 1;
            text-align: right;
            padding-right: 23px;
        }
    }

    .delete-icon {
        color: @main-color;
        position: absolute;
        right: -2px;
        top: 0;
    }

    .bg {
        background: url('../../../static/img/icon/icon_bofang.png') right 0 no-repeat;
        width: 24px;
        height: 24px;
        background-size: 400%;
        transform: scale(0.6);
    }

    .voicePlay {
        animation-name: voicePlay;
        animation-duration: 1s;
        animation-direction: normal;
        animation-iteration-count: infinite;
        animation-timing-function: steps(3);
    }

    @keyframes voicePlay {
        0% {
            background-position: 0;
        }
        100% {
            background-position: 100%;
        }
    }
</style>
