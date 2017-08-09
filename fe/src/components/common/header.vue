<template>
    <div class="layout-header">
        <div class="layout-header-l">
            <h1>绵阳房屋管理系统</h1>
        </div>
        <div class="layout-header-r">
            <!-- <el-dropdown>
              <span class="el-dropdown-link">
                通知<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown>
              <span class="el-dropdown-link">
                任务<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> -->
            <el-dropdown>
              <span class="el-dropdown-link">
                张扬<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .el-dropdown {
        margin: 0 10px;
    }
    .el-dropdown-link {
        color: #fff;
    }
    .layout-header {
        background: #20a0ff;
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        .layout-header-l {
            h1 {
                font-size: 18px;
                color: #fff;
            }
        }
        .layout-header-r {
            position: absolute;
            right: 10px;
            top: 0;
        }
    }
</style>