<template>
    <div class="info-form">
        <div class="item avatar">
            <span class="title">头像</span>
            <div style="display: flex;align-items: center">
                <van-image
                        round
                        width="50"
                        height="50"
                        src="https://img01.yzcdn.cn/vant/cat.jpeg"
                />
                <van-icon class="ml5" size="14" name="arrow" color="#666666" />
            </div>
        </div>
        <div class="item">
            <span class="title">头像</span>
            <span class="content" style="color: #666666;" @click="editName">
                <span>朱志航</span>
                <van-icon class="ml10" size="14" name="arrow" color="#666666" />
            </span>
        </div>
        <div class="item">
            <span class="title">手机号</span>
            <span class="content">152156134565</span>
        </div>
        <div class="item">
            <span class="title">账号ID</span>
            <span class="content">56456456465</span>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Cell, CellGroup, Image as VanImage, Icon} from 'vant';
    Vue.use(VanImage);
    Vue.use(Cell);
    Vue.use(CellGroup);
    Vue.use(Icon);
    export default {
        methods: {
            editName() {
                this.$router.push({
                    path: '/my/edit_name'
                })
            }
        },
    }
</script>

<style lang="less" scoped>
.info-form{
    .item{
        @flex-sb-center();
        border-bottom: 1px solid #F7F7F7;
        padding: 21px 16px;
        .title{
            color: #333333;
            font-size: 16px;
            font-weight: bold;
        }
        .content{
            color: #999999;
            font-size: 16px;
        }
    }
}
</style>
