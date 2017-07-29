/**
 * Created by daringuo on 2017/7/26.
 */
const multer = require('koa-multer');
const os = require('os');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const shell = require('shelljs');

let storage = multer.diskStorage({
    //文件保存路径
    destination: (req, file, cb) => {
        cb(null, os.tmpdir())
    },
    //修改文件名称
    filename: (req, file, cb) =>{
        let fileFormat = (file.originalname).split(".");
        cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});

let handleFileMd5 = (filePath) =>{
    return new Promise((resolve, reject) => {
        let start = new Date().getTime();
        let md5sum = crypto.createHash('md5');
        let stream = fs.createReadStream(filePath);
        stream.on('data', (chunk) => {
            md5sum.update(chunk);
        });
        stream.on('error', (err) => {
            reject(err);
        });
        stream.on('end', () => {
            let str = md5sum.digest('hex').toUpperCase();
            console.log('MD5签名为:'+str+'.耗时:'+(new Date().getTime()-start)/1000.00+"秒");
            let finalFileName =  str + path.extname(filePath);
            let finalPath = path.join(process.cwd(), 'upload_dir/assets', finalFileName);
            shell.cp(filePath, finalPath);
            shell.rm(filePath);
            resolve(`/assets/${finalFileName}`);
        });
    }).catch(err => {
        return Promise.reject(err);
    });
};
module.exports = {
    upload: multer({storage: storage}).single('file'),
    handleFileMd5
};