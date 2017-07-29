<template>
    <div class="building-info-map" v-loading="loading">
        <div id="building-info-map" ref="map">
            
        </div>
    </div>
</template>
<script>
    import $$model from './model-building-info.js'
    export default {
        name: 'building-info-map',
        data() {
            return {
                loading: false,
                tableData: []
            }
        },
        methods: {
            search: async function () {
                this.loading = true;
                let result = await $$model.getList({name: this.$parent.searchParams.name});
                this.loading = false;
                this.tableData = result.data;
                this.mapInit(31.459052156068793, 104.67292785644531);
            },
            mapInit(lat, lng) {
                let map, geocoder;
                if (!map) {
                    let center = new qq.maps.LatLng(lat, lng);
                    map = new qq.maps.Map(document.getElementById("building-info-map"),{
                        center: center,
                        zoom: 12
                    });
                    // var marker = new qq.maps.Marker({
                    //     position: center,
                    //     map: map
                    // });

                    // qq.maps.event.addListener(map, 'click', e => {
                    //     marker.setMap(null);
                    //     Object.assign(this.form, e.latLng)
                    //     marker = new qq.maps.Marker({
                    //         position: e.latLng,
                    //         map: map
                    //     });
                    //     geocoder.getAddress(e.latLng)
                    // });
                }
                this.tableData.forEach(item => {
                    let label = new qq.maps.Label({
                        position: new qq.maps.LatLng(item.lat, item.lng),
                        map: map,
                        content: item.name
                    });
                    label.setStyle({cursor: 'pointer'})
                    qq.maps.event.addListener(label, 'click', e => {
                        
                    })
                    qq.maps.event.addListener(label, 'mouseover', e => {
                        label.setStyle({background: '#20a0ff', color: '#fff'})
                    })
                    qq.maps.event.addListener(label, 'mouseout', e => {
                        label.setStyle({background: '#fff', color: '#333'})
                    })
                    // let marker = new qq.maps.Marker({
                    //     position: new qq.maps.LatLng(item.lat, item.lng),
                    //     map: map
                    // });
                });

            }
        },
        mounted() {
            this.$refs.map.style.height = document.documentElement.clientHeight - 132 + 'px';
            this.search();
        }
    }
</script>
<style lang="less" scoped>
    #building-info-map {
        width: 100%;
        height: 600px;
        background: pink;
    }
</style>