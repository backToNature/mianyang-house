/**
 * Created by daringuo on 2017/7/27.
 */
export default {
    ajax(url, option) {
        return new Promise((resolve, reject) =>{
            try {
                fetch(url, option).then(rsp => {
                    if (rsp.status !== 200 || !rsp.ok) {
                        return reject('error')
                    }
                    return rsp.json()
                }).then(d => {
                    return resolve(d)
                }).catch(e => {
                    console.error(e)
                    return reject('fetch error')
                })
            } catch(e) {
                reject('error')
            }
        });
    },
    dateFormat(date, str) {
        let o = {
            "M+": date.getMonth() + 1, //月份 
            "d+": date.getDate(), //日 
            "h+": date.getHours(), //小时 
            "m+": date.getMinutes(), //分 
            "s+": date.getSeconds(), //秒 
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(str)) str = str.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(str)) str = str.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return str;
    }
}