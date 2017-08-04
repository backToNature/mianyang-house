/**
 * Created by daringuo on 2017/8/4.
 */
const building_dao = require('../../dao/building.js');
const send = require('koa-send');
const xlsx = require('node-xlsx').default;
const path = require('path');
const fs = require('fs');
const os = require('os');

module.exports = async function (ctx, next) {
    let params = ctx.request.body;
    let _params = [];
    if (params.ids) {
        _params = JSON.parse(params.ids);
    }
    let result = await building_dao.queryListByIds(_params);
    let head = ['楼栋名称', '地址', '描述', '经度', '纬度'];
    let data = [head];
    result.forEach(item => {
        if (item.name) {
            data.push([
                item.name,
                item.address,
                item.description,
                item.lng,
                item.lat
            ]);
        }
    });

    let buffer = xlsx.build([{name: "Sheet1", data: data}]);
    let fileName = new Date().valueOf().toString() + '.xls';
    let filePath = path.join(os.tmpdir(), fileName);
    fs.writeFileSync(filePath, buffer);
    await send(ctx, fileName, {
        root: os.tmpdir()
    });
};