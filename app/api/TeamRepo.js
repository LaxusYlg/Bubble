import {buildAccessHeader, buildUrl} from "./Helper";

const NetWork = require("../net/Net");

var TeamRepo = {

    /**
     * fetch team's members
     * @param id teamId
     */
    getMembers: function (id): Promise {
        let url = buildUrl("teams/" + id + "/members");
        let headers = buildAccessHeader();
        return NetWork.get(url, headers);
    },

    /**
     * fetch team's shots
     * @param id
     */
    getShots: function (id): Promise {
        let url = buildUrl("teams/" + id + "/shots");
        let headers = buildAccessHeader();
        return NetWork.get(url, headers);
    }
}
