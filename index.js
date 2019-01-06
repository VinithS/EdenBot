const Discord = require("discord.js")
// const YouTube = require('simple-youtube-api');
// const YTDL = require('ytdl-core');

const auth = require("./resources/auth.json");
const config = require("./resources/config.json");
const list = require("./commands/command_list.json");

const client = new Discord.Client({ disableEveryone: true });
// const yTube = new YouTube(config.ytapi);

const queue = new Map();


let musicMode = false;

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

    if (musicMode){
        handleMusic(message);
        return;
    }
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
    else if (command == "summon"){
        let channel = message.member.voice.channel;
        if (channel == null){
            message.reply("Could not join. First join a channel and then summon me!");
            return;
        }
        channel.join()
        .then(connection => {
            console.log('connected!');
            message.channel.send(`Ready to groove ${message.author.username}!`);
            musicMode = true;
        }).catch();
    }
});

function handleMusic(message){
    let args = message.content.slice(auth.prefix.length).split(/ +/);
    let command = args.shift().toLowerCase();
    if(command == 'stop'){
        // no longer music mode
        musicMode = false;
        message.member.voice.channel.leave();
        message.channel.send(`Fun jam session :)`);
    }
}


client.login(auth.token);

// TODO: create command hierarchy/structure