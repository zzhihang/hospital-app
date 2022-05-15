<template>
    <div class="order-card">
        <div class="content">
            <h1 class="van-hairline--bottom">
                <span>我的订单</span>
                <span class="right" @click="$router.push({name: orderRouter})">
                    <span>全部订单</span>
                    <my-icon class="ml4" size="8" name="icon_jinru_01"/>
                </span>
            </h1>
            <div class="order-item">
                <ul>
                    <li v-for="(item, index) in dataSource" :key="index">
                        <h6>{{item.value}}</h6>
                        <p>{{item.text}}</p>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
  import MyIcon from "@/components/common/MyIcon";

  export default {
    props: {
      dataSource: {
        type: Array,
        default: () => []
      },
      orderRouter: {
        type: String,
        default: 'myOrder'
      }
    },
    components: {
      MyIcon
    },
    methods: {},
  }
</script>


<style lang="less" scoped>
    .order-card {
        border-radius: 9px;

        .content {
            background: #ffffff;
            border-radius: 9px;
        }

        h1 {
            @flex-sb-center();
            font-size: 14px;
            line-height: 44px;
            padding: 0 10px;

            .right {
                @flex-sb-center();
                color: @main-color;
                font-size: 12px;
            }
        }
    }

    .order-item {
        ul {
            @flex-sb-center();
            padding-left: 24px;
            padding-right: 24px;

            li {
                display: inline-block;
                text-align: center;
                padding: 14px 0 15px;
            }

            h6 {
                font-size: 21px;
                color: @main-color;
            }

            p {
                color: #666666;
                margin-top: 6px;
            }
        }
    }
</style>
