const Discord = require('discord.js');
module.exports = {
    name: "av",
    description: "Displays avatar of bot.",
    aliases: ["bot"],
    cooldown: 0,
    execute(msg, arguments, bot){
        const user = msg.mentions.users.first() || bot.user;
        const reply = new Discord.RichEmbed()
                    .setAuthor(user.username, user.displayAvatarURL)
                    .setImage(user.displayAvatarURL);
        msg.channel.send(reply);
    }
}