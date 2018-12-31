const Discord = require("discord.js")

const client = new Discord.Client();

const auth = require("./resources/auth.json");


client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    send("Hi! To interact with me, use '" + client.prefix + "' or just @ me!");
});


client.on("message", (message) => {
    // has to invoke the bot using it's prefix + bot's own message
    if (!message.content.startsWith(auth.prefix) || message.author.bot) return;

    const args = message.content.slice(auth.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    console.log(args);
    console.log(command);

    if (command == "test"){
        message.channel.send("This is a test!");
        message.channel.send("This is a voice test", tts = true);
    }
});

client.login(auth.token);

// TODO: create command hierarchy/structure