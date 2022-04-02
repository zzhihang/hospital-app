<template>
    <div class="order-list-item">
        <div class="order-list-item-left">
            <van-image :src="data.price < 0 ? image2 : image"/>
            <div>
                <h6 class="title ellipsis2">{{data.title}}</h6>
                <p>{{data.ctime}}</p>
            </div>
        </div>
        <span class="num" :class="{tixian: data.price < 0}">{{data.price}}</span>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Image as VanImage} from 'vant';

    Vue.use(VanImage);

    export default {
        props: ['data'],
        data() {
            return {
                image: require('@static/img/my/icon_dingyue.png'),
                image2: require('@static/img/my/icon_tixian.png'),
            }
        },
    }
</script>

<style lang="less" scoped>
    .order-list-item {
        @flex-sb-center();
        padding: 15px;
        background: #FFFFFF;
        .title {
            font-size: 16px;
            font-weight: normal;
            line-height: 21px;
            padding-right: 40px;
        }

        p {
            color: #999999;
            font-size: 12px;
            margin-top: 10px;
        }

        .num {
            color: @main-color;
            font-weight: bold;
            &.tixian{
                color: #339D83;
            }
        }
        .van-image{
            width: 26px;
            height: 26px;
            margin-right: 8px;
            flex-shrink: 0;
        }
    }

    .order-list-item-left {
        display: flex;
    }
</style>
