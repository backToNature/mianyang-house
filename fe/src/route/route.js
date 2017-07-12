const route = [
    {
        path: '/',
        component: require('../app.vue'),
        children: [
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