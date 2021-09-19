const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) return message.channel.send('**<:openhand:832399602807865379> | You don\'t have the good permission to execute this command !**');

    let Member = message.mentions.users.first() || client.users.cache.get(args[0]);

    if(!Member) return message.channel.send('**<:AdexN:778336481998798890> | Please mention a user or put the id of the user**');

    if(!Member.bannable) return message.channel.send('**<:AdexN:778336481998798890> | This user can\'t be banned !**');

    Member.ban(message.channel.send('**<:BanHammer:832401317720490035> | The user '+ Member.tag +' is now banned !**'))

};

module.exports.help = {
    name:'ban',
    description:"Ban someone",
    usage:'{{prefix}}ban <user>',
    aliases:false,
    category:"Moderation",
    permissions:'BAN_MEMBERS',
    cooldown:3
}