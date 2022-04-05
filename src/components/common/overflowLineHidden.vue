<template>
    <div class="content-wrap">
        <div :class="['content', expande ? 'expande' : 'close']" ref="content">
            <p>思路：1、判断当前内容是否超过三行。此处可以给每行设置一个行高line-height,渲染完后超过三倍的行高即认为是内容超过了三行。2、展示/收起状态的切换可以通过data中的参数来绑定。3、在底部使用position:absolute来绝对定位展开该在的位置。4、根据业务需求来设定好展开和收起按钮需要呆的地方。</p>
            <span>...</span>
        </div>
        <div class="expande-button-wrap" v-if="needShowExpande">
            <div class="expande-button" @click="expandeClick" v-if="!expande">
                <span>查看更多>></span>
            </div>
            <div class="expande-button" @click="expandeClick" v-else>收起</div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        data() {
            return {
                expande: true,
                needShowExpande: false,
            }
        },
        methods: {
            expandeClick() {
                this.expande = !this.expande
            },
        },
        mounted() {
            this.$nextTick(() => {
                let lineHeight = 22
                if (this.$refs.content.offsetHeight > lineHeight * 3) {
                    this.expande = false
                    this.needShowExpande = true
                } else {
                    this.expande = true
                }
            })
        },
    }
</script>

<style lang="less" scoped>
    .content {
        font-size: 14px;
        color: black;
        letter-spacing: 0;
        line-height: 22px;
        text-align: justify;
        overflow: hidden;
        /* display: -webkit-box; */
        /* -webkit-line-clamp: 3;
        -webkit-box-orient: vertical; */
        /* text-overflow: ellipsis; */
    }

    .expande {
        overflow: auto;
        height: auto;
        padding-bottom: 22px;
    }

    .close {
        overflow: hidden;
        height: 66px;
        padding-bottom: 0;
    }

    .expande-button-wrap {
        height: 22px;
    }

    .expande-button {
        color: @main-color;
        vertical-align: middle;
        font-size: 14px;
        line-height: 22px;
    }
</style>
