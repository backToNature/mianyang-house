let Koa = require('koa');
let Router = require('koa-router');
let bodyParser = require('koa-bodyparser');
let session = require('koa-session');

let app = new Koa();
let router = new Router();

app.use(bodyParser());

app.keys = ['your-session-secret'];
app.use(session({}, app));

app.use(require('./lib/filter.js'));

router.get('/', function (ctx, next) {
    ctx.body = 'Hello World!';
});

app
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(80);
console.log('server start');

