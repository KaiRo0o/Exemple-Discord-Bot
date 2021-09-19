const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) return message.channel.send('**<:openhand:832399602807865379> | You don\'t have the good permission to execute this command !**');

    let argu = args.join(' ');

    if(!argu) return message.channel.send('**<:AdexN:778336481998798890> | Please say a message!**');

    if(["@everyone", "@here"].some(ping => argu.includes(ping))) return message.channel.send('**<:openhand:832399602807865379> | You can\'t mentions here or everyone in the command!**');

    message.delete();

    message.channel.send(argu);



};

module.exports.help = {
    name:'say',
    description:'Say you want from the bot',
    usage:'{{prefix}}say <message>',
    category:'Misc',
    aliases:false,
    cooldown:3,
    permissions:'MANAGE_MESSAGES'
}