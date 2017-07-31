/**
 * Created by daringuo on 2017/7/26.
 */
let building_dao = require('../../dao/building.js');

/**
 * @param {Object} ctx ...
 * @param {number} ctx.request.body.name - 楼栋名称
 * @param {datetime} ctx.request.body.pageSize - 每页条数
 * @param {datetime} ctx.request.body.pageNo - 当前页码
 */

module.exports = async function (ctx, next) {
    let params = ctx.request.body;
    let result = await building_dao.queryListLikeName(params);
    ctx.body = {
        status: 0,
        data: result
    };
};