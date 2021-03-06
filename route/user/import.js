/**
 * Created by daringuo on 2017/8/7.
 */
const xlsx = require('node-xlsx').default;
const path = require('path');
const shell = require('shelljs');
let user_dao = require('../../dao/user.js');
let log4js = require('log4js');
let logger = log4js.getLogger('app');

let errorObj = {
    status: 500,
    msg: 'server error'
};

module.exports = async function (ctx, next) {
    try {
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
                                dibao: item[1] || '',
                                id_card: item[2] || '',
                                phone_num: item[3] || '',
                                etc: item[4] || ''
                            });
                        }
                    }
                });
            }
            let _params = list.map(item => [item.name, item.dibao, item.id_card, item.phone_num, item.etc]);
            let result = await user_dao.importData(_params);
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
        logger.error(JSON.stringify(e));
        ctx.body = Object.assign(errorObj, {msg: e});
    }
};