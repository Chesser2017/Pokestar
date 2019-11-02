const Discord = require('discord.js');
module.exports = {
    name: "av",
    description: "Displays avatar of bot.",
    aliases: ["bot"],
    cooldown: 0,
    execute(msg, arguments, bot){
        const reply = new Discord.RichEmbed()
                    .setAuthor(bot.user.username, bot.user.displayAvatarURL)
                    .setImage(bot.user.displayAvatarURL);
        msg.channel.send(reply);
    }
}