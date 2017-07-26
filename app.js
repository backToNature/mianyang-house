let Koa = require('koa');
let Router = require('koa-router');
let bodyParser = require('koa-bodyparser');
let session = require('koa-session');
let multer = require('koa-multer');
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

// 文件上传
var koaBody = require('koa-better-body');
route.post('/upload', koaBody({
    multipart: true
}), require('./route/upload'));


router.post('/api/:type/:handler', require('./route/router_adapter.js'));

// router.get('/', async function (ctx, next) {
//     ctx.body = 'Hello World!';
// });

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(80);
console.log('server start');

