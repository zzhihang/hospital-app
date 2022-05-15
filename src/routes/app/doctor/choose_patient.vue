<template>
    <div>
        <h2 class="ask">
            <span>您要为哪位就诊人咨询？</span>
            <van-button type="primary" icon="plus" size="mini" plain @click="$router.push({name: 'familyAdd'})">新建就诊人</van-button>
        </h2>
        <div class="list" v-if="list.length">
            <div class="item" v-for="(item, index) in list" :key="index">
                <van-radio :name="item.id" v-model="patientId" @click="onChange(item)">
                    <div>
                        <h2>{{item.name}}</h2>
                        <p>{{item.sex}} {{getAgeById(item.idNumber)}}岁</p>
                    </div>
                </van-radio>
            </div>
        </div>
        <my-empty v-else description="还没有就诊人，赶快添加吧！"></my-empty>
        <div class="bottom-button-box">
            <van-button type="primary" @click="onNextClick">确定</van-button>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {userPatientList} from "@/service/userInfoService";
    import {getAgeById} from "@/static/js/util";
    import connect from "@/store/connect";
    import myEmpty from "@/components/empty/myEmpty";
    const {mapMutations} = connect('commonStore');

    export default {
        components: {
            myEmpty
        },
        data() {
            return {
                patientId: '',
                userId: '',
                list: []
            }
        },
        created(){
            userPatientList().then(({data}) => {
                this.list = data;
            })
        },
        methods: {
            ...mapMutations(['setOrderPatient']),
            onChange(item){
                this.setOrderPatient(item);
            },
            onNextClick(){
                if(!this.patientId){
                    return this.$toast.fail('请选择就诊人')
                }
                this.$router.push({name: 'choose_time', query: {patientId: this.patientId, userId: this.list[0].userId}})
            },
            getAgeById: getAgeById
        },
    }
</script>

<style lang="less" scoped>
    .ask {
        color: @main-color;
        @flex-sb-center();
        height: 48px;
        background: #E0ECFF;
        padding-left: 15px;
        padding-right: 15px;

        .van-button {
            width: 85px;
            background: transparent;

            .van-button__content {
                padding: 0;
            }
        }
    }

    .list {
        padding: 14px;
        display: flex;
        flex-wrap: wrap;
        .item {
            width: 43%;
            height: 67px;
            padding-left: 15px;
            background: #FFFFFF;
            margin-bottom: 10px;
            border-radius: 6px;
            margin-right: 16px;
            &:nth-of-type(2n){
                margin-right: 0;
            }
            @flex-sb-center();
            p{
                font-size: 14px;
                color: #666666;
                margin-top: 4px;
            }
        }
    }
</style>
