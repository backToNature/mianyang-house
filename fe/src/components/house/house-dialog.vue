<template>
    <div class="house-dialog">
        <el-dialog size="tiny" title="新增房屋" :visible.sync="dialogVisible">
            <div class="dialog-from" v-loading="loading">
                <el-form :model="form" :rules="rules" ref="form" label-width="130px">
                    <el-form-item label="房屋名称" prop="name" required>
                        <el-input placeholder="请输入房屋名称" class="common-form-line" size="small" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="所属楼栋" prop="building_id">
                        <el-select size="small" filterable v-model="form.building_id" class="common-search-line" placeholder="选择楼栋">
                            <el-option v-for="item in buildingSelect" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="租户" prop="user_id">
                        <el-select size="small" filterable v-model="form.user_id" class="common-search-line" placeholder="选择租户">
                            <el-option v-for="item in userSelect" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="居委会" prop="jwh">
                        <el-input placeholder="请输入居委会" class="common-form-line" size="small" v-model="form.jwh"></el-input>
                    </el-form-item>
                    <el-form-item label="租用&退租时间">
                        <el-date-picker
                            v-model="dateRange"
                            size="small"
                            type="daterange"
                            placeholder="选择日期范围">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="描述" prop="description">
                        <el-input placeholder="请输入低保号" class="common-form-line" size="small" v-model="form.description"></el-input>
                    </el-form-item>
                </el-form>
                <div class="common-submit-w">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleSubmit">提交</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import $$model_user from '../user/model-user.js'
    import $$model_building from '../building-info/model-building-info.js'
    import $$model_house from './model-house.js'
    import $$util from '../../lib/util.js'
    export default {
        name: 'house-dialog',
        data() {
            return {
                loading: false,
                dialogVisible: false,
                form: {
                    id: 0,
                    name: '',
                    building_id: '',
                    user_id: '',
                    jwh: '',
                    start_time: '',
                    end_time: ''
                },
                rules: {

                },
                buildingSelect: [],
                userSelect: [],
                dateRange: []
            }
        },
        watch: {
            dialogVisible(val) {
                if (val === true) {
                    this.search()
                    if (this.form.id > 0) {
                        // 编辑
                        this.dateRange = []
                        this.dateRange[0] = new Date(this.form.start_time) == 'Invalid Date' ? '' : new Date(this.form.start_time)
                        this.dateRange[1] = new Date(this.form.end_time) == 'Invalid Date' ? '' : new Date(this.form.end_time)
                    } else {
                        for (let key in this.form) {
                            if (key !== 'id') {
                                this.form[key] = ''
                            }
                        }
                        this.dateRange = []
                    }
                }
            },
            dateRange(val) {
                if (val[0]) {
                    this.form.start_time = $$util.dateFormat(new Date(val[0]), 'yyyy-MM-dd hh:mm:ss')
                }
                if (val[1]) {
                    this.form.end_time = $$util.dateFormat(new Date(val[1]), 'yyyy-MM-dd hh:mm:ss')
                }
            }
        },
        methods: {
            search() {
                Promise.all([$$model_user.getList({name: '', pageNo: 1, pageSize: 1000}), $$model_building.getList({name: '', pageNo: 1, pageSize: 100})]).then(values => {
                    if (values[0].status === 0) {
                        this.userSelect = values[0].data.list
                    }
                    if (values[1].status === 0) {
                        this.buildingSelect = values[1].data.list
                    }
                });
            },
            handleSubmit: async function () {
                let res, _params
                this.loading = true
                if (this.form.id === 0) {
                    _params = Object.assign({}, this.form);
                    delete _params.id;
                    for (let key in _params) {
                        if (_params[key] === '') {
                            delete _params[key]
                        }
                    }
                    res = await $$model_house.addRow(_params)
                    this.loading = false
                    if (res.status === 0) {
                        this.$parent.search()
                        this.dialogVisible = false
                    } else {
                        this.$message.error('false')
                    }
                } else {
                    _params = Object.assign({}, this.form);
                    res = await $$model_house.updateRow(_params)
                    this.loading = false
                    if (res.status === 0) {
                        this.$parent.search()
                        this.dialogVisible = false
                    } else {
                        this.$message.error('false')
                    }
                }
            }
        }
    }
</script>