/**
 * Created by daringuo on 2017/7/26.
 */
/**
 * Created by daringuo on 2017/7/24.
 */
const sql_excute = require('./sql_excute.js');
const tableName = 'building';

module.exports = {
    queryListLikeName: async function (params) {
        let sql = `SELECT * FROM ${tableName} WHERE name LIKE '%?%'`;
        let _params = [params.name];
        return await sql_excute(sql, _params);
    },
    addRow: async function (params) {
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
    },
    updateRow: async function (params) {
        let frag = '', _params = [];
        for (let key in params) {
            frag += key + '=?,';
            _params.push(params[key]);
        }
        frag = frag.substring(0, frag.length - 1);
        return await sql_excute(`UPDATE ${tableName} SET ${frag}`, _params)
    },
    delRow: async function (params) {
        let _params = [params.id];
        return await sql_excute(`DELETE FROM ${tableName} where id=?`, _params);
    }
};