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
    queryAllList: async function () {
        let rowName = `
        	house.id,
            house.name AS house_name,
            house.jwh,
            house.start_time,
            house.end_time,
            house.description AS house_desc,
            user.id AS user_id,
            user.name AS user_name,
            user.dibao,
            user.phone_num,
            user.id_card,
            user.etc AS user_etc,
            building.id AS building_id,
            building.address,
            building.lng,
            building.lat,
            building.name AS building_name,
            building.description AS building_desc,
            building.img_url`;
        let sql = `SELECT ${rowName} FROM ${tableName} LEFT JOIN building ON house.building_id = building.id LEFT JOIN \`user\` ON house.user_id = \`user\`.id`;
        return await sql_excute(sql, []);
    },
    queryListByIds: async function (params) {
        let rowName = `
        	house.id,
            house.name AS house_name,
            house.jwh,
            house.start_time,
            house.end_time,
            house.description AS house_desc,
            user.id AS user_id,
            user.name AS user_name,
            user.dibao,
            user.phone_num,
            user.id_card,
            user.etc AS user_etc,
            building.id AS building_id,
            building.address,
            building.lng,
            building.lat,
            building.name AS building_name,
            building.description AS building_desc,
            building.img_url`;
        let sql = `SELECT ${rowName} FROM ${tableName} LEFT JOIN building ON house.building_id = building.id LEFT JOIN \`user\` ON house.user_id = \`user\`.id WHERE house.id IN (?)`;
        return await sql_excute(sql, [params]);
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
     * @param {number} user_name - 用户姓名
     * @param {datetime} start_time - 入住开始时间
     * @param {datetime} end_time - 入住截止时间
     * @param {number}  building_name - 楼栋名称
     * @param {string} name - 屋名
     * @param {string} pageSize - 每页条数
     * @param {string} pageNo - 当前页数
     */
    queryUnion: async function (user_name, start_time, end_time, building_name, name, pageSize, pageNo) {
        let limitLeft = pageSize * (pageNo - 1);
        let rowName = `
        	house.id,
            house.name AS house_name,
            house.jwh,
            house.start_time,
            house.end_time,
            house.description AS house_desc,
            user.id AS user_id,
            user.name AS user_name,
            user.dibao,
            user.phone_num,
            user.id_card,
            user.etc AS user_etc,
            building.id AS building_id,
            building.address,
            building.lng,
            building.lat,
            building.name AS building_name,
            building.description AS building_desc,
            building.img_url`;
        let count = 'COUNT(*)';
        let sql = `SELECT ${rowName} FROM house LEFT JOIN building ON house.building_id = building.id LEFT JOIN \`user\` ON house.user_id = \`user\`.id`;
        let sql1 = `SELECT ${count} FROM house LEFT JOIN building ON house.building_id = building.id LEFT JOIN \`user\` ON house.user_id = \`user\`.id`;
        if (user_name !== '') {
            sql += ` WHERE \`user\`.name LIKE '%${user_name}%'`;
            sql1 += ` WHERE \`user\`.name LIKE '%${user_name}%'`;
        }
        if (name !== '') {
            if (sql.indexOf('WHERE') >= 0) {
                sql += ` AND house.name LIKE '%${name}%'`;
                sql1 += ` AND house.name LIKE '%${name}%'`;
            } else {
                sql += ` WHERE house.name LIKE '%${name}%'`;
                sql1 += ` WHERE house.name LIKE '%${name}%'`;
            }
        }
        if (building_name !== '') {
            if (sql.indexOf('WHERE') >= 0) {
                sql += ` AND building.name LIKE '%${building_name}%'`;
                sql1 += ` AND building.name LIKE '%${building_name}%'`;
            } else {
                sql += ` WHERE building.name LIKE '%${building_name}%'`;
                sql1 += ` WHERE building.name LIKE '%${building_name}%'`;
            }
        }
        if (start_time && end_time) {
            if (sql.indexOf('WHERE') >= 0) {
                sql += ` AND house.start_time>'${start_time}' AND house.end_time<'${end_time}'`;
                sql1 += ` AND house.start_time>'${start_time}' AND house.end_time<'${end_time}'`;
            } else {
                sql += ` WHERE house.start_time>'${start_time}' AND house.end_time<'${end_time}'`;
                sql1 += ` WHERE house.start_time>'${start_time}' AND house.end_time<'${end_time}'`;
            }
        }
        sql += `  LIMIT ${limitLeft}, ${pageSize}`;
        let list = await sql_excute(sql, []);
        let total = await sql_excute(sql1, []);
        total = total[0]['COUNT(*)'];
        return {
            list: list,
            total:total
        };
        // return await sql_excute(sql, []);
    },
    importData: async function (params) {
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
    },
    queryHouseInfo: async function (params) {
        let sql = `
            SELECT Count(id) AS 'info' FROM house WHERE user_id is NULL
            UNION SELECT Count(id) FROM house
            UNION SELECT Count(id) FROM house WHERE DATE_ADD(CURDATE(), INTERVAL 60 DAY) >= end_time && end_time > CURDATE()
            UNION SELECT Count(id) FROM house WHERE end_time < CURDATE()
        `;
        return await sql_excute(sql, []);
    },

};