const Discord = require("discord.js")

module.exports.run = async(client, message, args) => {

    let Prefix = client.db.fetch(`PrefixCommand_${message.guild.id}`);
    if(!Prefix) {
        Prefix = client.defaultPrefix;
    };

    let ConfigEmbed = new Discord.MessageEmbed()
    .setTitle(`Configuration of | \`${message.guild.name}\``)
    .addField("Prefix", (Prefix || client.defaultPrefix))
    .setColor(client.color)
    .setFooter(client.footer)

    message.channel.send(ConfigEmbed);
};

module.exports.help = {
    name:'config',
    description:'Know the configuration of the server',
    category:'Config',
    aliases:false,
    cooldown:3,
    permissions:'MANAGE_SERVER'
};