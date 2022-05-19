<template>
    <div class="bottom-button-box-fixed">
        <doctor-card
                mode="dark"
                :avatar="doctor.headimgurl"
                :name="doctor.name"
                :dept="doctor.deptName"
                :hospital="doctor.hospitalName"
                :title="doctor.title"
                :follow="doctor.follow"
                :show-focus="false"
                :tag-list="doctor.diseaseLabel && doctor.diseaseLabel.split(',')"
        />
        <div class="ad">
            <ul>
                <li>*医生真实</li>
                <li>*未使用随时退</li>
                <li>*不满意可申诉</li>
            </ul>
        </div>
        <div class="list">
            <service-item class="mt10"
                          v-for="(item, index) in serviceList"
                          :key="index"
                          :name="item.serviceItem"
                          :address="item.addr"
                          :price="item.price"
                          :desc="item.serviceDescr"
            >
                <van-radio :name="item.id" @click="onChange(item)" v-model="serviceId" class="mr15"></van-radio>
            </service-item>
        </div>
        <div class="bottom-button-box">
            <van-button type="primary" @click="onNextClick">立即申请</van-button>
        </div>
    </div>
</template>

<script>
    import DoctorCard from "@/components/doctor/DoctorCard";
    import {doctorInfoService} from "@/service/doctorInfoService";
    import ServiceItem from "@/routes/app/doctor/components/ServiceItem";
    import connect from "@/store/connect";
    const {mapMutations} = connect('commonStore');

    export default {
        components: {
            DoctorCard,
            ServiceItem
        },
        data() {
            return {
                doctor: {},
                serviceId: '',
                serviceList: []
            }
        },
        created() {
            doctorInfoService(this.$route.query.id).then(({data}) => {
                this.doctor = data.doctor;
                this.serviceList = data.service
            })
        },
        methods: {
            ...mapMutations(['setOrderDoctor', 'setOrderService']),
            onChange(item){
                this.setOrderService(item)
            },
            onNextClick(){
                if(!this.serviceId){
                    return this.$toast.fail('请选择服务项目')
                }
                this.setOrderDoctor(this.doctor);
                this.$router.push({name: 'choose_patient', query: {serviceId: this.serviceId}})
            }
        },
    }
</script>

<style lang="less" scoped>
    .ad {
        background: #E0ECFF;
        ul{
            @flex-sb-center();
            height: 30px;
        }
        li{
            text-align: center;
            flex: 1;
            font-size: 12px;
            color: @main-color;
            border-right: 1px solid @main-color;
            &:last-child{
                border-right: none;
            }
        }
    }
</style>
