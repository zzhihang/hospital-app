<template>
    <div>
        <div class="fans-list" v-if="!list.length">
            <div class="fans-card van-hairline--bottom" v-for="(item, index) in 10" :key="index">
                <van-image :src="require('../../../static/img/pic_wujiuzhenren.png')"/>
                <div class="info">
                    <h2>朱志航</h2>
                    <p>女 24岁</p>
                </div>
            </div>
        </div>
        <my-empty v-else description="暂无粉丝关注"/>
    </div>
</template>

<script>
    import {fansList} from "@/service/fansService";
    import myEmpty from "@/components/empty/myEmpty";

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
            fansList().then(({data}) => {
                this.list = data;
            })
        },
    }
</script>

<style lang="less" scoped>
    .fans-list{
        border-radius: 60px;
        padding: 15px;
        overflow: hidden;
    }
    .fans-card{
        @flex-sb-center();
        @white-bg();
        padding: 15px;
        .van-image{
            height: 42px;
            width: 42px;
            flex-shrink: 0;
        }
        .info{
            padding-left: 11px;
            flex: 1;
            p{
                color: #666666;
                font-size: 14px;
                margin-top: 7px;
            }
        }
    }

</style>
