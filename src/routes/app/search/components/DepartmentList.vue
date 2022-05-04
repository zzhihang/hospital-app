<template>
    <div class="hospital-list">
        <van-sidebar v-model="activeKey">
            <van-sidebar-item title="标签名称"/>
            <van-sidebar-item title="标签名称"/>
            <van-sidebar-item title="标签名称"/>
        </van-sidebar>
        <div class="list">
            <ul>
                <li class="item van-hairline--bottom">
                    科目1
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        components: {},
        data() {
            return {
                activeKey: ''
            }
        },
    }
</script>

<style lang="less" scoped>
    .hospital-list{
        display: flex;
    }
    .list {
        flex: 1;
        @white-bg();
        border-left: 1px solid #ebedf0;
        .item{
            line-height: 45px;
            font-size: 16px;
            padding-left: 12px;
        }
    }
</style>
