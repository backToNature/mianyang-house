/**
 * Created by daringuo on 2017/7/29.
 */
let user_dao = require('../../dao/user.js');
module.exports = async function (ctx, next) {
    let params = ctx.request.body;
    let result = await user_dao.queryList(params);
    ctx.body = {
        status: 0,
        data: result
    };
};
