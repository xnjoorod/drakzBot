const auth = require('./auth.json');

module.exports = () => {

    const isProduction = process.env.hasOwnProperty('BOT_TOKEN')
        && process.env.hasOwnProperty('TWITCH_CLIENT_ID')

    return {
        token: isProduction ? process.env.BOT_TOKEN : auth.token,
        twitch_clientId: isProduction ? process.env.TWITCH_CLIENT_ID : auth.twitch_clientId
    }
}