<template>
    <div class="building-info-dialog">
        <el-dialog size="tiny" title="新增楼栋" :visible.sync="dialogVisible">
            <div v-loading="loading" class="form_dialog_form">
                <el-form  :model="form" :rules="rules" ref="form" label-width="90px">
                    <el-form-item required label="楼栋名称" prop="name">
                        <el-input placeholder="请输入楼栋名称" class="common-form-line" size="small" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item required label="地址" prop="address">
                        <el-input placeholder="请输入地址" class="common-form-line" size="small" v-model="form.address"></el-input>
                    </el-form-item>
                    <el-form-item required label="描述" prop="description">
                        <el-input type="textarea" :rows="5" placeholder="请输入描述" class="common-form-line" size="small" v-model="form.description"></el-input>
                    </el-form-item>
                    <el-form-item required label="楼栋图片">
                        <div class="upload-wrapper">
                            <i v-if="form.image" @click="form.image = ''" class="el-icon-close pic-close"></i>
                            <el-upload
                              accept="image/*"
                              v-loading="imgLoading"
                              :with-credentials="true"
                              :show-file-list="false"
                              :before-upload="beforeUpload"
                              :on-success="uploadSuccess"
                              action="//qbfileupload.oa.com/upload"
                              list-type="picture-card">
                              <img v-if="form.image" :src="form.image" alt="" class="preview-img">
                              <i v-else class="el-icon-plus"></i>
                            </el-upload>
                        </div>
                    </el-form-item>
                    <div id="map-content"></div>
                    <el-form-item required label="经度" prop="lng">
                        <el-input placeholder="请输入经度" class="common-form-line" size="small" v-model="form.lng"></el-input>
                    </el-form-item>
                    <el-form-item required label="纬度" prop="lat">
                        <el-input placeholder="请输入纬度" class="common-form-line" size="small" v-model="form.lat"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="common-submit-w">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import $$util from '../../lib/util.js'
    let $$reqwest = require('../../lib/reqwest-v2.0.5');
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
                    image: '',
                    address: ''
                },
                rules: {},
                dateRange: []
            }
        },
        watch: {
            dialogVisible(val) {
                let map;
                if (val === true) {
                    window.setTimeout(() => {
                        if (map) {

                        } else {
                            let center = new qq.maps.LatLng(31.459052156068793, 104.67292785644531);
                            map = new qq.maps.Map(document.getElementById("map-content"),{
                                center: center,
                                zoom: 10
                            });
                            var marker = new qq.maps.Marker({
                                position: center,
                                map: map
                            });
                            qq.maps.event.addListener(map, 'click', e => {
                                marker.setMap(null);
                                let query = `?location=${e.latLng.lat},${e.latLng.lng}&key=X5XBZ-INCKI-WMCG7-5JHXY-GJJS2-YVBXJ&callback=?`

                                $$reqwest({
                                    url: `http://apis.map.qq.com/ws/geocoder/v1/${query}`,
                                    type: 'jsonp',
                                    success: function (res) {
                                        console.log(res);
                                    }
                                })
                                
                                
                                Object.assign(this.form, e.latLng)
                                marker = new qq.maps.Marker({
                                    position: e.latLng,
                                    map: map
                                });
                            });
                            
                        }
                    }, 200)
                }
            }
        },
        methods: {
            handleSubmit() {

            },
            beforeUpload() {

            },
            uploadSuccess() {

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