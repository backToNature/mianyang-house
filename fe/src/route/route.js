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
            }
        ]
    }
];

module.exports = route;