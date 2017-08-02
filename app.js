let Koa = require('koa');
let Router = require('koa-router');
let bodyParser = require('koa-bodyparser');
let session = require('koa-session');
let path = require('path');

let app = new Koa();
let router = new Router();

app.use(bodyParser());

app.keys = ['fuck you'];
app.use(session({}, app));

let staticCache = require('koa-static-cache');

// 登录拦截器
app.use(require('./lib/filter.js'));

app.use(staticCache(path.join(__dirname, '/view'), {
    maxAge: 365 * 24 * 60 * 60
}));

app.use(staticCache(path.join(__dirname, '/fe/dist'), {
    maxAge: 365 * 24 * 60 * 60
}));

app.use(staticCache(path.join(__dirname, '/upload_dir'), {
    maxAge: 365 * 24 * 60 * 60
}));

// 文件上传基础接口
let upload = require('./route/upload.js');
router.post('/upload', upload.upload, async (ctx, next) => {
    let filePath = await upload.handleFileMd5(ctx.req.file.path);
    ctx.body = {
        filename: filePath//返回文件名
    }
});
// var koaBody = require('koa-better-body');
// router.post('/upload', koaBody({
//     multipart: true
// }), require('./route/upload'));


router.post('/api/:type/:handler', require('./route/router_adapter.js'));

// router.get('/', async function (ctx, next) {
//     ctx.body = 'Hello World!';
// });

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(80);
console.log('server start');

