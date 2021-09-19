const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    let User = message.mentions.members.first() || message.author;
    
    if(!args[0]){
        User = message.member;
      }
      if(!User && args[0]){
          User = message.guild.members.get(args[0]);
          if(!User) return message.channel.send();
      }

    let Embed = new Discord.MessageEmbed()
    .setTitle('**Informations of '+User.user.username+' **')
    .addField('**Name**', '**' + User.user.tag + '**')
    .addField('**ID**', '**' + User.id + '**')
    .addField('**Nitro**', ' ' + User.user.premiumType + '')
    .setColor(client.color)
    .setFooter(client.footer)

    message.channel.send(Embed);

};

module.exports.help = {
    name:'userinfo',
    description:'Find out the information of a user on the server',
    category:'Misc',
    aliases:('ui'),
    cooldown:5,
    permissions:false
};