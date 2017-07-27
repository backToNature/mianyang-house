<template>
    <div class="sidebar" ref="sidebar">
        <el-menu :router="true" theme="light">
            <el-menu-item index="data-collection">数据统计</el-menu-item>
            <el-submenu index="1">
                <template slot="title">租用管理</template>
                <el-menu-item index="rented-house-list">已租用房屋</el-menu-item>
                <el-menu-item index="unrented-house-list">未租用房屋</el-menu-item>
                <el-menu-item index="renter-manager">租户管理</el-menu-item>
                <el-menu-item index="unrenter-manager">历史租户</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">房屋管理</template>
                <el-menu-item index="building-info">楼栋信息</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">信息通知</el-menu-item>
            <el-menu-item index="4">系统功能</el-menu-item>
        </el-menu>
    </div>
</template>
<script>
    export default {
        mounted() {
            let $sidebar = this.$refs.sidebar;
            $sidebar.querySelector('.el-menu').style.height = document.documentElement.clientHeight - 50 + 'px';
        }
    }
</script>