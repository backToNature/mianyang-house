/**
 * Created by daringuo on 2017/8/17.
 */
let account_dao = require('../../dao/account.js');
module.exports = async function (ctx, next) {
    let params = ctx.request.body;
    // 帐号
    let account = params.account;
    // 密码
    let pwd = params.pwd;
    // 用户明
    let name = params.name;

    let _params = {
        account,
        pwd,
        name
    };

    let result = await account_dao.addAccount(_params);
    if (result.insertId) {
        // 注册成功
        ctx.redirect('/login-success.html');
    } else {
        ctx.redirect('/login-fail.html');
    }
};