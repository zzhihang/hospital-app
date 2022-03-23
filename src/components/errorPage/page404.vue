<template>
  <div class="page404">
    <van-image width="200" :src="imageUrl" />
    <p>{{ text }}</p>
    <van-button
      @click="onButtonClick"
      v-if="showButton"
      class="reload-button"
      hairline
      round
      v-bind="$attrs"
      :icon="icon"
      :color="buttonColor"
      type="info"
    >{{ buttonText }}</van-button>
  </div>
</template>

<script>
import Vue from 'vue';
import { Image as VanImage, Button } from 'vant';

Vue.use(Button);
Vue.use(VanImage)

export default {
  props: {
    imageUrl: {
      type: String,
      default: 'https://files.ibaodian.com/static/official/iweb/404.png'
    },
    text: {
      type: String,
      default: '网络加载失败，重新加载试试~'
    },
    buttonText: {
      type: String,
      default: '重新加载'
    },
    buttonColor: {
      type: String,
      default: '#FF9C56'
    },
    icon: {
      type: String,
      default: ''
    },
    showButton: {
      type: Boolean,
      default: true
    }
  },
  components: {

  },
  methods: {
    onButtonClick() {
      this.$emit('onButtonClick')
    }
  }
}
</script>

<style lang="less" scoped>
.page404 {
  padding-top: 65px;
  text-align: center;
  font-size: 15px;
  color: #666666;
}
p {
  width: 270px;
  margin: 10px auto 30px;
}
.reload-button {
  width: 130px;
  font-size: 17px;
}
.van-button {
  width: 170px;
}
</style>