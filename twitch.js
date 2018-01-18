const Discord = require('discord.js')
const https = require('https')

function checkTwitchStreams(
	streamers,
	channel,
	liveStatus,
	clientId
) {
	streamers.forEach(name => {
		https
			.get(
				`https://api.twitch.tv/kraken/streams/${name}?client_id=${clientId}`,
				res => {
					res.on('data', chunk => {
						let result
						try {
							result = JSON.parse(chunk)
						} catch (e) {
							result = false
							console.log(e)
						}

						if (result) {
							if (result.stream !== null) {
								if (liveStatus[name] === 0) {
									if (
										result.stream.channel.display_name !==
										null
									) {
										const embed = new Discord.RichEmbed()
											.setTitle(
												'O streamer ' +
													result.stream.channel
														.display_name +
													' acabou de entrar em direto na Twitch!'
											)
											.setDescription(
												'Acompanha já a transmissão em direto!'
											)
											.setThumbnail(
												result.stream.preview.small
											)
											.addField(
												'Título',
												result.stream.channel.status,
												true
											)
											.addField(
												'Viewers: ',
												result.stream.viewers,
												true
											)
											.setURL(
												'https://www.twitch.tv/' +
													result.stream.channel.display_name
											)
											.setColor('#6034b1')
											.setFooter('João Rodrigues © 2018')
										channel.send({embed})
										liveStatus[name] = 1
										return liveStatus
									}
								}
							}
						}
					})
				}
			)
			.on('error', e => console.log('Erro: ', e.message))
	})
	return liveStatus
}

module.exports.checkTwitchStreams = checkTwitchStreams
