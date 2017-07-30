import $$util from '../../lib/util.js'

export default {
    getList: async function (params) {
        let url = '/api/house/list';
        let option = {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(params),
            credentials: 'include',
            headers: { "Content-Type" : "application/json" }
        };
        return await $$util.ajax(url, option);
    },
    addRow: async function (params) {
        let url = '/api/house/add';
        let option = {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(params),
            credentials: 'include',
            headers: { "Content-Type" : "application/json" }
        };
        return await $$util.ajax(url, option);
    },
    updateRow: async function (params) {
        let url = '/api/house/update';
        let option = {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(params),
            credentials: 'include',
            headers: { "Content-Type" : "application/json" }
        };
        return await $$util.ajax(url, option);
    }
}