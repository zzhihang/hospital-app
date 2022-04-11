<template>
    <div>
        <topic-card :data="data" />
        <div class="bottom-action">
            <van-field v-model="comment" label="文本" placeholder="请输入您要评论的内容" />
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import topicCard from "@/routes/topic/components/topicCard";
    import {dyncmicInfo} from "@/service/topic/topService";
    import { Field } from 'vant';

    Vue.use(Field);
    export default {
        components: {
            topicCard
        },
        data() {
            return {
                data: {},
                comment: ''
            }
        },
        created(){
            this.getDetail();
        },
        methods: {
            async getDetail() {
                const id = this.$route.query.id;
                const {data} = await dyncmicInfo(id);
                this.data = data;
            }
        },
    }
</script>

<style lang="less" scoped>
.bottom-action{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>
