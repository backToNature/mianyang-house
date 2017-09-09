/**
 * Created by daringuo on 2017/7/25.
 */
let mysql = require('mysql');
let db_config = require('../config.js').db_config;

let pool = mysql.createPool(db_config);
let log4js = require('log4js');
let logger = log4js.getLogger('app');

module.exports = (sql, params) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                logger.error();
                reject(error);
            } else {
                logger.info(`sql:${sql},${JSON.stringify(results)}`);
                resolve(results);
            }
        })
    }).catch(err => {
        let error = `db query error: ${err}`;
        logger.info(`sql:${sql},${JSON.stringify(error)}`);
        return Promise.reject(error);
    });
};