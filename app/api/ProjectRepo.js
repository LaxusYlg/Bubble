import {buildAccessHeader, buildUrl} from "./Helper";

const NetWork = require("../net/Net");

var ProjectRepo = {

    /**
     * get project detail by id
     * @param id projectId
     */
    getDetail: function (id): Promise {
        let url = buildUrl("projects/" + id);
        let headers = buildAccessHeader();
        return NetWork.get(url, headers);
    },

    /**
     * get project's shots
     * @param id projectId
     */
    getShots: function (id): Promise {
        let url = buildUrl("projects/" + id);
        let headers = buildAccessHeader();
        return NetWork.get(url, headers);
    }
}