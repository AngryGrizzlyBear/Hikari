const Discord = module.require("discord.js")

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setDescription("Hey, I'm Evan. Also known as Grizzly..And Xenosis. Enjoy using Hikari!")
    .setColor("#228b22")
    .addField("Full Username",`${message.author.username}#${message.author.discriminator}`)
    .addField("ID", message.author.id)
    .addField("Created At", message.author.createdAt);

message.channel.send({embed: embed});
}

module.exports.help = {
name: "userinfo"
}

