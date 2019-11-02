const Discord = require('discord.js');
const fs = require('fs');

const bot  = new Discord.Client();
const {PREFIX, token} = require('./config.json');

const cooldowns = new Discord.Collection();
const client = new Discord.Client();
//Will add commands to this from the commands folder
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    //Makes it so that you can access command object by passing in name
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

bot.on('ready', () =>{
    console.log('This bot is online');
})

bot.on('message', msg => {
    //If the message sender is a bot, or if the message does not start with
    //prefix, return. Also return if message is not in a guild
    if(msg.author.bot || !msg.content.startsWith(PREFIX) || !msg.guild) return;

    const arguments = msg.content.slice(PREFIX.length).split(/ +/);
    const commandName = arguments[0];
    
    //Find the command from the command list
    const command = client.commands.get(commandName) 
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    //If command doesn't exist, return
    if(!command) return;

    //Cooldown logic START
    if(!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 0) * 1000;

    if (timestamps.has(msg.author.id)) {
        const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return msg.reply(`please wait ${Math.round(timeLeft.toFixed(1))} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }
    timestamps.set(msg.author.id, now);
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
    //Cooldown logic END
    try{
        command.execute(msg, arguments, bot);
    }catch{
        console.error;
    }
})

bot.login(token);