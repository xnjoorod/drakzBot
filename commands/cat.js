const Discord = require('discord.js')
const api = 'http://random.cat/meow'
const snekfetch = require('snekfetch')

module.exports.run = async (bot, message) => {
	snekfetch.get(api).then(r => {
		const embed = new Discord.RichEmbed()
			.setImage(r.body.file)
			.setFooter('Olha um gato aleatório só para ti!')
		message.channel.send({embed})
	})
}

module.exports.config = {
	command: 'cat',
	alias: 'gato',
	description: "Type this and I'll offer you a free cat!"
}
