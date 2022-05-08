<template>
    <div>
        <div class="search-box">
            <search @search="onSearch" :init-value="value"/>
        </div>
        <department-list/>
        <disease-list />
        <doctor-list :data-source="doctorList"
                     doctor-name-field="doctorName"
                     doctor-title-field="doctorTitle"
                     doctor-id-field="doctorId"/>
    </div>
</template>

<script>
    import DepartmentList from "./components/DepartmentList";
    import DiseaseList from "./components/DiseaseList";
    import DoctorList from "./components/DoctorList";
    import Search from "@/components/Search/Search";
    import {searchAll} from "@/service/searchService";

    export default {
        components: {
            Search,
            DepartmentList,
            DiseaseList,
            DoctorList,
        },
        data() {
            return {
                value: '',
                doctorList: [],
                departmentList: [],
                diseaseList: [],
            }
        },
        created() {
            this.value = this.$route.query.value || '';
            this.searchAll()
        },
        methods: {
            async searchAll(){
                const result = await searchAll(this.value);
                if (result.success) {
                    this.doctorList = result.data;
                } else {
                    this.$toast.fail(result.msg);
                }
            },
            onSearch(value) {
                this.value = value;
                this.searchAll();
            }
        },
    }
</script>

<style lang="less" scoped>
    .search-box {
        background: @main-color;
        padding: 10px 15px;
    }
</style>
