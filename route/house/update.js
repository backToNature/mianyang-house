/**
 * Created by daringuo on 2017/7/30.
 */
let house_dao = require('../../dao/house.js');
module.exports = async function (ctx, next) {
    let params = ctx.request.body;
    let result = await house_dao.updateRowById(params);
    if (result.insertId >= 0) {
        ctx.body = {
            status: 0,
            msg: 'success'
        };
    } else {
        ctx.body = {
            status: 500,
            msg: '新增栋失败'
        };
    }
};