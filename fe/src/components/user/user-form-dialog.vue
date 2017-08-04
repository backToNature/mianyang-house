<template>
    <div class="user-form-dialog">
        <el-dialog size="tiny" title="新增用户" :visible.sync="dialogVisible">
            <div class="dialog-from" v-loading="loading">
                <el-form :model="form" :rules="rules" ref="form" label-width="90px">
                    <el-form-item label="姓名" prop="name" required>
                        <el-input placeholder="请输入姓名" class="common-form-line" size="small" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证" prop="id_card" required>
                        <el-input placeholder="请输入身份证" class="common-form-line" size="small" v-model="form.id_card"></el-input>
                    </el-form-item>
                    <el-form-item label="已租房屋" prop="house_id" required>
                        <el-select size="small" v-model="form.house_id" class="common-search-line" placeholder="选择房屋">
                            <el-option label="未租" :value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="phone_num" required>
                        <el-input placeholder="请输入联系方式" class="common-form-line" size="small" v-model="form.phone_num"></el-input>
                    </el-form-item>
                    <el-form-item label="低保号" prop="dibao" required>
                        <el-input placeholder="请输入低保号" class="common-form-line" size="small" v-model="form.dibao"></el-input>
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
    import $$model from './model-user.js'
    export default {
        data() {
            return {
                loading: false,
                dialogVisible: false,
                form: {
                    id: 0,
                    name: '',
                    id_card: '',
                    house_id: 0,
                    phone_num: '',
                    dibao: ''
                },
                rules: {

                }
            }
        },
        watch: {
            dialogVisible(val) {
                if (val === true) {
                    if (this.form.id === 0) {
                        for (let key in this.form) {
                            if (key !== 'id') {
                                this.form[key] = ''
                            }
                        }
                        this.form.house_id = 0
                    }
                }
            }
        },
        methods: {
            handleSubmit: async function () {
                let res;
                this.loading = true
                if (this.form.id === 0) {
                    let _params = Object.assign({}, this.form)
                    delete _params.id
                    res = await $$model.addRow(_params)
                    this.loading = false
                    if (res.status === 0) {
                        this.$parent.search()
                        this.dialogVisible = false
                    } else {
                        this.$message.error('false')
                    }
                } else {
                    res = await $$model.updateRow(this.form)
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