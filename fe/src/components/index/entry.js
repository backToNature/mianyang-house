import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)
import '../../common/reset.less'
import '../../common/layout.less'


import App from './index.vue'

Vue.component('App', App)

new Vue({
  el: 'app'
})