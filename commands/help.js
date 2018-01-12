const Discord = require("discord.js");
let config = require('../config.json');

module.exports.run = async (bot, message, args) => {
    var msg = message.content.toLowerCase();
    if (msg === 'd!ajuda' || msg === 'd!help') {
        const embed = new Discord.RichEmbed()
            .setTitle("drakzBot - Help")
            .setDescription("You can check what commands I can do below!")
            .setColor(10038562)
            .setFooter('João Rodrigues © 2018');

        bot.commands.forEach((command) => {
            if (command.config.alias)
                if (command.config.description)
                    embed.addField(config.command_prefix + command.config.command + " // " + config.command_prefix + command.config.alias, command.config.description)
                else
                    embed.addField(config.command_prefix + command.config.command + " // " + config.command_prefix + command.config.alias, "-")
            else if (command.config.description)
                embed.addField(config.command_prefix + command.config.command, command.config.description)
            else
                embed.addField(config.command_prefix + command.config.command, "-")
        });

        message.channel.send({embed});
    }
}

module.exports.config = {
    command: "help",
    alias: "ajuda",
    description: "Get general help for the commands you can issue."
}
