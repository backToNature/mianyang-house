<template>
    <div class="sidebar" ref="sidebar">
        <el-menu :router="true" theme="light">
            <el-menu-item index="/data-collection"><i class="el-icon-document"></i>首页</el-menu-item>
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-star-on"></i>房屋管理</template>
                <el-menu-item index="/building-info/list">楼栋信息</el-menu-item>
                <el-menu-item index="/house">房屋信息</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-star-off"></i>租户管理</template>
                <el-menu-item index="/user-list">租户列表</el-menu-item>
                <el-menu-item index="/unrenter-manager">历史租户</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-message"></i>通知报警</template>
                <el-menu-item index="/notice">通知列表</el-menu-item>
            </el-submenu>
            <el-menu-item index="4"><i class="el-icon-setting"></i>系统功能</el-menu-item>
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