const { RichEmbed } = require("discord.js");

module.exports = {
    name: "say",
    aliases: ["bc", "broadcast", "s"],
    category: "moderation",
    description: "botに喋らせるよ",
    usage: "<input>",
    run: (client, message, args) => {
        message.delete();

        const roleColor = message.guild.me.roles.color;

        if (args[0].toLowerCase() === "embed") {
            const embed = new RichEmbed()
                .setDescription(args.slice(1).join(" "))
                .setColor(roleColor === "#000000" ? "#ffffff" : roleColor);

            message.channel.send(embed);

        } else {
            message.channel.send(args.join(" "));
            console.log(message.author.username + ":" + args.join(" "));
        }
    }
};