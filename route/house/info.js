/**
 * Created by daringuo on 2017/7/27.
 */
let house_dao = require('../../dao/house.js');

module.exports = async function (ctx, next) {
    let result = await house_dao.queryHouseInfo();

    let noUserHouseNum = result[0].info;
    let houseNum = result[1].info;
    let hasDatedHouseNum = result[2].info;
    let alreadyDated = result[3].info;

    ctx.body = {
        status: 0,
        data: {
            rentedNum: houseNum - noUserHouseNum,
            noRentedNum: noUserHouseNum,
            hasDatedHouseNum,
            alreadyDated
        },
        msg: 'success'
    };
};