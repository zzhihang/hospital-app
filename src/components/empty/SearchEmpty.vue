<template>
    <van-empty
        :image="require('../../static/img/empty.png')"
        :description="description"
    />
</template>

<script>
    export default {
        props: {
            description: {
                type: String,
                default: '暂无数据'
            }
        }
    }
</script>

<style lang="less" scoped>
    /deep/.van-empty__image{
        width: 280px;
        height: unset;
    }
</style>
