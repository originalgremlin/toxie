var cache = new require('collections/dict')(),
    ONE_HOUR = 3600000,
    ONE_MONTH = 30 * 24 * ONE_HOUR;

setInterval(function (maxDiff) {
    var date = new Date();
    cache.deleteEach(
        cache.filter(function (value) {
            return date - value.date > maxDiff;
        }).map(function (value) {
            return value.conversationId;
        })
    );
}, ONE_HOUR, ONE_MONTH);

module.exports = cache;
