const route = [
    {
        path: '/',
        component: require('../app.vue'),
        children: [
            {
                path: 'building-info',
                component: require('../components/building-info/building-info.vue'),
                children: [
                    {
                        path: 'list',
                        component: require('../components/building-info/building-info-list.vue')
                    },
                    {
                        path: 'map',
                        component: require('../components/building-info/building-info-map.vue')
                    },
                    {
                        path: 'pics',
                        component: require('../components/building-info/building-info-pics.vue')
                    }
                ]
            },
            {
                path: 'house',
                component: require('../components/house/house.vue')
            },
            {
                path: 'user-list',
                component: require('../components/user/user-list.vue')
            },
            {
                path: 'data-collection',
                component: require('../components/index/data-collection.vue')
            },
            {
                path: 'notice',
                component: require('../components/notice/notice.vue')
            }
        ]
    }
];

module.exports = route;