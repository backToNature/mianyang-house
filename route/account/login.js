/**
 * Created by daringuo on 2017/7/25.
 */
let account_dao = require('../../dao/account.js');
module.exports = async function (ctx, next) {
    let params = ctx.request.body;
    // 帐号
    let account = params.account;
    // 密码
    let pwd = params.pwd;

    let _params = {
        account,
        pwd
    };

    let result = await account_dao.queryAccount(_params);
    if (result.length) {
        // 登录成功
        ctx.session.account = result[0].account;
        ctx.session.name = result[0].name;
        ctx.redirect('/index.html#/data-collection');
    } else {
        ctx.redirect('/login-fail.html');
    }
};