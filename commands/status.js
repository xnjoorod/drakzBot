var packageJson = require('../package.json')

module.exports.run = async (bot, message) => {
	var date = new Date()
	message.reply('estou ligado há ' + process.uptime() + ' segundos :P')
	message.channel.send(
		'Hoje é dia ' +
			date.getDate() +
			'-' +
			(date.getMonth() + 1) +
			'-' +
			date.getFullYear() +
			' e são ' +
			date.getHours() +
			':' +
			date.getMinutes() +
			':' +
			date.getSeconds() +
			'.'
	)
	message.channel.send(
		'Estou a correr o Ubuntu 17.04 (LXSS) e estou na versão ' + packageJson.version
	)
}

module.exports.config = {
	command: 'status',
	alias: 'estado',
	description: 'Get to know more about my mentally virtual status!'
}
