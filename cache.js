const NodeCache = require('node-cache')

module.exports = function(ttl = 100, checkPeriod = 120) {
	return new NodeCache({
		stdTTL: ttl,
		checkperiod: checkPeriod
	})
}
