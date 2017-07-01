import {buildAccessHeader, buildUrl} from "./Helper";

const NetWork = require("../net/Net");
var BucketRepo = {

    /**
     * get bucket detail by id
     * @param id bucketId
     */
    getDetail: function (id): Promise {
        let url = buildUrl("buckets/" + id);
        let headers = buildAccessHeader();
        return NetWork.get(url, headers);
    },
    /**
     * fetch bucket's shot
     * @param id bucketId
     */
    getShots: function (id): Promise {
        let url = buildUrl("buckets/" + id + "/shots");
        let headers = buildAccessHeader();
        return NetWork.get(url, headers);
    }
}