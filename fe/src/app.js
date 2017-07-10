import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)
import './common/reset.less'
import './common/layout.less'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import App from './app.vue'

let router = new VueRouter({
  routes: require('./route/route.js')
});

new Vue({
    router
}).$mount('#app')