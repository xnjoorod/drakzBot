module.exports.run = async (bot, message) => {
	const m = await message.reply('ping?')
	m.edit(
		`pong a ${m.createdTimestamp -
			message.createdTimestamp}ms. - API: ${Math.round(
			bot.ping
		)}ms`
	)
}

module.exports.config = {
	command: 'ping',
	description: "Let's play ping-pong?"
}
