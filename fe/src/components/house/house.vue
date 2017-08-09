<template>
    <div class="house">
        <div class="common-header">
            <div class="common-header-l">
                <h1 class="title">房屋信息</h1>
            </div>
            <div class="common-header-r">
                <div class="common-r-item">
                    <label for="">所属楼栋:</label>
                    <el-input @keyup.enter.native="search" v-model="searchParams.building_name" placeholder="请输入楼栋名称" class="common-search-line" size="small"></el-input>
                </div>
                <div class="common-r-item">
                    <label for="">名称:</label>
                    <el-input @keyup.enter.native="search" v-model="searchParams.name" placeholder="请输入房屋名称" class="common-search-line" size="small"></el-input>
                </div>
                
                <div class="common-r-item">
                    <label for="">用户:</label>
                    <el-input @keyup.enter.native="search" v-model="searchParams.user_name" placeholder="请输入用户" class="common-search-line" size="small"></el-input>
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
        <div class="table-wrapper" v-loading="loading">
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
                  prop="user_name"
                  label="租户">
                </el-table-column>
                <el-table-column
                  prop="building_name"
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
                        width="200">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row)">续租</el-button>
                        <el-button type="text" size="small" @click="edit(scope.row)">退租</el-button>
                        <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="del(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="common-pagenation">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="searchParams.pageNo"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="searchParams.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
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
                loading: false,
                searchParams: {
                    building_name: '',
                    name: '',
                    user_name: '',
                    start_time: '',
                    end_time: '',
                    pageNo: 1,
                    pageSize: 10
                },
                tableData: [],
                dateRange: [],
                total: 10
            }
        },
        methods: {
            handleSizeChange(val) {
                this.searchParams.pageSize = val
                this.search()
            },
            handleCurrentChange(val) {
                this.searchParams.pageNo = val
                this.search
            },
            search: async function () {
                this.loading = true
                let res = await $$house_model.getList(this.searchParams)
                this.loading = false
                if (res.status === 0) {
                    this.tableData = res.data.list
                    this.total = res.data.total
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
            this.search()
        }
    }
</script>