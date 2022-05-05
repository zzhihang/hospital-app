<template>
    <div class="search-wrap">
        <van-sticky>
            <van-search
                    v-model="value"
                    background="#78A9FF"
                    show-action
                    placeholder="搜索关键字医院、医生、疾病"
                    @search="onSearch"
            >
                <template #action>
                    <van-button type="primary" size="small" @click="onSearch">搜索</van-button>
                </template>
            </van-search>
        </van-sticky>
    </div>
</template>

<script>
    export default {
        props: {
            initValue: {
                type: [String, Number],
                default: ''
            }
        },
        data() {
            return {
                value: ''
            }
        },
        methods: {
            onSearch(e) {
                this.$emit('search', this.value)
            }
        },
        watch: {
            initValue: {
                handler(val) {
                    if(val){
                        this.value = val;
                    }
                },
                immediate: true
            }
        }
    }
</script>


<style lang="less" scoped>
    .search-wrap{
        border-radius: 6px;
        overflow: hidden;
        .van-search{
            padding: 5px;
        }
        .van-search__content{
            border-radius: 5px;
        }
        .van-search__action{
            line-height: unset;
            padding-right: 0;
        }
        .van-button{
            width: 60px;
            font-size: 14px;
        }
    }
</style>
