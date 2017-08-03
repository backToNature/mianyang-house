/**
 * Created by daringuo on 2017/8/3.
 */
const building_dao = require('../../dao/building.js');
const send = require('koa-send');
const path = require('path');

module.exports = async function (ctx, next) {

    let result = await building_dao.queryList();
    await send(ctx, '/test/building.xls');
    // ctx.body = {
    //     status: 0,
    //     data: result,
    //     msg: 'success'
    // };
};