/**
 * Created by daringuo on 2017/7/29.
 */
let user_dao = require('../../dao/user.js');
module.exports = async function (ctx, next) {
    let params = ctx.request.body;
    let result = await user_dao.addRow(params);
    if (result.insertId >= 0) {
        ctx.body = {
            status: 0,
            data: {
                id: result.insertId
            },
            msg: 'success'
        };
    } else {
        ctx.body = {
            status: 500,
            msg: '新增用户失败'
        };
    }
};