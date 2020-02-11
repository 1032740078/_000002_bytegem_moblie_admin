<template>
    <div class="box-flex">
        <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item >
                <el-select v-model="search.region" placeholder="请选择搜索条件">
                    <el-option
                            v-for="(classifyList,classifyList_key) in classify"
                            :key="classifyList_key"
                            :label="classifyList.label"
                            :value="classifyList.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input v-model="search.keyword" placeholder="请输入搜索关键字"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                        type="primary"
                        icon="iconfont el-icon-search"
                        @click="searchBtn">
                    查询
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // classify:[
                //     {
                //         label: '',
                //         value: '',
                //     },
                // ],
                search:{
                    region: '',
                    keyword: '',
                }
            }
        },
        props: ['classify'],
        methods:{
            searchBtn(){
                let data = this.search
                this.$emit('searchData',data)
            }
        }

    }
</script>

<style scoped>
    .search-input {
        padding-bottom: 15px;
        min-width: 260px;
        max-width: 280px;
    }
</style>