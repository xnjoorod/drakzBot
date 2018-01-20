const math = require('mathjs')

module.exports.run = async (bot, message, args) => {
	try {
		message.reply(math.eval(args.join('')))
	} catch (e) {
		message.reply('não consegui fazer essa conta difícil.')
	}
}

module.exports.config = {
	command: 'c',
	alias: 'calc',
	description:
		'Efetua qualquer tipo de cálculos que desejares! Eu sei matemática avançada!'
}
