<template>
    <div class="item">
        <h2>
            <slot></slot>
            <span>{{name}}</span>
        </h2>
        <div class="van-hairline--bottom"></div>
        <div class="detail">
            <ul>
                <li><i class="blue-spot"></i><span>金额：{{price}}元</span></li>
                <li><i class="yellow-spot"></i><span>出诊地点：{{address}}</span></li>
                <li><i class="green-spot"></i><span>服务说明：{{desc}}</span></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        props: ['name', 'price', 'address', 'desc'],
        components: {

        },
    }
</script>

<style lang="less" scoped>
    .item{
        background: #ffffff;
        h2{
            height: 44px;
            padding-left: 15px;
            display: flex;
            align-items: center;
        }
        .detail{
            padding: 12px 50px;
            li{
                color: #666666;
                font-size: 14px;
                display: flex;
                align-items: center;
                margin-top: 10px;
                span{
                    margin-left: 2px;
                }
            }
        }
    }
</style>
