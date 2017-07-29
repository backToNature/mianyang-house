<template>
    <div class="user-list">
        <div class="common-header">
            <div class="common-header-l">
                <h1 class="title">租户列表</h1>
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
                    <label for="">是否入住:</label>
                    <el-select size="small" v-model="searchParams.is_live" class="common-search-line" placeholder="所属楼栋">
                        <el-option label="已入住" :value="true"></el-option>
                        <el-option label="未入住" :value="false"></el-option>
                    </el-select>
                </div>
                <div class="common-r-item">
                    <label for="">入住时间范围:</label>
                    <el-date-picker
                        size="small"
                        class="common-search-line"
                        v-model="dateRange"
                        type="daterange"
                        placeholder="选择日期范围">
                    </el-date-picker>
                </div>
                <div class="common-r-item">
                    <el-input
                      size="small"
                      placeholder="按租户名称搜索"
                      icon="search"
                      v-model="searchParams.name"
                      :on-icon-click="handleIconClick">
                    </el-input>
                </div>
                <div class="common-r-item">
                    <el-button size="small" type="primary" @click="addNew">新增</el-button>
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
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="dibao"
                    label="低保证号">
                </el-table-column>
                <el-table-column
                    prop="house_id"
                    label="已租房屋">
                </el-table-column>
                <el-table-column
                    prop="phone_num"
                    label="联系方式">
                </el-table-column>
                <el-table-column
                    prop="id_card"
                    label="身份证号">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="del(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <form-dialog ref="dialog"></form-dialog>
    </div>
</template>
<script>
    import $$building_model from '../building-info/model-building-info.js'
    import $$user_model from './model-user.js'
    export default {
        components: {
            'form-dialog': require('./user-form-dialog.vue')
        },
        data() {
            return {
                loading: false,
                searchParams: {
                    is_live: false,
                    name: '',
                    building_id: 0
                },
                dateRange: [],
                buildingSelect: [],
                tableData: []
            }
        },
        methods: {
            handleIconClick() {

            },
            getbuildingSelect: async function () {
                let res1 = await $$building_model.getList({name: ''});
                if (res1.status === 0) {
                    this.buildingSelect = res1.data;
                } else {

                }
            },
            edit(row) {
                let $dialog = this.$refs.dialog
                Object.assign($dialog.form, row)
                $dialog.dialogVisible = true
            },
            addNew() {
                this.$refs.dialog.form.id = 0
                this.$refs.dialog.dialogVisible = true
            },
            del: async function (id) {
                this.$confirm('是否删除该用户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    this.loading = true
                    let res = await $$user_model.delRow({id: id})
                    this.loading = false
                    if (res.status === 0) {
                        this.search()
                    } else {
                        this.$message.error('网络错误')
                    }
                }).catch(() => {

                });
            },
            search: async function () {
                this.loading = true
                let res = await $$user_model.getList(this.searchParams)
                this.loading = false
                if (res.status === 0) {
                    this.tableData = res.data
                } else {
                    this.$message.error('网络错误')
                }
            }
        },
        beforeMount() {
            this.getbuildingSelect()
            this.search()
        }
    }
</script>