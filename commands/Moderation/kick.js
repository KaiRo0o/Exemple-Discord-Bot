const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You cannot kick members')

    let member = message.mentions.members.first()
    if (!member) return message.reply('Please specify a member for me to kick them')
    let reason = args.slice(1).join(" ");
    if (!reason) reason = 'No Reason Given';
    if (!member.kickable) return message.reply('This member is not kickable')

    member.kick(reason).catch(err => console.log(err));

};

module.exports.help = {
    name:'kick',
    description:"Kick someone",
    usage:'{{prefix}}kick <user>',
    aliases:false,
    category:"Moderation",
    permissions:'KICK_MEMBERS',
    cooldown:3
}