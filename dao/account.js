/**
 * Created by daringuo on 2017/7/24.
 */
const sql_excute = require('./sql_excute.js');
const tableName = 'account';

module.exports = {
    queryAccount: async function (params) {
        let sql = `SELECT * FROM ${tableName} WHERE account=? AND pwd=?`;
        let _params = [params.account, params.pwd];
        return await sql_excute(sql, _params);
    },
    addAccount: async function (params) {
        let frag = '', _params = [], placeholder = '';
        for (let key in params) {
            if (key !== 'id') {
                frag += key + ',';
                placeholder += '?,';
                _params.push(params[key]);
            }
        }
        frag = frag.substring(0, frag.length - 1);
        placeholder = placeholder.substring(0, placeholder.length - 1);
        return await sql_excute(`INSERT INTO ${tableName}(${frag}) VALUES(${placeholder});`, _params)
    }
};