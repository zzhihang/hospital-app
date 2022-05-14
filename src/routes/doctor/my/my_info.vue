<template>
    <van-form :readonly="formReadonly">
        <van-field
                v-model="doctorInfo.nickname"
                label="姓名"
                input-align="right"
                ></van-field>
        <van-field
                v-model="doctorInfo.serviceItem"
                label="所属医院"
                input-align="right"
        ></van-field>
        <van-field
                v-model="doctorInfo.serviceItem"
                label="所属科室"
                input-align="right"
        ></van-field>
        <van-field
                v-model="doctorInfo.serviceItem"
                label="职称"
                input-align="right"
        ></van-field>
        <van-field
                v-model="doctorInfo.serviceItem"
                label="疾病类型"
                input-align="right"
        ></van-field>
        <van-field
                v-model="doctorInfo.serviceItem"
                label="疾病标签"
                input-align="right"
        ></van-field>
        <div style="margin: 16px;">
            <van-button block type="primary" class="cancel mt10" @click="$router.go(-1)">返回</van-button>
        </div>
    </van-form>
</template>

<script>
  import {doctorUserInfo} from "@/service/doctorCommonService";

  export default {
    data() {
      return {
        formReadonly: true,
        id: '',
        doctorInfo: {},
      }
    },
    created(){
      doctorUserInfo().then(({data}) => {
        this.doctorInfo = data;
      });
    },
  }
</script>

<style lang="less" scoped>

</style>
