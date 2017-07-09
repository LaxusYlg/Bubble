import {buildAccessHeader, buildUrl} from "./Helper";

const NetWork = require("../net/Net");
var ShotRepo = {
    /**
     * fetch shot list with category
     * @param list
     * @param timeframe
     * @param sort
     * @param page
     * @param pageSize
     * @returns {*|Promise}
     */
    getShots: function ({list, timeframe, sort, page, pageSize = 20} = {}): Promise {
        let url = buildUrl("shots");
        let params = {per_page: pageSize};
        if (list) {
            params.list = list;
        }
        if (timeframe) {
            params.timeframe = timeframe;
        }
        if (sort) {
            params.sort = sort;
        }
        if (page) {
            params.page = page;
        }
        let headers = buildAccessHeader();
        return NetWork.get(url, headers, params).then((response) => response.json());
    },

    /**
     * fetch shot detail by id
     * @param id shotId
     * @returns {*|Promise}
     */
    getShotById: function (id): Promise {
        let url = buildUrl("shots/" + id);
        let header = buildAccessHeader();
        return NetWork.get(url, header);
    },

    /**
     * fetch shot's attachments
     * @param id shotId
     * @returns {*|Promise}
     */
    getShotAttachments: function (id): Promise {
        let url = buildUrl("shots/" + id + "/attachments");
        let headers = buildAccessHeader();
        return NetWork.get(url, headers);
    },

    /**
     * fetch attachment detail by id
     * @param shotId shotId
     * @param id attachmentId
     * @returns {*|Promise}
     */
    getAttachmentById: function (shotId, id): Promise {
        let url = buildUrl("shots/" + shotId + "/attachments/" + id);
        let headers = buildAccessHeader();
        return NetWork.get(url, headers);
    },

    /**
     * fetch shot's buckets
     * @param id shotId
     */
    getShotBuckets: function (id): Promise {
        let url = buildUrl("shots/" + id + "/buckets");
        let headers = buildAccessHeader();
        return NetWork.get(url, headers);
    },

    /**
     * fetch shot's comments
     * @param id shotId
     * @returns {*|Promise}
     */
    getShotComments: function ({id, page, pageSize = 20}): Promise {
        let url = buildUrl("shots/" + id + "/comments");
        let headers = buildAccessHeader();
        let params = {page: page, per_page: pageSize};
        return NetWork.get(url, headers, params).then((response) => response.json());
    },

    /**
     * fetch comment detail by id
     * @param shotId shotId
     * @param id commentId
     * @returns {*|Promise}
     */
    getCommentById: function (shotId, id): Promise {
        let url = buildUrl("shots/" + shotId + "/comments/" + id);
        let headers = buildAccessHeader();
        return NetWork.get(url, headers);
    },

    /**
     * fetch comment's likes
     * @param shotId shotId
     * @param id commentId
     */
    getCommentLikes: function (shotId, id): Promise {
        let url = buildUrl("shots/" + shotId + "/comments/" + id + "/likes");
        let headers = buildAccessHeader();
        return NetWork.get(url, headers);
    },

    /**
     * fetch shot's likes
     * @param id shotId
     * @returns {*|Promise}
     */
    getShotLikes: function (id): Promise {
        let url = buildUrl("shots/" + id + "/likes");
        let headers = buildAccessHeader();
        return NetWork.get(url, headers);
    },

    /**
     * fetch shot's projects
     * @param id shotId
     * @returns {*|Promise}
     */
    getShotProjects: function (id): Promise {
        let url = buildUrl("shots/" + id + "/projects");
        let headers = buildAccessHeader();
        return NetWork.get(url, headers);
    },

    /**
     * fetch shot's rebounds
     * @param id shotId
     * @returns {*|Promise}
     */
    getShotRebounds: function (id): Promise {
        let url = buildUrl("shots/" + id + "/rebounds");
        let headers = buildAccessHeader();
        return NetWork.get(url, headers);
    }

}

module.exports = ShotRepo;