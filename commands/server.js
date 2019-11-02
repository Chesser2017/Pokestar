module.exports = {
    name: "server",
    description: "Gives a server invite.",
    aliases: ['guild'],
    cooldown: 20,
    execute(msg, arguments, bot){
        return msg.channel.send('https://discord.gg/ENdcrn4');
    }
}