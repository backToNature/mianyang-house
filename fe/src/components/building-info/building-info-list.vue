<template>
    <div class="building-info-list" v-loading="loading">
        <div class="table-wrapper">
            <el-table :data="tableData">
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
                        width="100">
                    <template scope="scope">
                        <el-button type="text" size="small">查看</el-button>
                        <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="common-pagenation">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNo"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
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
                loading: false,
                tableData: [],
                pageNo: 1,
                pageSize: 10,
                total: 0
            }
        },
        methods: {
            search: async function () {
                this.loading = true;
                let result = await $$model.getList({name: this.$parent.searchParams.name});
                this.loading = false;
                this.tableData = result.data;
            },
            handleSizeChange() {

            },
            handleCurrentChange() {

            },
            edit(row) {
                let $dialog = this.$parent.$refs.dialog
                Object.assign($dialog.form, row)
                $dialog.dialogVisible = true
            }
        },
        beforeMount() {
            this.search()
        }
    }
</script>