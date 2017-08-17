/**
 * Created by daringuo on 2017/8/17.
 */
module.exports = async function (ctx, next) {
    ctx.session.account = null;
    ctx.session.name = null;
    ctx.redirect('/login.html');
};