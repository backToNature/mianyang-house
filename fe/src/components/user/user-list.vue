<template>
    <div class="user-list">
        <div class="common-header">
            <div class="common-header-l">
                <h1 class="title">租户列表</h1>
            </div>
            <div class="common-header-r">
            <!--     <div class="common-r-item">
                    <label for="">所属楼栋:</label>
                    <el-select size="small" v-model="searchParams.building_id" filterable class="common-search-line" placeholder="所属楼栋">
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
                </div> -->
                <div class="common-r-item">
                    <el-input
                      size="small"
                      placeholder="按租户名称搜索"
                      icon="search"
                      @keyup.enter.native="search"
                      v-model="searchParams.name"
                      :on-icon-click="handleIconClick">
                    </el-input>
                </div>
                <div class="common-r-item">
                    <el-button size="small" type="primary" @click="addNew">新增</el-button>
                    <el-button size="small" type="primary" @click="importExcel">导入</el-button>
                    <el-button size="small" type="primary" @click="exportSingle">导出</el-button>
                    <el-button size="small" type="primary" @click="exportAll">导出全部</el-button>

                </div>
            </div>
        </div>
        <div class="table-wrapper" v-loading="loading">
            <el-table :data="tableData"  @selection-change="handleSelectionChange">
               <!--  <el-table-column
                    prop="id"
                    label="id"
                    width="60">
                </el-table-column> -->
                <el-table-column
                  type="selection"
                  width="55"> 
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="dibao"
                    label="低保证号">
                </el-table-column>
                <!-- <el-table-column
                    prop="house_id"
                    label="已租房屋">
                </el-table-column> -->
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
        <div class="download">
            <form method="post" ref="downloadForm">
                <input ref="ids" type="text" name="ids" style="display: none;">
                <iframe ref="downloadFrame" name="downloadFrame" style="display: none;" frameborder="0"></iframe>
            </form>
        </div>
        <el-dialog size="tiny" title="注意: 请按照上传模板的格式进行上传" :visible.sync="importDialogVisible">
            <div class="import-dialog" v-loading="importLoading">
                <el-upload
                  class="upload-demo"
                  action="/api/user/import"
                  :before-upload="beforeImport"
                  :on-success="importSuccess">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件，且不超过500kb</div>
                </el-upload>
                <a href="/assets/租户录入模板.xls"><el-button size="small" type="text">上传模板下载</el-button></a>
            </div>
        </el-dialog>
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
                    name: '',
                    pageNo: 1,
                    pageSize: 10
                },
                total: 0,
                dateRange: [],
                buildingSelect: [],
                tableData: [],
                selectedIds: [],
                importLoading: false,
                importDialogVisible: false
            }
        },
        methods: {
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
            handleIconClick() {
                this.search()
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
            importExcel() {
                this.importDialogVisible = true
            },
            beforeImport() {
                this.importLoading = true
            },
            importSuccess(res) {
                this.importLoading = false
                if (res.status === 0) {
                    this.$message({
                        message: '导入成功',
                        type: 'success'
                    })
                    this.importDialogVisible = false
                    this.search()
                } else {
                    this.$message.error(res.response.msg)
                }
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
            exportSingle: async function () {
                let selectedIds = this.selectedIds
                if (!selectedIds.length) {
                    this.$message({
                        message: '请选择导出条目',
                        type: 'warning'
                    })
                    return
                }
                let downloadForm = this.$refs.downloadForm
                this.$refs.ids.value = JSON.stringify(selectedIds)
                downloadForm.setAttribute('action', '/api/user/export')
                downloadForm.setAttribute('target', 'downloadFrame')
                downloadForm.submit()
            },
            exportAll: async function () {
                let downloadForm = this.$refs.downloadForm
                downloadForm.setAttribute('action', '/api/user/exportAll')
                downloadForm.setAttribute('target', 'downloadFrame')
                downloadForm.submit()
            },
            search: async function () {
                this.loading = true
                let res = await $$user_model.getList(this.searchParams)
                this.loading = false
                if (res.status === 0) {
                    this.tableData = res.data.list
                    this.total = res.data.total
                } else {
                    this.$message.error('网络错误')
                }
            }
        },
        beforeMount() {
            this.search()
        }
    }
</script>