<template>
    <div class="doc-card">
        <van-image :src="logo"/>
        <span>{{name}}</span>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Image as VanImage} from 'vant';
    Vue.use(VanImage);
    export default {
        props: ['name', 'url', 'type'],
        data() {
            return {
                logo: ''
            }
        },
        watch: {
            type: {
                handler(){
                    if(this.type && this.type.includes('pdf')){
                        this.logo = require('@static/img/dynamic/pic_pdf.png')
                    }else{
                        this.logo = require('@static/img/dynamic/pic_word.png')
                    }
                },
                immediate: true
            }
        }
    }
</script>

<style lang="less" scoped>
    .doc-card {
        background: #F5F5F5;
        padding: 8px 15px;
        display: flex;
        align-items: center;
        border-radius: 6px;
        overflow: hidden;
        .van-image{
            width: 35px;
            height: 42px;
        }
        span{
            font-size: 14px;
            color: #666666;
            margin-left: 10px;
        }
    }
</style>
