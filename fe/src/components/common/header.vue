<template>
    <div class="layout-header">
        <div class="layout-header-l">
            <h1>平武县保障性住房管理系统</h1>
        </div>
        <div class="layout-header-r">
            <el-dropdown @command="quit">
              <span class="el-dropdown-link">
                {{name}}<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item>修改密码</el-dropdown-item> -->
                <el-dropdown-item command="quit">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </div>
        <form ref="form" action="/api/account/logout" method="post"></form>
    </div>
</template>
<script>
    import $$common_model from './common-model.js'
    export default {
        data() {
            return {
                name: ''
            }
        },
        methods: {
            getUserInfo: async function () {
                let res = await $$common_model.getUserInfo()
                if (res.status === 0) {
                    this.name = res.data.name
                }
            },
            quit(cmd) {
                switch (cmd) {
                    case 'quit':
                        this.$refs.form.submit()
                        break;
                }
            }
        },
        beforeMount() {
            this.getUserInfo()
        }
    }
</script>
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