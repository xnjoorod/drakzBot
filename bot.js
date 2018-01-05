const Discord = require("discord.js");
let twitch = require('./twitch.js');
let fs = require('fs');
let auth = require('./auth.json');
let config = require('./config.json');

const SUPPORTED_STREAMERS = config.streamers;

let live = {
  pedropcruz: 0, 
  drakzOfficial: 0, 
  ExilePT:0
};

let bot = new Discord.Client();
bot.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
  if(err) console.error(err);

  let jsfiles = files.filter(f => f.split('.').pop() === 'js');
  if (jsfiles.length <= 0) { 
    return console.log("0 commands loaded.")
  } else { 
    console.log(jsfiles.length + " commands loaded.") 
  }

  jsfiles.forEach((f, i) => {
    let cmds = require(`./commands/${f}`);
    console.log(`Command ${f} loaded.`);
    bot.commands.set(cmds.config.command, cmds);
  });
});

bot.login(auth.token);
bot.on('ready', () => {
  console.log(`Connected!\nLogged in as ${bot.user.tag}!`);
  bot.user.setGame("www.drakz.pt");

  const twitchOnline = config.twitch_enabled && auth.twitch_clientId !== '';
  if(twitchOnline && config.channel_announces !== 0){
    const announce_channel = bot.channels.find('id', config.channel_announces);
    setInterval(
      () => { live = twitch.checkTwitchStreams(SUPPORTED_STREAMERS, announce_channel, live); }, 
      config.twitch_checktime * 1000
    );
  }
});

bot.on('message', message => {
  if(message.author.bot) return;

  let prefix = config.command_prefix;
  let sender = message.author;
  let msg = message.content.toLowerCase();
  let cont = message.content.slice(prefix.length).split(" ");
  let args = cont.slice(1);

  if (msg === 'poop') {
    message.channel.send("\:poop:")
  }

  if (msg.startsWith('hey drakzbot')) {
    message.reply('hey!');
  }

  if (!msg.startsWith(prefix)) return;

  let cmd = bot.commands.get(cont[0]);
  if(cmd) cmd.run(bot, message, args);
});
