<template>
    <div class="hospital-list">
        <ul>
            <li>
                <my-icon color="#C2D8FC" name="icon_yiyuan"/>
                <span class="ellipsis1">医院名称医院名称医院名称医院名称医院名称</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import Vue from 'vue';
    import MyIcon from "@/components/common/MyIcon";

    export default {
        components: {
            MyIcon
        },
        data() {
            return {
                activeKey: ''
            }
        },
    }
</script>

<style lang="less" scoped>
    .hospital-list{
        ul{
            li{
                @flex-sb-center();
            }
        }
    }

</style>
