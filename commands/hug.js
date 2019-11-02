module.exports = {
    name: "hug",
    description: "Gives a hug!",
    aliases: ['embrace'],
    cooldown: 5,
    execute(msg, arguments, bot){
        return msg.channel.send('https://tenor.com/view/milk-and-mocha-hug-cute-kawaii-love-gif-12535134');
    }
}