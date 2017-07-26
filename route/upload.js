/**
 * Created by daringuo on 2017/7/26.
 */
var fs = require('fs')
var app = require('koa')()
var cdn = require('./../lib/file_upload')
var config = require('./../config/global')

var env = app.env

function deleteFile(path) {
    fs.unlink(path, function (err) {
        if (err) {
            console.error('delete', path, err)
        }
    })
}

module.exports = function *list(next) {
    var ctx = this
    var req = ctx.request
    var file = req.body.files.uploadFile
    var rename = req.body.fields.rename
    var link
    // 判断下是否需要改名, 忽略env原有逻辑
    if (rename) {
        rename = rename.split('#')
        if (rename.length > 1) {
            env = rename[0]
        }
        rename = config[app.env].uploadDir + '/' + rename[rename.length - 1]
    }
    if (file) {
        try {
            link = yield cdn.upload(file.path, env, rename)
            this.body = {err: 0, link: link}
        }
        catch (e) {
            this.body = {err: 1, errorStr: '上传发生错误'}
        }
        // 删除缓存文件
        if (rename) {
            deleteFile(rename)
        }
        else {
            deleteFile(file.path)
        }
    }
    else {
        this.body = {err: 1, errorStr: '没有文件上传'}
    }
}