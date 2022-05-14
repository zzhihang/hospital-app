<template>
    <div>
        <doctor-card
                mode="dark"
                :show-focus="true"
                :avatar="model.headimgurl"
                :name="model.name"
                :dept="model.deptName"
                :hospital="model.hospitalName"
                :title="model.title"
                :doctor-id="model.id"
                :follow="model.follow"
                :tag-list="model.diseaseLabel && model.diseaseLabel.split(',')"
        />
        <div class="entry-box">
            <div class="entry-item" @click="onConsultClick">
                <my-icon :name="require('../../../static/img/doctor/icon_zixun.png')" size="20"></my-icon>
                <span>咨询</span>
                <my-icon name="icon_jinru_01" color="#367DF7" size="6"></my-icon>
            </div>
            <div class="entry-item entry-item2" @click="onAppointClick">
                <my-icon :name="require('../../../static/img/doctor/icon_yuyue.png')" size="20"></my-icon>
                <span>预约</span>
                <my-icon name="icon_jinru_01" color="#F6AA26" size="6"></my-icon>
            </div>
        </div>
        <div class="intro-floor">
            <h2>专业擅长</h2>
            <p class="content">{{model.major}}</p>
        </div>
        <div class="intro-floor">
            <h2>个人简介</h2>
            <p class="content">{{model.introduction}}</p>
        </div>
    </div>
</template>

<script>
    import DoctorCard from "@/components/doctor/DoctorCard";
    import MyIcon from "@/components/common/MyIcon";
    import {doctorDetail} from "@/service/doctorInfoService";

    export default {
        components: {
            DoctorCard,
            MyIcon
        },
        data() {
            return {
                model: {}
            }
        },
        created() {
            this.doctorDetail();
        },
        methods: {
            async doctorDetail() {
                const {id} = this.$route.query;
                const {data} = await doctorDetail(id)
                this.model = data;
            },
            onConsultClick(){
                if(!this.model.chat){
                    this.$confirm({message: '此医生不支持免费咨询，需要先去下单哦~', confirmButtonText: '去下单', showCancelButton: false}, async () => {
                        this.onAppointClick();
                    })
                }else{
                    //去聊天
                }
            },
            onAppointClick(){
                this.$router.push({name: 'doctorAppoint', query: {id: this.model.id}})
            }
        },
    }
</script>

<style lang="less" scoped>
    .entry-box {
        @white-bg();
        @flex-sb-center();
        padding: 15px;
        margin-top: 10px;
    }

    .entry-item {
        background: url("../../../static/img/doctor/bg_zixun.png");
        width: 168px;
        height: 76px;
        background-size: cover;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
            margin-left: 12px;
            margin-right: 8px;
        }
    }

    .entry-item2 {
        background: url("../../../static/img/doctor/bg_yuyue.png");
        background-size: cover;
    }

    .intro-floor {
        @white-bg();
        margin-top: 10px;
        padding: 15px;

        h2:before {
            content: '';
            display: inline-block;
            width: 5px;
            height: 15px;
            background: red;
            background: linear-gradient(0, #367DF7 0%, rgba(54, 125, 247, 0) 100%);
            margin-right: 10px;
        }

        .content {
            border-radius: 6px;
            padding: 8px 12px;
            border: 1px solid rgba(153, 153, 153, 0.4);
            color: #666666;
            font-size: 14px;
            line-height: 21px;
            margin-top: 15px;
        }
    }
</style>
