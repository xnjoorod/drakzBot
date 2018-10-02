const Discord = require('discord.js'),
	twitch2 = require('./twitch.js'),
	fs = require('fs'),
	auth = require('./auth.js')(),
	config = require('./config.json'),
	logger = require('./logger.js')(),
	cache = require('./cache.js')(100, 10)

const {STREAMER_NOT_LIVE} = require('./constants')

// once key is expired set it to be 0 (not live)
cache.on('expired', function(key, value) {
	if (value !== STREAMER_NOT_LIVE) {
		cache.set(key, STREAMER_NOT_LIVE)
	}
})

config.streamers.forEach(streamer =>
	cache.set(streamer, STREAMER_NOT_LIVE)
)

let bot = new Discord.Client()
bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()

fs.readdir('./commands/', (err, files) => {
	if (err) {
		logger.error(err)
		return
	}

	let jsfiles = files.filter(
		f => f.split('.').pop() === 'js'
	)

	logger.debug(`${jsfiles.length} commands loaded`)
	if (jsfiles.length <= 0) {
		return
	}

	jsfiles.forEach(f => {
		let cmds = require(`./commands/${f}`)
		logger.debug(`Command ${f} loaded.`)
		bot.commands.set(cmds.config.command, cmds)
		bot.aliases.set(cmds.config.alias, cmds)
	})
})

bot.login(auth.token)

bot.on('ready', () => {
	logger.debug(`Logged in as ${bot.user.tag}!`)
	bot.user.setActivity('www.drakz.pt', { type: 'WATCHING' })
			.then(presence => console.log(`Atividade definida para ${presence.game ? presence.game.name : 'none'}`))
			.catch(console.error);

	const twitchOnline =
		config.twitch_enabled && auth.twitch_clientId !== ''
	if (twitchOnline && config.channel_announces !== 0) {
		const announce_channel = bot.channels.find(
			'id',
			config.channel_announces
		)

		// assign new function with already bound parameters
		let renderLiveStreams = twitch2.renderLiveStreams.bind(
			null,
			auth.twitch_clientId,
			announce_channel,
			cache,
			config.streamers
		)

		setInterval(
			renderLiveStreams,
			config.twitch_checktime * 1000
		)
	}
})

const prefix = config.command_prefix

bot.on('message', message => {
	if (message.author.bot) return

	let msg = message.content.toLowerCase()

	if (msg === 'poop') {
		message.channel.send(':poop:')
		return
	}

	if (msg.startsWith('hey drakzbot')) {
		message.reply('hey!')
		return
	}

	if (!msg.startsWith(prefix)) return

	let cont = message.content.slice(prefix.length).split(' ')
	let args = cont.slice(1)

	let cmd
	if (bot.commands.has(cont[0]))
		cmd = bot.commands.get(cont[0])
	else if (bot.aliases.has(cont[0]))
		cmd = bot.aliases.get(cont[0])

	if (cmd) cmd.run(bot, message, args)
})
