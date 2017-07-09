var DateUtils = {

    formatDate: function (date: ?Date): string {
        let now = new Date();
        if (now.getFullYear() === date.getFullYear()) {
            if (now.getMonth() === date.getMonth() && now.getDay() === date.getDay()) {
                let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                return hour + ":" + minute;
            } else {
                let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                return month + "/" + day;
            }
        } else {
            return date.toLocaleDateString();
        }
    }
};


module.exports = DateUtils;