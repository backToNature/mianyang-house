/**
 * Created by daringuo on 2017/8/17.
 */
module.exports = async function (ctx, next) {
    ctx.body = {
        status: 0,
        data: {
            name: ctx.session.name
        }
    };
};