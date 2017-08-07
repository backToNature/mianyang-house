/**
 * Created by daringuo on 2017/7/26.
 */
const sql_excute = require('./sql_excute.js');
const tableName = 'house';

// SELECT
// *
// FROM
// house
// LEFT JOIN building ON house.building_id = building.id
// LEFT JOIN `user` ON house.user_id = `user`.id
// WHERE
//     `user`.name  LIKE '%郭%'
// AND
// building.id=2
// AND
// house.start_time>'2017-07-1 00:00:00'
// AND
// house.end_time<'2017-10-16 00:00:00'


module.exports = {
    queryList: async function () {
        let sql = `SELECT * FROM ${tableName}`;
        return await sql_excute(sql, []);
    },
    queryListLikeName: async function (params) {
        let sql = `SELECT * FROM ${tableName} WHERE name LIKE '%${params.name}%'`;
        let _params = [params.name];
        return await sql_excute(sql, _params);
    },
    queryListByBuildingId: async function (params) {
        return await sql_excute(`SELECT * FROM ${tableName} WHERE building_id=?`, [params.id])
    },
    /**
     * @param {boolean} is_live - 是否入住
     * @param {number} user_id - 用户id
     * @param {datetime} start_time - 入住开始时间
     * @param {datetime} end_time - 入住截止时间
     * @param {number} building_id - 楼栋id
     * @param {string} name - 屋名
     * @param {string} pageSize - 每页条数
     * @param {string} pageNo - 当前页数
     */
    queryUnion: async function (is_live, user_id, start_time, end_time, building_id, name, pageSize, pageNo) {

    },
    importData: async function (params) {
        console.log(params);
        return await sql_excute(`INSERT INTO ${tableName}(name, start_time, end_time, description, building_id) VALUES ?`, [params])
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