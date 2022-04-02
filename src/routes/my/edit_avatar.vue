<template>
    <div class="body">
        <div class="avatar-upload">
            <van-image :src="url"/>
        </div>
        <van-uploader
                :after-read="afterRead"
                :max-count="1"
        >
            <div class="change">更换</div>
        </van-uploader>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Image as VanImage, Uploader} from 'vant';
    import {updateUserInfo, upload} from "@/service/commonService";

    Vue.use(VanImage)
    Vue.use(Uploader);
    export default {
        data() {
            return {
                url: this.$route.query.url,
                fileList: [{url: this.$route.query.url}]
            }
        },
        methods: {
            async afterRead(file) {
                const formData = new FormData();
                formData.append('file', file.file);
                const result = await upload(formData);
                if(result.status === 200){
                    this.$toast.success('上传成功')
                }
                this.url = result.data.data.url;
                const result2= await updateUserInfo({headimgurl: this.url});
                if(result.status === 200){
                    this.$toast.success('修改成功');
                    setTimeout(() => {
                        this.$router.go(-1);
                    })
                }
            }
        },
    }
</script>

<style lang="less" scoped>
    .avatar-upload {
        background: #FFFFFF;
        margin: 20px auto 5px;
        text-align: center;
        padding-bottom: 20px;
        .van-image{
            width: 345px;
            height: 345px;
        }
    }

    .change {
        line-height: 44px;
        color: #D94F17;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        background: #FFFFFF;
    }

    .van-uploader{
        width: 100%;
        /deep/.van-uploader__input-wrapper{
            width: 100%;
        }
    }
</style>
