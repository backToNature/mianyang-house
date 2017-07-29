/**
 * Created by daringuo on 2017/7/25.
 */

module.exports = async function (ctx, next){
    let method = ctx.method.toLocaleLowerCase();
    let type = ctx.params.type;
    let handler = ctx.params.handler;
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
            }
        }
    } catch (e) {
        console.log(e);
    }
};