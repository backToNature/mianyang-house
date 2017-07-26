/**
 * Created by daringuo on 2017/7/27.
 */
let building_dao = require('../../dao/building.js');
module.exports = async function (ctx, next) {
    let params = ctx.request.body;
    let result = await building_dao.updateRowById(params);
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