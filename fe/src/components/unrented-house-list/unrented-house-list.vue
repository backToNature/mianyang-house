<template>
    <div class="unrented-house-list">
        <div class="common-header">
            <div class="common-header-l">
                <h1 class="title">未租用房屋</h1>
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
        <div class="rented-house-wrapper">
            <div class="card-list">
                <div class="card-item" v-for="(o, index) in 12">
                    <el-card :body-style="{ padding: '0px' }">
                      <img src="http://pic.baike.soso.com/p/20131104/20131104130032-2042062876.jpg" class="image">
                      <div style="padding: 14px;">
                        <span>绵阳西苑-1号楼</span>
                        <div class="bottom clearfix">
                          <time class="time">{{ currentDate }}</time>
                          <el-button size="small" type="text" class="button">查看地图</el-button>
                          <router-link to="unrented-house-table"><el-button  size="small" type="text" class="button">查看列表</el-button></router-link>
                        </div>
                      </div>
                    </el-card>
                </div>
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
<style scoped lang="less">
    .image {
        width: 100%;
        height: 250px;
    }
    .card-list {
        text-align: left;
    }
    .card-item {
        width: 240px;
        margin: 5px;
        display: inline-block;
    }
</style>