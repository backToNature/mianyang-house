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
    }
}