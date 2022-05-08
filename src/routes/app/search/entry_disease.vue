<template>
    <div>
        <div class="search-box">
            <search @search="onSearch" place-holder="搜索疾病关键字"/>
        </div>
        <disease-list :data-source="list" @onRightItemClick="onRightItemClick"/>
    </div>
</template>

<script>
    import {queryDisease} from "@/service/searchService";
    import DiseaseList from "@/routes/app/search/components/DiseaseList";
    import Search from "@/components/Search/Search";

    export default {
        data() {
            return {
                list: []
            }
        },
        components: {
            DiseaseList,
            Search
        },
        created(){
            this.queryDisease();
        },
        methods: {
            onSearch(value){
                this.queryDisease(value)
            },
            async queryDisease(value) {
                const {data} = await queryDisease(value);
                this.list = data;
            },
            onRightItemClick(label, diseaseId){
                this.$router.push({name: 'entry_doctor', query: {label, diseaseId}})
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
