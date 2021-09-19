const Discord = require('discord.js');
const {readdirSync} = require('fs');
const categoryList = readdirSync('./commands');

module.exports.run = async(client, message, args) => {

    let Prefix = client.db.fetch(`PrefixCommand_${message.guild.id}`);
if(!Prefix) {
    Prefix = client.defaultPrefix;
};

    let Embed = new Discord.MessageEmbed()
    .setColor(client.color)
    .setFooter(client.footer)
    .addField('**Here is the list of Flareon\'s commands**', `**The prefix on the server ${message.guild.name} [${message.guild.id}] is ${client.config.prefix}**`)

    for (const cat of categoryList) {
        const cmd = client.commands.filter(command => command.help.category === `${cat}`).map((c) => c.help.name).join(' ┆ ');
    Embed.addField(cat, cmd)};
    
    if(!args[0]) return message.channel.send(Embed)
    if(args[0]) {
        let command = args[0];

        if(client.commands.has(command)) {
            
            command = client.commands.get(command);
            var embed2 = new Discord.MessageEmbed()
            .setTitle(`**Command ${command.help.name}**`)
            .setDescription(`
            __**Informations**__
            **Name** : ${command.help.name}
            **Aliases** : ${command.help.aliases || "No aliases defined"}
            **Description** : ${command.help.description || "No description defined"}
            **Use** : ${command.help.usage.replace('{{prefix}}', Prefix || client.config.prefix) || "No use defined"}
            **Cooldown** : ${command.help.cooldown + "seconds" || "No cooldown defined"}
            **Permission** : ${command.help.permissions || "Permissions not defined"}`)
            .setColor(client.color)
            .setFooter(client.footer)

        message.channel.send(embed2);
}
}
}

module.exports.help = {
    name:"help",
    description:"Know Flareon's commands",
    usage:'{{prefix}}help <command_name>',
    aliases:'h',
    category:"Misc",
    cooldown:3
};