const Discord = require('discord.js');
const ms = require('ms')

module.exports.run = async(client, message, args) => {


    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: You need to have the manage messages permissions to start giveaways.');
    }

    // Giveaway channel
    let giveawayChannel = message.mentions.channels.first();
    // If no channel is mentionned
    if(!giveawayChannel){
        return message.channel.send('** :x: | Vous devez spécifier un salon valide**');
    }

    // Giveaway duration
    let giveawayDuration = args[1];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send('**:x: | Vous devez spécifier un temps valide !**');
    }

    // Number of winners
    let giveawayNumberWinners = args[2];
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send('**:x: | Veuillez spécifier un nombre de gagnants !**');
    }

    // Giveaway prize
    let giveawayPrize = args.slice(3).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
        return message.channel.send('**:x: | Vous devez spécifier un prix valide !**');
    }

    // Start the giveaway
    client.giveawaysManager.start(giveawayChannel, {
        // The giveaway duration
        time: ms(giveawayDuration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: parseInt(giveawayNumberWinners),
        // Who hosts this giveaway
        hostedBy: client.config.hostedBy ? message.author : null,
        // Messages
        messages: {
            giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **UN GIVEAWAY A APPARU !** 🎉🎉",
            giveawayEnded: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **UN GIVEAWAY A DISPARU !** 🎉🎉",
            timeRemaining: "Temprs restant : **{duration}**!",
            inviteToParticipate: "Réagir avec 🎉 pour participer !",
            winMessage: "Bravo, {winners}! Vous avez gagner **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway annulé.. Pas assez de participants.",
            hostedBy: "Créé par {user}",
            winners: "winner(s)",
            endedAt: "Fini a",
            units: {
                seconds: "secondes",
                minutes: "minutes",
                hours: "heures",
                days: "jours",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });

    message.channel.send(`Le giveaway a commencé dans ${giveawayChannel}!`);


}

module.exports.help = {
    name:'create-giveaway',
    description:'Créer un giveaway',
    category:'Giveaways',
    aliases:false,
    usage:'{{prefix}}create-giveaway <time> <winners> <price>',
    cooldown:3,
    permissions:'MANAGE_SERVER or Giveaway role'
}