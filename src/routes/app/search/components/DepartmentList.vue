<template>
    <div class="hospital-list">
        <van-sidebar v-model="activeKey">
            <van-sidebar-item
                      v-for="(item, index) in dataSource"
                      :title="item.hospitalName"
                      :key="index"
                      @click="onLeftItemClick(item)"
            />
        </van-sidebar>
        <div class="list">
            <ul>
                <li class="item van-hairline--bottom" v-for="(item, index) in departmentList" :key="index">
                    {{item.deptName}}
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
                departmentList: []
            }
        },
        methods: {
            onLeftItemClick(data) {
                this.departmentList = data.depts
            }
        },
        watch: {
            dataSource: {
                handler() {
                    if(this.dataSource.length){
                        this.departmentList = this.dataSource[0].depts
                    }else{
                        this.departmentList = []
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
            border-bottom: 1px solid #e7e7ee;
        }
    }
</style>
