/**
 * Created by daringuo on 2017/8/2.
 */
module.exports = async function (ctx, next) {
    let params = ctx.request.body;
    let result = await building_dao.addRow(params);
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