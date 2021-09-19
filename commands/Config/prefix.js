const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {
    let EmbedPrefix = new Discord.MessageEmbed()
    .setTitle('**' + message.author.tag + ' | Prefix Command**')
    .setDescription('**<:AdexN:778336481998798890> | Veuillez mettre un préfixe**')

    if(!message.guild.member(message.author).hasPermission('MANAGE_SERVER')) return message.channel.send('**<:openhand:832399602807865379> | You don\'t have the good permission to execute this command !**');

    if(!args[0]) return message.channel.send(EmbedPrefix);

    if(args[0] === "default") {
        args[0] = client.defaultPrefix;
    };

    if(args[0].length > 5) return;

    client.db.set(`PrefixCommand_${message.guild.id}`, args[0]);

    let embed = new Discord.MessageEmbed()
    .setTitle('**' + message.author.tag + ' | Prefix Command**')
    .setDescription('**<:Change:837494522836811828> Le préfixe à été changé vers ' + args[0] + '**')

    message.channel.send(embed)

};

module.exports.help = {
    name:'prefix',
    description:'Set the prefix on the server',
    category:'Config',
    aliases:false,
    cooldown:5,
    permissions:'MANAGE_SERVER'
};