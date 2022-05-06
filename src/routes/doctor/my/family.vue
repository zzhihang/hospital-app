<template>
    <div>
        <van-cell-group v-if="list.length">
            <van-cell v-for="(item, index) in list" :key="index" :title="`${item.name}(${item.sex})`" is-link @click="onItemClick(item)"/>
        </van-cell-group>
        <van-empty v-else :image="require('../../../static/img/pic_wujiuzhenren.png')" description="还没有就诊人，赶快添加吧！"/>
        <div class="bottom-button-box">
            <van-button type="primary" @click="$router.push({name: 'familyAdd'})">添加新就诊人</van-button>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import myEmpty from "@/components/empty/myEmpty";
    import {userPatientList} from "@/service/userService";
    export default {
        components: {
            myEmpty
        },
        data() {
            return {
                list: []
            }
        },
        created(){
            userPatientList().then(({data}) => {
                this.list = data;
            })
        },
        methods: {
            onItemClick({id}) {
                this.$router.push({name: 'familyAdd', query: {id, readonly: true}})
            }
        },
    }
</script>

<style lang="less" scoped>

    /deep/.van-empty__image{
        width: 250px;
        height: unset;
    }
    .van-button{
        width: 100%;
    }
</style>
