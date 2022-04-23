<template>
    <van-popup v-model="show" position="bottom" round :style="{ height: '95%' }" @close="onClose" get-container="body" closeable>
        <topicCard v-on="$listeners" v-bind="$attrs" :data="data" :subscribe="subscribe" :show-action="false"/>
        <div class="bottom-action">
            <div class="bottom-input" @click="onInputClick"><van-icon class="mr4" name="edit" />请输入您要评论的内容</div>
            <span class="zan-box" @click.stop="onZanClick">
                <van-icon class="mr4" :name="ifZan ? dianzanPressIcon : dianzanIcon" size="20"/>
                <span class="font16" style="color: #999999;">{{data.upCount}}</span>
            </span>
        </div>
    </van-popup>
</template>

<script>
    import Vue from 'vue';
    import topicCard from "@/routes/topic/components/topicCard";
    import {dianZan, dyncmicInfo} from "@/service/topic/topService";
    import {Field, Popup, Icon} from 'vant';

    Vue.use(Popup);
    Vue.use(Field);
    Vue.use(Icon);
    export default {
        props: {
            show: {},
            data: {},
            forbidden: {},
            subscribe: {}
        },
        components: {
            topicCard
        },
        data() {
            return {
                ifZan: '',
                dianzanIcon: require('@static/img/topic/icon_dianzan.png'),
                dianzanPressIcon: require('@static/img/topic/icon_dianzan_pressed.png'),
            }
        },
        created() {
            //this.getDetail();
        },
        methods: {
            async getDetail() {
                const id = this.$route.query.id;
                const {data} = await dyncmicInfo(id);
                this.data = data;
            },
            onClose() {
                this.$emit('update:show', false);
                this.$emit('onModalClose')
            },
            async onZanClick (){
                const result = await dianZan(this.data.id);
                if(result.status === 200){
                    if(this.ifZan){
                        this.data.upCount = this.data.upCount - 1;
                    }else{
                        this.data.upCount = this.data.upCount + 1;
                    }
                    this.$emit('onZanClick');
                    this.ifZan = !this.ifZan;
                    this.$toast.success('操作成功')
                }
            },
            onInputClick(){
                this.$emit('onInputClick', this.data)
            }
        },
    }
</script>

<style lang="less" scoped>
    .bottom-action {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        @flex-sb-center();
        background: #ffffff;
        padding: 10px 15px;
        box-shadow: 0px -1px 12px 0px rgba(153, 153, 153, 0.18);
    }

    .bottom-input{
        height: 39px;
        line-height: 39px;
        width: 260px;
        padding-left: 15px;
        border-radius: 20px;
        background: #F5F5F5;
        font-size: 14px;
        color: #999999;
    }
    .zan-box{
        @flex-sb-center();
    }
</style>
