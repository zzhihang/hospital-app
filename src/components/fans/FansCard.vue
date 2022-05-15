<template>
    <div class="fans-card">
        <van-image :src="avatar"/>
        <div class="info">
            <h2>{{name}}</h2>
            <p>{{phone}}</p>
        </div>
    </div>
</template>

<script>

  export default {
    props: ['name', 'phone', 'avatar']
  }
</script>

<style lang="less" scoped>
    .fans-card {
        @flex-sb-center();
        @white-bg();
        padding: 15px;

        .van-image {
            height: 42px;
            width: 42px;
            flex-shrink: 0;
        }

        .info {
            padding-left: 11px;
            flex: 1;

            p {
                color: #666666;
                font-size: 14px;
                margin-top: 7px;
            }
        }
    }
</style>
