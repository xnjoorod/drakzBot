const Discord = require("discord.js");
const https = require('https');
let fs = require('fs');
let auth = require('./auth.json');
let config = require('./config.json');

let streamerName = ['pedropcruz', 'drakzOfficial', 'ExilePT'];
let live = {'pedropcruz':0, 'drakzOfficial':0, 'ExilePT':0};
let streamerMessage = [];

let bot = new Discord.Client();
let NOTIFY_CHANNEL;

bot.commands = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
  if(err) console.error(err);

  let jsfiles = files.filter(f => f.split('.').pop() === 'js');
  if (jsfiles.length <= 0) { return console.log("0 commands loaded.") }
  else { console.log(jsfiles.length + " commands loaded.") }

  jsfiles.forEach((f, i) => {
    let cmds = require(`./commands/${f}`);
    console.log(`Command ${f} loaded.`);
    bot.commands.set(cmds.config.command, cmds);
    if(cmds.config.alias){ bot.commands.set(cmds.config.alias, cmds); }
  });
});

bot.login(auth.token);

bot.on('ready', () => {
  console.log(`Connected!\nLogged in as ${bot.user.tag}!`);
  bot.user.setGame("www.drakz.pt");
  // Check if Twitch channels are online.
  if(config.twitch_enabled && auth.twitch_clientId !== '' && config.channel_announces !== 0){
    NOTIFY_CHANNEL = bot.channels.find('id', config.channel_announces);
    setInterval (checkTwitchStreams, config.twitch_checktime * 1000);
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

function checkTwitchStreams() {
  streamerName.forEach((name) => {
    https.get('https://api.twitch.tv/kraken/streams/' + name + '?client_id=' + auth.twitch_clientId, function(res) {
      let body = '';

      res.on('data', function(chunk) {
        body += chunk;
      });

      res.on('end', function() {
        let result = JSON.parse(body)
        if(result.stream !== null){
          if(live[name] == 0){
            const embed = new Discord.RichEmbed()
              .setTitle("O streamer " + result.stream.channel.display_name + " acabou de entrar em direto na Twitch!")
              .setDescription("Acompanha já a transmissão em direto!")
              .setThumbnail(result.stream.preview.small)
              .addField("Título", result.stream.channel.status, true)
              .addField("Viewers: ", result.stream.viewers, true)
              .setURL("https://www.twitch.tv/" + result.stream.channel.display_name)
              .setColor("#6034b1")
              .setFooter('João Rodrigues © 2018');
            NOTIFY_CHANNEL.send({embed});
            live[name] = 1;
          }else{
            //todo: remove message if user sets offline
          }
        }
      });
    }).on('error', function(e) {
      console.log("Erro: " + e.message);
    });
  });
}
