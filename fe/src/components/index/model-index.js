import $$util from '../../lib/util.js'

export default {
    getInfo: async () => {
        let url = '/api/house/info';
        let option = {
            mode: 'cors',
            method: 'POST',
            credentials: 'include',
            headers: { "Content-Type" : "application/json" }
        };
        return await $$util.ajax(url, option);
    }
}