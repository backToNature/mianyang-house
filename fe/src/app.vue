<template>
    <div id="doc">
        <div id="hd">
            <common-header></common-header>
        </div>
        <div id="bd">
            <div id="left">
                <common-sidebar></common-sidebar>
            </div>
            <div id="right">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        components: {
            'common-header': require('./components/common/header.vue'),
            'common-bread': require('./components/common/bread.vue'),
            'common-sidebar': require('./components/common/sidebar.vue')
        }
    }
</script>