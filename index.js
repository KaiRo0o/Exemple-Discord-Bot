// Modules //

const Discord = require('discord.js');
const Config = require('./config.json');
const db = require('quick.db');
const fs = require('fs');
const message = require('./Events/message');

// Clients //

const Client = new Discord.Client({intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_MEMBERS // Optional, for better performance
]});

Client.commands = new Discord.Collection();
Client.aliases = new Discord.Collection();
["cooldowns"].forEach(x => Client[x] = new Discord.Collection());
Client.config = Config;
Client.db = db;
Client.defaultPrefix = Config.prefix;
Client.color = '#666666';
Client.footer = Client.config.footer;

const { GiveawaysManager } = require('discord-giveaways');
Client.giveawaysManager = new GiveawaysManager(Client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});
// We now have a client.giveawaysManager property to manage our giveaways!


Client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    member.send(`Vous participez maintenant au giveaway : <#${giveaway.messageID}> (${reaction.emoji.name})`);
});

Client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    member.send(`Vous ne participez plus au giveaway.. <#${giveaway.messageID}> (${reaction.emoji.name})`);
});


// Handler //

const loadCommands = () => {
const commandFolders = fs.readdirSync("./commands/");

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const commande = require(`./commands/${folder}/${file}`);
        Client.commands.set(commande.help.name, commande);
        Client.aliases.set(commande.help.aliases, commande);
    }
}
console.log(`${Client.commands.size} Commandes chargées`); 
}
loadCommands();

fs.readdir('./Events/', (error, f) => {
    if (error) { return console.error(error); }
        console.log(`${f.length} events chargés`);

        f.forEach((f) => {
            let events = require(`./Events/${f}`);
            let event = f.split('.')[0];
            Client.on(event, events.bind(null, Client));
        });
});

// Login //

Client.login(Client.config.token);