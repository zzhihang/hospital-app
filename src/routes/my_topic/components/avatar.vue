<template>
    <div class="info" :class="{'small': size === 'small'}">
        <van-image
                v-if="hasPhoto"
                round
                src="https://img01.yzcdn.cn/vant/cat.jpeg"></van-image>
        <span>朱志航</span>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        props: {
            size: {
                type: String,
                default: 'big'
            },
            hasPhoto: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style lang="less" scoped>
    .info {
        display: flex;
        align-items: center;
        font-size: 16px;
        .van-image{
            height: 40px;
            width: 40px;
            margin-right: 10px;
        }
        span {
            font-weight: bold;
        }
        &.small{
            font-size: 14px;
            .van-image{
                height: 20px;
                width: 20px;
                margin-right: 8px;
            }
        }
    }
</style>
