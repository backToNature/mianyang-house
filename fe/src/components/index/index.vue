<template>
    <div id="doc">
        <div id="hd">
            <common-header></common-header>
            <!-- <common-bread></common-bread> -->
        </div>
        <div id="bd">
            <div id="left">
                <common-sidebar></common-sidebar>
            </div>
            <div id="right">
                <data-collection></data-collection>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        components: {
            'common-header': require('../common/header.vue'),
            'common-bread': require('../common/bread.vue'),
            'common-sidebar': require('../common/sidebar.vue'),
            'data-collection': require('./data-collection.vue')
        }
    }
</script>