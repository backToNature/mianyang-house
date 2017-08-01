/**
 * Created by daringuo on 2017/7/26.
 */
const sql_excute = require('./sql_excute.js');
const tableName = 'building';


module.exports = {
    queryListLikeName: async function (params) {
        let limitLeft = params.pageSize * (params.pageNo - 1);
        let sql = `SELECT * FROM ${tableName} WHERE name LIKE '%${params.name}%' LIMIT ${limitLeft}, ${params.pageSize}`;
        let _params = [params.name];
        let list = await sql_excute(sql, _params);
        let total = await sql_excute(`SELECT COUNT(*) FROM ${tableName}`, []);
        total = total[0]['COUNT(*)'];
        return {
            list,
            total
        }
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
    updateRowById: async function (params) {
        let frag = '', _params = [];
        for (let key in params) {
            if (key !== 'id') {
                frag += key + '=?,';
                _params.push(params[key]);
            }
        }
        frag = frag.substring(0, frag.length - 1);
        return await sql_excute(`UPDATE ${tableName} SET ${frag} WHERE id=${params.id}`, _params)
    },
    delRow: async function (params) {
        let _params = [params.id];
        return await sql_excute(`DELETE FROM ${tableName} where id=?`, _params);
    }
};