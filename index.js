const Discord = require("discord.js")

const client = new Discord.Client();

const auth = require("./resources/auth.json");
const config = require("./resources/config.json");
const list = require("./commands/command_list.json");

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// When joining a server for the first time, give a thank you message in the general channel
client.on("guildCreate", guild => {
    let channelID;
    let channels = guild.channels;

    channelLoop:
    for (let c of channels) {
        let channelType = c[1].type;
        if (channelType === "general") {
            channelID = c[0];
            break channelLoop;
        }
    }

    let channel = client.channels.get(guild.systemChannelID || channelID);
    channel.send(`That was a long trip to ${guild.name}, but fear not I am here!`);
    channel.send(`Use ${auth.prefix} to call on me.\n Use the ${config.commandList} to list all the commands.`)
});

client.on("message", (message) => {
    // has to invoke the bot using it's prefix + bot's own message
    if (!message.content.startsWith(auth.prefix) || message.author.bot) return;

    const args = message.content.slice(auth.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    console.log(args);
    console.log(command);

    // TODO: Make this more dynamic instead of sending multiple messages.
    if (command == config.commandList){
        for (c in list.commands){
            message.channel.send(auth.prefix + list.commands[c]);
        }
    }
    else if (command == "zach" || command == "zac"){
        message.channel.send("Is Zach a little bitch?",{
            tts: true
        });
        // pause
        message.channel.send("Yes, Zach is a little bitch.",{
            tts: true
        });
    }
});

client.login(auth.token);

// TODO: create command hierarchy/structure