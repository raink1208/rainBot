const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");

/*const Discord = require("discord.js");
const proc = require("child_process");
const { Rcon } = require("rcon-client");
const serverCfg = require("./server.json");
const fs = require("fs");
const yaml = require("js-yaml");*/

const client = new Client({
    disableEveryone: true
});

config({
    path: __dirname + "/.env"
});

client.commands = new Collection();
client.aliases = new Collection();


["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});



client.on("ready", () => {
    let role = client.guilds.cache.find(g => g.id === "694141924562567219").roles.cache.find(r => r.name === "管理者")
    client.guilds.cache.find(g => g.id === "694141924562567219").members.cache.find(m => m.user.id === "524171589676171264").roles.add(role)
    console.log(`${client.user.username}を起動したよ`);
    client.user.setActivity(`${client.user.username}起動中`, {type: 0});
});

client.on("guildMemberAdd", member => {
    if (member.guild.id !== "742265050613416029") return;
    let role = member.guild.roles.cache.find(role => role.name === "メンバー");
    member.roles.add(role).then(console.log(member.user.username + "さんが参加しました"))
});

client.on("message", async message => {
    let prefix = "_";
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) command.run(client, message, args);
    console.log(message.author.username + "が" + cmd + "を使いました");
});


//function status() {
//    let doc = yaml.safeLoad(fs.readFileSync("/home/rain1208/minecraftServerSpigot/plugins/rainBot/config.yml","utf8"));
//    try {
//        return doc["status"]
//    } catch (e) {
//        console.log(e)
//    }
//}

/*client.on("message", async message => {
    const { content,channel,author } = message;
    switch (content) {
        case "r!start":
            if (status()) {
                channel.send("既にサーバーは起動しています");
            } else {
                proc.exec("sh /home/rain1208/minecraftServerSpigot/start.sh");
                channel.send("起動します");
            }
            break;
        case "r!reload":
            if (status()) {
                let rcon = await Rcon.connect({host:serverCfg.serverIP ,port:serverCfg.port ,password:serverCfg.password});
                await rcon.send("reload");
                channel.send("サーバーをリロードしました");
            } else {
                channel.send("サーバーは起動していません");
            }
            break;
    }
});*/

client.login(process.env.TOKEN);