<template>
    <div>
        <van-cell-group>
            <van-field v-model="value" input-align="right" label="昵称"
                       placeholder="请输入昵称"/>
        </van-cell-group>
        <div class="van-hairline--bottom"></div>
        <van-button class="save-button" @click="save" type="primary">保存</van-button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Button, Field} from 'vant';
    import {updateUserInfo} from "@/service/commonService";

    Vue.use(Button);
    Vue.use(Field);
    export default {
        data() {
            return {
                value: this.$route.query.name
            }
        },
        methods: {
            async save() {
                const result= await updateUserInfo({nickname: this.value});
                if(result.status === 200){
                    this.$toast.success('修改成功');
                    setTimeout(() => {
                        this.$router.go(-1);
                    })
                }
            }
        },
    }
</script>

<style lang="less" scoped>
.save-button{
    position: fixed;
    bottom: 30px;
    left: 15px;
    right: 15px;
}
</style>
