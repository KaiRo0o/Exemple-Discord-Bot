const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send('**<:openhand:832399602807865379> | You don\'t have the good permission to execute this command !**');

    let channel = message.mentions.channels.first();

    if(!channel) return message.channel.send('**<:AdexN:778336481998798890> | Veuillez mettre un salon !**')

};

module.exports.help = {
    name:'announcement',
    description:'Créer une annonce dans le salon que vous voulez',
    category:'category',
    aliases:false,
    cooldown:3,
    permissions:'MANAGE_GUILD'
}