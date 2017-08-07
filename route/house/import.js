/**
 * Created by daringuo on 2017/8/8.
 */
const xlsx = require('node-xlsx').default;
const path = require('path');
const shell = require('shelljs');
let house_dao = require('../../dao/house.js');

let errorObj = {
    status: 500,
    msg: 'server error'
};

module.exports = async function (ctx, next) {
    try {
        let params = ctx.req.body;
        let filePath = ctx.req.file.path;
        if (filePath) {
            if (path.extname(filePath) !== '.xls' || path.extname(filePath) !== '.xlsx') {
                ctx.body = Object.assign(errorObj, {msg: '请上传excel文件'});
            }
            let list = [];
            let workSheetsFromFile =  xlsx.parse(ctx.req.file.path);
            if (workSheetsFromFile.length && workSheetsFromFile[0].data && workSheetsFromFile[0].data.length) {
                workSheetsFromFile[0].data.forEach((item, index) => {
                    if (index !== 0) {
                        if (item[0]) {
                            list.push({
                                name: item[0] || '',
                                start_time: item[1] || '',
                                end_time: item[2] || '',
                                description: item[3] || '',
                                building_id: params.id
                            });
                        }
                    }
                });
            }
            let _params = list.map(item => [item.name, item.start_time, item.end_time, item.description, item.building_id]);
            let result = await house_dao.importData(_params);
            if (result.insertId >= 0) {
                ctx.body = {
                    status: 0,
                    msg: 'success'
                };
            }
            shell.rm(filePath);
        } else {
            ctx.body = Object.assign(errorObj, {msg: '文件上传失败'});
        }
    } catch (e) {
        console.log(e);
        ctx.body = Object.assign(errorObj, {msg: e});
    }
};