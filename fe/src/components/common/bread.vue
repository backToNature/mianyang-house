<template>
    <div class="bread" ref="bread">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>数据汇总</el-breadcrumb-item>
          <el-breadcrumb-item>房屋管理</el-breadcrumb-item>
          <el-breadcrumb-item>租户管理</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<style scoped lang="less">
    .bread {
        padding: 10px 10px 10px;
    }
</style>
