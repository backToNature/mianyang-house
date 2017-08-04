/**
 * Created by daringuo on 2017/7/25.
 */

module.exports = async function (ctx, next){
    let method = ctx.method.toLocaleLowerCase();
    let type = ctx.params.type;
    let handler = ctx.params.handler;
    if (ctx.path.indexOf('/import') >= 0) {
        handler = 'import';
    }
    let result;
    try {
        if (method === 'get') {
        } else if (method === 'post'){
            switch (type) {
                case 'account':
                    switch (handler) {
                        case 'login':
                            await require('./account/login.js')(ctx, next);
                            break;
                    }
                    break;
                case 'building':
                    switch (handler) {
                        case 'list':
                            await require('./building/list.js')(ctx, next);
                            break;
                        case 'add':
                            await require('./building/add.js')(ctx, next);
                            break;
                        case 'update':
                            await require('./building/update.js')(ctx, next);
                            break;
                        case 'del':
                            await require('./building/del.js')(ctx, next);
                            break;
                        case 'import':
                            await require('./building/import.js')(ctx, next);
                            break;
                        case 'export':
                            await require('./building/export.js')(ctx, next);
                            break;
                        case 'exportAll':
                            await require('./building/exportAll.js')(ctx, next);
                            break;
                    }
                    break;
                case 'user':
                    switch (handler) {
                        case 'list':
                            await require('./user/list.js')(ctx, next);
                            break;
                        case 'add':
                            await require('./user/add.js')(ctx, next);
                            break;
                        case 'update':
                            await require('./user/update.js')(ctx, next);
                            break;
                        case 'del':
                            await require('./user/del.js')(ctx, next);
                            break;
                    }
                    break;
                case 'house':
                    switch (handler) {
                        case 'list':
                            await require('./house/list.js')(ctx, next);
                            break;
                        case 'add':
                            await require('./house/add.js')(ctx, next);
                            break;
                        case 'update':
                            await require('./house/update.js')(ctx, next);
                            break;
                        case 'del':
                            await require('./house/del.js')(ctx, next);
                            break;
                    }
                    break;
            }
        }
    } catch (e) {
        ctx.body = {
            status: 500,
            msg: e
        };
    }
};