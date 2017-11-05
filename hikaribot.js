const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
    console.log(`Hikari is ready to serve! ${bot.user.username}`);

   try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
   } catch(e) {
       console.log(e.stack);
   } 
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;
    if(command === `${prefix}userinfo`){
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setDescription("Hey, I'm Evan. Also known as Grizzly..And Xenosis. Enjoy using Hikari!")
            .setColor("#228b22")
            .addField("Full Username",`${message.author.username}#${message.author.discriminator}`)
            .addField("ID", message.author.id)
            .addField("Created At", message.author.createdAt);

        message.channel.sendEmbed(embed);

        return;
    }
});

bot.login(botSettings.token);