var NetWork = {

    get: function (url, headers, params): Promise {
        let fetchOption = {method: 'GET'};
        if (headers) {
            fetchOption.headers = headers;
        }
        if (params) {
            let query = "?";
            Object.keys(params).forEach((key) => {
                if (query.length === 1) {
                    query += key + "=" + params[key];
                } else {
                    query += "&" + key + "=" + params[key];
                }
            });
            url += query;
        }
        return fetch(url, fetchOption);
    },

    post: function (url, headers, body): Promise {
        let fetchOption = {method: 'POST'};
        if (headers) {
            fetchOption.headers = headers;
        }
        if (body) {
            fetchOption.body = JSON.stringify(body);
        }
        return fetch(url, fetchOption);
    }
}

module.exports = NetWork;