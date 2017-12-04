<template>
    <div class="data-collection global-clearfix">
        <div class="data-collection-header">
            <h1>数据报表</h1>
        </div>
        <div class="data-collection-w">
            <div class="collection-w">
                <div class="collection-item">
                    <p class="item-num">{{info.rentedNum}}</p>
                    <p class="item-title">已租出房屋</p>
                </div>
                <div class="collection-item">
                    <p class="item-num">{{info.noRentedNum}}</p>
                    <p class="item-title">未租出房屋</p>
                </div>
                <div class="collection-item">
                    <p class="item-num">{{info.hasDatedHouseNum}}</p>
                    <p class="item-title">即将到期</p>
                </div>
                <div class="collection-item">
                    <p class="item-num">{{info.alreadyDated}}</p>
                    <p class="item-title">已经过期</p>
                </div>
            </div>
            <!-- <img src="../../static/pic1.png" alt="" width="100%"> -->
            <img src="../../static/pic2.png" alt="" width="100%">
        </div>
    </div>
</template>
<script>
    import $$index_model from './model-index.js';
    export default {
        data() {
            return {
                info: {
                    rentedNum: 0,
                    noRentedNum: 0,
                    hasDatedHouseNum: 0,
                    alreadyDated: 0
                }
            }
        },
        methods: {
            getInfo: async function () {
                let res = await $$index_model.getInfo();
                if (res.status === 0) {
                    this.info = res.data;
                }
                
            }
        },
        beforeMount() {
            this.getInfo();
        }
    }
</script>
<style lang="less" scoped>
    .data-collection {
        border-bottom: 1px solid #eee;
        .data-collection-header {
            float: left;
            h1 {
                font-size: 36px;
                margin: 40px 0 20px;
            }
        }
        .collection-w {
            width: 100%;
            display: flex;
            .collection-item {
                flex: 1;
                height: 200px;
                background-color: #000;
                margin: 0 0 0 20px;
                border-radius: 10px;
                color: #fff;
                text-align: center;
                .item-num {
                    font-size: 70px;
                    margin-top: 70px;
                }
                .item-title {
                    font-size: 24px;
                    margin-top: 30px;
                }
                &:first-child {
                    margin: 0;
                }
                &:nth-child(1) {
                    background-color: #337ab7;
                }
                &:nth-child(2) {
                    background-color: #5cb85c;
                }
                &:nth-child(3) {
                    background-color: #f0ad4e;
                }
                &:nth-child(4) {
                    background-color: #d9534f;
                }
            }
        }
    }
</style>