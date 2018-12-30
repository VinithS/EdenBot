const Discord = require("discord.js")

const Client = new Discord.Client();

const config = require("./resources/config.json");

console.log(config);


Client.on("ready", () => {
    console.log("Bot online");
});
   
Client.on("message", (message) => {
    if (message.content.startsWith("ping")) {
        message.channel.send("pong!");
    }
});

Client.login(config.token);

// TODO: create command hierarchy/structure