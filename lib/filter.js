/**
 * Created by daringuo on 2017/7/25.
 */


module.exports = async function (ctx, next) {
    if (ctx.session.account) {
        next();
    } else {
        let path = ctx.path;
        ctx.body = 'please login firstly';
    }
};