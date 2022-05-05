<template>
    <div class="focus-list" v-if="list.length">
        <doctor-card
                class="van-hairline--bottom"
                v-for="(item, index) in list" :key="index"
                :avatar="item.headimgurl"
                :name="item.doctorName"
                :dept="item.deptName"
                :hospital="item.hospitalName"
                :title="item.doctorTitle"
                @click.native="$router.push({path: '/doctor', query: {id: item.doctorId}})"
        />
    </div>
    <my-empty v-else description="暂无关注医生"/>
</template>

<script>
    import DoctorCard from "@/components/doctor/DoctorCard";
    import {doctorFollowList} from "@/service/doctorService";
    import myEmpty from "@/components/empty/myEmpty";
    export default {
        components: {
            DoctorCard,
            myEmpty
        },
        data() {
            return {
                list: []
            }
        },
        created(){
            doctorFollowList().then(({data}) => {
                this.list = data;
            })
        }
    }
</script>

<style lang="less" scoped>
    .focus-list{
        padding: 15px;
    }
</style>
