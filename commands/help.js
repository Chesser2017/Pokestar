const Discord = require('discord.js');
const fs = require('fs');
const {PREFIX} = require('../config.json');

const files = new Discord.Collection(); 

//Sets command objects inside of files 
const commandFiles = fs.readdirSync('./commands')
.filter(file => file.endsWith('.js') && !file.startsWith('help'));

for(const file of commandFiles){
    const command = require(`./${file}`);
    files.set(command.name, command);
}

module.exports = {
    name: "help",
    aliases: ['commands', 'cmds', 'h'],
    cooldown: 15,
    execute(msg, arguments, bot){

        const commands = new Discord.RichEmbed()
            .setAuthor(bot.user.username, bot.user.displayAvatarURL)
            .setColor(`#FFD700`)    
            .setTitle(`Commands`);

        for(let command of files){

            let name = command[1].name;
            let description = command[1].description;
            let aliases = command[1].aliases || `none`;

            commands.addField(`**Name**: ${PREFIX}${name}  [${aliases}]`,
                            `**Description**: ${description}`,
                            false);
        }
        msg.channel.send(commands);
    }
}