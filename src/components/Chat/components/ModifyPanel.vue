<template>
    <van-popup v-model="show"
               position="right"
               @close="onClose"
               closeable
               get-container="body"
               style="background: #F6F7FA"
               close-icon-position="top-left"
               close-icon="arrow-left"
               :style="{ width: '100%', height: '100%' }"
    >
        <div class="setting-box">
            <h2>修改群名</h2>
            <van-notice-bar
                    left-icon="volume-o"
                    text="群聊名称修改后，群内成员都可以看见。"
            />
            <van-field class="mt10" label="群聊名称" v-model="groupName" placeholder="请输入群聊名称" :border="false"/>
        </div>
        <van-button class="save-button" type="primary" @click="onSaveClick">确定</van-button>
    </van-popup>
</template>

<script>

    import {doctorServiceDelete} from "@/service/doctorServiceItemService";

    export default {
        props: ['show'],
        data() {
            return {
                groupName: ''
            }
        },
        methods: {
            onClose() {
                this.$emit('update:show', false)
            },
            onSaveClick(){
                if(!this.groupName.trim().length){
                    return this.$toast.fail('群聊名称不能为空')
                }
            }
        },
    }
</script>

<style lang="less" scoped>
    h2{
        height: 40px;
        text-align: center;
        line-height: 53px;
    }
    .save-button{
        position: fixed;
        left: 15px;
        right: 15px;
        width: 345px;
        bottom: 30px;
    }
</style>
