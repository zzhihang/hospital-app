<template>
    <div class="body">
        <div class="main-box">
            <h6>用户研究方法</h6>
            <p class="intro">用户体验设计是以用户为中心的一种设计手段，以用户需求为目标而进行的设计。</p>
            <div class="van-hairline--top"></div>
            <ul>
                <li>
                    <h5>36</h5>
                    <p>订阅人数</p>
                </li>
                <li>
                    <h5>16</h5>
                    <p>动态数量</p>
                </li>
                <li>
                    <h5>136</h5>
                    <p>运营天数</p>
                </li>
            </ul>
        </div>

        <div class="tab-list">
            <tagList :data="labelList"/>
        </div>
        <div class="van-hairline--bottom"></div>
        <div class="card-list">
            <card v-for="(item, index) in 2" :key="index"/>
        </div>
        <bottom-box></bottom-box>
    </div>
</template>

<script>
    import Vue from 'vue';
    import tagList from "../../components/tag/tagList";
    import card from "./components/card";
    import bottomBox from "./components/bottomBox";
    import {userinfo, zhuantiList, testLogin, userLabelList} from "../../service/topic";

    export default {
        components: {
            tagList,
            card,
            bottomBox
        },
        data() {
            return {
                labelList: []
            }
        },
        created() {
            testLogin()
            zhuantiList({page: 1, size: 8});
            this.getLabels();
        },
        methods: {
            async getLabels() {
                const {data} = await userLabelList();
                this.labelList = data;
            }
        },
    }
</script>

<style lang="less" scoped>
    .main-box {
        background: url('../../static/img/topic/bg_shang.png') no-repeat;
        background-size: cover;
        box-shadow: 0 -1px 12px 0 rgba(153, 153, 153, 0.18);
        border-radius: 36px 36px 0 0;
        padding: 20px 15px;
        font-size: 16px;

        h6 {
            font-size: 18px;
        }

        .intro {
            margin-top: 13px;
            line-height: 24px;
        }

        ul {
            border-top: 1px solid rgb(153 153 153 / 30%);
            @flex-sb-center();
            padding-top: 15px;
            margin-top: 15px;

            li {
                border-right: 1px solid rgb(153 153 153 / 30%);
                text-align: center;
                flex: 1;
                font-size: 18px;

                &:last-child {
                    border-right: none;
                }
            }

            p {
                font-size: 12px;
                color: #999999;
                margin-top: 8px;
            }
        }
    }
    .tab-list{
        padding: 15px;
        background: #FFFFFF;
    }
    .card-list{
        .card{
            margin-bottom: 5px;
        }
    }
    .body{
        padding-bottom: 60px;
    }
</style>
