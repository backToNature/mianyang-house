/**
 * Created by daringuo on 2017/7/27.
 */
let building_dao = require('../../dao/building.js');
module.exports = async function (ctx, next) {
    let params = ctx.request.body;
    let _params = {
        address: params.address || '',
        description: params.description || '',
        img_url: params.img_url || '',
        lat: params.lat || '',
        lng: params.lng || '',
        name: params.name || ''
    };
    let result = await building_dao.addRow(_params);
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
            msg: '新增栋失败'
        };
    }
};