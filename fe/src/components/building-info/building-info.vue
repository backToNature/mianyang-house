<template>
    <div class="building-info">
        <div class="common-header">
            <div class="common-header-l">
                <h1 class="title">楼栋信息</h1>
            </div>
            <div class="common-header-r">
                <div class="common-r-item">
                    <el-button-group>
                        <router-link to="/building-info/list"><el-button size="small" :autofocus="$route.path === '/building-info/list'" type="primary" icon="document">列表</el-button></router-link>
                        <router-link to="/building-info/map"><el-button size="small" :autofocus="$route.path === '/building-info/map'" type="primary" icon="picture">地图</el-button></router-link>
                        <router-link to="/building-info/pics"><el-button size="small" :autofocus="$route.path === '/building-info/pics'" type="primary" icon="menu">缩略图</el-button></router-link>
                    </el-button-group>
                </div>
                <div class="common-r-item">
                    <el-button size="small" type="primary" @click="addNew">新增</el-button>
                </div>
                <div class="common-r-item">
                    <el-input
                      size="small"
                      placeholder="按楼栋名称搜索"
                      icon="search"
                      v-model="searchParams.name"
                      :on-icon-click="handleIconClick">
                    </el-input>
                </div>
                
            </div>
        </div>
        <div class="content" v-loading="loading">
            <router-view></router-view>
        </div>
        <div class="dialog">
            <form-dialog ref="dialog"></form-dialog>
        </div>
    </div>
</template>
<script>
    export default {
        components: {
            'form-dialog': require('./building-info-dialog.vue')
        },
        data() {
            return {
                loading: false,
                searchParams: {
                    name: ''
                },
                list: []
            }
        },
        methods: {
            handleIconClick() {

            },
            addNew() {
                this.$refs.dialog.dialogVisible = true
            },
            search() {
                let params = Object.assign({}, this.searchParams);
                switch (this.$route.path) {
                    case '/building-info/list':
                        break;
                    case '/building-info/pics':
                        break;
                    case '/building-info/map':
                        break;
                }
            }
        },
        beforeMount() {
            this.search();
        }
    }
</script>
<style lang="less" src="./building-info.less"></style>