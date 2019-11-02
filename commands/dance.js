module.exports = {
    name: "dance",
    description: "Dance!",
    aliases: [],
    cooldown: 10,
    execute(msg, arguments, bot){
        return msg.channel.send('https://tenor.com/view/dance-dancing-happy-party-gif-5095868');
    }
}