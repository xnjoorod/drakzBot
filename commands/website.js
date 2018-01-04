module.exports.run = async (bot, message, args) => {
  var msg = message.content.toLowerCase();
  if(msg === 'd!site' || msg === 'd!website'){
    message.reply('pode encontrar o website do drakz em http://www.drakz.pt !');
  }
}

module.exports.config = {
  command: "website",
  alias: "site"
}
