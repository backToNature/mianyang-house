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
                path: 'rented-house-list',
                component: require('../components/rented-house-list/rented-house-list.vue')
            },
            {
                path: 'rented-house-table',
                component: require('../components/rented-house-table/rented-house-table.vue')
            },
            {
                path: 'unrented-house-list',
                component: require('../components/unrented-house-list/unrented-house-list.vue')
            },
            {
                path: 'unrented-house-table',
                component: require('../components/unrented-house-table/unrented-house-table.vue')
            },
            {
                path: 'renter-manager',
                component: require('../components/renter-manager/renter-manager.vue')
            },
            {
                path: 'unrenter-manager',
                component: require('../components/unrenter-manager/unrenter-manager.vue')
            }
        ]
    }
];

module.exports = route;