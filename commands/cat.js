const Discord = require('discord.js')
const api = 'http://aws.random.cat/meow'
const fetch = require('node-fetch')

module.exports.run = async (bot, message) => {
	fetch(api, {method:'GET'}).then(r => {
		const embed = new Discord.MessageEmbed()
			.setImage(r.body.file)
			.setFooter('Olha um gato aleatório só para ti!')
		message.channel.send({embed}).catch((error) => { message.channel.send(`Ocorreu um erro: ${error}`); });
	})
}

module.exports.config = {
	command: 'cat',
	alias: 'gato',
	description: "Type this and I'll offer you a free cat!"
}
