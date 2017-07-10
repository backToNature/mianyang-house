import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)


import App from './index.vue'

Vue.component('App', App)

new Vue({
  el: 'app'
})