import $$util from '../../lib/util.js'

export default {
    getUserInfo: async function () {
        let url = '/api/account/info';
        let option = {
            mode: 'cors',
            method: 'POST',
            credentials: 'include',
            headers: { "Content-Type" : "application/json" }
        };
        return await $$util.ajax(url, option);
    }
}