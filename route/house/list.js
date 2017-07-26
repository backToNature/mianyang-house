/**
 * Created by daringuo on 2017/7/27.
 */
let house_dao = require('../../dao/house.js');
// 查询条件，是否入住，入住人，入住时间，属于哪一栋，

/**
 * @param {Object} ctx ...
 * @param {boolean} ctx.request.body.is_live - 是否入住
 * @param {number} ctx.request.body.user_id - 用户id
 * @param {datetime} ctx.request.body.start_time - 入住开始时间
 * @param {datetime} ctx.request.body.end_time - 入住截止时间
 * @param {number} ctx.request.body.building_id - 楼栋id
 * @param {string} ctx.request.body.name - 屋名
 */

module.exports = async function (ctx, next) {
    let params = ctx.request.body;
    let result = await house_dao.queryListLikeName(params);
    ctx.body = {
        err: 0,
        data: result
    };
};