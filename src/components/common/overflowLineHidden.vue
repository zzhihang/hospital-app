<template>
    <div class="content-wrap">
        <div :class="['content', expand ? 'expand' : 'close']" ref="content">
            <p v-html="content"></p>
        </div>
        <div class="expand-button-wrap" v-if="needShowexpand">
            <div class="expand-button" @click="onMoreClick" v-if="!expand">
                <span>查看更多>></span>
            </div>
            <div class="expand-button" @click="expandClick" v-else>收起</div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        props: ['content'],
        data() {
            return {
                expand: true,
                needShowexpand: false,
            }
        },
        methods: {
            expandClick() {
                this.expand = !this.expand
            },
            onMoreClick(){
                this.$emit('onMoreClick')
            }
        },
        mounted() {
            this.$nextTick(() => {
                let lineHeight = 22
                    if (this.$refs.content.offsetHeight > lineHeight * 8) {
                    this.expand = false
                    this.needShowexpand = true
                } else {
                    this.expand = true
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

    .expand {
        overflow: auto;
        height: auto;
    }

    .close {
        overflow: hidden;
        height: 176px;
        padding-bottom: 0;
    }

    .expand-button-wrap {
        height: 22px;
    }

    .expand-button {
        color: @main-color;
        vertical-align: middle;
        font-size: 14px;
        line-height: 22px;
    }
</style>
