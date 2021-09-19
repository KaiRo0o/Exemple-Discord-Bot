const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('Permission')) return message.channel.send('**<:openhand:832399602807865379> | Vous n\'avez pas la bonne permission pour utiliser cette commande!**');

    // CODE //

};

module.exports.help = {
    name:'name',
    description:'description',
    category:'category',
    aliases:('aliases', 'aliases'),
    usage:'{{prefix}}command',
    cooldown:cooldown,
    permissions:'Permissions'
}