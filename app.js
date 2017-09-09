let Koa = require('koa');
let Router = require('koa-router');
let bodyParser = require('koa-bodyparser');
let session = require('koa-session');
let path = require('path');

let log4js = require('log4js');
let logger = log4js.getLogger('app');
log4js.configure({
    appenders: {
        app: { type: 'dateFile', filename: 'log/log.log' }
    },
    categories: {
        default: { appenders: ['app'], level: 'debug' }
    }
});

let app = new Koa();
let router = new Router();

app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    logger.info(`${ctx.method} ${ctx.url} ${ctx.status} - ${ms}ms`);
});
app.use(bodyParser());

app.keys = ['fuck you'];
app.use(session({}, app));

let staticCache = require('koa-static-cache');

// 登录拦截器

app.use(staticCache(path.join(__dirname, '/upload_dir'), {
    maxAge: 365 * 24 * 60 * 60,
    dynamic: true
    // preload: false
}));
app.use(require('./lib/filter.js'));

app.use(staticCache(path.join(__dirname, '/view'), {
    maxAge: 365 * 24 * 60 * 60
}));

app.use(staticCache(path.join(__dirname, '/fe/dist'), {
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

// excel导入
router.post('/api/:type/import', upload.upload, require('./route/router_adapter.js'));
router.post('/api/:type/:handler', require('./route/router_adapter.js'));

app
    .use(router.routes())
    .use(router.allowedMethods());

app.on('error', function (err, ctx) {
    logger.error('server error', err, ctx)
});

app.listen(80);
console.log('server start');

