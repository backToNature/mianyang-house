/**
 * Created by daringuo on 2017/7/29.
 */
let user_dao = require('../../dao/user.js');
module.exports = async function (ctx, next) {
    let params = ctx.request.body;

    let result = await user_dao.queryListLikeName(params);
    let total = await user_dao.queryCount();
    let _result = {
        list: result,
        total: total[0].total
    };
    ctx.body = {
        status: 0,
        data: _result,
        msg: 'success'
    };
};
