<template>
    <div>
        <div class="search-box">
            <search @search="onSearch" placeHolder="搜索医院关键字"/>
        </div>
        <department-list :data-source="list" @onRightItemClick="onRightItemClick"/>
    </div>
</template>

<script>
    import {queryHospital} from "@/service/searchService";
    import DepartmentList from "@/routes/app/search/components/DepartmentList";
    import Search from "@/components/Search/Search";

    export default {
        data() {
            return {
                list: []
            }
        },
        components: {
            DepartmentList,
            Search
        },
        created(){
           this.queryHospital();
        },
        methods: {
            onSearch(value){
                this.queryHospital(value)
            },
            async queryHospital(value) {
                const {data} = await queryHospital(value);
                this.list = data;
            },
            onRightItemClick(e, hospitalId){
                const {deptId, deptName} = e;
                this.$router.push({name: 'entry_doctor', query: {deptId, deptName, hospitalId}})
            }
        },
    }
</script>

<style lang="less" scoped>
    .search-box {
        background: @main-color;
        padding: 10px 15px;
        margin-bottom: 15px;
    }
</style>
