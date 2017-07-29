<template>
    <div class="house">
        <div class="common-header">
            <div class="common-header-l">
                <h1 class="title">房屋信息</h1>
            </div>
            <div class="common-header-r">
                <div class="common-r-item">
                    <label for="">所属楼栋:</label>
                    <el-select size="small" v-model="searchParams.building_id" class="common-search-line" placeholder="所属楼栋">
                        <el-option label="全部" :value="0"></el-option>
                        <el-option v-for="item in buildingSelect" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </div>
                <div class="common-r-item">
                    <label for="">名称:</label>
                    <el-input v-model="searchParams.name" placeholder="请输入房屋名称" class="common-search-line" size="small"></el-input>
                </div>
                
                <div class="common-r-item">
                    <label for="">用户:</label>
                    <el-input v-model="searchParams.user_name" placeholder="请输入用户" class="common-search-line" size="small"></el-input>
                </div>
                <div class="common-r-item">
                    <label for="">入住时间范围:</label>
                    <el-date-picker
                        v-model="dateRange"
                        size="small"
                        type="daterange"
                        placeholder="选择日期范围">
                    </el-date-picker>
                </div>
                <div class="common-r-item">
                    <label for="">是否入住:</label>
                    <el-switch v-model="searchParams.is_live" on-text="" off-text=""></el-switch>
                </div>
                <div class="common-r-item">
                    <el-button size="small" type="primary">新增</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import $$building_model from '../building-info/model-building-info.js'
    export default {
        data() {
            return {
                buildingSelect: [],
                searchParams: {
                    building_id: 0,
                    name: '',
                    user_name: '',
                    is_live: false,
                    start_time: '',
                    end_time: ''
                },
                dateRange: []
            }
        },
        methods: {
            getbuildingSelect: async function () {
                let res1 = await $$building_model.getList({name: ''});
                if (res1.status === 0) {
                    this.buildingSelect = res1.data;
                } else {

                }
            },
            search: async function () {

            }
        },
        beforeMount() {
            this.getbuildingSelect();
        }
    }
</script>