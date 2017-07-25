/**
 * Created by daringuo on 2017/7/25.
 */

let whiteList = ['/api/account/login', '/api/account/logout', '/login.html', '/signup.html'];

module.exports = async function (ctx, next) {
    if (ctx.session.account || whiteList.includes(ctx.path)) {
        await next();
    } else {
        ctx.redirect('/login.html');
    }
};