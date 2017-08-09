<template>
    <div class="notice">
        <div class="common-header">
            <div class="common-header-l">
                <h1 class="title">通知列表</h1>
            </div>
            <div class="common-header-r">
                <div class="common-r-item">
                    <label for="">通知类型:</label>
                    <el-select class="common-search-line" size="small" v-model="value" placeholder="请选择">
                        <el-option label="全部" value="1"></el-option>
                        <el-option label="到期提醒" value="2"></el-option>
                        <el-option label="超期提醒" value="3"></el-option>
                        <el-option label="空置提醒" value="4"></el-option>
                    </el-select>
                </div>
                <div class="common-r-item">
                    <label for="">楼栋名称:</label>
                    <el-input @keyup.enter.native="search" v-model="searchParams.name" placeholder="请输入房屋名称" class="common-search-line" size="small"></el-input>
                </div>
                <div class="common-r-item">
                    <label for="">房屋名称:</label>
                    <el-input @keyup.enter.native="search" v-model="searchParams.name" placeholder="请输入房屋名称" class="common-search-line" size="small"></el-input>
                </div>
                <div class="common-r-item">
                    <label for="">租户姓名:</label>
                    <el-input @keyup.enter.native="search" v-model="searchParams.name" placeholder="请输入房屋名称" class="common-search-line" size="small"></el-input>
                </div>
            </div>
        </div>
        <div class="table-wrapper">
            <el-table :data="tableData">
                <el-table-column
                  prop="id"
                  label="id"
                  width="60">
                </el-table-column>
                <el-table-column
                  prop="building_name"
                  label="楼栋名称">
                </el-table-column>
                <el-table-column
                  prop="house_name"
                  label="房屋名称">
                </el-table-column>
                <el-table-column
                  prop="user_name"
                  label="租户名称">
                </el-table-column>
                <el-table-column
                  prop="start_time"
                  label="入住时间">
                </el-table-column>
                <el-table-column
                  prop="end_time"
                  label="到期时间">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="提醒类别">
                </el-table-column>
                <el-table-column
                  prop="content"
                  label="提醒内容">
                </el-table-column>
                <el-table-column
                  prop="time"
                  label="生成时间">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                        width="240">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="notice(scope.row)">提醒续租</el-button>
                        <el-button type="text" size="small">续租</el-button>
                        <el-button type="text" size="small">退租</el-button>
                        <el-button type="text" size="small">删除</el-button>
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
            <el-dialog size="tiny" title="向谢本燕发送提醒短信" :visible.sync="noticeDialog">
                <div class="dialog-form">
                    <el-input
                      type="textarea"
                      :rows="4"
                      placeholder="请输入内容"
                      v-model="textarea">
                    </el-input>
                </div>
                <div class="common-submit-w">
                    <el-button @click="noticeDialog = false">取消</el-button>
                    <el-button type="primary" @click="handleSubmit">提交</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                textarea: '您好，谢本燕，您租的东皋湾安居房1幢-1幢1单元5楼1号还有20天到期，请到房管所进行续租。',
                noticeDialog: false,
                value: '1',
                searchParams: {
                    pageSize: 10,
                    pageNo: 1
                },
                total: 10,
                tableData: [
                    {
                        id: 1,
                        building_name: '东皋湾安居房1幢',
                        house_name: '1幢1单元5楼1号',
                        user_name: '谢本燕',
                        start_time: '2017-08-10',
                        end_time: '2017-08-30',
                        type: '到期提醒',
                        content: '还有20天到期',
                        time: '2017-08-10'
                    },
                    {
                        id: 2,
                        building_name: '东皋湾安居房1幢',
                        house_name: '1幢1单元5楼2号',
                        user_name: '教体局',
                        type: '超期提醒',
                        start_time: '2016-08-10',
                        end_time: '2017-03-30',
                        content: '已经超期140天',
                        time: '2017-08-10'
                    },
                    {
                        id: 3,
                        building_name: '东皋湾安居房1幢',
                        house_name: '1幢1单元5楼1号',
                        user_name: '',
                        type: '空置提醒',
                        content: '已经空置40天',
                        time: '2017-08-10'
                    }
                ]
            }
        },
        methods: {
            handleSizeChange() {

            },
            handleCurrentChange() {

            },
            notice() {
                this.noticeDialog = true
            },
            handleSubmit() {

            }
        }
    }
</script>