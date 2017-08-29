/**
 * Created by daringuo on 2017/7/27.
 */
let house_dao = require('../../dao/house.js');
// 查询条件，是否入住，入住人，入住时间，属于哪一栋，

/**
 * @param {Object} ctx ...
 * @param {number} ctx.request.body.user_name - 用户名称
 * @param {datetime} ctx.request.body.start_time - 入住开始时间
 * @param {datetime} ctx.request.body.end_time - 入住截止时间
 * @param {number} ctx.request.body.building_name - 楼栋名称
 * @param {string} ctx.request.body.name - 屋名
 * @param {string} ctx.request.body.pageSize - 每页条数
 * @param {string} ctx.request.body.pageNo - 当前页数
 */

module.exports = async function (ctx, next) {
    let params = ctx.request.body;
    let result = await house_dao.queryUnion(params.user_name, params.start_time, params.end_time, params.building_name, params.name, params.pageSize, params.pageNo);
    ctx.body = {
        status: 0,
        data: result,
        msg: 'success'
    };
};