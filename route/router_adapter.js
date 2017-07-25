/**
 * Created by daringuo on 2017/7/25.
 */
module.exports = async function (ctx, next){
    let method = ctx.method.toLocaleLowerCase();
    let type = ctx.params.type;
    let handler = ctx.params.handler;
    try {
        if (method === 'get') {
        } else if (method === 'post'){
            if (type === 'account') {
                switch (handler) {
                    case 'login':
                        await require('./account/login.js')(ctx, next);
                        break;
                }
            }

        }
    } catch (e) {
        console.log(e);
    }
};