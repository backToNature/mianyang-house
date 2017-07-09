var Vue = require('vue');
var VueRouter = require('vue-router');
Vue.use(VueRouter);
var ElementUI = require('element-ui');
// require('element-ui/lib/theme-default/index.css');
Vue.use(ElementUI);

var routes = [
    {
        path: '/',
        component: rquire('./index.vue')
    }
];

var router = new VueRouter({
  routes: routes
});

var app = new Vue({
    router: router
}).$mount('#app');