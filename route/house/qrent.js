/**
 * Created by daringuo on 2017/8/18.
 */
let house_dao = require('../../dao/house.js');
module.exports = async function (ctx, next) {
    let params = ctx.request.body;
    let _params = {
        id: params.id,
        user_id: null,
        start_time: null,
        end_time: null,
        description: null
    };
    let result = await house_dao.updateRowById(_params);
    if (result.insertId >= 0) {
        ctx.body = {
            status: 0,
            msg: 'success'
        };
    } else {
        ctx.body = {
            status: 500,
            msg: '退租失败'
        };
    }
};