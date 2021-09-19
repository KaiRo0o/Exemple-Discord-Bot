const Discord = require('discord.js');
const ms = require('ms');
const moment = require('moment');

module.exports.run = async(client, message, args) => {

    guild = message.guild;
    
    let botCount = 0;
    let created_date = guild.createdAt;
    let verification_level = guild.verificationLevel;
    let vanityUrl = guild.vanityURLCode || "**There is no vanity Url on this server**";
    let partenaire = guild.partenered ? "**Yes**" : "**No**";
    let region = guild.region;
    let dnd = 0;
    let afk = 0;
    let offline = 0;
    let streamer = 0;
    let online = 0;

    if(region === "eu-central"){
        region = 'Eu-Central';
        };
        if(region === "eu-west"){
        region = 'Eu-West';
        };
        if(region === "brazil"){
        region = 'Brazil';
        };
        if(region === "hongkong"){
        region = 'Hongkong';
        };
        if(region === "japan"){
        region = 'Japan';
        };
        if(region === "russia"){
        region = 'Russia';
        };
        if(region === "singapore"){
        region = 'Singapore';
        };
        if(region === "southafrica"){
        region = 'South Africa';
        };
        if(region === "sydney"){
        region = 'Syndey';
        };
        if(region === "us-east"){
        region = 'Us-East';
        };
        if(region === "us-south"){
        region = 'Us-South';
        };
        if(region === "us-central"){
        region = 'Us-Central';
        };
        if(region === "us-west"){
        region = 'Us-West';
        };

    guild.members.cache.forEach(member => {
        if(member.user.bot) botCount++;
        if(member.presence.status === "dnd") dnd++;
            if(member.presence.status === "idle") afk++;
            if(member.presence.status === "offline") offline++;
            if(member.presence.status === "streamer") streamer++;
            if(member.presence.status === "online") online++;
    });

    let Embed = new Discord.MessageEmbed()
    .setTitle('**Informations of '+ guild.name +'**')
    .addField('**<:id2:834962458711687178> ID**', '**'+guild.id+'**')
    .addField('**<:name:834963804689268776> Nom**', '**'+ guild.name +'**')
    .addField('**<:creation:834973975867293697> Création**', '**The creation of the server is the '+moment.utc(created_date).format("DD/MM/YYYY") +'**')
    .addField('**<:owner:834979733715550308> Propriétaire**', '**'+ guild.owner.user.tag +' '+ guild.ownerID+'**')
    .addField('**<:warning2:834980774674825226> Niveau de vérification**', '**' + verification_level + '**')
    .addField('**<:partenered:834984277941813289> Partenaire avec discord**', '**' + partenaire + '**')
    .addField('**<:region2:834985546735812618> Région**', '**' + region + '**')
    .addField('**<:boost:834970848564871188> Boosts**', '**'+ guild.premiumSubscriptionCount+' [ Tier '+ guild.premiumTier +' ]**')
    .addField('**<:VanityUrl:834982318200193025> URL Personnalisée**', '' + vanityUrl + '')
    .addField('**<:users:834971919043526717> Users**', ''+guild.memberCount+'')
    .addField('**<:bots:834973282884649040> Bots**', ''+botCount+'')
    .addField('**<:Afk:837770562687860768> Salon AFK**', '**' + afkChannel.name + '**')
    .addField("**<:status:834978950509756436> | Status**", '**\n<:online:834977874393038888> Online :**' + online + '**\n<:dnd:834977802259267594> Do not disturb :**' + dnd + '**\n<:idle:834977681350197258> Afk/Idle :**' + afk + '**\n<:offline:834977728020086794> Offline :**' + offline)
    .setThumbnail(guild.iconURL({dynamic: true}))
    .setColor(client.color)
    .setFooter(client.config.footer)

    message.channel.send(Embed)

};

module.exports.help = {
    name:'serverinfo',
    description:'Know the informations of the server you are on',
    aliases:("si"),
    usage:"{{prefix}}serverinfo",
    category:'Misc',
    cooldown:5,
    permissions:false
};