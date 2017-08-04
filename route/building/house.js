/**
 * Created by daringuo on 2017/8/5.
 */
let house_dao = require('../../dao/house.js');
module.exports = async function (ctx, next) {
    let params = ctx.request.body;
    let result = await house_dao.queryListByBuildingId(params);
    ctx.body = {
        status: 0,
        data: result
    };
};