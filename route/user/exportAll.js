/**
 * Created by daringuo on 2017/9/7.
 */
const user_dao = require('../../dao/user.js');
const send = require('koa-send');
const xlsx = require('node-xlsx').default;
const path = require('path');
const fs = require('fs');
const os = require('os');

module.exports = async function (ctx, next) {
    let result = await user_dao.queryList();
    let head = ['租户姓名', '低保证号', '身份证号', '联系方式', '备注'];
    let data = [head];
    result.forEach(item => {
        if (item.name) {
            data.push([
                item.name,
                item.dibao,
                item.id_card,
                item.phone_num,
                item.etc
            ]);
        }
    });
    let buffer = xlsx.build([{name: "Sheet1", data: data}]);
    let fileName = new Date().valueOf().toString() + '.xls';
    let filePath = path.join(os.tmpdir(), fileName);
    fs.writeFileSync(filePath, buffer);
    await send(ctx, fileName, { root: os.tmpdir() });
};