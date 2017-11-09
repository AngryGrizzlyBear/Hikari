module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You do not have manage messages.");
    
            let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
            if(!toMute) return message.channel.sendMessage("You did not specify a user mention or ID!");
            
            let role = message.guild.roles.find(r => r.name === "Hikari Muted");
            
            if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("This user is not muted!");
    
            await toMute.removeRole(role);
            message.channel.sendMessage("I have unmuted them.");
            
}

module.exports.help = {
    name: "unmute"
}