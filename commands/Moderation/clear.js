const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    let permissioncmd = "MANAGE_MESSAGES";

    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send(`**<:openhand:832399602807865379> | You don't have the good permission for this command!**`);
    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`**<:openhand:832399602807865379> | I don't have the good permission for this command!**`)

if(!args[0]) return message.channel.send(`**<:AdexN:778336481998798890> | You have to tell the number of the messages you wan't to delete !**`);

if(isNaN(args[0])) return message.channel.send(`**<:AdexN:778336481998798890> | Please tell a vlid number!**`);

if(args[0] === "0") return message.channel.send("**<:AdexN:778336481998798890> | I can't delete 0 messages!**");

message.channel.bulkDelete(args[0]);

    message.channel.send('**<:AdexY:778336447471812638> | I deleted '+ args[0] +' messages!**').then(m => m.delete({timeout: 7500}));

};

module.exports.help = {
    name: "clear",
    description:"Delete the numbers of messages you want",
    usage:"{{prefix}}clear <number>",
    aliases:false,
    category:"Moderation",
    permissions:"MANAGE_MESSAGES",
    cooldown:3
};