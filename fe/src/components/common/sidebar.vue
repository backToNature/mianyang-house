<template>
    <div class="sidebar" ref="sidebar">
        <el-menu default-active="2">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">数据汇总</el-menu-item>
          <el-menu-item index="3">地图查看</el-menu-item>
          <el-menu-item index="4">房屋管理</el-menu-item>
          <el-menu-item index="5">租户管理</el-menu-item>
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