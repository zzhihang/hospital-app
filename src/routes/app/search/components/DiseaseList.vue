<template>
    <div class="hospital-list">
        <van-sidebar v-model="activeKey">
            <van-sidebar-item
                    v-for="(item, index) in dataSource"
                    :title="item.name"
                    :key="index"
                    @click="onLeftItemClick(item)"
            />
        </van-sidebar>
        <div class="list">
            <ul>
                <li
                    class="item van-hairline--bottom"
                    v-for="(item, index) in childrenList"
                    @click="$emit('onRightItemClick', item, diseaseId)"
                    :key="index"
                >
                    {{item}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        props: {
            dataSource: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                activeKey: '',
                childrenList: [],
                diseaseId: ''
            }
        },
        methods: {
            onLeftItemClick(data) {
                this.childrenList = data.diseaseLabel;
                this.diseaseId = data.id
            }
        },
        watch: {
            dataSource: {
                handler() {
                    if(this.dataSource.length){
                        this.childrenList = this.dataSource[0].diseaseLabel;
                        this.diseaseId = this.dataSource[0].id;
                    }else{
                        this.childrenList = []
                    }
                },
                immediate: true
            }
        }
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
    .van-sidebar{
        width: 50%;
        .van-sidebar-item{
            padding: 12px 15px;
            border-bottom: 1px solid #e7e7ee;
        }
    }
</style>
