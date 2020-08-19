const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");

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


client.login(process.env.TOKEN);