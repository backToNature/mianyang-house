const route = [
    {
        path: '/',
        component: require('../app.vue'),
        children: [
            {
                path: 'data-collection',
                component: require('../components/index/data-collection.vue')
            }
        ]
    }
];

module.exports = route;