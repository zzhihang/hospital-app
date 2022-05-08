<template>
    <doctor-list :data-source="doctorList"/>
</template>

<script>
    import DoctorList from "./components/DoctorList";
    import {queryDoctorByHospital, queryDoctorByLabel} from "@/service/searchService";

    export default {
        components: {
            DoctorList
        },
        data() {
            return {
                doctorList: []
            }
        },
        created(){
            if(this.$route.query.hospitalId){//搜索来源科室
                document.title = this.$route.query.deptName;
                const {deptId, hospitalId} = this.$route.query;
                queryDoctorByHospital({deptId, hospitalId}).then(({data}) => {
                    this.doctorList = data;
                })
            }else{
                document.title = this.$route.query.label;
                const {label, diseaseId} = this.$route.query;
                queryDoctorByLabel({label, diseaseId}).then(({data}) => {
                    this.doctorList = data;
                })
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
