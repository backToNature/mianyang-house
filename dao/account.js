/**
 * Created by daringuo on 2017/7/24.
 */
const sql_excute = require('./sql_excute.js');
const tableName = 'account';

module.exports = {
    queryAccount: async function (params) {
        let sql = `SELECT * FROM ${tableName} WHERE account=${params.account} AND pwd=${params.pwd}`;
        return await sql_excute(sql);
    }
};