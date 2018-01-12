const Discord = require("discord.js");
const api = "http://random.dog/woof.json?filter=mp4,webm";
const snekfetch = require("snekfetch");

module.exports.run = async (bot, message, args) => {
    snekfetch.get(api).then(r => {
        const embed = new Discord.RichEmbed()
            .setImage(r.body.url)
            .setFooter('Olha um cão aleatório só para ti!')
        message.channel.send({embed});
    });
}

module.exports.config = {
    command: "dog",
    alias: "cão",
    description: "Type this and I'll offer you a free dog!"
}
