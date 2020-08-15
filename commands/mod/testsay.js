const { RichEmbed } = require("discord.js");

module.exports = {
    name: "tsay",
    category: "moderation",
    description: "botに喋らせるよ",
    usage: "<input>",
    run: (client, message, args) => {
        message.delete();

        let channel = client.guilds.cache.find(guild => guild.id === "694141924562567219")
            .channels.cache.find(channel => channel.id === "726395067039744020");

        const roleColor = message.guild.me.roles.color;

        if (args[0].toLowerCase() === "embed") {
            const embed = new RichEmbed()
                .setDescription(args.slice(1).join(" "))
                .setColor(roleColor === "#000000" ? "#ffffff" : roleColor);

            channel.send(embed);

        } else {
            channel.send(args.join(" "));
            console.log(message.author.username + ":" + args.join(" "));
        }
    }
};