<template>
    <div class="list">
        <template v-if="dataSource.length">
            <doctor-card
                class="van-hairline--bottom mb10"
                v-for="(item, index) in dataSource"
                :key="index"
                :avatar="item.headimgurl"
                :name="item[doctorNameField]"
                :dept="item.deptName"
                :hospital="item.hospitalName"
                :title="item[doctorTitleField]"
                @click.native="$router.push({path: '/doctor/detail', query: {id: item[doctorIdField]}})"
            />
        </template>
        <search-empty v-else/>
    </div>
</template>

<script>
    import DoctorCard from "@/components/doctor/DoctorCard";
    import SearchEmpty from "@/components/empty/SearchEmpty";

    export default {
        props: {
            dataSource: {
                type: Array,
                default: () => []
            },
            doctorNameField: {
                type: String,
                default: 'name'
            },
            doctorTitleField: {
                type: String,
                default: 'title'
            },
            doctorIdField: {
                type: String,
                default: 'id'
            },
        },
        components: {
            DoctorCard,
            SearchEmpty
        },
    }
</script>

<style lang="less" scoped>
    .list{
        padding: 15px;
    }
</style>
