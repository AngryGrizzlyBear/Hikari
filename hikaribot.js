const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const fs = require("fs");

const prefix = botSettings.prefix;

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
bot.mutes = require("./mutes.json")

fs.readdir("./cmds/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("No commands to load!");
        return;
    }

    console.log(`loading ${jsfiles.length} commands!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on("ready", async () => {
    console.log(`Hikari is ready to serve! ${bot.user.username}`);

    bot.setInterval(() => {
        for(let i in bot.mutes) {
             let time = bot.mutes[i].time;
             let guildId = bot.mutes[i].guild;
             let guild = bot.guilds.get(guildId);
             let member = guild.members.get(i);
             let mutedRole = guild.roles.find(r => r.name === "Hikari Muted")
             if(!mutedRole) continue;

             if(Date.now() > time){
                 console.log(`${i} is now able to be unmuted!`);

                 member.removeRole(mutedRole);
                 delete bot.mutes[i];

                 fs.writeFile("./mute.json", JSON.stringify(bot.mutes), err => {
                     if(err) throw err;
                     console.log(`I have unmute ${member.user.tag}.`);
                 });
             }
        }
    }, 5000)
    
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

    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length))
    if(cmd) cmd.run(bot, message, args);

});

bot.login(botSettings.token);