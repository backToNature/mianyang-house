<template>
    <div class="renter-manager">
        <div class="common-header">
            <div class="common-header-l">
                <h1 class="title">历史租户</h1>
            </div>
            <div class="common-header-r">
                <el-input
                  class="common-header-input"
                  size="small"
                  placeholder="搜索"
                  icon="search"
                  v-model="input2"
                  :on-icon-click="handleIconClick">
                </el-input>
            </div>
        </div>
        <div class="renter-table">
            <div class="table-wrapper">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                      prop="user_name"
                      label="姓名">
                    </el-table-column>
                    <el-table-column
                      prop="user_id"
                      label="身份证号">
                    </el-table-column>
                    <el-table-column
                      prop="user_house"
                      label="入住房屋">
                    </el-table-column>
                    <el-table-column
                      prop="live_time"
                      label="退租时间">
                    </el-table-column>
                    <el-table-column
                      prop="user_dibao"
                      label="低保证号">
                    </el-table-column>
                    <el-table-column
                      prop="user_phone"
                      label="电话">
                    </el-table-column>
                    <el-table-column
                      prop="house_etc"
                      label="备注">
                    </el-table-column>
                    <el-table-column
                      width="140"
                      label="操作">
                        <template scope="scope">
                            <el-button type="text" size="small" @click="handelDetail(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click="handelEdit(scope.row)">提醒交租</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="pagenation">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [
                    {
                        user_house: '绵阳西苑-1号楼-1栋1单元1-1号',
                        user_name: '税朝莲',
                        user_id: '510727193104180029',
                        live_time: '2017-05-11',
                        user_type: '低保',
                        user_dibao: '城低保字第83号',
                        user_phone: 18500451354,
                        house_etc: '林发公司'
                    },
                    {
                        user_house: '绵阳西苑-1号楼-1栋1单元1-1号',
                        user_name: '税朝莲',
                        user_id: '510727193104180029',
                        live_time: '2017-05-11',
                        user_type: '低保',
                        user_dibao: '城低保字第83号',
                        user_phone: 18500451354,
                        house_etc: '林发公司'
                    },
                    {
                        user_house: '绵阳西苑-1号楼-1栋1单元1-1号',
                        user_name: '税朝莲',
                        user_id: '510727193104180029',
                        live_time: '2017-05-11',
                        user_type: '低保',
                        user_dibao: '城低保字第83号',
                        user_phone: 18500451354,
                        house_etc: '林发公司'
                    },
                    {
                        user_house: '绵阳西苑-1号楼-1栋1单元1-1号',
                        user_name: '税朝莲',
                        user_id: '510727193104180029',
                        live_time: '2017-05-11',
                        user_type: '低保',
                        user_dibao: '城低保字第83号',
                        user_phone: 18500451354,
                        house_etc: '林发公司'
                    },
                    {
                        user_house: '绵阳西苑-1号楼-1栋1单元1-1号',
                        user_name: '税朝莲',
                        user_id: '510727193104180029',
                        live_time: '2017-05-11',
                        user_type: '低保',
                        user_dibao: '城低保字第83号',
                        user_phone: 18500451354,
                        house_etc: '林发公司'
                    },
                    {
                        user_house: '绵阳西苑-1号楼-1栋1单元1-1号',
                        user_name: '税朝莲',
                        user_id: '510727193104180029',
                        live_time: '2017-05-11',
                        user_type: '低保',
                        user_dibao: '城低保字第83号',
                        user_phone: 18500451354,
                        house_etc: '林发公司'
                    },
                    {
                        user_house: '绵阳西苑-1号楼-1栋1单元1-1号',
                        user_name: '税朝莲',
                        user_id: '510727193104180029',
                        live_time: '2017-05-11',
                        user_type: '低保',
                        user_dibao: '城低保字第83号',
                        user_phone: 18500451354,
                        house_etc: '林发公司'
                    }
                ],
                input2: '',
                currentDate: '2017-07-11 23:43',
                currentPage: 1
            }
        },
        methods: {
            handleIconClick() {

            },
            handleSizeChange() {

            },
            handleCurrentChange() {

            }
        }
    };
</script>