<template>
    <div class="building-info">
        <div class="common-header">
            <div class="common-header-l">
                <h1 class="title">楼栋信息</h1>
            </div>
            <div class="common-header-r">
                <div class="common-r-item">
                    <el-button-group>
                      <el-button size="small" :autofocus="true" type="primary" icon="document">列表</el-button>
                      <el-button size="small" type="primary" icon="picture">地图</el-button>
                      <el-button size="small" type="primary" icon="menu">缩略图</el-button>
                    </el-button-group>
                </div>
                <div class="common-r-item">
                    <el-input
                      size="small"
                      placeholder="搜索"
                      icon="search"
                      v-model="key"
                      :on-icon-click="handleIconClick">
                    </el-input>
                </div>
            </div>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                key: ''
            }
        },
        methods: {
            handleIconClick() {

            }
        }
    }
</script>
<style lang="less" src="./building-info.less"></style>