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
                    <el-button @click="addNew" size="small" type="primary">新增</el-button>
                </div>
                <div class="common-r-item">
                    <el-button @click="addNew" size="small" type="primary">导入</el-button>
                </div>
                <div class="common-r-item">
                    <el-button @click="addNew" size="small" type="primary">导出</el-button>
                </div>
            </div>
        </div>
        <div class="table-wrapper">
            <el-table :data="tableData">
                <el-table-column
                  prop="id"
                  label="id"
                  width="60">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="名称">
                </el-table-column>
                <el-table-column
                  prop="user_id"
                  label="租户">
                </el-table-column>
                <el-table-column
                  prop="building_id"
                  label="所属楼栋">
                </el-table-column>
                <el-table-column
                  prop="jwh"
                  label="居委会">
                </el-table-column>
                <el-table-column
                  prop="start_time"
                  label="入住时间">
                </el-table-column>
                <el-table-column
                  prop="end_time"
                  label="退租时间">
                </el-table-column>
                <el-table-column
                  prop="description"
                  label="描述">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="text" size="small"  @click="del(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="dialog">
            <form-dialog ref="dialog"></form-dialog>
        </div>
    </div>
</template>
<script>
    import $$building_model from '../building-info/model-building-info.js'
    import $$house_model from './model-house.js'
    export default {
        components: {
            'form-dialog': require('./house-dialog.vue')
        },
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
                tableData: [],
                dateRange: []
            }
        },
        methods: {
            getbuildingSelect: async function () {
                let res1 = await $$building_model.getList({name: ''})
                if (res1.status === 0) {
                    this.buildingSelect = res1.data
                } else {

                }
            },
            search: async function () {
                let res = await $$house_model.getList({})
                if (res.status === 0) {
                    this.tableData = res.data
                }
            },
            addNew() {
                this.$refs.dialog.dialogVisible = true
            },
            del: async function (id) {
                this.$confirm('是否删除该房屋?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    this.loading = true
                    let res = await $$house_model.delRow({id: id})
                    this.loading = false
                    if (res.status === 0) {
                        this.search()
                    } else {
                        this.$message.error('网络错误')
                    }
                }).catch(() => {

                });
            }
        },
        beforeMount() {
            this.getbuildingSelect()
            this.search()
        }
    }
</script>