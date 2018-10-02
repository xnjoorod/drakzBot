const fs = require('fs')

module.exports = () => {
	const isProduction =
		process.env.hasOwnProperty('BOT_TOKEN') &&
		process.env.hasOwnProperty('TWITCH_CLIENT_ID')
	const authExists = fs.existsSync('./auth.json')

	var token, twitchClientID
	if (isProduction) {
		token = process.env.BOT_TOKEN
		twitchClientID = process.env.TWITCH_CLIENT_ID
	} else if (authExists) {
		const auth = require('./auth.json')
		token = auth.token
		twitchClientID = auth.twitch_clientId
	} else {
		throw Exception('Could not find auth credentials')
	}

	return {
		token: token,
		twitch_clientId: twitchClientID
	}
}
