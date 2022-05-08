<template>
    <van-popup v-model="show"
               position="bottom"
               @close="onClose"
               closeable
               get-container="body"
               close-icon-position="top-left"
               :style="{ width: '100%', height: '100%' }"
    >
        <van-sticky>
           <div class="top-box">
               <h2>删除成员</h2>
               <van-search v-model="value" placeholder="搜索姓名关键字"/>
           </div>
        </van-sticky>
        <div class="action-area">
            <div class="height10block"></div>
            <div class="setting-box">

                <div class="member-list">
                    <van-checkbox-group v-model="choose">
                        <van-checkbox class="member-item van-hairline--bottom" v-for="(item, index) in 10" :key="index"
                                   :name="index">
                            <fans-card/>
                        </van-checkbox>
                    </van-checkbox-group>
                </div>
            </div>
            <div class="button-box">
                <van-button type="primary" :disabled="!choose.length" @click="removeMember">删除</van-button>
            </div>
        </div>
    </van-popup>
</template>

<script>

    import FansCard from "@/components/fans/FansCard";

    export default {
        props: ['show'],
        components: {
            FansCard
        },
        data() {
            return {
                value: '',
                choose: [],
            }
        },
        methods: {
            onClose() {
                this.$emit('update:show', false)
            },
            removeMember() {
                this.$confirm({message: '是否确定删除此群聊？删除后将解散此群。'}, async () => {

                })
            }
        },
    }
</script>

<style lang="less" scoped>
    .action-area {
        padding-bottom: 50px;
    }

    .member-list {
        .member-item {
            padding-left: 15px;
        }
    }
    .button-box{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 8px 0;
        box-sizing: border-box;
        width: 100%;
        text-align: right;
        @white-bg();
        box-shadow: 0px -4px 10px 0px rgba(102, 102, 102, 0.06);
        .van-button{
            width: 76px;
            height: 33px;
            margin-right: 15px;
        }
    }
    .top-box{
        @white-bg();
        box-shadow: 0px 4px 10px 0px rgba(102, 102, 102, 0.06);
        h2{
            height: 40px;
            text-align: center;
            line-height: 53px;
        }
    }
    /deep/.van-popup__close-icon{
        position: fixed;
        z-index: 9999;
    }
</style>
