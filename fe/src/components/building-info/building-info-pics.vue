<template>
    <div class="building-info-pics" v-loading="loading">
        <div class="card-wrapper">
            <div class="card-list">
                <div class="card-item" v-for="item in tableData">
                    <el-card :body-style="{ padding: '0px' }">
                      <img :src="item.img_url" class="image">
                      <div style="padding: 14px;">
                        <span>{{item.name}}</span>
                        <div class="bottom clearfix">
                          <time class="time">123123</time>
                          <el-button size="small" type="text" class="button">查看地图</el-button>
                          <el-button  size="small" type="text" class="button">查看列表</el-button>
                        </div>
                      </div>
                    </el-card>
                </div>
            </div>
        </div>
        <div class="common-pagenation">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="searchParams.pageNo"
                :page-sizes="[100, 200, 300, 400]"
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
        data() {
            return {
                loading: false,
                searchParams: {
                    pageNo: 1,
                    pageSize: 10
                },
                total: 0,
                tableData: []
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
            handleIconClick() {

            },
            handleSizeChange() {

            },
            handleCurrentChange() {

            }
        },
        beforeMount() {
            this.search()
        }
    }
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