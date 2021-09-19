const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    let NoChannelEmbed = new Discord.MessageEmbed()
    .setTitle('**' + message.author.tag + ' | SetWelcome**')
    .setDescription('**<:AdexN:778336481998798890> | Veuillez mentioner un salon !**')
    .setColor(client.color)
    .setFooter(client.footer)

    let NoPermission = new Discord.MessageEmbed()
    .setTitle('**' + message.author.tag + ' | Goodbye Command**')
    .setDescription('**<:openhand:832399602807865379> | Vous n\'avez pas la bonne permission !**')
    .setColor(client.color)
    .setFooter(client.footer)

    let NoMessage = new Discord.MessageEmbed()
    .setTitle('**' + message.author.tag + ' | Goodbye Command**')
    .setDescription('**<:AdexN:778336481998798890> | Veuillez mettre un message ! | Utilisation : `{member}` (Mention) | `{member.name}` (Pseudo) | `{member.id}` (Id du membre) \n `{server}` (Nom du serveur) | `{server.membercount}` (Nombre de membres)**')
    .setColor(client.color)
    .setFooter(client.footer)

    if(!message.guild.member(message.author).hasPermission('MANAGE_SERVER')) return message.channel.send(NoPermission);

    let ChannelCommand = message.mentions.channels.first();
    if(!ChannelCommand) return message.channel.send(NoChannelEmbed);

    let MessageCommand = args.slice(1).join(" ");
    if(!MessageCommand) return message.channel.send(NoMessage);

    client.db.set(`GoodByeMessage_${message.guild.id}`, MessageCommand)
    client.db.set(`GoodByeChannel_${message.guild.id}`, ChannelCommand)

};

module.exports.help = {
    name:'goodbye',
    description:'Définir le salon et le message pour le membres qui quittent',
    category:'Config',
    aliases:false,
    cooldown:3,
    permissions:'MANAGE_SERVER'
}