/**
 * Created by daringuo on 2017/7/26.
 */
/**
 * Created by daringuo on 2017/7/24.
 */
const sql_excute = require('./sql_excute.js');
const tableName = 'house';b

module.exports = {
    queryAccount: async function (params) {
        let sql = `SELECT * FROM ${tableName} WHERE account=? AND pwd=?`;
        let _params = [params.account, params.pwd];
        return await sql_excute(sql, _params);
    }
};