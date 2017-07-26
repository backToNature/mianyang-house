/**
 * Created by daringuo on 2017/7/25.
 */
let mysql = require('mysql');
let db_config = require('../config.js').db_config;

let pool = mysql.createPool(db_config);

module.exports = (sql, params) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        })
    }).catch(err => {
        let error = `db query error: ${err}`;
        console.log(error);
        return Promise.reject(error);
    });
};