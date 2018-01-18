module.exports.run = async (bot, message, args) => {
	async function purge() {
		message.delete()
		if (
			!message.member.roles.find('name', 'bots') &&
			(!message.member.roles.find('name', 'moderators') && !message.member.roles.find('name', 'ADMIN'))
		) {
			message.channel.send('Privilégios insuficientes.')
			return
		}

		if (isNaN(args[0])) {
			message.channel.send('Usa um número nos argumentos. \n Uso: d!limpar <num>')
			return
		}

		const fetched = await message.channel.fetchMessages({
			limit: args[0]
		})
		console.log(fetched.size + ' mensagens encontradas a apagar')

		message.channel.bulkDelete(fetched).catch(error => {
			message.channel.send(`Error: ${error}`)
		})
	}

	purge()
}

module.exports.config = {
	command: 'purge',
	alias: 'limpar',
	description: 'Este comando serve para limpar conteúdo do chat em **N** linhas'
}
