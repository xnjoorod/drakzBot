const Discord = require('discord.js'),
	https = require('https'),
	logger = require('./logger.js')()

const {
	STREAMER_LIVE,
	STREAMER_NOT_LIVE
} = require('./constants')

module.exports.renderLiveStreams = renderLiveStreams

function render(channel, stream) {
	// TODO: the following constants need
	// to be refactored into localizable strings

	const title = `O streamer ${
		stream.channel.display_name
	} acabou de entrar em direto na Twitch!`

	const description =
		'Acompanha já a transmissão em direto!'

	const url = `https://www.twitch.tv/${
		stream.channel.display_name
	}`

	const titleField = 'Título'
	const viewersField = 'Viewers: '

	const embed = new Discord.RichEmbed()
		.setTitle(title)
		.setDescription(description)
		.setThumbnail(stream.preview.small)
		.addField(titleField, stream.channel.status, true)
		.addField(viewersField, stream.viewers, true)
		.setURL(url)
		.setColor('#6034b1')
		.setFooter('João Rodrigues © 2018')

	channel.send({embed})
}

function renderLiveStreams(
	clientId,
	channel,
	cache,
	streamers
) {
	streamers.forEach(name => {
		const url = `https://api.twitch.tv/kraken/streams/${name}?client_id=${clientId}`
		https
			.get(url, res => {
				res.on('data', body => {
					const streamerStatus = cache.get(name)
					const payload = JSON.parse(body)
					const isLive =
						payload.stream &&
						payload.stream.channel.display_name &&
						streamerStatus === STREAMER_NOT_LIVE

					if (isLive) {
						cache.set(name, STREAMER_LIVE)
						render(channel, payload.stream)
						logger.debug(`Streamer ${name} is live`)
					} else if (streamerStatus !== STREAMER_NOT_LIVE) {
						cache.set(name, STREAMER_NOT_LIVE)
					}
				})
			})
			.on('error', err => parseError(err))
	})
}

function parseError(err) {
	logger.error('Error while using Twitch API:', err.message)
}
