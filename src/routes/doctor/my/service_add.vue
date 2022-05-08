<template>
    <van-form @submit="onSubmit" :readonly="formReadonly">
        <van-field
                v-model="formData.serviceItem"
                label="服务项目"
                input-align="right"
                required
                placeholder="请输入服务项目"
                :rules="[{ required: true}]"></van-field>
        <van-field
                v-model="formData.price"
                label="金额"
                type="number"
                input-align="right"
                required
                placeholder="请输入金额"
                :rules="[{ required: true }]"></van-field>
        <van-field
                v-model="formData.addr"
                label="出诊地点"
                input-align="right"
                required
                placeholder="请输入出诊地点"
                :rules="[{ required: true }]"></van-field>
        <h2 style="background: #ffffff;color: #646566;" class="pt16 pl16">服务说明</h2>
        <van-field
                v-model="formData.serviceDescr"
                type="textarea"
                rows="3"
                autosize
                placeholder="请输入服务说明"></van-field>
        <div class="bottom-button-box" style="display: flex;" v-if="formReadonly">
            <van-button type="primary" plain @click="deleteClick" class="mr10" style="width: 30%;flex-shrink: 0">删除</van-button>
            <van-button type="primary" @click="onEditClick">修改</van-button>
        </div>
        <div style="margin: 16px;" v-else>
            <van-button block type="info" native-type="submit">保存</van-button>
            <van-button v-if="id" block native-type="button" color="#EBECEF" class="cancel mt10" @click="$router.go(-1)">取消</van-button>
        </div>
    </van-form>
</template>

<script>
    import {doctorServiceDelete, doctorServiceDetail, doctorServiceSave} from "@/service/doctorServiceItemService";

    export default {
        data() {
            return {
                formReadonly: false,
                id: '',
                formData: {
                    serviceItem: '',
                    price: '',
                    addr: '',
                    serviceDescr: '',
                },
            }
        },
        components: {},
        created(){
          if(this.$route.query.id){
              this.id = this.$route.query.id;
              this.getInfo(this.$route.query.id);
              document.title = '修改服务项目'
          }
          if(this.$route.query.readonly){
              this.formReadonly = true;
              document.title = '服务项目详情'
          }
        },
        methods: {
            async getInfo(id){
                const result = await doctorServiceDetail(id);
                if(result.success){
                    for(let key in this.formData){
                        this.formData[key] = result.data[key];
                    }
                }else{
                    this.$toast.fail(result.msg);
                }
            },
            deleteClick(){
                this.$confirm({message: '是否确定删除此服务项目？'}, async () => {
                    const result = await doctorServiceDelete(this.id);
                    if(result.success){
                        this.$toast.success('操作成功');
                    }else{
                        this.$toast.fail(result.msg);
                    }
                })
            },
            onEditClick(){
                this.formReadonly = false;
            },
            async onSubmit() {
                if(this.id){
                    this.formData.id = this.id;
                }
                const result = await doctorServiceSave(this.formData);
                if(result.success){
                    this.$toast.success('操作成功');
                    this.$router.go(-1)
                }else{
                    this.$toast.fail(result.msg);
                }
            },
        },
    }
</script>

<style lang="less" scoped>
    .cancel{
        color: #999999 !important;
    }
    /deep/textarea{
        padding: 10px;
        background: #F6F6F6;
    }
</style>
