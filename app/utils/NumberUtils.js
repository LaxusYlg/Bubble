var NumberUtils = {

    formatNumber: function (number): string {
        if (number < 1000) {
            return "" + number;
        } else {
            return parseInt((number / 1000)) + "k";
        }
    }
};


module.exports = NumberUtils;