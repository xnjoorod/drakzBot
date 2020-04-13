const Discord = require('discord.js')
const api = 'http://random.dog/woof.json?filter=mp4,webm'
const fetch = require('node-fetch')

module.exports.run = async (bot, message) => {
	fetch(api, {method:'GET'}).then(r => {
		const embed = new Discord.MessageEmbed()
			.setImage(r.body.url)
			.setFooter('Olha um cão aleatório só para ti!')
		message.channel.send({embed}).catch((error) => { message.channel.send(`Ocorreu um erro: ${error}`); });
	})
}

module.exports.config = {
	command: 'dog',
	alias: 'cão',
	description: "Type this and I'll offer you a free dog!"
}
