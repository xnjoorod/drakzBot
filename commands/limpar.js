module.exports.run = async (bot, message, args) => {
  async function limpar() {
    message.delete();
    if(!message.member.roles.find("name","bots") && (!message.member.roles.find("name","moderators") && !message.member.roles.find("name","ADMIN"))) {
      message.channel.send('Privilégios insuficientes.');
      return;
    }

    if(isNaN(args[0])) {
      message.channel.send('Usa um número nos argumentos. \n Uso: d!limpar <num>');
      return;
    }

    const fetched = await message.channel.fetchMessages({limit: args[0]});
    console.log(fetched.size + ' mensagens encontradas a apagar');

    message.channel.bulkDelete(fetched)
      .catch(error => message.channel.send('Error: ${error}'));
  }

  limpar();
}

module.exports.config = {
  command: "limpar",
  alias: "clear"
}
