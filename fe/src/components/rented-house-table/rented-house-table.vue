<template>
    <div class="rented-house-table">
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
                      prop="date"
                      label="日期"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="姓名"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="地址">
                    </el-table-column>
                  </el-table>
            </div>
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
                        name: '郭豪',
                        date: '2017-05-11',
                        address: '打打'
                    }
                ]
            }
        },
        methods: {
            handleIconClick() {

            }
        }
    }
</script>