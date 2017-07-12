<template>
    <div class="unrented-house-table">
        <div class="common-header">
            <div class="common-header-l">
                <h1 class="title">绵阳西苑-1号楼</h1>
            </div>
            <div class="common-header-r">
                <el-input
                  size="small"
                  placeholder="搜索"
                  icon="search"
                  v-model="input2"
                  :on-icon-click="handleIconClick">
                </el-input>
            </div>
        </div>
        <div class="rented-house-table-content">
            <div class="table-wrapper">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                      prop="house_num"
                      label="楼号"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="house_jwh"
                      label="社区居委户"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="user_name"
                      label="住户姓名">
                    </el-table-column>
                    <el-table-column
                      prop="user_id"
                      label="身份证">
                    </el-table-column>
                    <el-table-column
                      prop="live_time"
                      label="入住时间">
                    </el-table-column>
                    <el-table-column
                      prop="user_type"
                      label="住户类型">
                    </el-table-column>
                    <el-table-column
                      prop="user_dibao"
                      label="低保证号">
                    </el-table-column>
                    <el-table-column
                      prop="user_phone"
                      label="电话号码">
                    </el-table-column>
                    <el-table-column
                      prop="house_etc"
                      label="备注">
                    </el-table-column>
                    <el-table-column
                      label="操作">
                        <template scope="scope">
                            <el-button type="text" size="small" @click="handelDetail(scope.row)">退组</el-button>
                            <el-button type="text" size="small" @click="handelEdit(scope.row)">续租</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="pagenation">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="1"
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
                input2: '',
                tableData: [
                    {
                        house_num: '1栋1单元1-1号',
                        house_jwh: '2017-05-11',
                        user_name: '税朝莲',
                        user_id: '510727193104180029',
                        live_time: '2017-05-11',
                        user_type: '低保',
                        user_dibao: '城低保字第83号',
                        user_phone: 18500451354,
                        house_etc: '林发公司'
                    },
                    {
                        house_num: '1栋1单元1-1号',
                        house_jwh: '2017-05-11',
                        user_name: '税朝莲',
                        user_id: '510727193104180029',
                        live_time: '2017-05-11',
                        user_type: '低保',
                        user_dibao: '城低保字第83号',
                        user_phone: 18500451354,
                        house_etc: '林发公司'
                    },
                    {
                        house_num: '1栋1单元1-1号',
                        house_jwh: '2017-05-11',
                        user_name: '税朝莲',
                        user_id: '510727193104180029',
                        live_time: '2017-05-11',
                        user_type: '低保',
                        user_dibao: '城低保字第83号',
                        user_phone: 18500451354,
                        house_etc: '林发公司'
                    },
                    {
                        house_num: '1栋1单元1-1号',
                        house_jwh: '2017-05-11',
                        user_name: '税朝莲',
                        user_id: '510727193104180029',
                        live_time: '2017-05-11',
                        user_type: '低保',
                        user_dibao: '城低保字第83号',
                        user_phone: 18500451354,
                        house_etc: '林发公司'
                    },
                    {
                        house_num: '1栋1单元1-1号',
                        house_jwh: '2017-05-11',
                        user_name: '税朝莲',
                        user_id: '510727193104180029',
                        live_time: '2017-05-11',
                        user_type: '低保',
                        user_dibao: '城低保字第83号',
                        user_phone: 18500451354,
                        house_etc: '林发公司'
                    },
                    {
                        house_num: '1栋1单元1-1号',
                        house_jwh: '2017-05-11',
                        user_name: '税朝莲',
                        user_id: '510727193104180029',
                        live_time: '2017-05-11',
                        user_type: '低保',
                        user_dibao: '城低保字第83号',
                        user_phone: 18500451354,
                        house_etc: '林发公司'
                    },
                    {
                        house_num: '1栋1单元1-1号',
                        house_jwh: '2017-05-11',
                        user_name: '税朝莲',
                        user_id: '510727193104180029',
                        live_time: '2017-05-11',
                        user_type: '低保',
                        user_dibao: '城低保字第83号',
                        user_phone: 18500451354,
                        house_etc: '林发公司'
                    },
                    {
                        house_num: '1栋1单元1-1号',
                        house_jwh: '2017-05-11',
                        user_name: '税朝莲',
                        user_id: '510727193104180029',
                        live_time: '2017-05-11',
                        user_type: '低保',
                        user_dibao: '城低保字第83号',
                        user_phone: 18500451354,
                        house_etc: '林发公司'
                    },
                    {
                        house_num: '1栋1单元1-1号',
                        house_jwh: '2017-05-11',
                        user_name: '税朝莲',
                        user_id: '510727193104180029',
                        live_time: '2017-05-11',
                        user_type: '低保',
                        user_dibao: '城低保字第83号',
                        user_phone: 18500451354,
                        house_etc: '林发公司'
                    },
                    {
                        house_num: '1栋1单元1-1号',
                        house_jwh: '2017-05-11',
                        user_name: '税朝莲',
                        user_id: '510727193104180029',
                        live_time: '2017-05-11',
                        user_type: '低保',
                        user_dibao: '城低保字第83号',
                        user_phone: 18500451354,
                        house_etc: '林发公司'
                    },
                    {
                        house_num: '1栋1单元1-1号',
                        house_jwh: '2017-05-11',
                        user_name: '税朝莲',
                        user_id: '510727193104180029',
                        live_time: '2017-05-11',
                        user_type: '低保',
                        user_dibao: '城低保字第83号',
                        user_phone: 18500451354,
                        house_etc: '林发公司'
                    },
                    {
                        house_num: '1栋1单元1-1号',
                        house_jwh: '2017-05-11',
                        user_name: '税朝莲',
                        user_id: '510727193104180029',
                        live_time: '2017-05-11',
                        user_type: '低保',
                        user_dibao: '城低保字第83号',
                        user_phone: 18500451354,
                        house_etc: '林发公司'
                    }
                ]
            }
        },
        methods: {
            handleIconClick() {},
            handelDetail() {},
            handelEdit() {},
            handelRun() {},
            handleSizeChange() {},
            handleCurrentChange() {}
        }
    }
</script>