<template>
    <div class="building-info-list">
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
                  prop="img_url"
                  label="楼栋图">
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
    export default {
        data() {
            return {
                tableData: [],
                pageNo: 1,
                pageSize: 10,
                total: 0
            }
        },
        methods: {
            handleSizeChange() {

            },
            handleCurrentChange() {

            }
        }
    }
</script>