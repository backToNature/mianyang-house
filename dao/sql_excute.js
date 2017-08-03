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
                console.log(`sql:${sql}`, error);
                reject(error);
            } else {
                console.log(`sql:${sql}`, results);
                resolve(results);
            }
        })
    }).catch(err => {
        let error = `db query error: ${err}`;
        console.log(`sql:${sql}`, error);
        return Promise.reject(error);
    });
};