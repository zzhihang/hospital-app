<template>
    <div class="list">
        <doctor-card
                class="van-hairline--bottom mt10"
                v-for="(item, index) in dataSource" :key="index"
                :avatar="item.headimgurl"
                :name="item.doctorName"
                :dept="item.deptName"
                :hospital="item.hospitalName"
                :title="item.doctorTitle"
                @click.native="$router.push({path: '/doctor/detail', query: {id: item.doctorId}})"
        />
    </div>
</template>

<script>
    import DoctorCard from "@/components/doctor/DoctorCard";

    export default {
        props: {
            dataSource: {
                type: Array,
                default: () => []
            }
        },
        components: {
            DoctorCard
        },
    }
</script>

<style lang="less" scoped>
    .list{
        padding: 15px;
    }
</style>
