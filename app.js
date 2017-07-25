let Koa = require('koa');
let Router = require('koa-router');
let bodyParser = require('koa-bodyparser');
let session = require('koa-session');
let path = require('path');

let app = new Koa();
let router = new Router();

app.use(bodyParser());

app.keys = ['your-session-secret'];
app.use(session({}, app));

let staticCache = require('koa-static-cache');
app.use(require('./lib/filter.js'));
app.use(staticCache(path.join(__dirname, '/view'), {
    maxAge: 365 * 24 * 60 * 60
}));

app.use(staticCache(path.join(__dirname, '/fe/dist'), {
    maxAge: 365 * 24 * 60 * 60
}));



router.post('/api/:type/:handler', require('./route/router_adapter.js'));

// router.get('/', async function (ctx, next) {
//     ctx.body = 'Hello World!';
// });

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(80);
console.log('server start');

