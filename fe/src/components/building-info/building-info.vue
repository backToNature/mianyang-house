<template>
    <div class="building-info">
        <div class="common-header">
            <div class="common-header-l">
                <h1 class="title">楼栋信息</h1>
            </div>
            <div class="common-header-r">
                <div class="common-r-item">
                    <el-button-group>
                        <router-link to="/building-info/list"><el-button size="small" :autofocus="$route.path === '/building-info/list'" type="primary" icon="document">列表</el-button></router-link>
                        <router-link to="/building-info/map"><el-button size="small" :autofocus="$route.path === '/building-info/map'" type="primary" icon="picture">地图</el-button></router-link>
                        <router-link to="/building-info/pics"><el-button size="small" :autofocus="$route.path === '/building-info/pics'" type="primary" icon="menu">缩略图</el-button></router-link>
                    </el-button-group>
                </div>
                <div class="common-r-item">
                    <el-button size="small" type="primary" @click="addNew">新增</el-button>
                </div>
                <div class="common-r-item">
                    <el-button @click="importExcel" size="small" type="primary">导入</el-button>
                </div>
                <div class="common-r-item">
                    <el-button @click="exportSingle" size="small" type="primary">导出</el-button>
                </div>
                <div class="common-r-item">
                    <el-button @click="exportAll" size="small" type="primary">全部导出</el-button>
                </div>
                <div class="common-r-item">
                    <el-input
                      size="small"
                      placeholder="按楼栋名称搜索"
                      icon="search"
                      v-model="searchParams.name"
                      :on-icon-click="handleIconClick">
                    </el-input>
                </div>
            </div>
        </div>
        <div class="content" v-loading="loading">
            <router-view ref="link"></router-view>
        </div>
        <div class="dialog">
            <form-dialog ref="dialog"></form-dialog>
            <el-dialog size="tiny" title="注意: 请按照上传模板的格式进行上传" :visible.sync="importDialogVisible">
                <div class="import-dialog" v-loading="importLoading">
                    <el-upload
                      class="upload-demo"
                      action="/api/building/import"
                      :before-upload="beforeImport"
                      :on-success="importSuccess">
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件，且不超过500kb</div>
                    </el-upload>
                    <a href="/assets/楼栋录入模板.xls"><el-button size="small" type="text">上传模板下载</el-button></a>
                </div>
            </el-dialog>
            <el-dialog size="tiny" title="注意: 请按照上传模板的格式进行上传" :visible.sync="houseImportDialogVisible">
                <div class="import-dialog" v-loading="houseImportLoading">
                    <el-upload
                      class="upload-demo"
                      action="/api/house/import"
                      :data="{id: importId}"
                      :before-upload="houseBeforeImport"
                      :on-success="houseImportSuccess">
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件，且不超过500kb</div>
                    </el-upload>
                    <a href="/assets/楼栋录入模板.xls"><el-button size="small" type="text">上传模板下载</el-button></a>
                </div>
            </el-dialog>
        </div>
        <div class="download">
            <form method="post" ref="downloadForm" id="building-form">
                <input ref="ids" type="text" name="ids" style="display: none;">
                <iframe ref="downloadFrame" name="downloadFrame" style="display: none;" frameborder="0"></iframe>
            </form>
        </div>
    </div>
</template>
<script>
    import $$model from './model-building-info.js'
    export default {
        components: {
            'form-dialog': require('./building-info-dialog.vue')
        },
        data() {
            return {
                importLoading: false,
                importDialogVisible: false,
                houseImportDialogVisible: false,
                importId: 0,
                houseImportLoading: false,
                loading: false,
                searchParams: {
                    name: ''
                },
                list: []
            }
        },
        methods: {
            handleIconClick() {
                this.search()
            },
            addNew() {
                this.$refs.dialog.form.id = 0
                this.$refs.dialog.dialogVisible = true
            },
            search() {
                let params = Object.assign({}, this.searchParams);
                switch (this.$route.path) {
                    case '/building-info/list':
                        this.$refs.link.search()
                        break;
                    case '/building-info/pics':
                        break;
                    case '/building-info/map':
                        break;
                }
                this.$refs.link.search()
            },
            importExcel() {
                this.importDialogVisible = true
            },
            houseBeforeImport() {
                this.houseImportLoading = true
            },
            houseImportSuccess(res) {
                this.importLoading = false
                if (res.status === 0) {
                    this.$message({
                        message: '导入成功',
                        type: 'success'
                    })
                    this.importDialogVisible = false
                    this.$refs.link.search()
                } else {
                    this.$message.error(res.response.msg)
                }
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
                    this.$refs.link.search()
                } else {
                    this.$message.error(res.response.msg)
                }
            },
            exportSingle: async function () {
                if (this.$route.path !== '/building-info/list') {
                    return
                }
                let selectedIds = this.$refs.link.selectedIds
                if (!selectedIds.length) {
                    this.$message({
                        message: '请选择导出条目',
                        type: 'warning'
                    })
                    return
                }
                let downloadForm = this.$refs.downloadForm
                this.$refs.ids.value = JSON.stringify(selectedIds)
                downloadForm.setAttribute('action', '/api/building/export')
                downloadForm.setAttribute('target', 'downloadFrame')
                downloadForm.submit()
            },
            exportAll: async function () {
                if (this.$route.path !== '/building-info/list') {
                    return
                }
                let downloadForm = this.$refs.downloadForm
                downloadForm.setAttribute('action', '/api/building/exportAll')
                downloadForm.setAttribute('target', 'downloadFrame')
                downloadForm.submit()
            }
        }
    }
</script>
<style lang="less" scoped></style>