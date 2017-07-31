<template>
    <div class="building-info-dialog">
        <el-dialog size="tiny" title="新增楼栋" :visible.sync="dialogVisible">
            <div v-loading="loading" class="form_dialog_form">
                <el-form :model="form" :rules="rules" ref="form" label-width="90px">
                    <div id="map-content"></div>
                    <el-form-item required label="地址" prop="address">
                        <el-input :disabled="true" placeholder="请输入地址" class="common-form-line" size="small" v-model="form.address"></el-input>
                    </el-form-item>
                    <el-form-item required label="经度" prop="lng">
                        <el-input :disabled="true" placeholder="请输入经度" class="common-form-line" size="small" v-model="form.lng"></el-input>
                    </el-form-item>
                    <el-form-item required label="纬度" prop="lat">
                        <el-input :disabled="true" placeholder="请输入纬度" class="common-form-line" size="small" v-model="form.lat"></el-input>
                    </el-form-item>
                    <el-form-item required label="楼栋名称" prop="name">
                        <el-input placeholder="请输入楼栋名称" class="common-form-line" size="small" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item required label="描述" prop="description">
                        <el-input type="textarea" :rows="5" placeholder="请输入描述" class="common-form-line" size="small" v-model="form.description"></el-input>
                    </el-form-item>
                    <el-form-item required label="楼栋图片">
                        <div class="common-upload-wrapper">
                            <i v-if="form.img_url" @click="form.img_url = ''" class="el-icon-close common-pic-close"></i>
                            <el-upload
                              accept="image/*"
                              v-loading="imgLoading"
                              :with-credentials="true"
                              :show-file-list="false"
                              :before-upload="beforeUpload"
                              :on-success="uploadSuccess"
                              action="/upload"
                              list-type="picture-card">
                              <img v-if="form.img_url" :src="form.img_url" alt="" class="common-preview-img">
                              <i v-else class="el-icon-plus"></i>
                            </el-upload>
                        </div>
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
    import $$util from '../../lib/util.js'
    import $$reqwest from '../../lib/reqwest-v2.0.5'
    import $$model from './model-building-info.js'
    export default {
        data() {
            return {
                dialogVisible: false,
                imgLoading: false,
                loading: false,
                form: {
                    id: 0,
                    name: '',
                    lng: '',
                    lat: '',
                    description: '',
                    img_url: '',
                    address: ''
                },
                rules: {},
                dateRange: []
            }
        },
        watch: {
            dialogVisible(val) {
                if (val === true) {
                    
                    if (this.form.id === 0) {
                        // 新增
                        this.mapInit(31.459052156068793, 104.67292785644531, map => {

                        });
                        for (let key in this.form) {
                            if (key !== 'id') {
                                this.form[key] = ''
                            }
                        }
                    } else {
                        // 编辑
                        this.mapInit(this.form.lat, this.form.lng, map => {

                        });
                    }
                }
            }
        },
        methods: {
            mapInit(lat, lng, fn) {
                let map, geocoder;
                window.setTimeout(() => {
                    if (!map) {
                        let center = new qq.maps.LatLng(lat, lng);
                        map = new qq.maps.Map(document.getElementById("map-content"),{
                            center: center,
                            zoom: 12
                        });
                        var marker = new qq.maps.Marker({
                            position: center,
                            map: map
                        });
                        geocoder = new qq.maps.Geocoder({
                            complete : (result) => {
                                this.form.address = result.detail.address
                            }
                        });

                        qq.maps.event.addListener(map, 'click', e => {
                            marker.setMap(null);
                            Object.assign(this.form, e.latLng)
                            marker = new qq.maps.Marker({
                                position: e.latLng,
                                map: map
                            });
                            geocoder.getAddress(e.latLng)
                        });
                    }
                    fn(map)
                }, 200)
            },
            handleSubmit: async function () {
                let res
                this.loading = true
                if (this.form.id === 0) {
                    let _params = Object.assign({}, this.form);
                    delete _params.id;
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
                
            },
            beforeUpload() {
                this.imgLoading = true
            },
            uploadSuccess(res) {
                this.imgLoading = false
                this.form.img_url = res.filename
            }
        },
        mounted() {
        }
    }
</script>
<style lang="less" scoped>
    #map-content {
        width: 100%;
        height: 300px;
    }
</style>