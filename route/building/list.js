/**
 * Created by daringuo on 2017/7/26.
 */
let building_dao = require('../../dao/building.js');
module.exports = async function (ctx, next) {
    let params = ctx.request.body;
    let result = await building_dao.queryListLikeName(params);
    ctx.body = {
        status: 0,
        data: result
    };
};