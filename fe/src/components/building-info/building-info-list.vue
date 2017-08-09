<template>
    <div class="building-info-list" v-loading="loading">
        <div class="table-wrapper">
            <el-table @expand="expand" :data="tableData" @selection-change="handleSelectionChange">
                <el-table-column type="expand">
                  <template scope="props">
                    <div class="expandRow" v-loading="expandLoading">
                        <a class="house-item" target="_blank" :href="`/index.html#/house?building_name=${props.row.name}&name=${item.name}`" v-for="item in houseList"><el-button type="text" size="small">{{item.name}}</el-button></a>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  type="selection"
                  width="55"> 
                </el-table-column>
                <el-table-column
                  prop="id"
                  label="id"
                  width="60">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="楼栋名">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址">
                </el-table-column>
                <el-table-column
                  prop="lng"
                  label="经度">
                </el-table-column>
                <el-table-column
                  prop="lat"
                  label="纬度">
                </el-table-column>
               <!--  <el-table-column
                  prop="house"
                  label="">
                </el-table-column> -->
                <el-table-column
                  prop="description"
                  label="描述">
                </el-table-column>
                <el-table-column
                  label="楼栋图">
                  <template scope="scope">
                      <img v-if="scope.row.img_url" :src="scope.row.img_url" alt="" class="common-table-img">
                  </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="importHouse(scope.row.id)">导入房屋</el-button>
                        <a style="magin: 0 5px;" :href="`/index.html#/house?building_name=${scope.row.name}`" target="_blank"><el-button type="text" size="small">详情</el-button></a>
                        <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
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
    </div>
</template>
<script>
    import $$model from './model-building-info.js'
    export default {
        name: 'building-info-list',
        data() {
            return {
                searchParams: {
                    pageNo: 1,
                    pageSize: 10
                },
                expandLoading: true,
                houseList: [],
                loading: false,
                tableData: [],
                total: 0,
                selectedIds: []
            }
        },
        methods: {
            search: async function () {
                this.loading = true
                let _params = Object.assign({name: this.$parent.searchParams.name}, this.searchParams)
                let result = await $$model.getList(_params)
                this.loading = false
                this.tableData = result.data.list
                this.total = result.data.total
            },
            importHouse(id) {
                this.$parent.importId = id
                this.$parent.houseImportDialogVisible = true
            },
            handleSizeChange(val) {
                this.searchParams.pageSize = val
                this.search()
            },
            handleCurrentChange(val) {
                this.searchParams.pageNo = val
                this.search()
            },
            edit(row) {
                let $dialog = this.$parent.$refs.dialog
                Object.assign($dialog.form, row)
                $dialog.dialogVisible = true
            },
            handleSelectionChange(val) {
                let selectedIds = val.map(item => item.id)
                this.selectedIds = selectedIds
            },
            expand: async function (row, expanded) {
                let result = []
                if (expanded) {
                    this.expandLoading = true
                    result = await $$model.getHouseList({id: row.id})
                    if (result.status === 0) {
                        this.houseList = result.data
                    }
                    this.expandLoading = false
                }
            }
        },
        beforeMount() {
            this.search()
        }
    }
</script>
<style lang="less" scoped>
    .building-info-list {
        .house-item {
            margin: 0 15px;
        }
    }
    
    // .expandRow {
    //     width:-moz-calc(~`100% - 200px`);
    //     width:-webkit-calc(~`100% - 200px`);
    //     width: calc(~`100% - 200px`);
    // }
</style>