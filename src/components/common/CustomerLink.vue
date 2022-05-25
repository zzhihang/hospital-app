<template>
    <div class="link-me">
        <my-icon @click.native="show=true" size="60" :name="require('../../static/img/icon/icon_kefudianhua.png')"/>
        <van-popup v-model="show" get-container="body" class="link-pop">
            <div class="image-box" v-if="customerImg" :class="{pb20: !customerTel}">
                <van-image :src="customerImg"/>
            </div>
            <div class="tel-box" v-if="customerTel">
                <my-icon class="mr10" :name="require('../../static/img/icon/icon_tel.png')" size="18"></my-icon>
                <a :href="`tel: ${customerTel}`">{{customerTel}}</a>
            </div>
        </van-popup>
    </div>
</template>

<script>
  import MyIcon from "@/components/common/MyIcon";
  import {getSystemSetting} from "@/service/commonService";

  export default {
    components: {
      MyIcon
    },
    data() {
      return {
        show: false,
        customerType: '',
        customerImg: '',
        customerTel: '',
      }
    },
    created() {
      getSystemSetting().then(({data}) => {
        this.customerType = data.customerType;
        this.customerTel = data.customerTel;
        this.customerImg = data.customerImg;
      })
    }
  }
</script>

<style lang="less" scoped>
    .link-me {
        position: fixed;
        bottom: 60px;
        right: 10px;
        z-index: 999;
    }
    .link-pop{
        border-radius: 16px;
    }
    .image-box{
        padding: 20px 20px 0;

        .van-image{
            width: 140px;
            height: 140px;
        }
    }
    .tel-box{
        padding: 25px 50px;
        a{
            font-size: 20px;
        }
    }
</style>
