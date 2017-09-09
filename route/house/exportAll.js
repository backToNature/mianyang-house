/**
 * Created by daringuo on 2017/8/18.
 */
const house_dao = require('../../dao/house.js');
const send = require('koa-send');
const xlsx = require('node-xlsx').default;
const path = require('path');
const fs = require('fs');
const os = require('os');

module.exports = async function (ctx, next) {

    let result = await house_dao.queryAllList();
    let head = ['名称', '租户', '联系方式', '身份证号', '低保证号', '所属楼栋', '居委会', '入住时间', '到期时间', '地址', '描述'];
    let data = [head];
    result.forEach(item => {
        if (item.house_name) {
            data.push([
                item.house_name,
                item.user_name,
                item.phone_num,
                item.id_card,
                item.dibao,
                item.building_name,
                item.jwh,
                item.start_time,
                item.end_time,
                item.address,
                item.house_desc
            ]);
        }
    });
    let buffer = xlsx.build([{name: "Sheet1", data: data}]);
    let fileName = new Date().valueOf().toString() + '.xls';
    let filePath = path.join(os.tmpdir(), fileName);
    fs.writeFileSync(filePath, buffer);
    await send(ctx, fileName, { root: os.tmpdir() });
};