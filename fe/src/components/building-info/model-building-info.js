import $$util from '../../lib/util.js'

export default {
    getBuildingList: async function (params) {
        let url = '/api/building/list';
        let option = {
            method: 'POST',
            body: JSON.stringify(params),
            credentials: 'include',
            headers: { "Content-Type" : "application/json" }
        };
        return await $$util.ajax(url, option);
    }
}