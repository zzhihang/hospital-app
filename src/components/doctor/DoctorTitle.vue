<template>
    <h2 class="name-title" :class="color">
        <span>{{name}}</span>
        <my-icon v-if="title" size="12" :name="color !== 'white' ? require('../../static/img/doctor/icon_touxian2.png') : require('../../static/img/doctor/icon_touxian.png')"/>
        <span class="title">{{title}}</span>
    </h2>
</template>

<script>
    import MyIcon from "@/components/common/MyIcon";

    export default {
        props: ['name', 'title', 'color'],
        components: {
            MyIcon
        }
    }
</script>

<style lang="less" scoped>
    .name-title {
        display: flex;
        align-items: baseline;
        color: #FFFFFF;
        &.white {
            span {
                color: #333333;
            }
            .title{
                color: #666666;
            }
        }

        .van-icon {
            margin-left: 8px;
        }

        .title {
            font-size: 12px;
            color: #FFFFFF;
            margin-left: 4px;
            font-weight: normal;
        }
    }
</style>
