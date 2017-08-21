<template>
    <div class="house">
        <div class="common-header">
            <div class="common-header-l">
                <h1 class="title">房屋信息</h1>
            </div>
            <div class="common-header-r">
                <div class="common-r-item" style="margin-right: 20px;">
                    <span class="color-block red"></span>
                    <span>空置</span>
                    <span class="color-block yellow"></span>
                    <span>已过期</span>
                    <span class="color-block blue"></span>
                    <span>快到期</span>
                </div>
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
                        @change="search"
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
                    <el-button @click="exportSingle" size="small" type="primary">导出</el-button>
                </div>
                <div class="common-r-item">
                    <el-button @click="exportAll" size="small" type="primary">导出全部</el-button>
                </div>
            </div>
        </div>
        <div class="table-wrapper" v-loading="loading">
            <el-table :data="tableData" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="55"> 
                </el-table-column>
                <!-- <el-table-column
                  prop="id"
                  label="id"
                  width="60">
                </el-table-column> -->
                <el-table-column
                  prop="house_name"
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
                  :formatter="startTimeFormatter"
                  prop="start_time"
                  label="入住时间">
                </el-table-column>
                <el-table-column
                  :formatter="endTimeFormatter"
                  prop="end_time"
                  label="到期时间">
                </el-table-column>
                <el-table-column
                  prop="description"
                  label="描述">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="240">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="del(scope.row.id)">删除</el-button>
                        <el-button v-if="scope.row.user_name" type="text" size="small" @click="handleReRent(scope.row)">续租</el-button>
                        <el-button v-if="scope.row.user_name" type="text" size="small" @click="quitRent(scope.row)">退租</el-button>
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
            <el-dialog size="tiny" title="续租房屋" :visible.sync="reRentDialog">
                <el-form ref="form" label-width="130px">
                    <el-form-item label="延长退租时间至" required>
                        <el-date-picker
                            v-model="date"
                            size="small"
                            type="date"
                            :picker-options="pickerOptions"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div class="common-submit-w">
                    <el-button @click="reRentDialog = false">取消</el-button>
                    <el-button type="primary" @click="rent">提交</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="download">
            <form method="post" ref="downloadForm">
                <input ref="ids" type="text" name="ids" style="display: none;">
                <iframe ref="downloadFrame" name="downloadFrame" style="display: none;" frameborder="0"></iframe>
            </form>
        </div>
    </div>
</template>
<script>
    import $$util from '../../lib/util.js'
    import $$building_model from '../building-info/model-building-info.js'
    import $$house_model from './model-house.js'
    export default {
        components: {
            'form-dialog': require('./house-dialog.vue')
        },
        data() {
            let query = this.$route.query
            let _this = this
            return {
                importDialog: {
                    dialogVisible: false
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < _this.date;
                    }
                },
                reRentDialog: false,
                rentRow: {},
                date: '',
                index: 0,
                loading: false,
                searchParams: {
                    building_name: query.building_name || '',
                    name: query.name || '',
                    user_name: query.user_name || '',
                    start_time: query.start_time || '',
                    end_time: query.end_time || '',
                    pageNo: parseInt(query.pageNo) || 1,
                    pageSize: parseInt(query.pageSize) || 10
                },
                tableData: [],
                dateRange: [],
                total: 10,
                selectedIds: []
            }
        },
        watch: {
            dateRange(val) {
                if (val[0]) {
                    this.searchParams.start_time = $$util.dateFormat(val[0], 'yyyy-MM-dd hh:mm:ss')
                    this.searchParams.end_time = $$util.dateFormat(val[1], 'yyyy-MM-dd hh:mm:ss')
                }
            }
        },
        methods: {
            exportSingle() {
                if (!this.selectedIds.length) {
                    this.$message({
                        message: '请选择导出条目',
                        type: 'warning'
                    })
                    return
                }
                let downloadForm = this.$refs.downloadForm
                this.$refs.ids.value = JSON.stringify(this.selectedIds)
                downloadForm.setAttribute('action', '/api/house/export')
                downloadForm.setAttribute('target', 'downloadFrame')
                downloadForm.submit()
            },
            exportAll() {
                let downloadForm = this.$refs.downloadForm
                downloadForm.setAttribute('action', '/api/house/exportAll')
                downloadForm.setAttribute('target', 'downloadFrame')
                downloadForm.submit()
            },
            quitRent: async function (row) {
                this.$confirm('是否退租?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    this.loading = true
                    let res = await $$house_model.quitRent({id: row.id})
                    this.loading = false
                    if (res.status === 0) {
                        this.$message({
                            message: '退租成功',
                            type: 'success'
                        });
                        this.search()
                    } else {
                        this.$message.error('网络错误')
                    }
                }).catch(() => {

                });
            },
            handleReRent(row) {
                this.rentRow = row
                this.date = new Date(row.end_time)
                this.reRentDialog = true
            },
            rent: async function () {
                let res, _params
                this.loading = true
                _params = Object.assign({}, {
                    id: this.rentRow.id,
                    name: this.rentRow.house_name,
                    building_id: this.rentRow.building_id,
                    user_id: this.rentRow.user_id,
                    jwh: this.rentRow.jwh,
                    start_time: $$util.dateFormat(new Date(this.rentRow.start_time), 'yyyy-MM-dd hh:mm:ss'),
                    end_time: this.rentRow.end_time
                });
                _params.end_time = $$util.dateFormat(this.date, 'yyyy-MM-dd hh:mm:ss')

                for (let key in _params) {
                    if (_params[key] === '') {
                        delete _params[key]
                    }
                }
                res = await $$house_model.updateRow(_params)
                this.loading = false
                if (res.status === 0) {
                    this.search()
                    this.$message({
                        message: '续租成功',
                        type: 'success'
                    });
                    this.reRentDialog = false
                } else {
                    this.$message.error('false')
                }

            },
            tableRowClassName(row) {
                let now = new Date()
                if (!row.user_name) {
                    return 'empty';
                }
                if (new Date(row.end_time).valueOf() - now.valueOf() <= 30 * 24 * 60 * 60 * 1000 && new Date(row.end_time).valueOf() - now.valueOf() > 0) {
                   return 'out-date';
                }
                if (new Date(row.end_time).valueOf() < now.valueOf()) {
                    return 'excc'
                }
                return '';
            },
            startTimeFormatter(row) {
                if (row.start_time) {
                    return $$util.dateFormat(new Date(row.start_time), 'yyyy-MM-dd')
                } else {
                    return ''
                }
            },
            endTimeFormatter(row) {
                if (row.end_time) {
                    return $$util.dateFormat(new Date(row.end_time), 'yyyy-MM-dd')
                } else {
                    return ''
                }
            },
            edit(row) {
                let $dialog = this.$refs.dialog
                let _params = {
                    id: row.id,
                    name: row.house_name,
                    building_id: row.building_id,
                    user_id: row.user_id,
                    jwh: row.jwh,
                    start_time: row.start_time,
                    end_time: row.end_time
                };
                Object.assign($dialog.form, _params);
                $dialog.dialogVisible = true
            },
            handleSelectionChange(val) {
                let selectedIds = val.map(item => item.id)
                this.selectedIds = selectedIds
            },
            handleSizeChange(val) {
                this.searchParams.pageSize = val
                this.search()
            },
            handleCurrentChange(val) {
                this.searchParams.pageNo = val
                this.search()
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
<style lang="less">
    .house {
        .color-block {
            display: inline-block;
            width: 10px;
            height: 10px;
        }
        .red,.empty {
            background: #f7bcbc;
        }
        .yellow,.excc {
            background: #ffffbf;
        }
        .blue,.out-date {
            background: #c9e5f5;
        }
    }
</style>