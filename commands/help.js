module.exports.run = async (bot, message, args) => {
  var msg = message.content.toLowerCase();
  if(msg === 'd!ajuda' || msg === 'd!help'){
    message.channel.send({embed: {
      color: 10038562,
      title: "Ajuda do drakzBot",
      url: "http://drakz.pt",
      description: "Podes verificar os comandos que posso realizar abaixo!",
      fields: [{
          name: "d!help // d!ajuda",
          value: "Obter ajuda geral para os comandos que podes fazer"
        },
        {
          name: "d!ping",
          value: "Vamos jogar ao ping pong?"
        },
        {
          name: "d!estado",
          value: "Sabe já um pouco mais sobre o meu estado mentalmente virtual!"
        },
        {
          name: "d!website // d!site",
          value: "Obtém já o endereço do meu website! http://www.drakz.pt \:P"
        },
        {
          name: "d!limpar *numlinhas* - MODS/ADMINS ONLY",
          value: "Este comando serve para limpar conteúdo do chat em **N** linhas"
        },
        {
          name: "d!meteo // d!weather",
          value: "Verifica já a meteorologia para o teu distrito!"
        },
        {
          name: "d!cat // d!gato",
          value: "Digita isto e eu ofereço te um gato gratuitamente!"
        },
        {
          name: "d!dog // d!cão",
          value: "Digita isto e eu ofereço te um cão gratuitamente!"
        },
        {
          name: "d!urban <palavra> // d!urbandictionary <palavra>",
          value: "Sabe já o significado de uma palavra no Urban Dictionary!"
        }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: bot.user.avatarURL,
        text: "João Rodrigues © 2018"
      }
    }});
    console.log(bot.commands);
  }
}

module.exports.config = {
  command: "help",
  alias: "ajuda",
  description: "Get general help for the commands you can issue."
}
