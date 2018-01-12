const Discord = require("discord.js");
var urban = require("urban");

module.exports.run = async (bot, message, args) => {
    word = urban(args[0]);
    word.first(function (json) {
        if (typeof json !== 'undefined') {
            const embed = new Discord.RichEmbed()
                .setTitle("Urban Dictionary - Entry for " + args[0])
                .setDescription(json.definition)
                .setURL(json.permalink)
                .setColor(3447003)
                .setFooter('Powered by Urban Dictionary - João Rodrigues © 2018')
            message.channel.send({embed});
        } else {
            message.channel.send("Esta palavra não está no Urban Dictionary. Tente novamente mais tarde.");
        }
    });
}

module.exports.config = {
    command: "urban",
    alias: "urbandictionary",
    description: "Know now the meaning of a word on Urban Dictionary!"
}
