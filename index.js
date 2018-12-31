const Discord = require("discord.js")

const client = new Discord.Client();

const auth = require("./resources/auth.json");


client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
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
    }

    if (command == "zach" || command == "zac"){
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