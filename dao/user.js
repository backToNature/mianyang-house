/**
 * Created by daringuo on 2017/7/29.
 */
const sql_excute = require('./sql_excute.js');
const tableName = 'user';

module.exports = {
    queryListLikeName: async function (params) {
        let sql = `SELECT * FROM ${tableName} WHERE name LIKE '%${params.name}%'`;
        let _params = [params.name];
        return await sql_excute(sql, _params);
    },
    queryList: async function (params) {
        let sql = `SELECT * FROM ${tableName}`;
        return await sql_excute(sql, []);
    },
    importData: async function (params) {
        return await sql_excute(`INSERT INTO ${tableName}(name, dibao, id_card, phone_num, etc) VALUES ?`, [params]);
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